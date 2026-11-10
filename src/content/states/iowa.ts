import { defineState } from '../../lib/page-types';
import { ctx } from './_ctx';

const { K, N, st, c, regLink, planLink, hi, lo, yr } = ctx('iowa');
const polk = c('Polk County'), linn = c('Linn County'), scott = c('Scott County'), pott = c('Pottawattamie County');

export default defineState({
  slug: 'iowa',
  title: 'Homeowners Insurance Iowa 2026: Derecho Year and Premiums',
  description: `Homeowners insurance in Iowa 2026: premium per policy by ZIP code and county, 2018 to 2022, the 2020 derecho, the bad 2022 loss year and the FAIR Plan.`,
  intro: `Iowa's typical ZIP code paid ${K.usd(st.prem[4])} per homeowners insurance policy in ${yr(4)}, after a rise of ${K.sgn(st.chg)} after inflation, ranked ${st.rankChg} of the 50 states and DC.`,
  resume: `Iowa's typical homeowners premium per policy was ${K.usd(st.prem[4])} in ${yr(4)} in the Treasury file, a little above the national ${K.usd(N.prem[4])}, after a rise of ${K.sgn(st.chg)} after inflation from ${yr(0)}, ranked ${st.rankChg} of the 50 states and DC. Two storm years shaped it. In August ${yr(2)} a derecho crossed the state and struck Cedar Rapids hardest; Iowa's paid loss ratio rose from ${K.pct(st.lrY[1], 0)} to ${K.pct(st.lrY[2], 0)}. In ${yr(4)} hail and wind pushed paid claims to ${K.dec(st.freqY[4] * 100, 1)} per 100 policies and the loss ratio to ${K.pct(st.lrY[4], 0)}, the highest of the five years. Polk County, Des Moines, paid ${K.usd(polk.prem)}; Pottawattamie County, across the river from Omaha, ${K.usd(pott.prem)}. Nonrenewals were above the national typical figure, ${K.rate(st.nonren[4])} in ${yr(4)}. The Iowa FAIR Plan writes homes private insurers decline. The data stop in ${yr(4)}, and the national price index rose fast afterwards.`,
  body: (h) => `
<h2>Cedar Rapids and the derecho</h2>
<p>The storm of August 10, ${yr(2)} flattened crops, trees and roofs across a band of central and eastern Iowa. Linn County, around Cedar Rapids, had ${linn.zips} ZIP codes in the file, a typical premium of ${K.usd(linn.prem)} in ${yr(4)} and a rise of ${K.sgn(linn.chg ?? 0)} after inflation. Curiously, ZIP ${lo[0].zip}, in the heart of Cedar Rapids, had the lowest premium per policy in the state, ${K.usd(lo[0].prem)}, a reminder that the premium per policy follows the houses of an area as much as its storms. Statewide, paid claims in ${yr(2)} were ${K.dec(st.freqY[2] * 100, 1)} per 100 policies, up from ${K.dec(st.freqY[1] * 100, 1)}.</p>
<h2>A worse year in ${yr(4)}</h2>
<p>The figures for ${yr(4)} are higher still: ${K.dec(st.freqY[4] * 100, 1)} paid claims per 100 policies and a paid loss ratio of ${K.pct(st.lrY[4], 0)}, against ${K.pct(st.lrY[0], 0)} in ${yr(0)}. A run of severe storms through the year spread claims across most of the state. Ratios like that are followed by rate filings, so premiums after ${yr(4)}, outside this file, rose faster than the ${K.sgn(st.chg)} shown here. The ${h.a('why-is-home-insurance-going-up', 'page on rising premiums')} carries a ${yr(4)} premium to ${K.ppiMonth} with the BLS index.</p>
<p>An Iowa hail claim on an older roof: the ${h.a('roof-claim-actual-cash-value', 'roof claim calculator')} runs it with your own figures.</p>
<h2>Des Moines, the Quad Cities and the lakes</h2>
<p>Polk County, with ${polk.zips} ZIP codes, rose ${K.sgn(polk.chg ?? 0)} to ${K.usd(polk.prem)}. Scott County, Davenport, paid ${K.usd(scott.prem)}, and Pottawattamie County ${K.usd(pott.prem)}, the highest of the large counties. The dearest ZIP codes were ${hi[0].zip} in ${hi[0].county}, the Okoboji lakes, at ${K.usd(hi[0].prem)}, and ${hi[1].zip} in ${hi[1].county} at ${K.usd(hi[1].prem)}. ZIP ${lo[1].zip} in ${lo[1].county}, in the northeast corner, paid ${K.usd(lo[1].prem)}.</p>
<h3>Renewals and the FAIR Plan</h3>
<p>Iowa's nonrenewal rate was ${K.rate(st.nonren[0])} in ${yr(0)} and ${K.rate(st.nonren[4])} in ${yr(4)}, ranked ${st.rankNonren} of the 50 states and DC. The ${planLink(0)} writes a dwelling fire policy and an HO-8 form for homes that cannot find a private insurer. The ${regLink()} reviews complaints. Iowa has many county mutual insurers; some small ones may not have reported in the data call, which matters most in rural ZIP codes.</p>
`,
  faqs: [
    { q: 'How did the 2020 derecho affect Iowa home insurance?', a: `In ${yr(2)}, Iowa's paid claims rose to ${K.dec(st.freqY[2] * 100, 1)} per 100 policies and the paid loss ratio to ${K.pct(st.lrY[2], 0)}, from ${K.pct(st.lrY[1], 0)} the year before, in the Treasury file. Cedar Rapids was hit hardest. Losses of that size feed into the rates insurers file in the following years.` },
    { q: 'How much is homeowners insurance in Des Moines?', a: `The typical ZIP code of Polk County, which includes Des Moines, paid ${K.usd(polk.prem)} per policy in ${yr(4)}, after a rise of ${K.sgn(polk.chg ?? 0)} after inflation from ${yr(0)}. At ${K.ppiMonth} prices that is about ${K.usd(K.today(polk.prem))}. The lookup gives each ZIP code.` },
    { q: 'Why was 2022 a bad year for Iowa homeowners insurers?', a: `Repeated hail and wind storms. The typical Iowa ZIP code had ${K.dec(st.freqY[4] * 100, 1)} paid claims per 100 policies in ${yr(4)}, the most of the five years, and insurers paid out ${K.pct(st.lrY[4], 0)} of premium in claims. Rate increases at later renewals followed such results.` },
  ],
  related: ['roof-claim-actual-cash-value', 'why-is-home-insurance-going-up', 'state:nebraska', 'state:illinois'],
});
