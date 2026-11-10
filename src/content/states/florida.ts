import { defineState } from '../../lib/page-types';
import { ctx } from './_ctx';

const { K, N, st, c, regLink, planLink, hi, lo, yr } = ctx('florida');
const F = K.P.florida;
const brow = c('Broward County'), palm = c('Palm Beach County'), orange = c('Orange County'), hills = c('Hillsborough County');

export default defineState({
  slug: 'florida',
  title: 'Homeowners Insurance Florida 2026: Premium by ZIP and County',
  description: `Homeowners insurance in Florida 2026: premium per policy by ZIP code and county, 2018 to 2022, the highest state median, Citizens and hurricane deductibles.`,
  intro: `Florida's typical ZIP code paid ${K.usd(st.prem[4])} per homeowners insurance policy in ${yr(4)}, the highest of any state, and ZIP ${hi[0].zip} paid ${K.usd(hi[0].prem)}.`,
  resume: `Florida has the highest homeowners premiums in the Treasury file: its typical ZIP code paid ${K.usd(st.prem[4])} per policy in ${yr(4)}, about twice the national ${K.usd(N.prem[4])}. The dearest tenth of its ZIP codes paid over ${K.usd(st.p90)}, led by ${hi[0].zip} in ${hi[0].county} at ${K.usd(hi[0].prem)}. Yet the typical figure fell ${K.sgn(st.chg)} after inflation from ${yr(0)} to ${yr(4)}, the largest drop of any state. That is not a sign of cheaper insurance. Private insurers failed or withdrew in those years, and Citizens Property Insurance Corporation took on the homes they left, often the dearest coastal ones; Citizens is outside the file. What remains is the private market. In ${yr(4)}, the year of Hurricane Ian, insurers paid out ${K.pct(st.lrY[4], 0)} of premium in claims in the typical ZIP code. Florida law sets hurricane deductible options, a once-a-year rule, notice periods and a ${K.pct(F.citizensMargin, 0)} line for Citizens eligibility. The data stop in ${yr(4)}.`,
  body: (h) => `
<h2>Southeast Florida against the rest</h2>
<p>Broward County's ${brow.zips} ZIP codes had a typical premium of ${K.usd(brow.prem)} in ${yr(4)}; Palm Beach County's ${palm.zips} had ${K.usd(palm.prem)}, the highest of the large counties, and one of few that rose after inflation, ${K.sgn(palm.chg ?? 0)}. Inland and on the Gulf side, the figures are lower and fell: Orange County, around Orlando, paid ${K.usd(orange.prem)} after a change of ${K.sgn(orange.chg ?? 0)}, and Hillsborough County, around Tampa, ${K.usd(hills.prem)} after ${K.sgn(hills.chg ?? 0)}. The cheapest ZIP codes in the file were ${lo[0].zip} in ${lo[0].county} at ${K.usd(lo[0].prem)} and ${lo[1].zip} in ${lo[1].county} at ${K.usd(lo[1].prem)}. ZIP ${hi[1].zip}, in ${hi[1].county}, paid ${K.usd(hi[1].prem)}.</p>
<h2>A shrinking private market</h2>
<p>The Treasury figures describe the homes private insurers kept. Several Florida insurers became insolvent between ${yr(2)} and ${yr(4)}, others stopped writing new policies, and Citizens grew. Its policies, which are not in the data, are concentrated where private insurers retreated. So the fall of the typical figure from ${K.usd(st.prem[0])} to ${K.usd(st.prem[4])} does not mean the same house got cheaper. Oddly, the file's nonrenewal rate for Florida is low, ${K.rate(st.nonren[4])} in ${yr(4)}, ranked ${st.rankNonren} of the 50 states and DC: an insurer that leaves the state or goes into receivership ends policies in other ways than an ordinary nonrenewal.</p>
<h2>The rules Florida writes into the policy</h2>
<p>Insurers must offer hurricane deductibles of ${K.usd(F.hurricaneOptions[0])}, 2, 5 and 10 percent of the dwelling limit, and the hurricane deductible applies once per calendar year to all hurricanes with the same insurer (${h.src('fl_627_701', 'Florida law')}). A renewal premium must be notified ${F.renewalNoticeDays} days ahead, a nonrenewal ${F.nonrenewalNoticeDays} days ahead, and a cancellation for nonpayment ${F.nonpaymentNoticeDays} days ahead (${h.src('fl_627_4133', 'Florida law')}). The ${h.a('hurricane-deductible', 'hurricane deductible calculator')} applies the once-a-year rule.</p>
<p>Must you leave Citizens for a private offer? The ${h.a('fair-plan-insurance', 'Citizens 20 percent calculator')} answers it with your own figures.</p>
<h3>Citizens and the 20 percent line</h3>
<p>The ${planLink(0)} writes multi-peril and wind-only policies statewide and in its coastal account. The law keeps it a last resort: a primary residence offered comparable coverage by an authorized insurer at a premium no more than ${K.pct(F.citizensMargin, 0)} above the Citizens premium is not eligible (${h.src('fl_627_351', 'Florida law')}). The ${regLink()} regulates rates and handles complaints. The ${h.a('fair-plan-insurance', 'FAIR plan page')} compares Citizens with the plans of other states.</p>
`,
  faqs: [
    { q: 'Why is homeowners insurance so expensive in Florida?', a: `Hurricane risk, high claim costs and a shrinking private market. Florida's typical ZIP code paid ${K.usd(st.prem[4])} per policy in ${yr(4)}, the highest state typical figure in the Treasury file, and the dearest tenth of ZIP codes paid over ${K.usd(st.p90)}. Reinsurance, which Florida insurers buy heavily, adds to the cost.` },
    { q: 'How much notice must a Florida insurer give before nonrenewal?', a: `${F.nonrenewalNoticeDays} days of written notice under Florida law, and ${F.renewalNoticeDays} days for a renewal premium. A cancellation for nonpayment needs ${F.nonpaymentNoticeDays} days. After a hurricane, the statute also limits the nonrenewal of a damaged home until repairs have been made.` },
    { q: 'Did Florida home insurance get cheaper from 2018 to 2022?', a: `Not for the same house. The private-market typical figure fell ${K.sgn(st.chg)} after inflation, but over those years insurers failed or left and Citizens, which is outside the data, took many of the costliest homes. The remaining private policies are a different mix, so the typical figure moved for that reason.` },
  ],
  related: ['hurricane-deductible', 'fair-plan-insurance', 'roof-claim-actual-cash-value', 'state:louisiana'],
});
