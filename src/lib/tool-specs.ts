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
/** Consumer prices from the 2022 average to the latest month: the same period as the home insurance index above (testeurs naïfs du 2026-11-09, second passage : 2018-2022 posé sous un calcul 2022-2026). */
const cpiSince22 = NA.index.cpi.last.v / NA.index.cpi.annual['2022'];
const F = P.florida;
/** Florida and Louisiana: the state insurer of last resort (Citizens) is outside the Treasury file (testeurs naïfs du 2026-11-09, second passage : « -16.5% » sans explication sur la page État). */
export const PLAN: Record<string, string> = { FL: 'Citizens Property Insurance', LA: 'Louisiana Citizens' };
const planNote = (x: Lite) => `Private insurers only: many ${x.n} homes moved to ${PLAN[x.c]}, the state's insurer of last resort, which this file leaves out, so the figures can look lower than what most owners saw.`;
const ORD = (k: number) => `${k}${k % 100 >= 11 && k % 100 <= 13 ? 'th' : ['th', 'st', 'nd', 'rd'][k % 10] ?? 'th'}`;
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
        sub: `Estimate: ${usd(p)} paid in 2022 by the typical ZIP code of ${x.n} (half paid more, half less; rank ${x.rp} of 51), raised by the national rise of home insurance prices since then.`,
        rows: [
          ...(mine > 0 ? [['Your premium against the state at today\'s prices', sgn(mine / toToday(p) - 1, 0)] as [string, string]] : []),
          ['Paid in 2022, typical ZIP code of the state', usd(p), p],
          [`Premium per policy, 2018 to 2022, beyond general inflation${PLAN[x.c] ? '*' : ''}`, sgn(x.chg)],
          ['Cheapest 10% of ZIP codes paid under, 2022', usd(x.p10), x.p10], ['Most expensive 10% of ZIP codes paid over, 2022', usd(x.p90), x.p90],
          ['Policies the insurer did not renew, 2022', nr === null ? 'not reported' : pct(nr, 2)],
        ],
        note: `${PLAN[x.c] ? `*${planNote(x)} ` : ''}Premium per policy is the premiums insurers charged in the year divided by the policies they had, in dollars adjusted for inflation as published by the Treasury: it mixes large and small homes and all deductibles. Data end in 2022.`,
      };
    },
  }),
  /* Why premiums rise: the 2022 figure carried to today with the price index, against inflation */
  rise: () => ({
    inputs: [
      { id: 'p22', label: 'Yearly premium paid in 2022', def: NA.prem[4], unit: '$', max: 100000, help: 'Yours if you know it; filled with the typical U.S. ZIP code' },
      { id: 'now', label: 'Your yearly premium today (optional)', def: 0, unit: '$', max: 100000, help: 'From your renewal notice' },
    ],
    run: (v) => {
      const p = n(v, 'p22'), now = n(v, 'now'), proj = toToday(p);
      return {
        label: `The same 2022 premium at ${PPI_MONTH} prices`, value: usd(proj),
        sub: `${usd(p)} raised by the rise of home insurance prices from 2022 to ${PPI_MONTH}, ${sgn(NA.ppiFactor - 1)} (price index of the Bureau of Labor Statistics).`,
        rows: [
          ...(now > 0 ? [['Your premium today against the market trend', sgn(now / proj - 1, 0)] as [string, string]] : []),
          [`If it had only followed general prices from 2022 to ${PPI_MONTH}`, usd(p * cpiSince22), p * cpiSince22],
          [`Home insurance prices, 2022 to ${PPI_MONTH}`, sgn(NA.ppiFactor - 1)],
          [`General prices, 2022 to ${PPI_MONTH} (consumer price index)`, sgn(cpiSince22 - 1)],
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
      if (r === null) return { label: `Nonrenewal rate in ${x.n}`, value: 'Not reported', sub: 'Texas insurers did not report nonrenewals in the data call (Treasury report, Figure 8 note).', rows: [['Whole U.S., typical ZIP code, 2022', pct(NA.nonren[4], 2)]] };
      return {
        label: `Chance of at least one nonrenewal in ${y} ${y === 1 ? 'renewal' : 'renewals'}, ${x.n}`, value: pct(nonrenewalOdds(r, y), 1),
        sub: `If ${pct(r, 2)} of policies a year are not renewed, the 2022 rate of ${x.n}'s typical ZIP code.${PLAN[x.c] ? ` ${planNote(x)}` : ''}`,
        rows: [[`Not renewed in a year, ${x.n}, 2022`, pct(r, 2)], ['Not renewed in a year, whole U.S., 2022', pct(NA.nonren[4], 2)], [`Same ${y} ${y === 1 ? 'year' : 'years'} at the U.S. rate`, pct(nonrenewalOdds(NA.nonren[4], y), 1)], [`${x.n} among the 51`, x.rn > 26 ? `${ORD(52 - x.rn)} lowest rate` : `${ORD(x.rn)} highest rate`]],
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
    inputs: [{ id: 'y', label: 'Yearly premium', def: Math.round(toToday(NA.prem[4])), unit: '$', max: 100000, help: 'Filled with the typical U.S. ZIP code at today\'s prices' }, { id: 'cov', label: 'Amount the house is insured for', def: 300000, unit: '$', max: 10000000, help: 'Most it pays to rebuild ("Coverage A")' }],
    run: (v) => {
      const y = n(v, 'y'), cov = n(v, 'cov');
      return {
        label: 'The same premium per month', value: usd(y / 12), sub: `${usd(y)} a year is ${formatMoney(y / 365, 2)} a day.`,
        rows: [['Price per $1,000 of insured value, per year (to compare two quotes)', cov > 0 ? formatMoney((y / cov) * 1000, 2) : 'n/a'], ['Safety reserve your lender may hold if it collects the premium with the mortgage, at most', usd(y * P.escrow.cushionMax), y * P.escrow.cushionMax], [`Compared with the typical U.S. premium at ${PPI_MONTH} prices`, Math.abs(y / toToday(NA.prem[4]) - 1) < 0.005 ? 'equal' : sgn(y / toToday(NA.prem[4]) - 1, 0)]],
      };
    },
  }),
  /* Escrow: what a premium increase does to the mortgage payment */
  escrow: () => ({
    inputs: [
      { id: 'old', label: 'Premium last year', def: 1800, unit: '$', max: 100000 },
      { id: 'new', label: 'Premium at renewal', def: 2400, unit: '$', max: 100000 },
      { id: 'tax', label: 'Your yearly property tax and other escrow items', def: 4200, unit: '$', max: 200000, adv: true, help: 'Paid from the same escrow account' },
    ],
    run: (v) => {
      const e = escrowChange({ oldPremium: n(v, 'old'), newPremium: n(v, 'new'), otherYearly: n(v, 'tax'), cushionMax: P.escrow.cushionMax, months: P.escrow.shortageMonths });
      return {
        label: 'Monthly escrow payment in the first year after the increase, up to', value: usd(e.oldMonthly + e.firstYear),
        sub: `${e.firstYear >= 0 ? '+' : '-'}${usd(Math.abs(e.firstYear))} a month against ${usd(e.oldMonthly)} before: ${usd(e.deposit)} for the new premium plus ${usd(e.spread)} to repay the catch-up over ${P.escrow.shortageMonths} months. After that year, ${usd(e.newMonthly)} a month.`,
        rows: [['Change in the first year', `${e.firstYear >= 0 ? '+' : '-'}${usd(Math.abs(e.firstYear))}`], ['One-time catch-up your lender may add, up to', usd(e.shortage), e.shortage], [`Monthly escrow before: insurance plus ${usd(n(v, 'tax'))} a year of property tax`, usd(e.oldMonthly), e.oldMonthly], ['Monthly escrow after the first year', usd(e.newMonthly), e.newMonthly]],
        note: 'The company that collects your mortgage payment (the servicer) may also leave the catch-up unpaid, or ask for it within 30 days when it is under one month\'s payment; the reserve it keeps may not exceed one-sixth of the yearly bills (federal escrow rule, see Sources).',
      };
    },
  }),
  /* Percentage hurricane or wind deductible */
  hurricane: () => ({
    inputs: [
      { id: 'a', label: 'Amount the house is insured for', def: 350000, unit: '$', max: 10000000, help: 'Most it pays to rebuild ("Coverage A")' },
      { id: 'p', label: 'Hurricane or wind deductible', def: 2, unit: '%', max: 25, decimals: 1 },
      { id: 'd', label: 'Damage from the storm', def: 18000, unit: '$', max: 10000000 },
      { id: 'f', label: 'Ordinary deductible (fire, theft and other losses)', def: 1000, unit: '$', max: 100000, adv: true },
      { id: 'u', label: 'Hurricane deductible you already paid on an earlier storm this year', def: 0, unit: '$', max: 1000000, adv: true, help: 'Florida applies the deductible once per calendar year' },
    ],
    run: (v) => {
      const u = n(v, 'u'), dmg = n(v, 'd');
      const r = hurricaneClaim({ coverageA: n(v, 'a'), share: n(v, 'p') / 100, flat: n(v, 'f'), damage: dmg, usedThisYear: u });
      const rate = pct(n(v, 'p') / 100, Number.isInteger(n(v, 'p')) ? 0 : 1);
      return {
        label: 'The insurer would pay', value: usd(r.paid),
        sub: u > 0
          ? `${usd(dmg)} of damage minus the ${usd(r.deductible)} left of your hurricane deductible this year (${usd(r.full)} for the year, ${usd(Math.min(u, r.full))} already paid on the earlier storm).`
          : `${usd(dmg)} of damage minus your ${usd(r.deductible)} deductible: you keep ${usd(r.kept)}.`,
        rows: [
          ...(u > 0 ? [['Left of your hurricane deductible this year', usd(r.deductible), r.deductible] as [string, string, number]] : []),
          [`Your ${rate} deductible on a ${usd(n(v, 'a'))} dwelling limit${u > 0 ? ', for the whole year' : ''}`, usd(r.full), r.full],
          ['Paid with the ordinary deductible instead', usd(r.paidFlat), r.paidFlat], ['Extra you carry because of the percentage', usd(r.extra), r.extra],
          ...F.hurricaneOptions.filter((o) => o < 1 && Math.abs(o * 100 - n(v, 'p')) > 1e-9).map((o) => [`With a ${pct(o, 0)} deductible (${usd(pctDeductible(n(v, 'a'), o))}), the insurer pays`, usd(hurricaneClaim({ coverageA: n(v, 'a'), share: o, flat: n(v, 'f'), damage: dmg, usedThisYear: u }).paid)] as [string, string])],
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
        label: 'Paid for the roof at its age, after the deductible (actual cash value)', value: usd(r.acv), sub: `A policy that pays full replacement would pay ${usd(r.rcv)} after the same deductible: ${usd(r.gap)} more.`,
        rows: [['Paid by a full replacement policy, after the deductible', usd(r.rcv), r.rcv], [`Value left in the roof: ${Math.round(n(v, 'age'))} of its ${Math.round(n(v, 'life'))} years used`, pct(r.left, 0)], ['Roof value at its age, before the deductible', usd(r.acvValue), r.acvValue]],
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
        rows: [['Claim payment after deductible', usd(r.paid), r.paid], ['Extra premium over the period', usd(r.cost), r.cost]],
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
      const m = n(v, 'm');
      const r = lossOfUse({ months: m, tempRent: n(v, 'tr'), rent: n(v, 'r'), extra: n(v, 'x'), limit: n(v, 'lim') });
      const perMonth = r.need / Math.max(1, m);
      return {
        label: 'Loss of use the policy would pay', value: usd(r.paid),
        sub: `It pays only the extra over your usual rent: ${usd(perMonth)} a month × ${formatNumber(m, 0)} ${m === 1 ? 'month' : 'months'} = ${usd(r.need)}, ${r.kept > 0 ? `capped at your ${usd(n(v, 'lim'))} limit` : `within your ${usd(n(v, 'lim'))} limit`}.`,
        rows: [[`Extra per month: ${usd(n(v, 'tr'))} housing + ${usd(n(v, 'x'))} other costs − ${usd(n(v, 'r'))} usual rent`, usd(perMonth), perMonth], [`Extra over ${formatNumber(m, 0)} ${m === 1 ? 'month' : 'months'}`, usd(r.need), r.need], ['Above the limit, left for you to pay', usd(r.kept), r.kept]],
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
