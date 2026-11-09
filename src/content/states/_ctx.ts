/** Lookups shared by the state files (code only, no shared wording: each state writes its own text, RECETTE §6.2). */
import { KIT as K } from '../../lib/kit';
import REG from '../../data/regulators.json';

type Plan = { name: string; url: string; writes: string };
const R = REG as unknown as Record<string, { regulator: string; url: string; plans: Plan[] }>;

export function ctx(slug: string) {
  const st = K.S(slug);
  const reg = R[st.code];
  /** A county of the state's eight largest by ZIP count ("Harris County"); throws if absent so a typo fails the build. */
  const c = (name: string) => { const x = st.topCounties.find((y) => y.name === name); if (!x) throw new Error(`${slug}: no county ${name}`); return x; };
  /** Link to the state regulator or to a plan, by index. */
  const regLink = (text = reg.regulator) => `<a href="${reg.url}" target="_blank" rel="nofollow noopener noreferrer">${text}</a>`;
  const planLink = (i = 0, text?: string) => { const p = reg.plans[i]; return p.url ? `<a href="${p.url}" target="_blank" rel="nofollow noopener noreferrer">${text ?? p.name}</a>` : (text ?? p.name); };
  const peak = (arr: number[]) => arr.indexOf(Math.max(...arr));
  return { K, N: K.N, st, reg, c, regLink, planLink, hi: st.hi, lo: st.lo, yr: (i: number) => K.N.years[i], peak };
}
