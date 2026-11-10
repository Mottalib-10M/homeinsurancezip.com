import { defineState } from '../../lib/page-types';
import { ctx } from './_ctx';

const { K, N, st, c, regLink, planLink, hi, lo, yr } = ctx('north-carolina');
const wake = c('Wake County'), meck = c('Mecklenburg County'), gui = c('Guilford County'), bun = c('Buncombe County');

export default defineState({
  slug: 'north-carolina',
  title: 'Homeowners Insurance North Carolina 2026: Coast, Charlotte',
  description: `Homeowners insurance in North Carolina 2026: premium per policy by ZIP code and county, 2018 to 2022, Raleigh, Charlotte, the coast, nonrenewals, beach plan.`,
  intro: `North Carolina homeowners insurers declined to renew ${K.rate(st.nonren[4])} of policies in the typical ZIP code in ${yr(4)}, ranked ${st.rankNonren} of the 50 states and DC.`,
  resume: `North Carolina's typical homeowners premium per policy was ${K.usd(st.prem[4])} in ${yr(4)} in the Treasury file, ranked ${st.rankPrem} of the 50 states and DC and below the national ${K.usd(N.prem[4])}, after a rise of ${K.sgn(st.chg)} after inflation. The numbers that stand out are renewals: insurers declined to renew ${K.rate(st.nonren[0])} of policies in the typical ZIP code in ${yr(0)}, the year of Hurricane Florence, fell back, then reached ${K.rate(st.nonren[4])} in ${yr(4)}, and in ${K.pct(st.highNonren, 0)} of the state's ZIP codes the ${yr(4)} rate was above the national top-tenth line. Wake County, Raleigh, rose ${K.sgn(wake.chg ?? 0)} to ${K.usd(wake.prem)}; Mecklenburg, Charlotte, ${K.sgn(meck.chg ?? 0)} to ${K.usd(meck.prem)}. Oddly, the cheapest ZIP codes were on the coast in Carteret County, ${lo[0].zip} at ${K.usd(lo[0].prem)}, most likely because the beach plan carries much of the wind risk there. Two state plans cover homes private insurers decline. The data stop in ${yr(4)}.`,
  body: (h) => `
<h2>Raleigh, Charlotte and the Triad</h2>
<p>Wake County had ${wake.zips} ZIP codes in the file and a typical figure of ${K.usd(wake.prem)} in ${yr(4)}; Mecklenburg had ${meck.zips} and ${K.usd(meck.prem)}. Guilford County, Greensboro, paid ${K.usd(gui.prem)} after ${K.sgn(gui.chg ?? 0)}. These metro counties rose faster than the state as a whole, with fast growth and rising construction costs. The dearest ZIP code in the state was ${hi[0].zip} in Charlotte, Myers Park, at ${K.usd(hi[0].prem)}. The mountains follow: ${hi[1].zip} in ${hi[1].county}, around Linville, paid ${K.usd(hi[1].prem)}, and Buncombe County, Asheville, ${K.usd(bun.prem)}. The file ends two years before Helene flooded western North Carolina in ${yr(4) + 2}.</p>
<h2>The coast and the beach plan</h2>
<p>The low figures in Carteret County, ${lo[0].zip} at ${K.usd(lo[0].prem)} and ${lo[1].zip} at ${K.usd(lo[1].prem)}, are not cheap insurance. In the beach and coastal territories, many homes buy wind and hail coverage from the ${planLink(0)}, and the private policy covers the other perils at a lower price. The full cost is the private premium plus the beach plan premium, which is not in the Treasury file.</p>
<p>North Carolina, odds of a nonrenewal ahead: the ${h.a('home-insurance-non-renewal', 'nonrenewal calculator')} runs it with your own figures.</p>
<h2>Renewals after the hurricanes</h2>
<p>The typical nonrenewal rate went ${st.nonren.map((x) => K.rate(x)).join(', ')} from ${yr(0)} to ${yr(4)}. Florence in ${yr(0)} and Dorian in ${yr(1)} hit the coast; the ${yr(4)} rise was broader, reaching inland ZIP codes. Claims ran at ${K.dec(st.freq * 100, 1)} per 100 policies a year, highest in ${yr(0)} at ${K.dec(st.freqY[0] * 100, 1)}, at a modest ${K.usd(st.sev)} on average. Cancellations for nonpayment were above the national typical figure, ${K.rate(st.npc)}. The ${h.a('home-insurance-non-renewal', 'nonrenewal page')} explains what to do with a notice.</p>
<h3>The two plans and the regulator</h3>
<p>Besides the beach plan, the ${planLink(1)} is the FAIR plan for the rest of the state, writing dwelling and homeowners forms. North Carolina sets homeowners rates through a rate bureau that files for the whole market, which the ${regLink()} reviews; insurers can also charge more than the bureau rate with the policyholder's written consent.</p>
`,
  faqs: [
    { q: 'Why are North Carolina insurers not renewing homes?', a: `The Treasury file shows the typical rate reaching ${K.rate(st.nonren[4])} in ${yr(4)}, ranked ${st.rankNonren} of the 50 states and DC, after ${K.rate(st.nonren[0])} in ${yr(0)}, the year of Hurricane Florence. Reasons are not in the data; insurers usually cite roof age, claims and coastal or wind exposure. Ask the insurer for its reason in writing.` },
    { q: 'How much is homeowners insurance in Raleigh?', a: `The typical ZIP code of Wake County, which includes Raleigh, paid ${K.usd(wake.prem)} per policy in ${yr(4)}, after a rise of ${K.sgn(wake.chg ?? 0)} after inflation from ${yr(0)}. At ${K.ppiMonth} prices that is about ${K.usd(K.today(wake.prem))}. The lookup gives each ZIP code with its five years.` },
    { q: 'What is the North Carolina beach plan?', a: `The North Carolina Insurance Underwriting Association, also called the Coastal Property Insurance Pool, writes dwelling, wind and hail only and homeowners policies in the beach and coastal territories. Many coastal owners buy wind coverage there and the rest from a private insurer. Its premiums are not in the Treasury figures.` },
  ],
  related: ['home-insurance-non-renewal', 'hurricane-deductible', 'state:south-carolina', 'state:virginia'],
});
