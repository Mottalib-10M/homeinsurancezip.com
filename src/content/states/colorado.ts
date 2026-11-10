import { defineState } from '../../lib/page-types';
import { ctx } from './_ctx';

const { K, N, st, c, regLink, hi, lo, yr } = ctx('colorado');
const ep = c('El Paso County'), weld = c('Weld County'), jeff = c('Jefferson County'), den = c('Denver County');

export default defineState({
  slug: 'colorado',
  title: 'Homeowners Insurance Colorado 2026: Hail Belt Premiums',
  description: `Homeowners insurance in Colorado 2026: premium per policy by ZIP code and county, 2018 to 2022, the second highest state median, and Front Range hail.`,
  intro: `Colorado's typical ZIP code paid ${K.usd(st.prem[4])} per homeowners insurance policy in ${yr(4)}, second only to Florida, after a rise of ${K.sgn(st.chg)} after inflation.`,
  resume: `Colorado ranks second in the Treasury file for homeowners premiums: the typical ZIP code paid ${K.usd(st.prem[4])} per policy in ${yr(4)}, up from ${K.usd(st.prem[0])} in ${yr(0)}, a rise of ${K.sgn(st.chg)} after inflation, ranked ${st.rankChg} of the 50 states and DC. The Front Range counties lead. Jefferson County's typical figure was ${K.usd(jeff.prem)}, Denver's ${K.usd(den.prem)} and El Paso's, around Colorado Springs, ${K.usd(ep.prem)}, all up 18 percent or more. Hail is the main reason: large hailstorms over the metro area produce roof and car claims across whole suburbs. Mountain resort ZIP codes are dearer still, led by ${hi[0].zip} in ${hi[0].county} at ${K.usd(hi[0].prem)}, where house values and wildfire weigh. Oddly, Colorado's paid loss ratio fell to ${K.pct(st.lrY[4], 0)} in ${yr(4)}: premiums rose faster than claims. Nonrenewals reached ${K.rate(st.nonren[4])}. Colorado had no FAIR plan in the report. The data stop in ${yr(4)}.`,
  body: (h) => `
<h2>Front Range hail</h2>
<p>The metro counties carry Colorado's premium. Jefferson County paid ${K.usd(jeff.prem)} in ${yr(4)} after a rise of ${K.sgn(jeff.chg ?? 0)}, Denver County ${K.usd(den.prem)} after ${K.sgn(den.chg ?? 0)}, and Weld County to the north ${K.usd(weld.prem)} after ${K.sgn(weld.chg ?? 0)}. Paid claims per 100 policies averaged ${K.dec(st.freq * 100, 1)}, ranked ${st.rankFreq} of the 50 states and DC, with ${yr(1)} the busiest year at ${K.dec(st.freqY[1] * 100, 1)}. Many Colorado policies carry a percentage wind and hail deductible, and some insurers give a discount for impact-resistant shingles rated Class 4.</p>
<p>A 1 percent hail deductible on a Denver house: the ${h.a('hurricane-deductible', 'hurricane deductible calculator')} runs it with your own figures.</p>
<h2>Mountains and the Western Slope</h2>
<p>Colorado's range is one of the widest in the country: the cheapest tenth of ZIP codes paid under ${K.usd(st.p10)} and the dearest tenth over ${K.usd(st.p90)}. ZIP ${hi[0].zip} and ${hi[1].zip}, both in ${hi[0].county}, the county of Aspen, paid ${K.usd(hi[0].prem)} and ${K.usd(hi[1].prem)}. Mesa County on the Western Slope had the cheapest ZIP codes, ${lo[0].zip} at ${K.usd(lo[0].prem)} and ${lo[1].zip} at ${K.usd(lo[1].prem)}. Fire in the foothills and the mountains, where homes border forest, is the other risk; it shows less in the five-year claim figures than in insurers' underwriting rules.</p>
<h2>Premiums ran ahead of losses</h2>
<p>The paid loss ratio of the typical ZIP code was ${K.pct(st.lrY[1], 0)} in ${yr(1)} and fell to ${K.pct(st.lrY[3], 0)} and ${K.pct(st.lrY[4], 0)} in ${yr(3)} and ${yr(4)}, among the lowest in the country, while premiums rose. Paid figures lag the event, and a typical figure of ZIP codes gives little weight to one fire, such as the Marshall Fire of December ${yr(3)}, the most destructive in the state's history, which burned in a handful of ZIP codes. Use the ${h.a('how-much-dwelling-coverage', 'dwelling coverage calculator')} to check that a limit keeps up with Front Range rebuilding costs.</p>
<h3>Renewals and the regulator</h3>
<p>The nonrenewal rate rose from ${K.rate(st.nonren[2])} in ${yr(2)} to ${K.rate(st.nonren[4])} in ${yr(4)}. The ${regLink()} handles complaints and publishes consumer guides on hail and wildfire claims. Colorado had no residual market plan for homes when the Treasury report was written; the legislature created a FAIR plan in 2023, which began writing policies after the period of these data.</p>
`,
  faqs: [
    { q: 'Why is homeowners insurance so expensive in Colorado?', a: `Hail along the Front Range and wildfire in the mountains. The Treasury file ranks Colorado second for the typical premium per policy in ${yr(4)}, ${K.usd(st.prem[4])}, after a rise of ${K.sgn(st.chg)} after inflation since ${yr(0)}. Large hailstorms damage roofs across whole suburbs in a single afternoon, and rebuilding costs rose fast.` },
    { q: 'What does home insurance cost in Colorado Springs?', a: `The typical ZIP code of El Paso County, which includes Colorado Springs, paid ${K.usd(ep.prem)} per policy in ${yr(4)}, after a rise of ${K.sgn(ep.chg ?? 0)} after inflation from ${yr(0)}. At ${K.ppiMonth} prices that is about ${K.usd(K.today(ep.prem))}. Enter a ZIP code in the lookup for one neighborhood.` },
    { q: 'Does Colorado have a FAIR plan now?', a: `Yes. Colorado created a FAIR plan by law in 2023, after the period of the Treasury data, for homes that cannot find private coverage, mostly in wildfire areas. It was not yet listed in the Treasury report's appendix. The Colorado Division of Insurance publishes its eligibility rules and coverage.` },
  ],
  related: ['roof-claim-actual-cash-value', 'hurricane-deductible', 'why-is-home-insurance-going-up', 'state:nebraska'],
});
