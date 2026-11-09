import { defineState } from '../../lib/page-types';
import { ctx } from './_ctx';

const { K, N, st, c, regLink, planLink, hi, lo, yr } = ctx('new-jersey');
const ber = c('Bergen County'), mon = c('Monmouth County'), mor = c('Morris County'), mid = c('Middlesex County');

export default defineState({
  slug: 'new-jersey',
  title: 'Homeowners Insurance New Jersey 2026: Shore vs. North Jersey',
  description: `Homeowners insurance in New Jersey 2026: premium per policy by ZIP code and county, 2018 to 2022, the Shore, Bergen and Morris, Ida in 2021, the state plan.`,
  intro: `New Jersey's median ZIP code paid ${K.usd(st.prem[4])} per homeowners insurance policy in ${yr(4)}; Monmouth County, on the Shore, paid ${K.usd(mon.prem)}.`,
  resume: `New Jersey homeowners paid ${K.usd(st.prem[4])} per policy in the median ZIP code in ${yr(4)} in the Treasury file, about the national level of ${K.usd(N.prem[4])} and ranked ${st.rankPrem} of 51, after a rise of only ${K.sgn(st.chg)} after inflation from ${yr(0)}. North Jersey's large counties paid close to that: Bergen ${K.usd(ber.prem)}, Morris ${K.usd(mor.prem)}, Middlesex ${K.usd(mid.prem)}. The Shore is a separate market: Monmouth County paid ${K.usd(mon.prem)}, and its ZIP ${hi[0].zip} ${K.usd(hi[0].prem)}, the highest in the state. Claims rose to ${K.dec(st.freqY[3] * 100, 1)} per 100 policies in ${yr(3)}, the year the remnants of Ida brought tornadoes and flash floods, and the paid loss ratio to ${K.pct(st.lrY[3], 0)}. Cancellations for nonpayment were the lowest of any state, ${K.rate(st.npc)}. The New Jersey Insurance Underwriting Association writes dwelling fire policies for homes declined elsewhere. Flood is separate and matters on the Shore. The data stop in ${yr(4)}.`,
  body: (h) => `
<h2>North Jersey</h2>
<p>Bergen County had ${ber.zips} ZIP codes in the file and a median of ${K.usd(ber.prem)} in ${yr(4)}, flat after inflation. Morris County paid ${K.usd(mor.prem)} and Middlesex ${K.usd(mid.prem)}. Prices barely moved in these years, while the paid loss ratio of the state's median ZIP code went from ${K.pct(st.lrY[0], 0)} in ${yr(0)} to ${K.pct(st.lrY[1], 0)} in ${yr(1)}, close to the national level. Bergen's ZIP ${hi[1].zip}, Alpine, paid ${K.usd(hi[1].prem)}, the second highest figure in the state. At the other end, ${lo[0].zip} in ${lo[0].county} and ${lo[1].zip} in ${lo[1].county} paid ${K.usd(lo[0].prem)} and ${K.usd(lo[1].prem)}.</p>
<h2>The Shore</h2>
<p>Monmouth County, with ${mon.zips} ZIP codes, paid ${K.usd(mon.prem)} after a rise of ${K.sgn(mon.chg ?? 0)}, and ZIP ${hi[0].zip}, Deal, ${K.usd(hi[0].prem)}. Large oceanfront houses and storm exposure explain it. Sandy in 2012 is the reference loss on the Shore, and many policies there carry a percentage hurricane or windstorm deductible. Storm surge is flood, not wind, and is excluded from homeowners policies; most of Sandy's damage was flood.</p>
${h.mini('hurricane', { t: 'A Shore house with a 2 percent hurricane deductible', p: ['a', 'p', 'd'], d: { a: 700000, p: 2, d: 28000 } })}
<h2>The ${yr(3)} spike</h2>
<p>New Jersey's paid claims were ${st.freqY.map((x) => K.dec(x * 100, 1)).join(', ')} per 100 policies from ${yr(0)} to ${yr(4)}. In September ${yr(3)} the remnants of Ida produced tornadoes in South Jersey, including Mullica Hill in Gloucester County, and flooded basements across the north, and the paid loss ratio rose to ${K.pct(st.lrY[3], 0)} that year. Wind and tornado damage is covered by homeowners policies; water in a basement from surface flooding is not, and sewer backup needs its own endorsement. The ${h.a('should-i-file-a-home-insurance-claim', 'claim calculator')} helps with small claims.</p>
<h2>Renewals and the underwriting plan</h2>
<p>New Jersey's median nonrenewal rate was ${K.rate(st.nonren[4])} in ${yr(4)}, ranked ${st.rankNonren} of 51. Cancellations for nonpayment, ${K.rate(st.npc)}, were the lowest of any state. The ${planLink(0)} writes basic and broad dwelling fire policies for homes that cannot find a private insurer. The ${regLink()} reviews rates and complaints.</p>
`,
  faqs: [
    { q: 'How much is homeowners insurance on the Jersey Shore?', a: `The median ZIP code of Monmouth County paid ${K.usd(mon.prem)} per policy in ${yr(4)}, against ${K.usd(st.prem[4])} for New Jersey as a whole, and oceanfront ZIP codes paid several times that. Flood insurance is separate and can cost as much again near the water. Use the lookup for a single ZIP code.` },
    { q: 'Did homeowners insurance cover the Ida damage in New Jersey?', a: `Wind and tornado damage from the remnants of Ida in ${yr(3)} was covered by homeowners policies, subject to deductibles, and claims rose to ${K.dec(st.freqY[3] * 100, 1)} per 100 policies that year. Basement flooding from surface water was not covered without a flood policy, and sewer backup only with an endorsement.` },
    { q: 'What is the New Jersey Insurance Underwriting Association?', a: `It is New Jersey's residual market plan for property that private insurers decline, listed in the Treasury report. It writes basic and broad dwelling fire policies, narrower than an HO-3, so owners may need other coverage for theft and liability. Its policies are not in the Treasury premium data.` },
  ],
  related: ['hurricane-deductible', 'should-i-file-a-home-insurance-claim', 'state:new-york', 'state:pennsylvania'],
});
