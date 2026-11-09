/**
 * The site's data asset, built by scripts/build-data.py from:
 *  - the Treasury FIO workbook "Supporting Underlying Metrics ... 2018-2022" (ZIP code x year, January 2025);
 *  - the Census Bureau 2020 ZCTA to county relationship file (ZIP code -> county and state);
 *  - BLS series: PPI homeowner's insurance, CPI-U all items, CPI tenants' and household insurance.
 * Every state or county figure is a MEDIAN ACROSS ZIP CODES (each ZIP counts once), never a policy-weighted average.
 */
import NAT from '../data/national.json';
import STATES_RAW from '../data/states.json';

/** Five values, 2018 to 2022. */
export type Y5 = [number, number, number, number, number];
export interface ZipRef { zip: string; county: string; prem: number; chg: number | null; nonren: number | null }
export interface CountyRef { name: string; zips: number; prem: number; prem18: number; chg: number | null; nonren: number | null; freq: number; sev: number }
export interface StateRow {
  code: string; name: string; slug: string; zips: number; counties: number;
  prem: Y5; p10: number; p90: number; chg: number;
  /** null = not reported (Texas). */
  nonren: Array<number | null>; freq: number; sev: number; lr: number; lrY: Y5; freqY: Y5; npc: number | null; oc: number | null;
  hi: ZipRef[]; lo: ZipRef[]; topCounties: CountyRef[]; highNonren: number;
  rankPrem: number; rankNonren: number; rankChg: number; rankFreq: number; rankSev: number;
}
export interface Idx { annual: Record<string, number>; last: { ym: string; v: number } }

export const N = NAT as unknown as Omit<typeof NAT, 'index'> & { index: { ppi: Idx; cpi: Idx; tenants: Idx } };
export const STATES = STATES_RAW as unknown as StateRow[];
export const stateBySlug = (slug: string) => { const s = STATES.find((x) => x.slug === slug); if (!s) throw new Error(`Unknown state ${slug}`); return s; };
export const stateByCode = (code: string) => { const s = STATES.find((x) => x.code === code); if (!s) throw new Error(`Unknown state ${code}`); return s; };
/** States ranked on a numeric field (highest first); a null value goes last. */
export const rank = (f: (s: StateRow) => number | null) => [...STATES].sort((a, b) => (f(b) ?? -1) - (f(a) ?? -1));
/** Nonrenewals reported for this state (Texas: no). */
export const hasNonren = (s: StateRow) => s.nonren[4] !== null;
/** Growth of an index between two years (annual averages), or from a year to its latest month. */
export const idxGrowth = (i: Idx, from: number, to?: number) => (to ? i.annual[String(to)] : i.last.v) / i.annual[String(from)] - 1;
