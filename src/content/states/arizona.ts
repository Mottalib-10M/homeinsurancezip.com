import { defineState } from '../../lib/page-types';
import { ctx } from './_ctx';

const { K, N, st, c, regLink, hi, lo, yr } = ctx('arizona');
const mar = c('Maricopa County'), pima = c('Pima County'), pinal = c('Pinal County'), yav = c('Yavapai County');

export default defineState({
  slug: 'arizona',
  title: 'Homeowners Insurance Arizona 2026: Low Premiums, More Drops',
  description: `Homeowners insurance in Arizona 2026: premium per policy by ZIP code and county, 2018 to 2022, rising nonrenewals and the Yavapai and Maricopa increases.`,
  intro: `Arizona premiums were low, ${K.usd(st.prem[4])} in the median ZIP code in ${yr(4)}, but nonrenewals rose to ${K.rate(st.nonren[4])}, ranked ${st.rankNonren} of 51.`,
  resume: `Arizona is a cheap state for homeowners insurance that became less so. The median ZIP code paid ${K.usd(st.prem[4])} per policy in ${yr(4)}, ranked ${st.rankPrem} of 51 and well below the national ${K.usd(N.prem[4])}. But the figure rose ${K.sgn(st.chg)} after inflation from ${yr(0)}, and the share of policies insurers declined to renew climbed from ${K.rate(st.nonren[0])} to ${K.rate(st.nonren[4])}, among the highest rates in the country. Insurers paid out more too: the paid loss ratio went from ${K.pct(st.lrY[0], 0)} to ${K.pct(st.lrY[4], 0)}. Maricopa County, with ${mar.zips} ZIP codes, rose ${K.sgn(mar.chg ?? 0)} to ${K.usd(mar.prem)}; Yavapai County, with its forested hills around Prescott, rose ${K.sgn(yav.chg ?? 0)}. The dearest ZIP code, ${hi[0].zip} in Maricopa, paid ${K.usd(hi[0].prem)}. Arizona has no FAIR plan for homes, so a home that no admitted insurer will renew goes to the surplus lines market. The data stop in ${yr(4)}.`,
  body: (h) => `
<h2>Phoenix, Tucson and the fringe</h2>
<p>Maricopa County dominates the file with ${mar.zips} ZIP codes and a median of ${K.usd(mar.prem)} in ${yr(4)}. Pima County, around Tucson, paid ${K.usd(pima.prem)} and Pinal County ${K.usd(pinal.prem)}, while ${lo[0].zip} in ${lo[0].county} was the cheapest ZIP code in the state at ${K.usd(lo[0].prem)}. At the other end, ${hi[0].zip} and ${hi[1].zip}, both in Maricopa, paid ${K.usd(hi[0].prem)} and ${K.usd(hi[1].prem)}: large houses in Paradise Valley and the north Scottsdale hills, where the dwelling limit explains most of the price. The spread inside the state is wide, from under ${K.usd(st.p10)} to over ${K.usd(st.p90)}. Yavapai County, with ${yav.zips} ZIP codes, paid ${K.usd(yav.prem)}, close to Phoenix, but its rise of ${K.sgn(yav.chg ?? 0)} was the fastest of the large counties.</p>
<h2>Nonrenewals climbed after ${yr(3)}</h2>
<p>Arizona's nonrenewal rate held near ${K.rate(st.nonren[1])} for three years, then rose to ${K.rate(st.nonren[3])} in ${yr(3)} and ${K.rate(st.nonren[4])} in ${yr(4)}. That is double the national median and ranks the state ${st.rankNonren} of 51. Wildfire exposure in the high country, monsoon hail and wind in the valleys, and the age of roofs are the reasons insurers usually give.</p>
${h.mini('nonrenew', { t: 'Arizona: odds of a nonrenewal ahead', p: ['sx', 'yrs'], d: { sx: 'arizona', yrs: 8 } })}
<h2>Losses rose year after year</h2>
<p>Paid claims per 100 policies went from ${K.dec(st.freqY[0] * 100, 1)} in ${yr(0)} to ${K.dec(st.freqY[4] * 100, 1)} in ${yr(4)}, and the paid loss ratio from ${K.pct(st.lrY[0], 0)} to ${K.pct(st.lrY[4], 0)}. The average claim, ${K.usd(st.sev)}, was below the national figure. Monsoon storms bring hail and wind damage to roofs, and many Arizona roofs are tile or foam with long lives, which matters if your insurer settles roofs on a schedule; see the ${h.a('roof-claim-actual-cash-value', 'roof claim page')}.</p>
<h2>No FAIR plan</h2>
<p>Arizona has no residual market plan for homes listed in the Treasury report. A house that admitted insurers will not renew, often near forest land, moves to the surplus lines market through a licensed agent. The ${regLink()} handles complaints about nonrenewal notices and claims. Before that step, a written request to the insurer for the specific reason, and proof of any repair, settles many cases.</p>
`,
  faqs: [
    { q: 'Why are insurers not renewing homes in Arizona?', a: `The Treasury file shows Arizona's median nonrenewal rate rising from ${K.rate(st.nonren[0])} in ${yr(0)} to ${K.rate(st.nonren[4])} in ${yr(4)}, while the paid loss ratio rose from ${K.pct(st.lrY[0], 0)} to ${K.pct(st.lrY[4], 0)}. Wildfire risk near forests, storm damage to roofs and rising repair costs are the reasons insurers usually cite.` },
    { q: 'How much is homeowners insurance in Phoenix?', a: `The median ZIP code of Maricopa County, which includes Phoenix, paid ${K.usd(mar.prem)} per policy in ${yr(4)}. That is below the national median of ${K.usd(N.prem[4])}. At ${K.ppiMonth} prices it would be about ${K.usd(K.today(mar.prem))}. Enter a ZIP code in the lookup for a single neighborhood.` },
    { q: 'What can I do if my Arizona home insurance is not renewed?', a: `Ask the insurer for the reason in writing, fix it if you can, such as a roof or brush near the house, and get quotes at once from other insurers through an independent agent. Arizona has no FAIR plan for homes, so the fallback is a surplus lines policy, usually with narrower coverage.` },
  ],
  related: ['home-insurance-non-renewal', 'roof-claim-actual-cash-value', 'state:nevada', 'state:utah'],
});
