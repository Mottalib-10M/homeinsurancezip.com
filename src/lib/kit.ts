/**
 * Writing kit (CONTRIBUTING-PAGES.md): every figure written in a page comes from here, never typed by hand.
 *   K.P             params-2026.json (escrow, Florida rules, coinsurance default, sources)
 *   K.N             national.json (median ZIP code of the Treasury file, 2018-2022; BLS indexes)
 *   K.S(slug)       one state of states.json; K.SC(code) the same by postal code
 *   K.tool(kind,a)  runs a calculator of tool-specs.ts and returns its result card
 *   K.today(x)      a 2022 premium carried to the latest month of the BLS homeowner's insurance index
 *   formats         K.usd, K.pct, K.num, K.dec, K.day (2026-04-30 -> April 30, 2026), K.month (2026-09 -> September 2026)
 */
import P from '../data/params-2026.json';
import { N, STATES, stateBySlug, stateByCode, rank, hasNonren, idxGrowth } from './data';
import { usd, pct, getTool, longDate, monthName, toToday } from './tool-specs';
import { formatNumber, formatDecimal } from './format';
import * as E from './engine/home';
import type { V } from './tool-types';

function tool(kind: string, args: V = {}) {
  const spec = getTool(kind);
  const v: V = { ...Object.fromEntries(spec.inputs.map((i) => [i.id, i.def])), ...args };
  return spec.run(v);
}
/** "1.24%" for a rate, "not reported" for null. */
const rate = (x: number | null | undefined, d = 2) => (x === null || x === undefined ? 'not reported' : pct(x, d));
export const KIT = {
  P, N, STATES, S: stateBySlug, SC: stateByCode, rank, hasNonren, idxGrowth, tool, E, today: toToday,
  usd, pct, rate, num: (x: number) => formatNumber(x, 0), dec: (x: number, d = 1) => formatDecimal(x, d), day: longDate, month: monthName,
  /** "+5.7%" / "-12.5%". */
  sgn: (x: number, d = 1) => `${x >= 0 ? '+' : '-'}${pct(Math.abs(x), d)}`,
  ppiMonth: monthName(N.index.ppi.last.ym),
};
export type Kit = typeof KIT;
