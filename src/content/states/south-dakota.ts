import { defineState } from '../../lib/page-types';
import { ctx } from './_ctx';

const { K, N, st, c, regLink, hi, lo, yr } = ctx('south-dakota');
const min = c('Minnehaha County'), lin = c('Lincoln County'), bro = c('Brookings County'), brown = c('Brown County');

export default defineState({
  slug: 'south-dakota',
  title: 'Homeowners Insurance South Dakota 2026: The 2022 Storm Year',
  description: `Homeowners insurance in South Dakota 2026: premium per policy by ZIP code and county, 2018 to 2022, Sioux Falls, the 2022 derecho, a fast rise, small claims.`,
  intro: `South Dakota's median ZIP code premium rose ${K.sgn(st.chg)} after inflation from ${yr(0)} to ${yr(4)}, ranked ${st.rankChg} of 51, to ${K.usd(st.prem[4])}.`,
  resume: `South Dakota had one of the fastest premium rises in the Treasury file: the median ZIP code went from ${K.usd(st.prem[0])} per homeowners policy in ${yr(0)} to ${K.usd(st.prem[4])} in ${yr(4)}, ${K.sgn(st.chg)} after inflation, ranked ${st.rankChg} of 51. Minnehaha County, Sioux Falls, rose ${K.sgn(min.chg ?? 0)} to ${K.usd(min.prem)}. Then came ${yr(4)}: a derecho in May and other severe storms pushed paid claims to ${K.dec(st.freqY[4] * 100, 1)} per 100 policies, from ${K.dec(st.freqY[3] * 100, 1)} the year before, and the paid loss ratio to ${K.pct(st.lrY[4], 0)}, from ${K.pct(st.lrY[3], 0)}. Claims are small here, ${K.usd(st.sev)} on average, ranked ${st.rankSev} of 51: roofs and siding rather than whole houses. Nonrenewals rose to ${K.rate(st.nonren[4])} in ${yr(4)}. Only ${st.zips} ZIP codes reach the file's threshold. South Dakota has no FAIR plan for homes. Premiums after ${yr(4)}, outside the file, reflected the storm year. The data stop in ${yr(4)}.`,
  body: (h) => `
<h2>Sioux Falls and the east</h2>
<p>Minnehaha County had ${min.zips} ZIP codes in the file and a median of ${K.usd(min.prem)} in ${yr(4)}; Lincoln County, the southern suburbs of Sioux Falls, paid ${K.usd(lin.prem)} after a rise of ${K.sgn(lin.chg ?? 0)}. Brookings County paid ${K.usd(bro.prem)} and Brown County, Aberdeen, ${K.usd(brown.prem)}, with its ZIP ${lo[0].zip} among the cheapest in the state at ${K.usd(lo[0].prem)}. Every large county rose by close to a fifth after inflation. Growth in Sioux Falls and rising construction costs likely lifted dwelling limits, and storm claims pushed rates up as well. A house insured at a limit set five years ago may now be below what it costs to rebuild.</p>
<h2>The derecho of May ${yr(4)}</h2>
<p>On May 12, ${yr(4)}, a derecho crossed eastern South Dakota with winds near 100 miles an hour, damaging roofs, siding and trees across towns such as Castlewood and Madison and the Sioux Falls area. Paid claims for the year reached ${K.dec(st.freqY[4] * 100, 1)} per 100 policies and the paid loss ratio ${K.pct(st.lrY[4], 0)}, after ${st.lrY.slice(0, 4).map((x) => K.pct(x, 0)).join(', ')} in the four years before. A ratio that high is followed by rate filings, deductible increases and stricter roof rules.</p>
${h.mini('roof', { t: 'A South Dakota wind claim on a 14-year roof', p: ['c', 'age', 'd'], d: { c: 15000, age: 14, d: 2000 } })}
<h2>The Black Hills</h2>
<p>The dearest ZIP codes were ${hi[0].zip} in ${hi[0].county}, in the northern Black Hills near Deadwood, at ${K.usd(hi[0].prem)}, and ${hi[1].zip} in ${hi[1].county}, in the southeast, at ${K.usd(hi[1].prem)}. The Black Hills add wildfire to the Plains storm risk. The state's range is narrow, from under ${K.usd(st.p10)} for the cheapest tenth of ZIP codes to over ${K.usd(st.p90)} for the dearest.</p>
<h2>Renewals and the regulator</h2>
<p>The median nonrenewal rate went ${st.nonren.map((x) => K.rate(x)).join(', ')} from ${yr(0)} to ${yr(4)}. South Dakota has no residual market plan for homes listed in the Treasury report. The ${regLink()} handles complaints. Many policies here pay an older roof at actual cash value; the ${h.a('roof-claim-actual-cash-value', 'roof claim page')} shows how much that reduces a payment.</p>
`,
  faqs: [
    { q: 'Why did South Dakota home insurance go up so fast?', a: `The median ZIP code rose ${K.sgn(st.chg)} after inflation from ${yr(0)} to ${yr(4)}, one of the fastest rises in the Treasury file. Rising construction costs lifted dwelling limits, and storm claims climbed, peaking in ${yr(4)} after the May derecho, when insurers paid out ${K.pct(st.lrY[4], 0)} of premium in claims.` },
    { q: 'How much is homeowners insurance in Sioux Falls?', a: `The median ZIP code of Minnehaha County, which includes most of Sioux Falls, paid ${K.usd(min.prem)} per policy in ${yr(4)}, after a rise of ${K.sgn(min.chg ?? 0)} after inflation from ${yr(0)}. At ${K.ppiMonth} prices that is about ${K.usd(K.today(min.prem))}. Roof age and wind deductibles change quotes a lot.` },
    { q: 'Did homeowners insurance cover the 2022 South Dakota derecho?', a: `Yes. Wind damage to roofs, siding, windows and trees on the house is covered by homeowners policies, subject to the deductible, which may be a separate wind and hail percentage. Paid claims in the median South Dakota ZIP code reached ${K.dec(st.freqY[4] * 100, 1)} per 100 policies that year.` },
  ],
  related: ['roof-claim-actual-cash-value', 'why-is-home-insurance-going-up', 'state:north-dakota', 'state:nebraska'],
});
