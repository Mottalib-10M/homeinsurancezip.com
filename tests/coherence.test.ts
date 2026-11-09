/**
 * Un chiffre, un calcul (audit et testeurs naïfs du 2026-11-09) : « from $1,445 in 2018 to $1,551 in 2022, +5.7% »
 * était faux (5,7 % = médiane des variations par ZIP, pas la variation de la médiane), et l'outil affichait +7,3 %
 * sous le même libellé. Ces tests verrouillent :
 *  1. la variation publiée (national, États, comtés) = variation des médianes affichées, comme l'outil la calcule ;
 *  2. claims per 100 et loss ratio « average » = moyenne des lignes annuelles du tableau ;
 *  3. toute phrase « from $A … to $B …, ±Z% » de toutes les pages est juste à l'arrondi près.
 */
import { describe, expect, it } from 'vitest';
import { GUIDES, STATE_PAGES } from '../src/lib/pages';
import { helpers } from '../src/lib/helpers';
import { HOME } from '../src/content/home';
import { N, STATES } from '../src/lib/data';
import { getTool } from '../src/lib/tool-specs';

const mean = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length;

describe('one figure per notion', () => {
  it('national change = change of the median premium (the lookup arithmetic)', () => {
    expect(N.chg).toBeCloseTo(N.prem[4] / N.prem[0] - 1, 4);
  });
  it('every state and county change = change of its medians', () => {
    for (const s of STATES) {
      expect(s.chg, s.name).toBeCloseTo(s.prem[4] / s.prem[0] - 1, 4);
      for (const c of s.topCounties) if (c.chg !== null) expect(c.chg, `${s.name} ${c.name}`).toBeCloseTo(c.prem / c.prem18 - 1, 4);
    }
  });
  it('claims per 100 and loss ratio averages = mean of the yearly rows shown', () => {
    expect(N.freq).toBeCloseTo(mean(N.freqY), 4);
    expect(N.lr).toBeCloseTo(mean(N.lrY), 4);
    for (const s of STATES) { expect(s.freq, s.name).toBeCloseTo(mean(s.freqY), 3); expect(s.lr, s.name).toBeCloseTo(mean(s.lrY), 3); }
  });
  it('state calculator shows the same change as the text', () => {
    const fl = STATES.find((s) => s.slug === 'florida')!;
    const out = getTool('state').run({ sx: 'florida', mine: 0 });
    const row = out.rows.find((r) => r[0].startsWith('Change from 2018 to 2022'))!;
    expect(row[1]).toBe(`-${(Math.abs(fl.chg) * 100).toFixed(1)}%`);
  });
});

describe('"from $A to $B, +Z%" sentences are right', () => {
  const h = helpers();
  const texts: Array<[string, string]> = [
    ['home', `${HOME.intro} ${HOME.resume} ${HOME.why(h)} ${HOME.faqs.map((f) => f.a).join(' ')}`],
    ...GUIDES.map((g) => [g.id, `${g.intro} ${g.resume} ${g.body(h)} ${g.faqs.map((f) => f.a).join(' ')}`] as [string, string]),
    ...STATE_PAGES.map((s) => [s.slug, `${s.intro} ${s.resume} ${s.body(h)} ${s.faqs.map((f) => f.a).join(' ')}`] as [string, string]),
  ];
  const num = (x: string) => Number(x.replace(/,/g, ''));
  // « from $1,445 in 2018 to $1,551 in 2022, +7.3% » / « from $1,412 to $1,465 per policy … +3.8% » (same sentence, change within 60 characters)
  const re = /from \$([\d,]+)(?: per [a-z ]+)?(?: in \d{4})? (?:per [a-z ]+ )?to \$([\d,]+)[^.%]{0,60}?([+-]\d+(?:\.\d)?)%/g;
  it('at least the national sentence is found', () => expect(texts.some(([, t]) => re.test(t))).toBe(true));
  for (const [id, t] of texts) {
    it(id, () => {
      for (const m of t.replace(/<[^>]+>/g, ' ').matchAll(re)) {
        const [a, b, z] = [num(m[1]), num(m[2]), Number(m[3])];
        expect(Math.abs((b / a - 1) * 100 - z), m[0]).toBeLessThan(0.15);
      }
    });
  }
});
