/**
 * The site's main tool: what homeowners paid per policy in a ZIP code, a county or a state from 2018 to 2022,
 * how often policies were not renewed and how large claims were, from the Treasury FIO workbook. First render =
 * the page's defaults (state or national medians), computed at build time; the ZIP and county tables are fetched
 * from /data/ only after the page is interactive, and a shared link is read after mount (RECETTE §17.5).
 * Nothing typed leaves the browser: the tables are static files and the lookup happens here.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import { ResultCard, Rows, ShareRow } from './parts';
import { readParams, updateURL } from '../../lib/url-state';
import { LITE_STATES, usd, pct, toToday, monthName } from '../../lib/tool-specs';
import { formatNumber } from '../../lib/format';
import NAT from '../../data/national.json';

/** ZIP: [zip, state, county, prem 2018..2022, nonren 2018..2022, freq, sev, lr, npc, oc, decile]; county: [state, county, zips, same from index 3]. */
type ZipRow = [string, string, string, ...Array<number | null>];
type CountyRow = [string, string, number, ...Array<number | null>];
interface Area { label: string; kind: 'zip' | 'county' | 'state' | 'nation'; zips: number; prem: Array<number | null>; nonren: Array<number | null>; freq: number | null; sev: number | null; lr: number | null; npc: number | null }

const NA = NAT as unknown as { prem: number[]; nonren: number[]; freq: number; sev: number; lr: number; npc: number; zips: number; index: { ppi: { last: { ym: string } } } };
const PPI_MONTH = monthName(NA.index.ppi.last.ym);
const natArea = (): Area => ({ label: 'the United States (median ZIP code)', kind: 'nation', zips: NA.zips, prem: NA.prem, nonren: NA.nonren, freq: NA.freq, sev: NA.sev, lr: NA.lr, npc: NA.npc });
const stateArea = (code: string): Area => {
  const x = LITE_STATES.find((s) => s.c === code)!;
  return { label: `${x.n} (median ZIP code)`, kind: 'state', zips: x.z, prem: x.prem, nonren: x.nonren, freq: x.freq, sev: x.sev, lr: x.lr, npc: x.npc };
};
const nameOf = (code: string) => LITE_STATES.find((s) => s.c === code)?.n ?? code;
const zipArea = (r: ZipRow): Area => ({ label: `ZIP ${r[0]}, ${r[2]}, ${nameOf(r[1])}`, kind: 'zip', zips: 1, prem: r.slice(3, 8) as number[], nonren: r.slice(8, 13) as Array<number | null>, freq: r[13] as number, sev: r[14] as number, lr: r[15] as number, npc: r[16] as number | null });
const countyArea = (r: CountyRow): Area => ({ label: `${r[1]}, ${nameOf(r[0])} (median of ${r[2]} ZIP codes)`, kind: 'county', zips: r[2], prem: r.slice(3, 8) as number[], nonren: r.slice(8, 13) as Array<number | null>, freq: r[13] as number, sev: r[14] as number, lr: r[15] as number, npc: r[16] as number | null });
const rate = (x: number | null | undefined, d = 2) => (x === null || x === undefined ? 'not reported' : pct(x, d));

interface Props { state?: string; idPrefix?: string; methodHref?: string }

export default function ZipLookup({ state = '', idPrefix = 'lk', methodHref }: Props) {
  const [zip, setZip] = useState('');
  const [st, setSt] = useState(state);
  const [county, setCounty] = useState('');
  const [mine, setMine] = useState(0);
  const [counties, setCounties] = useState<CountyRow[] | null>(null);
  const [zipRows, setZipRows] = useState<Record<string, ZipRow[]>>({});
  const [zipMsg, setZipMsg] = useState('');
  const loading = useRef<Record<string, boolean>>({});

  useEffect(() => {
    fetch('/data/counties.json').then((r) => r.json()).then((rows: CountyRow[]) => setCounties(rows)).catch(() => setCounties([]));
    const u = readParams(window.location.search);
    if (u.get('zip')) setZip(u.get('zip')!.replace(/\D/g, '').slice(0, 5));
    if (u.get('st') && LITE_STATES.some((s) => s.c === u.get('st'))) setSt(u.get('st')!);
    if (u.get('county')) setCounty(u.get('county')!);
    if (u.get('mine')) { const f = parseFloat(u.get('mine')!); if (!isNaN(f)) setMine(Math.min(f, 100000)); }
  }, []);
  useEffect(() => updateURL({ zip: zip || undefined, st: st || undefined, county: county || undefined, mine: mine || undefined }), [zip, st, county, mine]);

  useEffect(() => {
    if (zip.length !== 5) { setZipMsg(''); return; }
    const d = zip[0];
    if (zipRows[d] || loading.current[d]) return;
    loading.current[d] = true;
    fetch(`/data/zip-${d}.json`).then((r) => r.json()).then((rows: ZipRow[]) => setZipRows((o) => ({ ...o, [d]: rows }))).catch(() => setZipMsg('The ZIP table could not be loaded.'));
  }, [zip, zipRows]);

  const zipRow = zip.length === 5 ? zipRows[zip[0]]?.find((r) => r[0] === zip) : undefined;
  const zipMissing = zip.length === 5 && !!zipRows[zip[0]] && !zipRow;
  // ZIP absent from the file: its state is read from neighboring ZIP codes (same first three digits), else the nation.
  const zipState = zipMissing ? zipRows[zip[0]].find((r) => r[0].startsWith(zip.slice(0, 3)))?.[1] : undefined;
  useEffect(() => { if (zipRow) setZipMsg(''); }, [zipRow]);

  const stateCounties = useMemo(() => (counties ?? []).filter((r) => r[0] === st).sort((a, b) => a[1].localeCompare(b[1])), [counties, st]);
  const countyRow = county ? stateCounties.find((r) => r[1] === county) : undefined;

  const area: Area = zipRow ? zipArea(zipRow) : countyRow ? countyArea(countyRow) : st ? stateArea(st)
    : zipState && LITE_STATES.some((s) => s.c === zipState) ? stateArea(zipState) : natArea();
  const missingMsg = zipMissing ? `ZIP ${zip} is not in the Treasury file (fewer than 10 insurers or 50 policies there). Showing ${area.label}.` : '';
  const p18 = area.prem[0], p22 = area.prem[4];
  const head = p22 ?? 0;
  const proj = toToday(head);
  const chg = p18 && p22 ? p22 / p18 - 1 : null;
  const stateOptions = [{ value: '', label: 'All states' }, ...LITE_STATES.map((s) => ({ value: s.c, label: s.n }))];
  const countyOptions = [{ value: '', label: st ? 'Whole state' : 'Pick a state first' }, ...stateCounties.map((r) => ({ value: r[1], label: r[1] }))];

  return (
    <div className="rounded-xl border border-navy-200 bg-white p-4 sm:p-5">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)]">
        <form className="grid content-start grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-rows-subgrid row-span-3 content-start gap-y-0">
            <label htmlFor={`${idPrefix}-zip`} className="mb-1 block text-sm font-medium text-navy-700">ZIP code</label>
            <input id={`${idPrefix}-zip`} type="text" inputMode="numeric" autoComplete="postal-code" maxLength={5} value={zip} placeholder="e.g. 73099"
              onChange={(e) => { setZip(e.target.value.replace(/\D/g, '').slice(0, 5)); }} aria-describedby={`${idPrefix}-zip-help`}
              className="tabular-nums h-12 w-full rounded-lg border border-navy-300 bg-white px-4 text-lg tracking-wider text-navy-900 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20" />
            <p id={`${idPrefix}-zip-help`} role="status" className="mt-1 text-xs text-navy-500">{zipMsg || missingMsg || 'Five digits; or pick a county below'}</p>
          </div>
          <NumberField id={`${idPrefix}-mine`} label="Your premium today (optional)" value={mine} onChange={setMine} unit="$" max={100000} help="To compare with the area" />
          <SelectField id={`${idPrefix}-st`} label="State" value={st} onChange={(v) => { setSt(v); setCounty(''); }} options={stateOptions} />
          <SelectField id={`${idPrefix}-county`} label="County" value={county} onChange={setCounty} options={countyOptions} help={counties === null ? 'Loading the county table' : undefined} />
        </form>
        <ResultCard label={`Premium per policy in 2022, ${area.label}`} value={usd(head)}
          sub={`Average paid per HO-3 or HO-5 policy, inflation-adjusted as published by the Treasury. At ${PPI_MONTH} prices: about ${usd(proj)}.`}>
          <Rows rows={[
            ['Change from 2018 to 2022, after inflation', chg === null ? 'n/a' : `${chg >= 0 ? '+' : ''}${pct(chg)}`],
            ['Premium per policy in 2018', p18 ? usd(p18) : 'n/a', p18 ?? 0],
            ['Premium per policy in 2022', usd(head), head],
            [`2022 premium carried to ${PPI_MONTH} (BLS index)`, usd(proj), proj],
            ['Policies not renewed by the insurer, 2022', rate(area.nonren[4])],
            ['Claims paid per 100 policies, yearly average', area.freq === null ? 'n/a' : formatNumber(area.freq * 100, 1)],
            ['Average claim paid, 2018 to 2022 (adjusted)', area.sev === null ? 'n/a' : usd(area.sev)],
            ['Cancelled for nonpayment, 2022', rate(area.npc)],
            ...(mine > 0 ? [['Your premium against the area at today\'s prices', `${mine >= proj ? '+' : ''}${pct(mine / proj - 1, 0)}`] as [string, string]] : []),
          ]} />
          <p className="mt-2 text-xs text-navy-600">Treasury data stop in 2022. The {PPI_MONTH} figure applies the national BLS price index to the 2022 value, read as 2022 dollars: an estimate, not a quote.</p>
          <ShareRow methodHref={methodHref} />
        </ResultCard>
      </div>
    </div>
  );
}
