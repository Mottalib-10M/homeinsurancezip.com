import { defineState } from '../../lib/page-types';
import { ctx } from './_ctx';

const { K, N, st, c, regLink, planLink, hi, lo, yr } = ctx('washington');
const king = c('King County'), pie = c('Pierce County'), spo = c('Spokane County'), sno = c('Snohomish County');

export default defineState({
  slug: 'washington',
  title: 'Homeowners Insurance Washington 2026: Seattle and Spokane',
  description: `Homeowners insurance in Washington State 2026: premium per policy by ZIP code and county, 2018 to 2022, King, Pierce, Spokane, large claims, earthquake.`,
  intro: `Washington's typical ZIP code paid ${K.usd(st.prem[4])} per homeowners insurance policy in ${yr(4)}, below average, but its average claim, ${K.usd(st.sev)}, ranked ${st.rankSev} of the 50 states and DC.`,
  resume: `Washington State homeowners paid ${K.usd(st.prem[4])} per policy in the typical ZIP code in ${yr(4)} in the Treasury file, ranked ${st.rankPrem} of the 50 states and DC and below the national ${K.usd(N.prem[4])}, after a rise of ${K.sgn(st.chg)} after inflation. Claims were rare, ${K.dec(st.freq * 100, 1)} per 100 policies a year, ranked ${st.rankFreq}, but large, ${K.usd(st.sev)} on average, ranked ${st.rankSev}, the profile of fire and water losses on houses with high rebuild costs. The paid loss ratio rose from ${K.pct(st.lrY[0], 0)} in ${yr(0)} to ${K.pct(st.lrY[4], 0)} in ${yr(4)}, with wildfire seasons east of the Cascades among the reasons. King County paid ${K.usd(king.prem)}, with Medina's ${hi[0].zip} the dearest ZIP code in the state at ${K.usd(hi[0].prem)}; Spokane County ${K.usd(spo.prem)}. Nonrenewals were ${K.rate(st.nonren[4])} in ${yr(4)}. Earthquake is excluded from standard policies. The Washington FAIR Plan covers homes declined elsewhere. The data stop in ${yr(4)}.`,
  body: (h) => `
<h2>Puget Sound</h2>
<p>King County had ${king.zips} ZIP codes in the file and a typical figure of ${K.usd(king.prem)} in ${yr(4)}, up ${K.sgn(king.chg ?? 0)} after inflation. Pierce County paid ${K.usd(pie.prem)} and Snohomish ${K.usd(sno.prem)}. ZIP ${hi[0].zip}, Medina on Lake Washington, paid ${K.usd(hi[0].prem)}, and ${hi[1].zip} in ${hi[1].county}, the islands, ${K.usd(hi[1].prem)}. Rebuilding costs around Seattle are among the highest in the country, which helps explain the size of the average claim; the ${h.a('how-much-dwelling-coverage', 'dwelling coverage calculator')} checks whether a limit keeps up.</p>
<p>A Seattle-area house, limit against rebuild cost: the ${h.a('how-much-dwelling-coverage', 'rebuild cost calculator')} runs it with your own figures.</p>
<h2>Earthquake</h2>
<p>Western Washington sits on the Cascadia subduction zone and on shallow faults under Seattle. Standard homeowners policies exclude earthquake, and an endorsement or a separate policy adds it, usually with a deductible of 10 percent or more of the dwelling limit. Few households carry it. Houses not bolted to their foundations, and older brick chimneys, are the most exposed; retrofitting them can make coverage cheaper. If you buy it, check whether the deductible applies separately to the house and to its contents, and whether masonry veneer is excluded.</p>
<h2>East of the Cascades</h2>
<p>Spokane County paid ${K.usd(spo.prem)} after a rise of ${K.sgn(spo.chg ?? 0)}, and its ZIP ${lo[1].zip} was among the cheapest in the state at ${K.usd(lo[1].prem)}; the cheapest overall was ${lo[0].zip} in ${lo[0].county}, ${K.usd(lo[0].prem)}. Wildfire is the risk insurers watch in the eastern foothills and the Okanogan and Chelan valleys. Hail is less common than on the Plains, but summer storms reach Spokane, and winter brings frozen pipes across the inland half of the state.</p>
<h3>Renewals and the FAIR Plan</h3>
<p>The typical nonrenewal rate went ${st.nonren.map((x) => K.rate(x)).join(', ')} from ${yr(0)} to ${yr(4)}, ranked ${st.rankNonren} of the 50 states and DC. Cancellations for nonpayment were low, ${K.rate(st.npc)}. The ${planLink(0)} writes a dwelling fire policy, with wind and hail by endorsement, for homes that cannot find a private insurer. The office of the ${regLink()} handles complaints.</p>
`,
  faqs: [
    { q: 'How much is homeowners insurance in Seattle?', a: `The typical ZIP code of King County, which includes Seattle, paid ${K.usd(king.prem)} per policy in ${yr(4)}, after a rise of ${K.sgn(king.chg ?? 0)} after inflation from ${yr(0)}. At ${K.ppiMonth} prices that is about ${K.usd(K.today(king.prem))}. Earthquake coverage, if added, is extra. The lookup on the home page gives each ZIP code with its five years.` },
    { q: 'Should I buy earthquake insurance in Washington State?', a: `Many owners in western Washington should at least price it. Standard homeowners policies exclude earthquake, and the region sits on the Cascadia subduction zone and the Seattle fault. Coverage usually has a deductible of 10 percent or more of the dwelling limit, so compare it with what you could absorb.` },
    { q: 'Why are Washington home insurance claims so large?', a: `The average paid claim in Washington from ${yr(0)} to ${yr(4)} was ${K.usd(st.sev)}, ranked ${st.rankSev} of the 50 states and DC in the Treasury file, while claims were rare. High rebuilding costs around Puget Sound, fire, and water damage in long, wet winters make each claim expensive.` },
  ],
  related: ['how-much-dwelling-coverage', 'state:oregon', 'state:idaho', 'state:alaska'],
});
