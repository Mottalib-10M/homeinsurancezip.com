import { defineState } from '../../lib/page-types';
import { ctx } from './_ctx';

const { K, N, st, c, regLink, planLink, hi, lo, yr } = ctx('mississippi');
const hinds = c('Hinds County'), har = c('Harrison County'), bol = c('Bolivar County'), des = c('DeSoto County');

export default defineState({
  slug: 'mississippi',
  title: 'Homeowners Insurance Mississippi 2026: Coast and Delta Costs',
  description: `Homeowners insurance in Mississippi 2026: premium per policy by ZIP code and county, 2018 to 2022, the Gulf Coast, Jackson, nonpayment and two state plans.`,
  intro: `Mississippi's median ZIP code paid ${K.usd(st.prem[4])} per policy in ${yr(4)}, and ${K.rate(st.npc)} of policies were cancelled for nonpayment, among the highest rates.`,
  resume: `Mississippi homeowners paid ${K.usd(st.prem[4])} per policy in the median ZIP code in ${yr(4)}, ranked ${st.rankPrem} of 51 and above the national ${K.usd(N.prem[4])}, after a modest rise of ${K.sgn(st.chg)} after inflation. The state is poorer than most, and the premium weighs more in household budgets: cancellations for nonpayment ran at ${K.rate(st.npc)}, among the highest in the country, against ${K.rate(N.npc)} nationally. Claims were frequent, ${K.dec(st.freq * 100, 1)} per 100 policies a year, ranked ${st.rankFreq}, with a peak of ${K.dec(st.freqY[2] * 100, 1)} in ${yr(2)}. On the Gulf Coast, Harrison County paid ${K.usd(har.prem)} and the dearest ZIP codes, ${hi[0].zip} in ${hi[0].county} and ${hi[1].zip} in ${hi[1].county}, about ${K.usd(Math.round(hi[1].prem / 100) * 100)}. Nonrenewals rose to ${K.rate(st.nonren[4])} in ${yr(4)}, ranked ${st.rankNonren} of 51. Two state plans serve homes private insurers decline: a windstorm plan on the coast and a FAIR plan inland. The data stop in ${yr(4)}.`,
  body: (h) => `
<h2>The Gulf Coast</h2>
<p>Harrison County, with Gulfport and Biloxi, had ${har.zips} ZIP codes in the file and a median of ${K.usd(har.prem)} in ${yr(4)}, a fall of ${K.sgn(har.chg ?? 0)} after inflation from ${yr(0)}. ZIP ${hi[0].zip} in ${hi[0].county}, around Ocean Springs, paid ${K.usd(hi[0].prem)}, and ${hi[1].zip} in ${hi[1].county} ${K.usd(hi[1].prem)}. Those are high figures for Mississippi but low next to the Florida or Alabama coasts, and many coastal owners also carry wind coverage from the ${planLink(0)}, which is outside the file.</p>
${h.mini('hurricane', { t: 'A Gulf Coast claim with a percentage deductible', p: ['a', 'p', 'd'], d: { a: 250000, p: 5, d: 22000 } })}
<h2>Jackson, DeSoto and the Delta</h2>
<p>Hinds County, Jackson, paid ${K.usd(hinds.prem)}. DeSoto County, in the Memphis suburbs, paid ${K.usd(des.prem)} after a rise of ${K.sgn(des.chg ?? 0)}, faster than the state as a whole. Bolivar County, in the Delta, paid ${K.usd(bol.prem)}, above the state median. The cheapest ZIP codes were in the east and north: ${lo[0].zip} in ${lo[0].county} at ${K.usd(lo[0].prem)} and ${lo[1].zip} in ${lo[1].county} at ${K.usd(lo[1].prem)}. Even the cheapest tenth of Mississippi ZIP codes paid over ${K.usd(st.p10)}.</p>
<h2>Storms inland</h2>
<p>Mississippi's claims are not only coastal. Paid claims rose to ${K.dec(st.freqY[2] * 100, 1)} per 100 policies in ${yr(2)}, with Hurricane Zeta and an Easter tornado outbreak that year, and stayed high in ${yr(3)} at ${K.dec(st.freqY[3] * 100, 1)}. The paid loss ratio peaked at ${K.pct(st.lrY[3], 0)} in ${yr(3)}. The average claim was ${K.usd(st.sev)}, below the national figure: many roof and tree claims rather than total losses.</p>
<h2>Nonpayment, renewals and the two plans</h2>
<p>A cancellation for nonpayment leaves a gap that the next insurer will ask about, and with a mortgage it brings force-placed coverage at a higher price. Paying through escrow, as explained on the ${h.a('homeowners-insurance-cost-per-month', 'monthly cost page')}, avoids most lapses. Nonrenewals rose from ${K.rate(st.nonren[1])} in ${yr(1)} to ${K.rate(st.nonren[4])} in ${yr(4)}. The ${planLink(1)} is the state's FAIR plan, writing dwelling fire policies, with wind and hail allowed outside three coastal counties. The ${regLink()} handles complaints.</p>
`,
  faqs: [
    { q: 'How much is homeowners insurance in Gulfport and Biloxi?', a: `The median ZIP code of Harrison County, which includes Gulfport and Biloxi, paid ${K.usd(har.prem)} per policy in ${yr(4)} in the Treasury file. Many coastal homes also carry a separate wind policy from the Mississippi Windstorm Underwriting Association, which is not included, so the full cost of insuring a coastal home is higher.` },
    { q: 'Why are so many Mississippi home insurance policies cancelled for nonpayment?', a: `The Treasury file shows ${K.rate(st.npc)} of policies in the median Mississippi ZIP code cancelled for nonpayment over ${yr(0)} to ${yr(4)}, against ${K.rate(N.npc)} nationally. Premiums are high relative to incomes in much of the state, and policies paid directly rather than through escrow lapse more often.` },
    { q: 'What is the Mississippi Windstorm Underwriting Association?', a: `It is a beach plan that writes windstorm and hail coverage for one-to-four family homes in coastal counties where private insurers exclude wind, according to the Treasury report. Owners pair it with a private policy for other perils. Its premiums are not part of the Treasury figures.` },
  ],
  related: ['hurricane-deductible', 'homeowners-insurance-cost-per-month', 'state:alabama', 'state:louisiana'],
});
