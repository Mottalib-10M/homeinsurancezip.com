import { defineState } from '../../lib/page-types';
import { ctx } from './_ctx';

const { K, N, st, c, regLink, planLink, hi, lo, yr } = ctx('ohio');
const cuy = c('Cuyahoga County'), ham = c('Hamilton County'), fra = c('Franklin County'), sum = c('Summit County');

export default defineState({
  slug: 'ohio',
  title: 'Homeowners Insurance Ohio 2026: Premiums in the Three Cs',
  description: `Homeowners insurance in Ohio 2026: premium per policy by ZIP code and county, 2018 to 2022, the three big cities, a narrow price range and the Ohio FAIR Plan.`,
  intro: `Ohio's typical ZIP code paid ${K.usd(st.prem[4])} per homeowners insurance policy in ${yr(4)}, ranked ${st.rankPrem} of the 50 states and DC, one of the cheaper large states.`,
  resume: `Ohio is one of the cheaper large states for homeowners insurance in the Treasury file. Across ${K.num(st.zips)} ZIP codes, the typical paid ${K.usd(st.prem[4])} per policy in ${yr(4)}, ranked ${st.rankPrem} of the 50 states and DC and below the national ${K.usd(N.prem[4])}, after a rise of ${K.sgn(st.chg)} after inflation. The range is narrow: the cheapest tenth of ZIP codes paid under ${K.usd(st.p10)} and the dearest tenth over ${K.usd(st.p90)}. The three big counties are close together, Cuyahoga, Cleveland, at ${K.usd(cuy.prem)}, Franklin, Columbus, at ${K.usd(fra.prem)}, and Hamilton, Cincinnati, at ${K.usd(ham.prem)}. Cuyahoga holds both ends of the state's range: ZIP ${hi[0].zip}, Gates Mills, paid ${K.usd(hi[0].prem)}, and ${lo[0].zip}, Parma, ${K.usd(lo[0].prem)}. Claims rose in ${yr(1)} and ${yr(2)}, with tornadoes around Dayton in May ${yr(1)}. Insurers paid out ${K.pct(st.lrY[4], 0)} of premium in claims in ${yr(4)}. Nonrenewals were ${K.rate(st.nonren[4])}. The Ohio FAIR Plan covers homes declined elsewhere. The data stop in ${yr(4)}.`,
  body: (h) => `
<h2>The three Cs</h2>
<p>Cuyahoga County and Hamilton County each had ${cuy.zips} ZIP codes in the file; Franklin had ${fra.zips}. Their typical figures, ${K.usd(cuy.prem)}, ${K.usd(ham.prem)} and ${K.usd(fra.prem)} in ${yr(4)}, rose ${K.sgn(cuy.chg ?? 0)}, ${K.sgn(ham.chg ?? 0)} and ${K.sgn(fra.chg ?? 0)} after inflation from ${yr(0)}. Summit County, Akron, paid ${K.usd(sum.prem)}, flat. The dearest ZIP codes were suburban estates: ${hi[0].zip} east of Cleveland at ${K.usd(hi[0].prem)} and ${hi[1].zip}, Indian Hill near Cincinnati, at ${K.usd(hi[1].prem)}. The cheapest were Cleveland's inner-ring suburbs, ${lo[0].zip} at ${K.usd(lo[0].prem)} and ${lo[1].zip} at ${K.usd(lo[1].prem)}.</p>
<p>Ohio against a neighboring state: the ${h.a('homeowners-insurance-by-state', 'state comparison calculator')} runs it with your own figures.</p>
<h2>Storm years</h2>
<p>Paid claims per 100 policies went ${st.freqY.map((x) => K.dec(x * 100, 1)).join(', ')} from ${yr(0)} to ${yr(4)}. The Memorial Day tornado outbreak of ${yr(1)} struck the Dayton area, and the paid loss ratio rose from ${K.pct(st.lrY[0], 0)} in ${yr(0)} to ${K.pct(st.lrY[1], 0)} in ${yr(1)} and ${K.pct(st.lrY[2], 0)} in ${yr(2)}. The average claim, ${K.usd(st.sev)}, was below the national figure, ranked ${st.rankSev} of the 50 states and DC. Ohio policies commonly carry a flat deductible; some insurers have added separate wind and hail deductibles, which the ${h.a('hurricane-deductible', 'deductible calculator')} can model as a percentage.</p>
<h2>Older houses and the dwelling limit</h2>
<p>Ohio cities have many houses built before 1940, with plaster walls, slate roofs and wood trim. The cost to rebuild them with similar materials can exceed their market value, and a policy that pays only the market value or a modified HO-8 form will not restore the original finishes. The ${h.a('how-much-dwelling-coverage', 'dwelling coverage page')} explains how replacement cost and the 80 percent condition work, and why the limit should follow the rebuild cost.</p>
<h3>Renewals and the FAIR Plan</h3>
<p>Ohio's typical nonrenewal rate went from ${K.rate(st.nonren[0])} in ${yr(0)} to ${K.rate(st.nonren[2])} in ${yr(2)} and back to ${K.rate(st.nonren[4])} in ${yr(4)}, ranked ${st.rankNonren} of the 50 states and DC. The ${planLink(0)} writes dwelling fire and homeowners named-peril and multi-peril forms for homes that cannot find a private insurer. The ${regLink()} handles complaints. Ohio also lets owners in many counties buy a mine subsidence endorsement, which matters in the old coal areas of the east and southeast.</p>
`,
  faqs: [
    { q: 'How much is homeowners insurance in Columbus, Ohio?', a: `The typical ZIP code of Franklin County, which includes Columbus, paid ${K.usd(fra.prem)} per policy in ${yr(4)}, after a rise of ${K.sgn(fra.chg ?? 0)} after inflation from ${yr(0)}. At ${K.ppiMonth} prices that is about ${K.usd(K.today(fra.prem))}. Suburban and city ZIP codes differ; use the lookup.` },
    { q: 'Is home insurance cheap in Ohio?', a: `Below average. The typical Ohio ZIP code paid ${K.usd(st.prem[4])} per policy in ${yr(4)}, against ${K.usd(N.prem[4])} nationally, and the range between the cheapest and dearest tenth of ZIP codes was narrow. Insurers paid out ${K.pct(st.lr, 0)} of premium in claims over the five years.` },
    { q: 'How much is homeowners insurance in Cleveland?', a: `The typical ZIP code of Cuyahoga County paid ${K.usd(cuy.prem)} per policy in ${yr(4)}. The county holds both the cheapest ZIP code in Ohio, ${lo[0].zip} at ${K.usd(lo[0].prem)}, and the dearest, ${hi[0].zip} at ${K.usd(hi[0].prem)}, so the lookup by ZIP code matters more than the county figure.` },
  ],
  related: ['how-much-dwelling-coverage', 'state:michigan', 'state:pennsylvania', 'state:indiana'],
});
