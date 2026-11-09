import { defineState } from '../../lib/page-types';
import { ctx } from './_ctx';

const { K, N, st, c, regLink, planLink, hi, lo, yr } = ctx('alabama');
const jeff = c('Jefferson County'), mobile = c('Mobile County'), bald = c('Baldwin County'), mad = c('Madison County');

export default defineState({
  slug: 'alabama',
  title: 'Homeowners Insurance Alabama 2026: Gulf Coast vs. Inland',
  description: `Homeowners insurance in Alabama 2026: premium per policy by ZIP code and county, 2018 to 2022, Mobile and Baldwin against Birmingham, and the beach plan.`,
  intro: `The median Alabama ZIP code paid ${K.usd(st.prem[4])} per policy in ${yr(4)}; ZIP ${hi[0].zip} on the coast paid ${K.usd(hi[0].prem)}.`,
  resume: `Alabama's median ZIP code paid ${K.usd(st.prem[4])} per homeowners policy in ${yr(4)}, ranked ${st.rankPrem} of 51 and above the national ${K.usd(N.prem[4])}. Over five years the figure barely moved after inflation, ${K.sgn(st.chg)}, but the state is two markets. Inland, Jefferson County around Birmingham was at ${K.usd(jeff.prem)} and Madison County around Huntsville at ${K.usd(mad.prem)}. On the Gulf, Mobile County paid ${K.usd(mobile.prem)} and Baldwin County ${K.usd(bald.prem)}, and the single dearest ZIP code, ${hi[0].zip} in ${hi[0].county}, paid ${K.usd(hi[0].prem)}. The year ${yr(2)} stands out in the claims: ${K.dec(st.freqY[2] * 100, 1)} paid claims per 100 policies, the year Hurricane Sally came ashore near the state line. Coastal homes that private insurers will not cover for wind turn to the Alabama Insurance Underwriting Association, whose policies are not in these figures. Data stop in ${yr(4)}.`,
  body: (h) => `
<h2>Birmingham and Huntsville pay close to the state median</h2>
<p>Most of Alabama's ${K.num(st.zips)} ZIP codes in the Treasury file sit in a narrow band: the cheapest tenth paid under ${K.usd(st.p10)} and the dearest tenth over ${K.usd(st.p90)}, a tight range for a state with a coastline. Jefferson County's ${jeff.zips} ZIP codes had a median of ${K.usd(jeff.prem)}, up ${K.sgn(jeff.chg ?? 0)} after inflation since ${yr(0)}. Madison County rose a little faster, ${K.sgn(mad.chg ?? 0)}. The cheapest ZIP code, ${lo[0].zip} in ${lo[0].county}, paid ${K.usd(lo[0].prem)}. Tornadoes and hail drive inland claims, and Alabama's claim rate, ${K.dec(st.freq * 100, 1)} per 100 policies a year, ranks ${st.rankFreq} of 51.</p>
${h.mini('state', { t: 'Alabama against a neighbor', p: ['sx', 'mine'], d: { sx: 'alabama' } })}
<h2>Mobile Bay and the beach</h2>
<p>The private market prices the coast very differently. Baldwin County's median ZIP code, ${K.usd(bald.prem)} in ${yr(4)}, actually fell ${K.sgn(bald.chg ?? 0)} after inflation from ${yr(0)}, and Mobile County fell too, ${K.sgn(mobile.chg ?? 0)}. A falling figure on a hurricane coast usually means insurers wrote fewer of the most exposed homes, or wrote them without wind. ZIP ${hi[0].zip} in ${hi[0].county} and ${hi[1].zip} in ${hi[1].county}, at ${K.usd(hi[0].prem)} and ${K.usd(hi[1].prem)}, were the dearest in the state. Those owners often carry a percentage hurricane deductible, explained on the ${h.a('hurricane-deductible', 'hurricane deductible page')}.</p>
<h2>The beach plan</h2>
<p>The ${planLink(0)} writes wind, hail and hurricane only policies for homes in the beach and seacoast areas of certain coastal counties, paired with a private policy for fire, theft and liability. Its premiums are outside the Treasury file. The state regulator, the ${regLink()}, also runs a program that helps owners fortify roofs against wind, which can earn a premium discount with many insurers.</p>
<h2>Cancellations and nonrenewals</h2>
<p>Alabama's nonrenewal rate in the median ZIP code was ${K.rate(st.nonren[4])} in ${yr(4)}, ranked ${st.rankNonren} of 51, well below the national median. Cancellations for nonpayment were higher than in most states, ${K.rate(st.npc)} over the period, which the escrow and installment advice on the ${h.a('homeowners-insurance-cost-per-month', 'monthly cost page')} addresses.</p>
`,
  faqs: [
    { q: 'Why is homeowners insurance so expensive in Baldwin County, Alabama?', a: `Hurricane exposure. Baldwin County's median ZIP code paid ${K.usd(bald.prem)} per policy in ${yr(4)}, against ${K.usd(st.prem[4])} for the state, and beach ZIP codes paid several times that. Many coastal policies use a percentage hurricane deductible, and some homes need a separate wind policy from the state's beach plan.` },
    { q: 'What does home insurance cost in Birmingham, Alabama?', a: `The median ZIP code of Jefferson County, which includes Birmingham, paid ${K.usd(jeff.prem)} per policy in ${yr(4)}, according to the Treasury file. At ${K.ppiMonth} prices that is about ${K.usd(K.today(jeff.prem))}. Your own premium depends on the house, the deductible and the insurer; enter your ZIP code in the lookup.` },
    { q: 'Who regulates homeowners insurance in Alabama?', a: `The Alabama Department of Insurance licenses insurers, reviews rates and handles consumer complaints about claims, cancellations and nonrenewals. Coastal wind coverage for homes that cannot find it privately comes from the Alabama Insurance Underwriting Association. Both are linked on this page.` },
  ],
  related: ['hurricane-deductible', 'state:mississippi', 'state:florida', 'homeowners-insurance-by-state'],
});
