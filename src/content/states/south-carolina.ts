import { defineState } from '../../lib/page-types';
import { ctx } from './_ctx';

const { K, N, st, c, regLink, planLink, hi, lo, yr } = ctx('south-carolina');
const chs = c('Charleston County'), gre = c('Greenville County'), spa = c('Spartanburg County'), aik = c('Aiken County');

export default defineState({
  slug: 'south-carolina',
  title: 'Homeowners Insurance South Carolina 2026: Coast vs Upstate',
  description: `Homeowners insurance in South Carolina 2026: premium per policy by ZIP code and county, 2018 to 2022, Charleston, the Upstate, nonrenewals and the wind pool.`,
  intro: `South Carolina's homeowners insurance nonrenewal rate nearly tripled from ${K.rate(st.nonren[0])} in ${yr(0)} to ${K.rate(st.nonren[4])} in ${yr(4)}, ranked ${st.rankNonren} of the 50 states and DC.`,
  resume: `South Carolina's typical homeowners premium per policy was ${K.usd(st.prem[4])} in ${yr(4)} in the Treasury file, close to the national ${K.usd(N.prem[4])} and ranked ${st.rankPrem} of the 50 states and DC, and it barely moved after inflation, ${K.sgn(st.chg)}. Renewals moved a lot: insurers declined to renew ${K.rate(st.nonren[0])} of policies in the typical ZIP code in ${yr(0)} and ${K.rate(st.nonren[4])} in ${yr(4)}, ranked ${st.rankNonren} of the 50 states and DC, and in ${K.pct(st.highNonren, 0)} of the state's ZIP codes the ${yr(4)} rate was above the national top-tenth line. Cancellations for nonpayment were the highest of any state, ${K.rate(st.npc)}. The coast is another market: Charleston County paid ${K.usd(chs.prem)}, more than twice the state typical figure, and its ZIP ${hi[0].zip}, the peninsula, ${K.usd(hi[0].prem)}. The Upstate paid less: Greenville County ${K.usd(gre.prem)}. The South Carolina Wind and Hail Underwriting Association writes wind coverage on the coast. The data stop in ${yr(4)}.`,
  body: (h) => `
<h2>Charleston and the Lowcountry</h2>
<p>Charleston County had ${chs.zips} ZIP codes in the file and a typical figure of ${K.usd(chs.prem)} in ${yr(4)}, a fall of ${K.sgn(chs.chg ?? 0)} after inflation from ${yr(0)}. The peninsula's ${hi[0].zip} paid ${K.usd(hi[0].prem)} and ${hi[1].zip}, Sullivan's Island, ${K.usd(hi[1].prem)}. A falling typical figure on a hurricane coast while nonrenewals rose suggests insurers writing fewer of the most exposed homes, which then turn to the ${planLink(0)} for wind and hail. That plan, available in two coastal zones, is outside the Treasury file, so the real cost of insuring a coastal home is higher than the figures show.</p>
<p>A Charleston claim with a 5 percent hurricane deductible: the ${h.a('hurricane-deductible', 'hurricane deductible calculator')} runs it with your own figures.</p>
<h2>The Upstate and the Midlands</h2>
<p>Greenville County had ${gre.zips} ZIP codes and a typical figure of ${K.usd(gre.prem)}, up ${K.sgn(gre.chg ?? 0)}; its ZIP ${lo[0].zip} was the cheapest in the state at ${K.usd(lo[0].prem)}. Spartanburg County paid ${K.usd(spa.prem)} and Aiken County ${K.usd(aik.prem)}. Inland claims come mostly from wind, hail and falling trees. The state's paid claims ran at ${K.dec(st.freq * 100, 1)} per 100 policies a year, at ${K.usd(st.sev)} on average, and the paid loss ratio stayed low, ${K.pct(Math.min(...st.lrY), 0)} to ${K.pct(Math.max(...st.lrY), 0)}.</p>
<h2>Nonrenewals and nonpayment</h2>
<p>The typical nonrenewal rate went ${st.nonren.map((x) => K.rate(x)).join(', ')} from ${yr(0)} to ${yr(4)}. With low loss ratios in the same years, the rise points to insurers reducing their exposure on the coast and tightening rules on older roofs, more than to a single bad storm. Cancellations for nonpayment, ${K.rate(st.npc)} of policies over the period, more than three times the national ${K.rate(N.npc)}, add to the turnover. The ${h.a('home-insurance-non-renewal', 'nonrenewal page')} and the ${h.a('homeowners-insurance-cost-per-month', 'escrow page')} cover both.</p>
<h3>The regulator</h3>
<p>The ${regLink()} reviews rates and handles complaints, and runs a grant program, SC Safe Home, that helps owners strengthen roofs against wind. Fortified roofs can also earn a premium discount from insurers in the state, so a roof replacement is worth doing to that standard when the time comes.</p>
`,
  faqs: [
    { q: 'Why is homeowners insurance so expensive in Charleston?', a: `Hurricane exposure and high-value homes. Charleston County's typical ZIP code paid ${K.usd(chs.prem)} per policy in ${yr(4)}, more than twice the South Carolina typical figure, and the peninsula paid ${K.usd(hi[0].prem)}. Many coastal homes also buy wind coverage from the state's wind and hail plan, which is not in these figures.` },
    { q: 'Why are so many South Carolina policies cancelled for nonpayment?', a: `The Treasury file shows ${K.rate(st.npc)} of policies in the typical South Carolina ZIP code cancelled for nonpayment over ${yr(0)} to ${yr(4)}, the highest rate of any state. It does not give reasons. Paying through escrow or automatic payments avoids most lapses and the coverage gap they leave.` },
    { q: 'What is the South Carolina Wind and Hail Underwriting Association?', a: `It is the state's coastal wind pool, listed in the Treasury report, writing wind and hail only coverage in two defined coastal zones where private policies may exclude wind. Owners pair it with a private policy for other perils. Its premiums are not included in the Treasury data.` },
  ],
  related: ['hurricane-deductible', 'home-insurance-non-renewal', 'state:north-carolina', 'state:georgia'],
});
