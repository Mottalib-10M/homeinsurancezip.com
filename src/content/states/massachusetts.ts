import { defineState } from '../../lib/page-types';
import { ctx } from './_ctx';

const { K, N, st, c, regLink, planLink, hi, lo, yr } = ctx('massachusetts');
const wor = c('Worcester County'), mid = c('Middlesex County'), bar = c('Barnstable County'), ess = c('Essex County');

export default defineState({
  slug: 'massachusetts',
  title: 'Homeowners Insurance Massachusetts 2026: Cape Cod vs Inland',
  description: `Homeowners insurance in Massachusetts 2026: premium per policy by ZIP code and county, 2018 to 2022, Cape Cod and Nantucket, Worcester and the FAIR Plan.`,
  intro: `Massachusetts's median ZIP code paid ${K.usd(st.prem[4])} per policy in ${yr(4)}; Barnstable County, Cape Cod, paid ${K.usd(bar.prem)}.`,
  resume: `Massachusetts homeowners paid ${K.usd(st.prem[4])} per policy in the median ZIP code in ${yr(4)}, ranked ${st.rankPrem} of 51 and above the national ${K.usd(N.prem[4])}, after a small rise of ${K.sgn(st.chg)} after inflation from ${yr(0)}. Inland and coastal Massachusetts are separate markets. Worcester County paid ${K.usd(wor.prem)} and Middlesex County ${K.usd(mid.prem)}, while Barnstable County, Cape Cod, paid ${K.usd(bar.prem)}, about twice as much. Nantucket's two ZIP codes, ${hi[0].zip} and ${hi[1].zip}, were the dearest in the state at around ${K.usd(Math.round(hi[1].prem / 1000) * 1000)}. Insurers' paid loss ratio was among the lowest in the country after ${yr(0)}, near ${K.pct(st.lrY[4], 0)}. Nonrenewals fell from ${K.rate(st.nonren[0])} to ${K.rate(st.nonren[3])} and rose again to ${K.rate(st.nonren[4])}. On the Cape and the islands, the Massachusetts Property Insurance Underwriting Association, the state's FAIR Plan, writes a large share of homes, and those policies are not in these figures. The data stop in ${yr(4)}.`,
  body: (h) => `
<h2>The Cape and the islands</h2>
<p>Barnstable County had ${bar.zips} ZIP codes in the file and a median of ${K.usd(bar.prem)} in ${yr(4)}. Nantucket's ${hi[0].zip} paid ${K.usd(hi[0].prem)} and ${hi[1].zip} ${K.usd(hi[1].prem)}, the result of high house values and full exposure to Atlantic storms. Many private insurers limit how many homes they write on the Cape, and coastal policies there typically carry a percentage hurricane or wind deductible. The ${planLink(0)} writes dwelling and homeowners forms, including multi-peril coverage close to an HO-3, which makes it a common choice on the Cape rather than a last resort in name only.</p>
${h.mini('hurricane', { t: 'A Cape Cod wind deductible', p: ['a', 'p', 'd'], d: { a: 650000, p: 2, d: 30000 } })}
<h2>Greater Boston and Worcester</h2>
<p>Middlesex County, west and north of Boston, had ${mid.zips} ZIP codes and a median of ${K.usd(mid.prem)}, up ${K.sgn(mid.chg ?? 0)} after inflation. Essex County, on the North Shore, paid ${K.usd(ess.prem)}. Worcester County, with the most ZIP codes, paid ${K.usd(wor.prem)} after a rise of ${K.sgn(wor.chg ?? 0)}. The cheapest ZIP codes were in Franklin County in the hills of the northwest, ${lo[0].zip} at ${K.usd(lo[0].prem)} and ${lo[1].zip} at ${K.usd(lo[1].prem)}. The state's dearest tenth of ZIP codes paid over ${K.usd(st.p90)}, more than twice its cheapest tenth.</p>
<h2>A busy ${yr(0)}, then quieter years</h2>
<p>Paid claims were ${K.dec(st.freqY[0] * 100, 1)} per 100 policies in ${yr(0)}, the year of several nor'easters in March, and fell to ${K.dec(st.freqY[4] * 100, 1)} in ${yr(4)}. The paid loss ratio went from ${K.pct(st.lrY[0], 0)} to ${K.pct(st.lrY[4], 0)}. The average claim, ${K.usd(st.sev)}, was close to the national figure. Winter claims, from ice dams, frozen pipes and fallen trees, make up much of the state's ordinary losses; the ${h.a('should-i-file-a-home-insurance-claim', 'claim calculator')} helps decide whether a small one is worth filing.</p>
<h2>Renewals and the regulator</h2>
<p>The nonrenewal rate fell from ${K.rate(st.nonren[0])} in ${yr(0)} to ${K.rate(st.nonren[3])} in ${yr(3)}, then rose to ${K.rate(st.nonren[4])} in ${yr(4)}. Cancellations for nonpayment were above the national median, ${K.rate(st.npc)}. The ${regLink()} reviews rates and handles complaints.</p>
`,
  faqs: [
    { q: 'Why is homeowners insurance so expensive on Cape Cod?', a: `Exposure to Atlantic storms and high property values. Barnstable County's median ZIP code paid ${K.usd(bar.prem)} per policy in ${yr(4)}, about twice the Massachusetts median of ${K.usd(st.prem[4])}, and Nantucket ZIP codes paid far more. Many Cape homes are insured through the state's FAIR Plan, which is not in these figures.` },
    { q: 'What does the Massachusetts FAIR Plan cover?', a: `The Massachusetts Property Insurance Underwriting Association writes dwelling and homeowners forms, including multi-peril coverage similar to a standard HO-3, according to the Treasury report. That makes it broader than many FAIR plans. It is widely used on Cape Cod and the islands, where private insurers limit new business.` },
    { q: 'How much is homeowners insurance in Worcester County?', a: `The median ZIP code of Worcester County paid ${K.usd(wor.prem)} per policy in ${yr(4)}, after a rise of ${K.sgn(wor.chg ?? 0)} after inflation from ${yr(0)}. That is below the state median and near the national ${K.usd(N.prem[4])}. At ${K.ppiMonth} prices it would be about ${K.usd(K.today(wor.prem))}.` },
  ],
  related: ['hurricane-deductible', 'fair-plan-insurance', 'state:connecticut', 'state:rhode-island'],
});
