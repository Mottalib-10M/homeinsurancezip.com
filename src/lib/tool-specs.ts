/**
 * The calculators of the site, one entry per subject (declarative, rendered by components/calc/SpecTool.tsx
 * and MiniSim.tsx). Rules come from params-2026.json; local figures from src/data/state-lite.json and
 * national.json, built by scripts/build-data.py. This file ships to the browser: nothing heavy here.
 */
import P from '../data/params-2026.json';
import LITE from '../data/state-lite.json';
import NAT from '../data/national.json';
import type { ToolSpec, V, Input } from './tool-types';
import { formatMoney, formatPercent, formatNumber } from './format';
import { hurricaneClaim, coinsurance, roofClaim, escrowChange, nonrenewalOdds, claimOrNot, citizensTest, rentersNeed, lossOfUse, pctDeductible, noticeCheck } from './engine/home';

export const usd = (x: number) => `${x < -0.5 ? '-' : ''}${formatMoney(Math.abs(Math.round(x)), 0)}`;
export const pct = (x: number, d = 1) => formatPercent(x, d);
/** "+7.3%" / "-16.5%": the one way a change is written on the site, text and calculators alike. */
export const sgn = (x: number, d = 1) => `${x >= 0 ? '+' : '-'}${formatPercent(Math.abs(x), d)}`;
const n = (v: V, k: string) => Number(v[k]) || 0;
const s = (v: V, k: string) => String(v[k]);

export interface Lite { c: string; n: string; s: string; z: number; prem: number[]; p10: number; p90: number; chg: number; nonren: Array<number | null>; freq: number; sev: number; lr: number; npc: number | null; oc: number | null; rp: number; rn: number }
export const LITE_STATES = LITE as unknown as Lite[];
/** Default state of every state field on the site (testeurs naïfs du 2026-11-09 : Texas, Colorado puis Californie selon la page). */
export const DEFAULT_STATE = 'florida';
const ST = (slug: string) => LITE_STATES.find((x) => x.s === slug) ?? LITE_STATES.find((x) => x.s === DEFAULT_STATE)!;
const STATE_OPTIONS = LITE_STATES.map((x) => ({ value: x.s, label: x.n }));
const stateIn = (def = DEFAULT_STATE): Input => ({ kind: 'select', id: 'sx', label: 'State', def, options: STATE_OPTIONS });
const NA = NAT as unknown as { prem: number[]; nonren: number[]; freq: number; sev: number; ppiFactor: number; chg: number; index: { ppi: { annual: Record<string, number>; last: { ym: string; v: number } }; cpi: { annual: Record<string, number>; last: { ym: string; v: number } }; tenants: { annual: Record<string, number>; last: { ym: string; v: number } } } };
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const monthName = (ym: string) => `${MONTHS[Number(ym.slice(5, 7)) - 1]} ${ym.slice(0, 4)}`;
export const longDate = (iso: string) => `${MONTHS[Number(iso.slice(5, 7)) - 1]} ${Number(iso.slice(8, 10))}, ${iso.slice(0, 4)}`;
const PPI_MONTH = monthName(NA.index.ppi.last.ym);
/** 2022 premium carried to the latest month of the BLS homeowner's insurance price index. */
export const toToday = (x: number) => x * NA.ppiFactor;
const cpiGrowth = NA.index.cpi.annual['2022'] / NA.index.cpi.annual['2018'] - 1;
const F = P.florida;
const NOTICE = (P as unknown as { nonrenewalNotice: { states: Array<{ code: string; days: number; cite: string; source: string; reason: boolean }> } }).nonrenewalNotice.states;

export const SPECS: Record<string, (arg?: Record<string, number | string>) => ToolSpec> = {
  /* A state's medians: premium per policy, its path, the spread, nonrenewals */
  state: () => ({
    inputs: [stateIn(), { id: 'mine', label: 'Your yearly premium, from your bill or a quote (optional)', def: 0, unit: '$', max: 100000, help: 'Compared with the state at today\'s prices' }],
    run: (v) => {
      const x = ST(s(v, 'sx')), mine = n(v, 'mine');
      const p = x.prem[4];
      const nr = x.nonren[4];
      return {
        label: `Typical yearly premium in ${x.n}, at ${PPI_MONTH} prices`, value: usd(toToday(p)),
        sub: `Estimate: ${usd(p)} paid in 2022 by the middle ZIP code of ${x.n} (rank ${x.rp} of 51), raised by the national rise of home insurance prices since then.`,
        rows: [
          ['Paid in 2022, middle ZIP code of the state', usd(p), p],
          ['Change from 2018 to 2022, after inflation', sgn(x.chg)],
          ['Cheapest tenth of ZIP codes paid under, 2022', usd(x.p10), x.p10], ['Dearest tenth of ZIP codes paid over, 2022', usd(x.p90), x.p90],
          ['Policies the insurer did not renew, 2022', nr === null ? 'not reported' : pct(nr, 2)],
          ...(mine > 0 ? [['Your premium against the state at today\'s prices', sgn(mine / toToday(p) - 1, 0)] as [string, string]] : []),
        ],
        note: 'Premium per policy is what insurers wrote divided by the policies in force, after inflation as published by the Treasury: it mixes large and small homes and all deductibles. Data end in 2022.',
      };
    },
  }),
  /* Why premiums rise: the 2022 figure carried to today with the price index, against inflation */
  rise: () => ({
    inputs: [
      { id: 'p22', label: 'Yearly premium paid in 2022', def: NA.prem[4], unit: '$', max: 100000, help: 'Yours if you know it; filled with the middle U.S. ZIP code' },
      { id: 'now', label: 'Your yearly premium today (optional)', def: 0, unit: '$', max: 100000, help: 'From your renewal notice' },
    ],
    run: (v) => {
      const p = n(v, 'p22'), now = n(v, 'now'), proj = toToday(p);
      return {
        label: `The same 2022 premium at ${PPI_MONTH} prices`, value: usd(proj),
        sub: `Home insurance prices rose ${sgn(NA.ppiFactor - 1)} from 2022 to ${PPI_MONTH} (price index of the Bureau of Labor Statistics).`,
        rows: [
          ['If it had only followed general prices (consumer price index)', usd(p * (NA.index.cpi.last.v / NA.index.cpi.annual['2022'])), p * (NA.index.cpi.last.v / NA.index.cpi.annual['2022'])],
          ['Home insurance prices, 2018 to 2022', sgn(NA.index.ppi.annual['2022'] / NA.index.ppi.annual['2018'] - 1)],
          ['General prices, 2018 to 2022', sgn(cpiGrowth)],
          ...(now > 0 ? [['Your premium today against the market trend', sgn(now / proj - 1, 0)] as [string, string]] : []),
        ],
        note: 'The index follows the price of comparable coverage nationwide; a ZIP code hit by losses or a lost insurer can move far more.',
      };
    },
  }),
  /* Nonrenewal: the state rate and the chance of at least one over several renewals */
  nonrenew: () => ({
    inputs: [stateIn(), { id: 'yrs', label: 'Years you plan to keep the house', def: 5, unit: 'years', max: 30 }],
    run: (v) => {
      const x = ST(s(v, 'sx')), y = Math.round(n(v, 'yrs'));
      const r = x.nonren[4];
      if (r === null) return { label: `Nonrenewal rate in ${x.n}`, value: 'Not reported', sub: 'Texas insurers did not report nonrenewals in the data call (Treasury report, Figure 8 note).', rows: [['Middle U.S. ZIP code, 2022', pct(NA.nonren[4], 2)]] };
      return {
        label: `Chance of at least one nonrenewal in ${y} ${y === 1 ? 'renewal' : 'renewals'}, ${x.n}`, value: pct(nonrenewalOdds(r, y), 1),
        sub: `If ${pct(r, 2)} of policies a year are not renewed, the rate of the state's middle ZIP code in 2022.`,
        rows: [['Middle ZIP code of the state, 2018', x.nonren[0] === null ? 'n/a' : pct(x.nonren[0], 2)], ['Middle U.S. ZIP code, 2022', pct(NA.nonren[4], 2)], ['Same years at the national rate', pct(nonrenewalOdds(NA.nonren[4], y), 1)], [`${x.n} rank, 51 = lowest`, `${x.rn} of 51`]],
        note: 'Insurer-initiated nonrenewals only; a policyholder who leaves is not counted. Your own odds depend on the roof, claims and the insurer.',
      };
    },
  }),
  /* Nonrenewal notice: minimum days in the states whose statute was read (params-2026.json > nonrenewalNotice) */
  notice: () => ({
    inputs: [
      { kind: 'select', id: 'nx', label: 'State', def: 'FL', options: NOTICE.map((x) => ({ value: x.code, label: LITE_STATES.find((s) => s.c === x.code)?.n ?? x.code })), help: 'Only the states whose statute this site has read' },
      { id: 'dn', label: 'Days between the notice and the end of your policy', def: 60, unit: 'days', max: 1000, help: 'Count from the date printed on the notice' },
    ],
    run: (v) => {
      const x = NOTICE.find((y) => y.code === s(v, 'nx')) ?? NOTICE[0];
      const name = LITE_STATES.find((y) => y.c === x.code)?.n ?? x.code;
      const r = noticeCheck({ required: x.days, given: n(v, 'dn') });
      return {
        label: `Minimum notice of nonrenewal in ${name}`, value: `${x.days} days`,
        sub: r.onTime ? `A notice ${Math.round(n(v, 'dn'))} days before the end date meets it, with ${r.spare} days to spare.` : `A notice ${Math.round(n(v, 'dn'))} days before the end date is ${r.short} days short of it.`,
        rows: [['Your notice', r.onTime ? 'on time' : 'too late'], ['The insurer must state its reason', x.reason ? 'yes' : 'no'], ['Rule', x.cite]],
        note: 'A late notice does not always end the matter the same way in every state: ask the state insurance department what it means for your policy.',
      };
    },
  }),
  /* Premium per month, with the escrow view */
  monthly: () => ({
    inputs: [{ id: 'y', label: 'Yearly premium', def: Math.round(toToday(NA.prem[4])), unit: '$', max: 100000, help: 'Filled with the middle U.S. ZIP code at today\'s prices' }, { id: 'cov', label: 'Amount the house is insured for', def: 300000, unit: '$', max: 10000000, help: 'Dwelling limit, "Coverage A" on the policy' }],
    run: (v) => {
      const y = n(v, 'y'), cov = n(v, 'cov');
      return {
        label: 'The same premium per month', value: usd(y / 12), sub: `${usd(y)} a year is ${formatMoney(y / 365, 2)} a day.`,
        rows: [['Price per $1,000 of insured value, per year (to compare two quotes)', cov > 0 ? formatMoney((y / cov) * 1000, 2) : 'n/a'], ['Extra your lender may keep in the escrow account, at most', usd(y * P.escrow.cushionMax), y * P.escrow.cushionMax], [`Against the middle U.S. ZIP code at ${PPI_MONTH} prices`, Math.abs(y / toToday(NA.prem[4]) - 1) < 0.005 ? 'same' : sgn(y / toToday(NA.prem[4]) - 1, 0)]],
      };
    },
  }),
  /* Escrow: what a premium increase does to the mortgage payment */
  escrow: () => ({
    inputs: [
      { id: 'old', label: 'Premium last year', def: 1800, unit: '$', max: 100000 },
      { id: 'new', label: 'Premium at renewal', def: 2400, unit: '$', max: 100000 },
      { id: 'tax', label: 'Property tax and other escrow items, yearly', def: 4200, unit: '$', max: 200000, adv: true, help: 'Paid from the same escrow account' },
    ],
    run: (v) => {
      const e = escrowChange({ oldPremium: n(v, 'old'), newPremium: n(v, 'new'), otherYearly: n(v, 'tax'), cushionMax: P.escrow.cushionMax, months: P.escrow.shortageMonths });
      return {
        label: 'Monthly escrow change in the first year, up to', value: `${e.firstYear >= 0 ? '+' : ''}${usd(e.firstYear)}`,
        sub: `${usd(e.deposit)} for the new premium plus ${usd(e.spread)} a month to repay the shortage over ${P.escrow.shortageMonths} months.`,
        rows: [['Shortage, cushion included, up to', usd(e.shortage), e.shortage], [`Monthly escrow before: insurance plus ${usd(n(v, 'tax'))} a year of property tax`, usd(e.oldMonthly), e.oldMonthly], ['Monthly escrow after the first year', usd(e.newMonthly), e.newMonthly]],
        note: 'The servicer may also leave the shortage unpaid, or ask for it within 30 days when it is under one month\'s payment; the reserve it keeps may not exceed one-sixth of the yearly bills (federal escrow rule, see Sources).',
      };
    },
  }),
  /* Percentage hurricane or wind deductible */
  hurricane: () => ({
    inputs: [
      { id: 'a', label: 'Amount the house is insured for', def: 350000, unit: '$', max: 10000000, help: 'Dwelling limit, "Coverage A" on the policy' },
      { id: 'p', label: 'Hurricane or wind deductible', def: 2, unit: '%', max: 25, decimals: 1 },
      { id: 'd', label: 'Damage from the storm', def: 18000, unit: '$', max: 10000000 },
      { id: 'f', label: 'Ordinary deductible (fire, theft and other losses)', def: 1000, unit: '$', max: 100000, adv: true },
      { id: 'u', label: 'Hurricane losses already absorbed this year', def: 0, unit: '$', max: 1000000, adv: true, help: 'Florida applies the deductible once per calendar year' },
    ],
    run: (v) => {
      const r = hurricaneClaim({ coverageA: n(v, 'a'), share: n(v, 'p') / 100, flat: n(v, 'f'), damage: n(v, 'd'), usedThisYear: n(v, 'u') });
      return {
        label: 'The insurer would pay', value: usd(r.paid), sub: `Deductible ${usd(r.deductible)}: you keep ${usd(r.kept)} of the ${usd(n(v, 'd'))} damage.`,
        rows: [[`Your ${pct(n(v, 'p') / 100, Number.isInteger(n(v, 'p')) ? 0 : 1)} deductible on a ${usd(n(v, 'a'))} dwelling limit`, usd(r.full), r.full], ['Paid with the ordinary deductible instead', usd(r.paidFlat), r.paidFlat], ['Extra you carry because of the percentage', usd(r.extra), r.extra], ...F.hurricaneOptions.filter((o) => o < 1 && Math.abs(o * 100 - n(v, 'p')) > 1e-9).map((o) => [`At ${pct(o, 0)} instead`, usd(pctDeductible(n(v, 'a'), o))] as [string, string])],
        note: 'The percentage applies to the dwelling limit, not to the damage. Wind, hail and named-storm deductibles work the same way where a policy uses them.',
      };
    },
  }),
  /* Roof: replacement cost against actual cash value */
  roof: () => ({
    inputs: [
      { id: 'c', label: 'Cost to replace the roof', def: 16000, unit: '$', max: 500000 },
      { id: 'age', label: 'Age of the roof', def: 12, unit: 'years', max: 80 },
      { id: 'life', label: 'Expected life of the material', def: 25, unit: 'years', max: 100, help: 'The schedule in your policy, if it has one' },
      { id: 'd', label: 'Deductible that applies', def: 2500, unit: '$', max: 200000 },
    ],
    run: (v) => {
      const r = roofClaim({ cost: n(v, 'c'), age: n(v, 'age'), life: n(v, 'life'), deductible: n(v, 'd') });
      return {
        label: 'Actual cash value settlement', value: usd(r.acv), sub: `Replacement cost settlement: ${usd(r.rcv)}. The difference is ${usd(r.gap)}.`,
        rows: [['Value left in the roof', pct(r.left, 0)], ['Depreciated roof value before deductible', usd(r.acvValue), r.acvValue], ['Replacement cost before deductible', usd(n(v, 'c')), n(v, 'c')]],
        note: 'Straight-line depreciation over the expected life; insurers use their own schedules, and some pay the withheld depreciation once the work is done.',
      };
    },
  }),
  /* Dwelling limit and the replacement cost condition */
  coins: () => ({
    inputs: [
      { id: 'rc', label: 'Cost to rebuild the house', def: 420000, unit: '$', max: 20000000, help: 'Builder estimate, not the market price' },
      { id: 'lim', label: 'Dwelling limit on the policy', def: 300000, unit: '$', max: 20000000 },
      { id: 'loss', label: 'Damage', def: 60000, unit: '$', max: 20000000 },
      { id: 'd', label: 'Deductible', def: 1000, unit: '$', max: 200000, adv: true },
      { id: 'sh', label: 'Share required by the policy', def: P.coinsurance.defaultShare * 100, unit: '%', max: 100, adv: true },
    ],
    run: (v) => {
      const r = coinsurance({ replacementCost: n(v, 'rc'), limit: n(v, 'lim'), loss: n(v, 'loss'), deductible: n(v, 'd'), share: n(v, 'sh') / 100 });
      return {
        label: r.underinsured ? 'Paid with the proportional reduction' : 'Paid at replacement cost', value: usd(r.paid),
        sub: r.underinsured ? `The limit is ${pct(r.ratio, 0)} of the ${usd(r.required)} required: the claim is cut by ${usd(r.penalty)}.` : `The limit meets the ${usd(r.required)} required: no reduction.`,
        rows: [['Limit needed to avoid the reduction', usd(r.required), r.required], ['Reduction from underinsurance', usd(r.penalty), r.penalty], ['Left for you to pay', usd(r.kept), r.kept]],
        note: 'Some policies pay the actual cash value instead when it is higher; read the loss settlement clause of your own form.',
      };
    },
  }),
  /* Florida Citizens: the 20 percent rule */
  citizens: () => ({
    inputs: [{ id: 'cit', label: 'Citizens premium, comparable coverage', def: 3200, unit: '$', max: 200000 }, { id: 'pri', label: 'Private insurer offer', def: 3700, unit: '$', max: 200000 }],
    run: (v) => {
      const r = citizensTest({ citizens: n(v, 'cit'), privateOffer: n(v, 'pri'), margin: F.citizensMargin });
      return {
        label: 'Can a primary residence stay with or join Citizens?', value: r.eligible ? 'Yes, on price' : 'No, on price',
        sub: `The private offer is ${pct(r.over, 0)} above Citizens; the line is more than ${pct(F.citizensMargin, 0)}, here ${usd(r.limit)}.`,
        rows: [['Private offer that keeps eligibility, above', usd(r.limit), r.limit], ['Difference with the offer entered', usd(r.gap), r.gap]],
        note: 'Fla. Stat. 627.351(6)(c)5.a, for comparable coverage from an authorized insurer; other eligibility rules of Citizens still apply.',
      };
    },
  }),
  /* Should a small claim be filed */
  claim: () => ({
    inputs: [
      { id: 'dmg', label: 'Damage', def: 4500, unit: '$', max: 1000000 },
      { id: 'ded', label: 'Deductible', def: 1500, unit: '$', max: 200000 },
      { id: 'pr', label: 'Yearly premium', def: Math.round(toToday(NA.prem[4])), unit: '$', max: 100000 },
      { id: 'sur', label: 'Surcharge you expect after a claim', def: 20, unit: '%', max: 200, help: 'Your guess, or what your insurer states' },
      { id: 'yrs', label: 'Years the surcharge lasts', def: 3, unit: 'years', max: 10 },
    ],
    run: (v) => {
      const r = claimOrNot({ damage: n(v, 'dmg'), deductible: n(v, 'ded'), premium: n(v, 'pr'), surcharge: n(v, 'sur') / 100, years: n(v, 'yrs') });
      return {
        label: r.net >= 0 ? 'Filing leaves you ahead by' : 'Filing leaves you behind by', value: usd(Math.abs(r.net)),
        sub: `The claim pays ${usd(r.paid)}; the surcharge would cost ${usd(r.cost)} over ${n(v, 'yrs')} years.`,
        rows: [['Claim payment after deductible', usd(r.paid), r.paid], ['Extra premium over the period', usd(r.cost), r.cost], ['Average claim paid in the middle U.S. ZIP code, 2018 to 2022', usd(NA.sev), NA.sev]],
        note: 'A surcharge is not the only effect: claims history can also weigh on a renewal decision.',
      };
    },
  }),
  /* Renters: the personal property limit from an inventory */
  renters: () => ({
    inputs: [
      { id: 'f', label: 'Furniture', def: 6000, unit: '$', max: 1000000 },
      { id: 'e', label: 'Electronics and computers', def: 3500, unit: '$', max: 1000000 },
      { id: 'c', label: 'Clothing and shoes', def: 4000, unit: '$', max: 1000000 },
      { id: 'k', label: 'Kitchen and household goods', def: 2500, unit: '$', max: 1000000 },
      { id: 'o', label: 'Everything else', def: 2000, unit: '$', max: 1000000, adv: true },
      { id: 'dep', label: 'Average wear of these items', def: 40, unit: '%', max: 95, adv: true, help: 'Used for an actual cash value policy' },
    ],
    run: (v) => {
      const r = rentersNeed(['f', 'e', 'c', 'k', 'o'].map((k) => n(v, k)), n(v, 'dep') / 100);
      return {
        label: 'Personal property limit to ask for', value: usd(Math.ceil(r.total / 5000) * 5000),
        sub: `Your inventory adds up to ${usd(r.total)} at today's replacement prices, rounded up to the next $5,000.`,
        rows: [['Paid on a total loss, replacement cost policy, before deductible', usd(r.total), r.total], ['Paid on a total loss, actual cash value policy', usd(r.acv), r.acv]],
        note: 'Jewelry, collections and cash usually have lower sublimits inside the policy; list them apart.',
      };
    },
  }),
  /* Renters: loss of use */
  ale: () => ({
    inputs: [
      { id: 'm', label: 'Months out of the apartment', def: 4, unit: 'months', max: 36 },
      { id: 'tr', label: 'Temporary housing, per month', def: 2600, unit: '$', max: 100000 },
      { id: 'r', label: 'Your usual rent, per month', def: 1500, unit: '$', max: 100000, help: 'Only the extra cost is paid' },
      { id: 'x', label: 'Other extra costs, per month', def: 300, unit: '$', max: 100000, help: 'Meals out, longer commute, laundry' },
      { id: 'lim', label: 'Loss of use limit on the policy', def: 6000, unit: '$', max: 1000000 },
    ],
    run: (v) => {
      const r = lossOfUse({ months: n(v, 'm'), tempRent: n(v, 'tr'), rent: n(v, 'r'), extra: n(v, 'x'), limit: n(v, 'lim') });
      return {
        label: 'Loss of use the policy would pay', value: usd(r.paid), sub: `Extra living costs of ${usd(r.need)} over ${n(v, 'm')} months.`,
        rows: [['Above the limit, for you', usd(r.kept), r.kept], ['Extra cost per month', usd(r.need / Math.max(1, n(v, 'm'))), r.need / Math.max(1, n(v, 'm'))]],
        note: 'Loss of use pays the increase over normal costs, while the home cannot be lived in after a covered loss.',
      };
    },
  }),
};

/** A spec with its defaults overridden by `arg` (same keys as the input ids). */
export function getTool(kind: string, arg?: Record<string, number | string>): ToolSpec {
  const f = SPECS[kind];
  if (!f) throw new Error(`Unknown tool ${kind}`);
  const spec = f(arg);
  if (!arg) return spec;
  return { ...spec, inputs: spec.inputs.map((i) => (arg[i.id] === undefined ? i : ({ ...i, def: arg[i.id] } as typeof i))) };
}
export const TOOL_KINDS = Object.keys(SPECS);
