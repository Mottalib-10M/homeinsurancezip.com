import { defineState } from '../../lib/page-types';
import { ctx } from './_ctx';

const { K, N, st, c, regLink, hi, lo, yr } = ctx('alaska');
const anc = c('Anchorage Municipality'), mat = c('Matanuska-Susitna Borough'), ken = c('Kenai Peninsula Borough'), fbx = c('Fairbanks North Star Borough');

export default defineState({
  slug: 'alaska',
  title: 'Homeowners Insurance Alaska 2026: Few Claims, Large Ones',
  description: `Homeowners insurance in Alaska 2026: premium per policy by ZIP code and borough from 2018 to 2022, the largest average claim of any state, and nonrenewal rates.`,
  intro: `Alaska's median ZIP code paid ${K.usd(st.prem[4])} per homeowners insurance policy in ${yr(4)}, but its average paid claim, ${K.usd(st.sev)}, was the largest of any state.`,
  resume: `Only ${st.zips} Alaska ZIP codes reach the Treasury file's threshold of ten insurers and fifty policies, most of them around Anchorage, the Mat-Su valley, the Kenai Peninsula and Fairbanks. Their median premium per policy was ${K.usd(st.prem[4])} in ${yr(4)}, ranked ${st.rankPrem} of 51, and it fell ${K.sgn(st.chg)} after inflation from ${yr(0)}, one of the few declines in the country. The pattern behind it is unusual: Alaska had the fewest paid claims per policy of any state, ${K.dec(st.freq * 100, 1)} per 100 a year, and the largest average claim, ${K.usd(st.sev)}. Fire in a cold climate, frozen pipes and long repair seasons with costly freight make each loss expensive. Nonrenewals were rare, ${K.rate(st.nonren[4])} in ${yr(4)}. Alaska has no FAIR plan for homes. Remote communities outside the file may pay very different prices, and the data stop in ${yr(4)}.`,
  body: (h) => `
<h2>Four areas carry the file</h2>
<p>The Municipality of Anchorage has ${anc.zips} of the state's ZIP codes in the file, with a median of ${K.usd(anc.prem)} in ${yr(4)}, down ${K.sgn(anc.chg ?? 0)} after inflation. The Matanuska-Susitna Borough paid ${K.usd(mat.prem)}, the Kenai Peninsula Borough ${K.usd(ken.prem)} and the Fairbanks North Star Borough ${K.usd(fbx.prem)}. Prices are close together: the cheapest tenth of ZIP codes paid under ${K.usd(st.p10)}, the dearest tenth over ${K.usd(st.p90)}. ZIP ${lo[0].zip} in ${lo[0].county} was the cheapest at ${K.usd(lo[0].prem)}; ZIP ${hi[0].zip} in the ${hi[0].county} the dearest at ${K.usd(hi[0].prem)}.</p>
<h2>Rare claims, expensive claims</h2>
<p>A paid claim rate of ${K.dec(st.freq * 100, 1)} per 100 policies means one claim per policy every ${K.num(1 / st.freq)} years or so on average, against every ${K.num(1 / N.freq)} years nationally. There is little hail and no hurricane season. But when a claim is paid, it averages ${K.usd(st.sev)}, about double the national ${K.usd(N.sev)}: a house fire with a long distance to the nearest fire station, a heating failure in deep winter, or water damage from a frozen line. Building materials shipped north and a short construction season raise the cost of any repair.</p>
${h.mini('coins', { t: 'An Alaska house: limit against rebuild cost', p: ['rc', 'lim', 'loss'], d: { rc: 450000, lim: 330000, loss: 120000 } })}
<h2>What this means for the policy</h2>
<p>With rare but large losses, the dwelling limit matters more than the deductible. A limit that has drifted below the cost to rebuild can cut a partial claim in proportion, as the calculator above shows, and the ${h.a('how-much-dwelling-coverage', 'dwelling coverage page')} explains the rule. Earthquake is excluded from standard homeowners policies, and in Southcentral Alaska it is worth asking for a separate endorsement or policy.</p>
<h2>Renewals and the regulator</h2>
<p>The nonrenewal rate fell from ${K.rate(st.nonren[0])} in ${yr(0)} to ${K.rate(st.nonren[4])} in ${yr(4)}, ranked ${st.rankNonren} of 51. The ${regLink()} handles rate filings and complaints. Alaska has no residual market plan for homes listed in the Treasury report, so a house that no admitted insurer will take must look to surplus lines insurers, whose policies are outside the file.</p>
`,
  faqs: [
    { q: 'Why are home insurance claims so large in Alaska?', a: `In the Treasury file, Alaska's average paid claim over ${yr(0)} to ${yr(4)} was ${K.usd(st.sev)}, the highest of any state. Claims are rare there, so the ones that occur are often fires and winter water damage, which are costly. Freight, a short building season and distance to contractors add to every repair bill.` },
    { q: 'How much is homeowners insurance in Anchorage?', a: `The median ZIP code of the Municipality of Anchorage paid ${K.usd(anc.prem)} per policy in ${yr(4)}, below the national median of ${K.usd(N.prem[4])}. Carried with the BLS price index to ${K.ppiMonth}, that is about ${K.usd(K.today(anc.prem))}. Your quote depends on your house and coverage choices.` },
    { q: 'Does Alaska have a FAIR plan for homeowners?', a: `No residual market plan for homes is listed for Alaska in the Treasury report. A home that admitted insurers decline can usually be placed with a surplus lines insurer through a licensed agent. Those policies are not regulated on rates the same way and are not in the Treasury figures.` },
  ],
  related: ['how-much-dwelling-coverage', 'should-i-file-a-home-insurance-claim', 'state:washington', 'homeowners-insurance-by-state'],
});
