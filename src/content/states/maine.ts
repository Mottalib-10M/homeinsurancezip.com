import { defineState } from '../../lib/page-types';
import { ctx } from './_ctx';

const { K, N, st, c, regLink, hi, lo, yr } = ctx('maine');
const pen = c('Penobscot County'), aro = c('Aroostook County'), han = c('Hancock County'), cum = c('Cumberland County');

export default defineState({
  slug: 'maine',
  title: 'Homeowners Insurance Maine 2026: Low Losses, Coastal Gap',
  description: `Homeowners insurance in Maine 2026: premium per policy by ZIP code and county, 2018 to 2022, the lowest loss ratios in the US, the coast and Aroostook.`,
  intro: `Maine homeowners insurers paid out only ${K.pct(st.lrY[4], 0)} of premium in claims in ${yr(4)}; the median ZIP code paid ${K.usd(st.prem[4])} per policy.`,
  resume: `Maine is among the cheapest and calmest states for homeowners insurance in the Treasury file. The median ZIP code paid ${K.usd(st.prem[4])} per policy in ${yr(4)}, ranked ${st.rankPrem} of 51 and well below the national ${K.usd(N.prem[4])}, after a rise of ${K.sgn(st.chg)} after inflation. Insurers paid few claims, ${K.dec(st.freq * 100, 1)} per 100 policies a year, ranked ${st.rankFreq}, and small ones, ${K.usd(st.sev)} on average, ranked ${st.rankSev}. As a result the paid loss ratio stayed between ${K.pct(Math.min(...st.lrY), 0)} and ${K.pct(Math.max(...st.lrY), 0)}, the lowest range in the country. Nonrenewals fell from ${K.rate(st.nonren[1])} in ${yr(1)} to ${K.rate(st.nonren[4])} in ${yr(4)}. The coast is the exception: Hancock County, with Mount Desert Island, had a median of ${K.usd(han.prem)}, well above the state, and its ZIP ${hi[0].zip} paid ${K.usd(hi[0].prem)}. Aroostook County in the north was among the cheapest. Maine has no FAIR plan for homes. The data stop in ${yr(4)}.`,
  body: (h) => `
<h2>Inland Maine and the County</h2>
<p>Penobscot County, around Bangor, had ${pen.zips} ZIP codes in the file and a median of ${K.usd(pen.prem)} in ${yr(4)}. Aroostook County, "the County" to Mainers, paid ${K.usd(aro.prem)}, and its ZIP codes ${lo[0].zip} and ${lo[1].zip} were the cheapest in the state at ${K.usd(lo[0].prem)} and ${K.usd(lo[1].prem)}. Many rural Maine ZIP codes have few insurers, and the file only lists those with ten or more, so the most remote towns may be missing.</p>
<h2>The coast and the islands</h2>
<p>Cumberland County, around Portland, had a median of ${K.usd(cum.prem)}, after a rise of ${K.sgn(cum.chg ?? 0)} after inflation. Hancock County paid ${K.usd(han.prem)}; its ZIP ${hi[0].zip} and ${hi[1].zip} paid ${K.usd(hi[0].prem)} and ${K.usd(hi[1].prem)}, with large seasonal houses on the shore. Coastal storms and nor'easters bring wind and ice damage, and seasonal homes that stand empty in winter carry the risk of frozen pipes, which many policies limit when a house is unheated.</p>
${h.mini('claim', { t: 'A small ice dam claim in Maine', p: ['dmg', 'ded', 'pr'], d: { dmg: 3000, ded: 1000, pr: 1300 } })}
<h2>Why losses were so low</h2>
<p>Maine has little hail, rare hurricanes and few wildfires. Paid claims per 100 policies fell from ${K.dec(st.freqY[0] * 100, 1)} in ${yr(0)} to ${K.dec(st.freqY[4] * 100, 1)} in ${yr(4)}, and the paid loss ratio from ${K.pct(st.lrY[0], 0)} to ${K.pct(st.lrY[4], 0)}. Winter is the main source of claims: ice dams that push water under the shingles, pipes that freeze, and roofs that fail under heavy snow. Ice dam damage inside the house is usually covered; the ice dam itself, and gradual leaks, often are not. With claims this small, filing one near the deductible is rarely worth it, as the calculator above shows.</p>
<h2>Renewals and the regulator</h2>
<p>The median nonrenewal rate was ${K.rate(st.nonren[1])} in ${yr(1)}, among the higher rates that year, and fell to ${K.rate(st.nonren[4])} by ${yr(4)}, ranked ${st.rankNonren} of 51. Maine has no residual market plan for homes listed in the Treasury report. The ${regLink()} handles complaints and publishes consumer guides. Oil heat is common in Maine; some insurers ask about the age of the tank, since a leak can be costly and is often excluded.</p>
`,
  faqs: [
    { q: 'How much is homeowners insurance in Portland, Maine?', a: `The median ZIP code of Cumberland County, which includes Portland, paid ${K.usd(cum.prem)} per policy in ${yr(4)} in the Treasury file, up ${K.sgn(cum.chg ?? 0)} after inflation from ${yr(0)}. At ${K.ppiMonth} prices that is about ${K.usd(K.today(cum.prem))}. Waterfront and island ZIP codes paid noticeably more.` },
    { q: 'Does homeowners insurance cover ice dams in Maine?', a: `Usually the water damage inside the house is covered, such as stained ceilings or wet insulation, subject to the deductible. Removing the ice dam itself and repairing gradual leaks or worn roofing are often not. Read the roof and water sections of your policy, and ask the insurer before work starts.` },
    { q: 'Why is home insurance cheap in Maine?', a: `Losses are low. Maine insurers paid out between ${K.pct(Math.min(...st.lrY), 0)} and ${K.pct(Math.max(...st.lrY), 0)} of premium in claims each year from ${yr(0)} to ${yr(4)}, the lowest range of any state, with few hailstorms and rare hurricanes. Coastal and island homes are the exception and pay several times the state median.` },
  ],
  related: ['should-i-file-a-home-insurance-claim', 'state:new-hampshire', 'state:vermont', 'homeowners-insurance-by-state'],
});
