import { defineState } from '../../lib/page-types';
import { ctx } from './_ctx';

const { K, N, st, c, regLink, planLink, hi, lo, yr } = ctx('oregon');
const lane = c('Lane County'), mult = c('Multnomah County'), clack = c('Clackamas County'), mar = c('Marion County');

export default defineState({
  slug: 'oregon',
  title: 'Homeowners Insurance Oregon 2026: Low Premiums, Big Claims',
  description: `Homeowners insurance in Oregon 2026: premium per policy by ZIP code and county, 2018 to 2022, Portland, Eugene, Salem, the 2020 fires and the FAIR Plan.`,
  intro: `Oregon's typical ZIP code paid ${K.usd(st.prem[4])} per homeowners insurance policy in ${yr(4)}, among the lowest, but its average claim, ${K.usd(st.sev)}, ranked ${st.rankSev} of the 50 states and DC.`,
  resume: `Oregon homeowners paid ${K.usd(st.prem[4])} per policy in the typical ZIP code in ${yr(4)} in the Treasury file, ranked ${st.rankPrem} of the 50 states and DC and well below the national ${K.usd(N.prem[4])}. But the figure rose ${K.sgn(st.chg)} after inflation from ${yr(0)}, ranked ${st.rankChg} for growth, and the shape of Oregon's claims explains why: insurers paid few claims, ${K.dec(st.freq * 100, 1)} per 100 policies a year, ranked ${st.rankFreq}, but large ones, ${K.usd(st.sev)} on average, the third largest of any state. Fire is the reason. The Labor Day fires of September ${yr(2)} burned more than a thousand homes in the Santiam Canyon, around Detroit and Gates, and in the Rogue Valley. Clackamas County rose ${K.sgn(clack.chg ?? 0)} to ${K.usd(clack.prem)}; Multnomah, Portland, ${K.sgn(mult.chg ?? 0)} to ${K.usd(mult.prem)}. Nonrenewals stayed moderate, ${K.rate(st.nonren[4])} in ${yr(4)}. The Oregon FAIR Plan writes a dwelling fire policy for homes declined elsewhere. The data stop in ${yr(4)}.`,
  body: (h) => `
<h2>Portland and the Willamette Valley</h2>
<p>Multnomah County had ${mult.zips} ZIP codes in the file and a typical figure of ${K.usd(mult.prem)} in ${yr(4)}; the two dearest ZIP codes in Oregon, ${hi[0].zip} and ${hi[1].zip}, downtown and in the West Hills, paid ${K.usd(hi[0].prem)} and ${K.usd(hi[1].prem)}. Clackamas County paid ${K.usd(clack.prem)}, Marion County, Salem, ${K.usd(mar.prem)}, and Lane County, Eugene, ${K.usd(lane.prem)} after a rise of ${K.sgn(lane.chg ?? 0)}. The cheapest ZIP codes were ${lo[0].zip} in ${lo[0].county} and ${lo[1].zip} in ${lo[1].county}, at ${K.usd(lo[0].prem)}. The state's range is narrow, from under ${K.usd(st.p10)} to over ${K.usd(st.p90)}.</p>
<h2>Fire, and the size of claims</h2>
<p>Oregon's paid claims per 100 policies were among the lowest of any state, between ${K.dec(Math.min(...st.freqY) * 100, 1)} and ${K.dec(Math.max(...st.freqY) * 100, 1)}, and its paid loss ratio rose from ${K.pct(st.lrY[0], 0)} in ${yr(0)} to around ${K.pct(st.lrY[2], 0)} from ${yr(1)}. When a house burns, the claim is the cost of a full rebuild plus contents and living expenses, which is why a few fires weigh as much as thousands of hail repairs. After the ${yr(2)} fires, many owners found their dwelling limit short of what rebuilding cost; the ${h.a('how-much-dwelling-coverage', 'dwelling coverage page')} explains why the limit should follow the rebuild cost.</p>
<p>After a total loss: does the limit cover the rebuild? The ${h.a('how-much-dwelling-coverage', 'rebuild cost calculator')} answers it with your own figures.</p>
<h2>Earthquake and the Cascadia question</h2>
<p>Western Oregon sits on the Cascadia subduction zone. Earthquake damage is excluded from standard homeowners policies and requires a separate endorsement or policy, usually with a deductible of 10 percent or more of the dwelling limit. Few Oregon households carry it. If you buy it, check whether the deductible applies to the house and contents separately.</p>
<h3>Renewals and the FAIR Plan</h3>
<p>The typical nonrenewal rate went ${st.nonren.map((x) => K.rate(x)).join(', ')} from ${yr(0)} to ${yr(4)}, ranked ${st.rankNonren} of the 50 states and DC. The ${planLink(0)} writes a dwelling fire policy, with wind and hail by endorsement, for homes that cannot find a private insurer, more and more in wildfire areas. The ${regLink()} handles complaints.</p>
`,
  faqs: [
    { q: 'How much is homeowners insurance in Portland, Oregon?', a: `The typical ZIP code of Multnomah County, which includes Portland, paid ${K.usd(mult.prem)} per policy in ${yr(4)}, after a rise of ${K.sgn(mult.chg ?? 0)} after inflation from ${yr(0)}. At ${K.ppiMonth} prices that is about ${K.usd(K.today(mult.prem))}. Earthquake coverage, if you add it, is separate.` },
    { q: 'Why are Oregon home insurance claims so large?', a: `Fire. Oregon's average paid claim from ${yr(0)} to ${yr(4)} was ${K.usd(st.sev)}, the third largest of any state in the Treasury file, while claims were rare. A house fire or wildfire claim covers a full rebuild, contents and living costs, and the ${yr(2)} Labor Day fires destroyed many homes at once.` },
    { q: 'Does Oregon homeowners insurance cover earthquakes?', a: `No. Standard homeowners policies exclude earthquake. Coverage is available as an endorsement or a separate policy, usually with a deductible of 10 to 20 percent of the dwelling limit. For a house insured at ${K.usd(400000)}, a 15 percent deductible is ${K.usd(60000)}, so check the terms before buying.` },
  ],
  related: ['how-much-dwelling-coverage', 'fair-plan-insurance', 'state:washington', 'state:california'],
});
