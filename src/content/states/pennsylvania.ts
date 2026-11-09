import { defineState } from '../../lib/page-types';
import { ctx } from './_ctx';

const { K, N, st, c, regLink, planLink, hi, lo, yr } = ctx('pennsylvania');
const alle = c('Allegheny County'), west = c('Westmoreland County'), mont = c('Montgomery County'), wash = c('Washington County');

export default defineState({
  slug: 'pennsylvania',
  title: 'Homeowners Insurance Pennsylvania 2026: Lowest State Median',
  description: `Homeowners insurance in Pennsylvania 2026: premium per policy by ZIP code and county, 2018 to 2022, the lowest state median, Pittsburgh, the Main Line.`,
  intro: `Pennsylvania's median ZIP code paid ${K.usd(st.prem[4])} per policy in ${yr(4)}, the lowest of any state, across ${K.num(st.zips)} ZIP codes.`,
  resume: `Pennsylvania had the lowest median homeowners premium of any state in the Treasury file: ${K.usd(st.prem[4])} per policy in ${yr(4)}, against ${K.usd(N.prem[4])} nationally, across ${K.num(st.zips)} ZIP codes. It barely moved after inflation from ${yr(0)}, ${K.sgn(st.chg)}. The reasons are in the claims: insurers paid ${K.dec(st.freq * 100, 1)} claims per 100 policies a year, at ${K.usd(st.sev)} on average, ranked ${st.rankSev} of 51 for size, and the paid loss ratio never passed ${K.pct(Math.max(...st.lrY), 0)}. Allegheny County, Pittsburgh, paid ${K.usd(alle.prem)} and Westmoreland ${K.usd(west.prem)}, both below the state median. The southeast pays more: Montgomery County ${K.usd(mont.prem)}, and its ZIP ${hi[0].zip} on the Main Line ${K.usd(hi[0].prem)}. Nonrenewals were among the lowest, ${K.rate(st.nonren[4])}. The Insurance Placement Facility of Pennsylvania covers homes declined elsewhere. The data stop in ${yr(4)}, and the national price index rose fast after.`,
  body: (h) => `
<h2>Western Pennsylvania</h2>
<p>Allegheny County had ${alle.zips} ZIP codes in the file, the most of any county in the state, and a median of ${K.usd(alle.prem)} in ${yr(4)}. Westmoreland County paid ${K.usd(west.prem)} and Washington County ${K.usd(wash.prem)}. Older houses on hilly lots are common around Pittsburgh, and the cost to rebuild them can exceed what they would sell for, which makes the dwelling limit worth checking. Coal mining under parts of the region causes subsidence, which homeowners policies exclude; the state runs a separate mine subsidence insurance program.</p>
<h2>Philadelphia's suburbs</h2>
<p>Montgomery County paid ${K.usd(mont.prem)}, after a rise of ${K.sgn(mont.chg ?? 0)}. The dearest ZIP codes in the state were ${hi[0].zip}, Gladwyne, at ${K.usd(hi[0].prem)} and ${hi[1].zip} in ${hi[1].county}, at ${K.usd(hi[1].prem)}: large houses with high limits. The cheapest were ${lo[0].zip} in ${lo[0].county} at ${K.usd(lo[0].prem)} and ${lo[1].zip} in ${lo[1].county} at ${K.usd(lo[1].prem)}. The state's dearest tenth of ZIP codes paid over ${K.usd(st.p90)}, but the cheapest tenth paid under ${K.usd(st.p10)}.</p>
${h.mini('rise', { t: 'A Pennsylvania premium carried to today', p: ['p22', 'now'], d: { p22: 1015 } })}
<h2>Why losses stayed low</h2>
<p>Paid claims per 100 policies went ${st.freqY.map((x) => K.dec(x * 100, 1)).join(', ')} from ${yr(0)} to ${yr(4)}, and the paid loss ratio ${st.lrY.map((x) => K.pct(x, 0)).join(', ')}. Pennsylvania has little hail compared with the Plains, no hurricane coast, and few wildfires. Its claims are mostly winter water damage, wind and fire. The remnants of Ida in ${yr(3)} flooded parts of the southeast, but flood from rising water is not covered by homeowners policies and does not appear in these figures. With small claims, a repair close to the deductible is often better paid directly; the ${h.a('should-i-file-a-home-insurance-claim', 'claim calculator')} compares the two.</p>
<h2>Renewals and the placement facility</h2>
<p>The median nonrenewal rate stayed low, ${K.rate(st.nonren[4])} in ${yr(4)}, ranked ${st.rankNonren} of 51, as did cancellations for nonpayment, ${K.rate(st.npc)}. The ${planLink(0)} is the state's FAIR plan, writing basic and broad dwelling fire policies for homes that cannot find a private insurer. The ${regLink()} reviews rates and complaints.</p>
`,
  faqs: [
    { q: 'Why is homeowners insurance so cheap in Pennsylvania?', a: `Low losses. Pennsylvania insurers paid ${K.dec(st.freq * 100, 1)} claims per 100 policies a year from ${yr(0)} to ${yr(4)}, at an average of ${K.usd(st.sev)}, among the smallest in the country, with no hurricane coast and less hail than the Plains. The median ZIP code paid ${K.usd(st.prem[4])} per policy in ${yr(4)}.` },
    { q: 'How much is homeowners insurance in Pittsburgh?', a: `The median ZIP code of Allegheny County, which includes Pittsburgh, paid ${K.usd(alle.prem)} per policy in ${yr(4)}, below the Pennsylvania median, after a rise of ${K.sgn(alle.chg ?? 0)} after inflation from ${yr(0)}. At ${K.ppiMonth} prices that is about ${K.usd(K.today(alle.prem))}. The lookup gives each Pittsburgh ZIP code.` },
    { q: 'Does Pennsylvania homeowners insurance cover mine subsidence?', a: `No. Damage from the ground sinking over old mines is excluded from standard homeowners policies. Pennsylvania runs a state mine subsidence insurance program that sells separate coverage at a low price, mostly in the coal regions of the west and northeast. Check whether your address is over a mined area.` },
  ],
  related: ['should-i-file-a-home-insurance-claim', 'state:ohio', 'state:new-jersey', 'homeowners-insurance-by-state'],
});
