import { defineState } from '../../lib/page-types';
import { ctx } from './_ctx';

const { K, N, st, c, regLink, planLink, hi, lo, yr } = ctx('rhode-island');
const prov = c('Providence County'), wash = c('Washington County'), kent = c('Kent County'), newp = c('Newport County');

export default defineState({
  slug: 'rhode-island',
  title: 'Homeowners Insurance Rhode Island 2026: Shore Towns and FAIR',
  description: `Homeowners insurance in Rhode Island 2026: premium per policy by ZIP code and county, 2018 to 2022, Providence, Newport, Block Island, the 2019 spike.`,
  intro: `Rhode Island's median ZIP code paid ${K.usd(st.prem[4])} per policy in ${yr(4)}, ranked ${st.rankPrem} of 51; Block Island's ${hi[0].zip} paid ${K.usd(hi[0].prem)}.`,
  resume: `Rhode Island is a dear state for homeowners insurance in the Treasury file: its ${st.zips} ZIP codes had a median of ${K.usd(st.prem[4])} per policy in ${yr(4)}, ranked ${st.rankPrem} of 51 and well above the national ${K.usd(N.prem[4])}, after a rise of ${K.sgn(st.chg)} after inflation. Even the cheapest tenth of ZIP codes paid over ${K.usd(st.p10)}. With some 400 miles of coastline for a small state, much of the population lives close to the water. Providence County paid ${K.usd(prov.prem)}; Newport County ${K.usd(newp.prem)}; Washington County, South County, ${K.usd(wash.prem)}, with its ZIP ${hi[0].zip}, Block Island, at ${K.usd(hi[0].prem)}. One year stands out in renewals: the median nonrenewal rate jumped to ${K.rate(st.nonren[1])} in ${yr(1)}, against ${K.rate(st.nonren[0])} the year before, then fell back to ${K.rate(st.nonren[4])} in ${yr(4)}. The Rhode Island FAIR Plan writes a wide range of forms for homes declined elsewhere. The data stop in ${yr(4)}.`,
  body: (h) => `
<h2>Providence and Kent counties</h2>
<p>Providence County had ${prov.zips} ZIP codes in the file and a median of ${K.usd(prov.prem)} in ${yr(4)}, up ${K.sgn(prov.chg ?? 0)} after inflation. Kent County, Warwick and the bay towns, paid ${K.usd(kent.prem)}. The cheapest ZIP codes were ${lo[0].zip} in ${lo[0].county} and ${lo[1].zip} in ${lo[1].county}, at ${K.usd(lo[0].prem)} and ${K.usd(lo[1].prem)}, still above the national median. Narragansett Bay brings coastal exposure into the middle of the state, and many policies within a few miles of the water carry a percentage hurricane deductible.</p>
<h2>Newport, South County and Block Island</h2>
<p>Newport County paid ${K.usd(newp.prem)}, after a rise of ${K.sgn(newp.chg ?? 0)}, the fastest of the four counties; its ZIP ${hi[1].zip}, Newport itself, paid ${K.usd(hi[1].prem)}. Washington County paid ${K.usd(wash.prem)}, and Block Island ${K.usd(hi[0].prem)}. The 1938 hurricane and Carol in 1954 remain the reference storms here, and insurers price the shore with them in mind. A flood policy is separate from the homeowners policy and matters as much as the wind deductible in the low-lying parts of these towns, since storm surge is flood and not wind.</p>
${h.mini('hurricane', { t: 'A Rhode Island shore house: hurricane deductible', p: ['a', 'p', 'd'], d: { a: 550000, p: 3, d: 26000 } })}
<h2>The ${yr(1)} jump in nonrenewals</h2>
<p>Rhode Island's median nonrenewal rate went ${st.nonren.map((x) => K.rate(x)).join(', ')} from ${yr(0)} to ${yr(4)}. A one-year jump of that size in a small state, then a return to normal, usually means one insurer ended a block of policies. The file does not say which. The paid loss ratio stayed between ${K.pct(Math.min(...st.lrY), 0)} and ${K.pct(Math.max(...st.lrY), 0)}, and paid claims ran at ${K.dec(st.freq * 100, 1)} per 100 policies a year, highest in ${yr(0)}.</p>
<h2>The FAIR Plan</h2>
<p>The ${planLink(0)} writes dwelling fire and a range of homeowners forms up to HO-5, broader than most FAIR plans, and many shore homes are insured there. Its policies are outside the Treasury file. The ${regLink()} reviews rates and complaints. The ${h.a('fair-plan-insurance', 'FAIR plan page')} compares the plans state by state.</p>
`,
  faqs: [
    { q: 'Why is homeowners insurance expensive in Rhode Island?', a: `Coastal exposure. Much of Rhode Island lives near Narragansett Bay or the ocean, and the median ZIP code paid ${K.usd(st.prem[4])} per policy in ${yr(4)}, ranked ${st.rankPrem} of 51 in the Treasury file. Even the cheapest tenth of ZIP codes paid over ${K.usd(st.p10)}. Shore towns paid much more.` },
    { q: 'How much is homeowners insurance in Newport, Rhode Island?', a: `ZIP ${hi[1].zip}, Newport, paid ${K.usd(hi[1].prem)} per policy in ${yr(4)}, and the median ZIP code of Newport County ${K.usd(newp.prem)}. At ${K.ppiMonth} prices the county figure would be about ${K.usd(K.today(newp.prem))}. Percentage hurricane deductibles are common on Aquidneck Island, and flood coverage is separate.` },
    { q: 'What does the Rhode Island FAIR Plan cover?', a: `According to the Treasury report, it writes dwelling fire policies and a range of homeowners forms up to HO-5, so it can offer broad coverage. It insures homes that private insurers decline, many of them near the shore. Its policies are not part of the Treasury premium data.` },
  ],
  related: ['hurricane-deductible', 'fair-plan-insurance', 'state:massachusetts', 'state:connecticut'],
});
