#!/usr/bin/env python3
"""Rebuild the data files of the site from the Treasury's ZIP code release and two public indexes.

Usage:  python3 -I scripts/build-data.py   (needs openpyxl; inputs in data-raw/, never committed)

Inputs (data-raw/, downloaded with curl, see src/data/params-2026.json > sources):
  1. fio-supporting-underlying-metrics-2018-2022.xlsx
     U.S. Department of the Treasury, Federal Insurance Office, "Supporting Underlying Metrics and
     Disclaimer for Analyses of US Homeowners Insurance Markets 2018-2022" (January 2025):
     one row per ZIP code and year, 2018 to 2022, HO-3 and HO-5 policies of the insurers that answered
     the NAIC's Property and Casualty Market Intelligence data call; ZIP codes with at least 10 insurers
     and 50 policies only. Seven metrics: claim frequency, claim severity, paid loss ratio, premiums
     per policy, nonrenewal rate, nonpayment cancellation rate, other-than-nonpayment cancellation rate.
  2. tab20_zcta520_county20_natl.txt: Census Bureau 2020 ZCTA to county relationship file. A ZIP code
     is placed in the county that holds the largest land area of its ZCTA.
  3. bls-ppi-homeowners.txt: BLS Producer Price Index PCU5241265241262, "Homeowner's insurance"
     (lines of pc.data.58.InsuranceCarriers).
  4. bls-cpi.txt: BLS CPI-U all items (CUUR0000SA0) and "Tenants' and household insurance" (CUUR0000SEHD).

Outputs (committed): src/data/national.json, src/data/states.json, src/data/state-lite.json,
public/data/zip-<d>.json, public/data/counties.json.

Statistics are medians across ZIP codes (each ZIP counts once): the release gives no policy counts,
only a policy decile, so a policy-weighted state average cannot be computed honestly.
"""
import csv, json, os, statistics as st, collections

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = os.path.join(ROOT, 'data-raw')
YEARS = [2018, 2019, 2020, 2021, 2022]
METRICS = ['freq', 'sev', 'lr', 'prem', 'nonren', 'npc', 'oc']  # column order of the workbook (from column 4)
STATES = [
    ('01', 'AL', 'Alabama'), ('02', 'AK', 'Alaska'), ('04', 'AZ', 'Arizona'), ('05', 'AR', 'Arkansas'), ('06', 'CA', 'California'),
    ('08', 'CO', 'Colorado'), ('09', 'CT', 'Connecticut'), ('10', 'DE', 'Delaware'), ('11', 'DC', 'District of Columbia'),
    ('12', 'FL', 'Florida'), ('13', 'GA', 'Georgia'), ('15', 'HI', 'Hawaii'), ('16', 'ID', 'Idaho'), ('17', 'IL', 'Illinois'),
    ('18', 'IN', 'Indiana'), ('19', 'IA', 'Iowa'), ('20', 'KS', 'Kansas'), ('21', 'KY', 'Kentucky'), ('22', 'LA', 'Louisiana'),
    ('23', 'ME', 'Maine'), ('24', 'MD', 'Maryland'), ('25', 'MA', 'Massachusetts'), ('26', 'MI', 'Michigan'), ('27', 'MN', 'Minnesota'),
    ('28', 'MS', 'Mississippi'), ('29', 'MO', 'Missouri'), ('30', 'MT', 'Montana'), ('31', 'NE', 'Nebraska'), ('32', 'NV', 'Nevada'),
    ('33', 'NH', 'New Hampshire'), ('34', 'NJ', 'New Jersey'), ('35', 'NM', 'New Mexico'), ('36', 'NY', 'New York'),
    ('37', 'NC', 'North Carolina'), ('38', 'ND', 'North Dakota'), ('39', 'OH', 'Ohio'), ('40', 'OK', 'Oklahoma'), ('41', 'OR', 'Oregon'),
    ('42', 'PA', 'Pennsylvania'), ('44', 'RI', 'Rhode Island'), ('45', 'SC', 'South Carolina'), ('46', 'SD', 'South Dakota'),
    ('47', 'TN', 'Tennessee'), ('48', 'TX', 'Texas'), ('49', 'UT', 'Utah'), ('50', 'VT', 'Vermont'), ('51', 'VA', 'Virginia'),
    ('53', 'WA', 'Washington'), ('54', 'WV', 'West Virginia'), ('55', 'WI', 'Wisconsin'), ('56', 'WY', 'Wyoming'),
]
BY_FIPS = {f: (c, n) for f, c, n in STATES}
slug = lambda n: n.lower().replace(' ', '-')
med = lambda xs: st.median(xs) if xs else None


def q(xs, p):
    xs = sorted(xs)
    if not xs: return None
    k = (len(xs) - 1) * p; f = int(k); c = min(f + 1, len(xs) - 1)
    return xs[f] + (xs[c] - xs[f]) * (k - f)


r0 = lambda x: None if x is None else round(x)
r4 = lambda x: None if x is None else round(x, 4)


def zcta_county():
    best, out = {}, {}
    for r in csv.DictReader(open(os.path.join(RAW, 'tab20_zcta520_county20_natl.txt'), encoding='utf-8-sig'), delimiter='|'):
        z = r['GEOID_ZCTA5_20']
        if not z: continue
        a = int(r['AREALAND_PART'] or 0)
        if a >= best.get(z, -1): best[z] = a; out[z] = (r['GEOID_COUNTY_20'], r['NAMELSAD_COUNTY_20'])
    return out


def bls(path, series):
    out = {}
    for line in open(os.path.join(RAW, path)):
        p = line.split('\t')
        if p[0].strip() != series: continue
        if p[3].strip() in ('-', ''): continue  # value not published (October 2025 shutdown months)
        out[(int(p[1]), p[2].strip())] = float(p[3])
    return out


def main():
    import openpyxl
    z2c = zcta_county()
    wb = openpyxl.load_workbook(os.path.join(RAW, 'fio-supporting-underlying-metrics-2018-2022.xlsx'), read_only=True)
    zips = collections.defaultdict(dict)  # zip -> year -> metrics
    decile = {}
    for r in wb['Supporting Underlying Metrics'].iter_rows(min_row=2, values_only=True):
        if r[0] is None: continue
        z = '%05d' % int(r[0]); y = int(r[1])
        zips[z][y] = dict(zip(METRICS, r[3:10]))
        decile[z] = int(r[2])
    unplaced = [z for z in zips if z not in z2c]
    if unplaced: raise SystemExit(f'{len(unplaced)} ZIP codes without a county: {unplaced[:5]}')

    rows = []  # one per ZIP
    for z, ys in sorted(zips.items()):
        fips, cname = z2c[z]
        code, _ = BY_FIPS[fips[:2]]
        g = lambda m, y: ys.get(y, {}).get(m)
        vals = lambda m: [g(m, y) for y in YEARS if g(m, y) is not None]
        avg = lambda m: st.mean(vals(m)) if vals(m) else None
        # Report, Figure 8 note: "Texas insurer data did not include information on nonrenewals" (nor on
        # renewals and cancellations, p. 57). The workbook carries zeros there: they become "not reported".
        nr = code == 'TX'
        rows.append({'zip': z, 'st': code, 'fips': fips, 'county': cname, 'dec': decile[z],
                     'prem': [g('prem', y) for y in YEARS], 'nonren': [None if nr else g('nonren', y) for y in YEARS],
                     'freq': avg('freq'), 'sev': avg('sev'), 'lr': avg('lr'), 'lrY': [g('lr', y) for y in YEARS],
                     'freqY': [g('freq', y) for y in YEARS], 'npc': None if nr else g('npc', 2022), 'oc': None if nr else g('oc', 2022)})

    ppi = bls('bls-ppi-homeowners.txt', 'PCU5241265241262')
    cpi = bls('bls-cpi.txt', 'CUUR0000SA0')
    ten = bls('bls-cpi.txt', 'CUUR0000SEHD')
    lastk = lambda s: max(k for k in s if k[1] != 'M13')
    annual = lambda s, y: s[(y, 'M13')]
    pack = lambda s: {'annual': {str(y): annual(s, y) for y in range(2018, 2026)}, 'last': {'ym': f'{lastk(s)[0]}-{lastk(s)[1][1:]}', 'v': s[lastk(s)]}}
    index = {'ppi': pack(ppi), 'cpi': pack(cpi), 'tenants': pack(ten)}
    ppiFactor = index['ppi']['last']['v'] / index['ppi']['annual']['2022']

    def summary(rs):
        p22 = [r['prem'][4] for r in rs if r['prem'][4] is not None]
        m = lambda key, i=None: [(r[key][i] if i is not None else r[key]) for r in rs if (r[key][i] if i is not None else r[key]) is not None]
        # One figure per notion, the same arithmetic as the lookup (audit and testeurs naïfs du 2026-11-09) :
        #  - chg = change of the median premium, prem 2022 / prem 2018 - 1 ("$1,445 to $1,551, +7.3%"), no longer
        #    the median of each ZIP code's own change (+5.7%), which sat under the same label and contradicted it;
        #  - freq and lr = mean of the five yearly medians shown in the year-by-year table, no longer the median of
        #    each ZIP code's five-year mean (4.5 and 43% above every yearly row).
        premM = [med(m('prem', i)) for i in range(5)]
        lrY = [med(m('lrY', i)) for i in range(5)]
        freqY = [med(m('freqY', i)) for i in range(5)]
        mean5 = lambda xs: st.mean([x for x in xs if x is not None]) if any(x is not None for x in xs) else None
        return {
            'zips': len(rs),
            'prem': [r0(x) for x in premM],
            'p10': r0(q(p22, .1)), 'p90': r0(q(p22, .9)),
            'chg': r4(r0(premM[4]) / r0(premM[0]) - 1) if premM[0] and premM[4] else None,
            'nonren': [r4(med(m('nonren', i))) for i in range(5)],
            'freq': r4(mean5(freqY)), 'sev': r0(med(m('sev'))), 'lr': r4(mean5(lrY)),
            'lrY': [r4(x) for x in lrY], 'freqY': [r4(x) for x in freqY],
            'npc': r4(med(m('npc'))), 'oc': r4(med(m('oc'))),
        }

    nat = summary(rows)
    nonren90 = q([r['nonren'][4] for r in rows if r['nonren'][4] is not None], .9)
    nat.update({'years': YEARS, 'index': index, 'ppiFactor': round(ppiFactor, 4), 'nonren90': r4(nonren90),
                'counties': len({r['fips'] for r in rows}), 'states': len({r['st'] for r in rows})})

    def zrow(r):
        return {'zip': r['zip'], 'county': r['county'], 'prem': r0(r['prem'][4]),
                'chg': r4(r['prem'][4] / r['prem'][0] - 1) if r['prem'][0] and r['prem'][4] else None, 'nonren': r4(r['nonren'][4])}

    states, lite = [], []
    by_st = collections.defaultdict(list)
    for r in rows: by_st[r['st']].append(r)
    for _, code, name in STATES:
        rs = by_st[code]
        s = summary(rs)
        valid = [r for r in rs if r['prem'][4] is not None]
        cty = collections.defaultdict(list)
        for r in rs: cty[r['county']].append(r)
        top = sorted(cty.items(), key=lambda kv: (-len(kv[1]), kv[0]))[:8]
        s.update({'code': code, 'name': name, 'slug': slug(name), 'counties': len(cty),
                  'hi': [zrow(r) for r in sorted(valid, key=lambda r: -r['prem'][4])[:5]],
                  'lo': [zrow(r) for r in sorted(valid, key=lambda r: r['prem'][4])[:5]],
                  'topCounties': [{'name': k, **{x: summary(v)[x] for x in ('zips', 'chg', 'freq', 'sev')},
                                   'prem': summary(v)['prem'][4], 'prem18': summary(v)['prem'][0], 'nonren': summary(v)['nonren'][4]} for k, v in top],
                  'highNonren': r4(sum(1 for r in rs if r['nonren'][4] is not None and r['nonren'][4] >= nonren90) / max(len(rs), 1))})
        states.append(s)
    for key, f in (('rankPrem', lambda s: s['prem'][4]), ('rankNonren', lambda s: s['nonren'][4]), ('rankChg', lambda s: s['chg']),
                   ('rankFreq', lambda s: s['freq']), ('rankSev', lambda s: s['sev'])):
        for i, s in enumerate(sorted(states, key=lambda s: -(f(s) or 0))): s[key] = i + 1
    for s in states:
        lite.append({'c': s['code'], 'n': s['name'], 's': s['slug'], 'z': s['zips'], 'prem': s['prem'], 'p10': s['p10'], 'p90': s['p90'],
                     'chg': s['chg'], 'nonren': s['nonren'], 'freq': s['freq'], 'sev': s['sev'], 'lr': s['lr'], 'npc': s['npc'], 'oc': s['oc'],
                     'rp': s['rankPrem'], 'rn': s['rankNonren']})

    counties = []
    cty = collections.defaultdict(list)
    for r in rows: cty[(r['st'], r['county'])].append(r)
    for (code, name), rs in sorted(cty.items()):
        s = summary(rs)
        counties.append([code, name, s['zips'], *s['prem'], *s['nonren'], s['freq'], s['sev'], s['lr'], s['npc'], s['oc']])

    D = os.path.join(ROOT, 'src/data'); P = os.path.join(ROOT, 'public/data')
    os.makedirs(P, exist_ok=True)
    for f in os.listdir(P):
        if f.startswith('zip-') or f == 'counties.json': os.remove(os.path.join(P, f))
    json.dump(nat, open(os.path.join(D, 'national.json'), 'w'), indent=1)
    json.dump(states, open(os.path.join(D, 'states.json'), 'w'), indent=1)
    json.dump(lite, open(os.path.join(D, 'state-lite.json'), 'w'), separators=(',', ':'))
    # County rows (same layout as ZIP rows from column 3): [state, county, zips, prem 2018..2022, nonren 2018..2022, freq, sev, lr, npc, oc]
    json.dump(counties, open(os.path.join(P, 'counties.json'), 'w'), separators=(',', ':'))
    # ZIP rows: [zip, state, county, prem 2018..2022, nonren 2018..2022, freq, sev, lr, npc 2022, oc 2022, decile]
    split = collections.defaultdict(list)
    for r in rows:
        split[r['zip'][0]].append([r['zip'], r['st'], r['county'], *[r0(x) for x in r['prem']], *[r4(x) for x in r['nonren']],
                                   r4(r['freq']), r0(r['sev']), r4(r['lr']), r4(r['npc']), r4(r['oc']), r['dec']])
    for d, rs in split.items():
        json.dump(rs, open(os.path.join(P, f'zip-{d}.json'), 'w'), separators=(',', ':'))
    print(f"{len(rows)} ZIP codes, {nat['counties']} counties, {nat['states']} states; median premium 2022 {nat['prem'][4]}, "
          f"change of the median 2018-2022 {nat['chg']:.3f}, nonrenewal 2022 {nat['nonren'][4]:.4f}; PPI factor 2022 -> {index['ppi']['last']['ym']} {ppiFactor:.3f}")


if __name__ == '__main__':
    main()
