import { defineState } from '../../lib/page-types';
import { ctx } from './_ctx';

const { K, N, st, c, regLink, planLink, hi, lo, yr } = ctx('delaware');
const nc = c('New Castle County'), sus = c('Sussex County'), kent = c('Kent County');

export default defineState({
  slug: 'delaware',
  title: 'Homeowners Insurance Delaware 2026: Low Prices by County',
  description: `Homeowners insurance in Delaware 2026: premium per policy in New Castle, Kent and Sussex and by ZIP code, 2018 to 2022, beach ZIP codes and the FAIR Plan.`,
  intro: `Delaware's median ZIP code paid ${K.usd(st.prem[4])} per policy in ${yr(4)}, among the lowest of any state, ranked ${st.rankPrem} of 51.`,
  resume: `Delaware is one of the cheapest states for homeowners insurance in the Treasury file. Its ${st.zips} ZIP codes had a median premium per policy of ${K.usd(st.prem[4])} in ${yr(4)}, ranked ${st.rankPrem} of 51 and well below the national ${K.usd(N.prem[4])}. Prices rose ${K.sgn(st.chg)} after inflation from ${yr(0)}. The three counties are close together: New Castle County in the north paid ${K.usd(nc.prem)}, Kent County ${K.usd(kent.prem)} and Sussex County, with the Atlantic beaches, ${K.usd(sus.prem)}. The dearest ZIP code was ${hi[0].zip} near Wilmington, ${K.usd(hi[0].prem)}, ahead of the beach ZIP code ${hi[1].zip}. Nonrenewals were erratic, from ${K.rate(st.nonren[0])} in ${yr(0)} to ${K.rate(st.nonren[1])} the next year, and ${K.rate(st.nonren[4])} in ${yr(4)}. The paid loss ratio peaked at ${K.pct(st.lrY[2], 0)} in ${yr(2)}. The Delaware FAIR Plan writes homes private insurers decline. The data stop in ${yr(4)}.`,
  body: (h) => `
<h2>A small state with a narrow range</h2>
<p>With only three counties, Delaware's premiums move together. New Castle County's ${nc.zips} ZIP codes rose ${K.sgn(nc.chg ?? 0)} after inflation from ${yr(0)} to ${yr(4)}, Kent County's ${kent.zips} rose ${K.sgn(kent.chg ?? 0)} and Sussex County's ${sus.zips} rose ${K.sgn(sus.chg ?? 0)}. The cheapest tenth of ZIP codes paid under ${K.usd(st.p10)} and the dearest tenth over ${K.usd(st.p90)}, one of the tightest ranges in the country. ZIP ${lo[0].zip} in ${lo[0].county} paid ${K.usd(lo[0].prem)}, and ${lo[1].zip} in ${lo[1].county} ${K.usd(lo[1].prem)}.</p>
<h2>Wilmington's château country and the beaches</h2>
<p>The highest premium per policy in the state was not at the beach. ZIP ${hi[0].zip}, in the wooded estates west of Wilmington, paid ${K.usd(hi[0].prem)}: large houses carry large dwelling limits. ZIP ${hi[1].zip} in ${hi[1].county}, on the coast, paid ${K.usd(hi[1].prem)}. Coastal Sussex County homes face nor'easters and the occasional hurricane, and many policies there carry a separate wind or hurricane deductible. Flood, which drives much of the beach risk, is a separate policy everywhere.</p>
${h.mini('state', { t: 'Delaware against Maryland or New Jersey', p: ['sx', 'mine'], d: { sx: 'delaware' } })}
<h2>Claims and the ${yr(2)} spike</h2>
<p>Delaware's paid claims ran at ${K.dec(st.freq * 100, 1)} per 100 policies a year, ranked ${st.rankFreq} of 51. In ${yr(2)} the rate rose to ${K.dec(st.freqY[2] * 100, 1)} and the paid loss ratio to ${K.pct(st.lrY[2], 0)}, the year Tropical Storm Isaias crossed the state. By ${yr(4)} the ratio had fallen to ${K.pct(st.lrY[4], 0)}. The average claim over the five years was ${K.usd(st.sev)}, close to the national ${K.usd(N.sev)}. With claims that size and a premium near ${K.usd(st.prem[4])}, a small repair close to the deductible is often better paid out of pocket, as the ${h.a('should-i-file-a-home-insurance-claim', 'claim calculator')} shows.</p>
<h2>Nonrenewals and the FAIR Plan</h2>
<p>Delaware's nonrenewal rate swung more than in larger states, as it can when a single insurer changes course in a small market. The ${planLink(0)} writes a basic dwelling fire policy for homes that cannot be placed elsewhere. The ${regLink()} reviews rates and handles complaints. The ${h.a('home-insurance-non-renewal', 'nonrenewal page')} explains notice rules and next steps.</p>
`,
  faqs: [
    { q: 'Is home insurance cheap in Delaware?', a: `Compared with most states, yes. The median Delaware ZIP code paid ${K.usd(st.prem[4])} per policy in ${yr(4)}, ranked ${st.rankPrem} of 51, against ${K.usd(N.prem[4])} nationally. At ${K.ppiMonth} prices that is about ${K.usd(K.today(st.prem[4]))}. Beach and estate ZIP codes pay much more than the median.` },
    { q: 'What does homeowners insurance cost in Sussex County, Delaware?', a: `The median ZIP code of Sussex County paid ${K.usd(sus.prem)} per policy in ${yr(4)}, after a rise of ${K.sgn(sus.chg ?? 0)} after inflation from ${yr(0)}. Oceanfront areas pay more, and a flood policy, which is separate, can cost more than the homeowners premium itself near the water.` },
    { q: 'Why did Delaware nonrenewals jump in 2018?', a: `The Treasury file shows a median nonrenewal rate of ${K.rate(st.nonren[0])} in ${yr(0)}, against ${K.rate(st.nonren[1])} in ${yr(1)}. In a state with only ${st.zips} ZIP codes in the file, one insurer leaving a line of business moves the median a lot. The rate settled at ${K.rate(st.nonren[4])} by ${yr(4)}.` },
  ],
  related: ['state:maryland', 'state:new-jersey', 'home-insurance-non-renewal', 'homeowners-insurance-by-state'],
});
