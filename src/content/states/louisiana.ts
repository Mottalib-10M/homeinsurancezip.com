import { defineState } from '../../lib/page-types';
import { ctx } from './_ctx';

const { K, N, st, c, regLink, planLink, hi, lo, yr } = ctx('louisiana');
const ebr = c('East Baton Rouge Parish'), cad = c('Caddo Parish'), jef = c('Jefferson Parish'), orl = c('Orleans Parish');

export default defineState({
  slug: 'louisiana',
  title: 'Homeowners Insurance Louisiana 2026: After Laura and Ida',
  description: `Homeowners insurance in Louisiana 2026: premium per policy by ZIP code and parish, 2018 to 2022, the Laura and Ida years, nonrenewals and Louisiana Citizens.`,
  intro: `Louisiana homeowners insurers paid ${K.dec(st.freqY[3] * 100, 1)} claims per 100 policies in ${yr(3)}, the year of Hurricane Ida, and ${K.pct(st.lrY[3], 0)} of premium in losses.`,
  resume: `Louisiana had the highest claim rate in the Treasury file, ${K.dec(st.freq * 100, 1)} paid claims per 100 policies a year in the median ZIP code, ranked ${st.rankFreq} of 51. Two hurricane years drove it. In ${yr(2)} Laura and Delta struck the southwest, and paid claims rose to ${K.dec(st.freqY[2] * 100, 1)} per 100 policies; in ${yr(3)} Ida came ashore at Port Fourchon, and the rate reached ${K.dec(st.freqY[3] * 100, 1)} with a paid loss ratio of ${K.pct(st.lrY[3], 0)}, the highest of any state in any year of the file. The median premium per policy was ${K.usd(st.prem[4])} in ${yr(4)}, ranked ${st.rankPrem} of 51. Orleans Parish paid ${K.usd(orl.prem)} and Jefferson Parish ${K.usd(jef.prem)}. Nonrenewals rose from ${K.rate(st.nonren[2])} in ${yr(2)} to ${K.rate(st.nonren[4])} in ${yr(4)}, and several insurers failed. Many homes moved to Louisiana Citizens, which is outside the file. The data stop in ${yr(4)}.`,
  body: (h) => `
<h2>Two storms in two years</h2>
<p>Before ${yr(2)}, Louisiana's paid claims ran near the national rate, ${K.dec(st.freqY[0] * 100, 1)} per 100 policies in ${yr(0)}. Laura, a category 4 hurricane, hit Lake Charles in August ${yr(2)}, and Delta followed the same path six weeks later. Ida, also category 4, struck southeast Louisiana in August ${yr(3)}, with wind damage across the New Orleans area and the parishes to the south and west. The paid loss ratio rose from ${K.pct(st.lrY[1], 0)} in ${yr(1)} to ${K.pct(st.lrY[2], 0)} and ${K.pct(st.lrY[3], 0)}. Insurers that could not absorb those losses, or the reinsurance costs that followed, became insolvent or left.</p>
<h2>New Orleans and Baton Rouge</h2>
<p>Orleans Parish's ${orl.zips} ZIP codes had a median of ${K.usd(orl.prem)} in ${yr(4)}, the highest of the large parishes; Jefferson Parish paid ${K.usd(jef.prem)}. The dearest ZIP codes in the state were ${hi[0].zip}, the Warehouse District and Irish Channel, at ${K.usd(hi[0].prem)}, and ${hi[1].zip}, the Marigny and Treme, at ${K.usd(hi[1].prem)}. East Baton Rouge Parish paid ${K.usd(ebr.prem)}, and Caddo Parish, around Shreveport in the north, ${K.usd(cad.prem)}, after a rise of ${K.sgn(cad.chg ?? 0)}. The cheapest ZIP codes were in the north: ${lo[0].zip} in ${lo[0].county} at ${K.usd(lo[0].prem)}.</p>
${h.mini('hurricane', { t: 'A Louisiana hurricane claim with a 5 percent deductible', p: ['a', 'p', 'd'], d: { a: 300000, p: 5, d: 40000 } })}
<h2>Renewals after the storms</h2>
<p>The nonrenewal rate in the median ZIP code went from ${K.rate(st.nonren[2])} in ${yr(2)} to ${K.rate(st.nonren[3])} in ${yr(3)} and ${K.rate(st.nonren[4])} in ${yr(4)}. In ${K.pct(st.highNonren, 0)} of Louisiana ZIP codes the ${yr(4)} rate was above the line of the top tenth nationally. Cancellations for nonpayment ran at ${K.rate(st.npc)}, among the higher rates, as premiums climbed. Policies ended by an insolvent insurer are not counted as nonrenewals, so the true loss of coverage in those years was larger.</p>
<h2>Louisiana Citizens</h2>
<p>The ${planLink(0)} writes wind and hail dwelling forms and homeowners forms for homes that cannot find a private insurer, and its book grew after the storms. Its policies are not in the Treasury file, so the private median describes the homes private insurers kept. The ${regLink()} regulates rates and runs programs to fortify roofs. A percentage hurricane deductible is common on Louisiana policies; the ${h.a('hurricane-deductible', 'hurricane deductible calculator')} shows what it costs on a claim.</p>
`,
  faqs: [
    { q: 'Why is homeowners insurance so expensive in New Orleans?', a: `Hurricane losses and their aftermath. The median ZIP code of Orleans Parish paid ${K.usd(orl.prem)} per policy in ${yr(4)}, after Laura in ${yr(2)} and Ida in ${yr(3)} pushed Louisiana's paid loss ratio to ${K.pct(st.lrY[3], 0)}. Several insurers then failed or left, and reinsurance became more expensive for those that stayed.` },
    { q: 'How many Louisiana homeowners were not renewed after Hurricane Ida?', a: `The Treasury file gives rates, not counts: the median Louisiana ZIP code saw ${K.rate(st.nonren[3])} of policies not renewed in ${yr(3)} and ${K.rate(st.nonren[4])} in ${yr(4)}, up from ${K.rate(st.nonren[2])} in ${yr(2)}. Policies ended by insolvent insurers are not included, so the real loss of coverage was larger.` },
    { q: 'Is Louisiana Citizens in these premium figures?', a: `No. Louisiana Citizens Property Insurance Corporation is the state's residual market plan, and the Treasury data call excluded such plans. Since many costly coastal homes moved to Citizens after the storms, the private median may understate what Louisiana homeowners as a whole pay.` },
  ],
  related: ['hurricane-deductible', 'fair-plan-insurance', 'state:mississippi', 'state:texas'],
});
