import { defineState } from '../../lib/page-types';
import { ctx } from './_ctx';

const { K, N, st, regLink, planLink, hi, lo, yr } = ctx('district-of-columbia');

export default defineState({
  slug: 'district-of-columbia',
  title: 'Homeowners Insurance Washington DC 2026: Premium by ZIP Code',
  description: `Homeowners insurance in Washington, DC 2026: premium per policy in each ZIP code from 2018 to 2022, Northwest against Anacostia, claims and the DC facility.`,
  intro: `The District's median ZIP code paid ${K.usd(st.prem[4])} per policy in ${yr(4)}; ZIP ${hi[0].zip} paid ${K.usd(hi[0].prem)} and ${lo[0].zip} ${K.usd(lo[0].prem)}.`,
  resume: `Washington, DC appears in the Treasury file as ${st.zips} ZIP codes in one county-equivalent. Their median premium per homeowners policy was ${K.usd(st.prem[4])} in ${yr(4)}, a little above the national ${K.usd(N.prem[4])} and ranked ${st.rankPrem} of 51, and it barely moved after inflation from ${yr(0)}, ${K.sgn(st.chg)}. The spread inside the city is large: ZIP ${hi[0].zip} in upper Northwest paid ${K.usd(hi[0].prem)} per policy and ${hi[1].zip} ${K.usd(hi[1].prem)}, while ${lo[0].zip} and ${lo[1].zip}, east of the Anacostia River, paid ${K.usd(lo[0].prem)} and ${K.usd(lo[1].prem)}. The gap reflects the size and value of the houses more than the weather. Claims fell after a busy ${yr(0)}, when ${K.dec(st.freqY[0] * 100, 1)} claims were paid per 100 policies and the paid loss ratio was ${K.pct(st.lrY[0], 0)}. Rowhouse owners should check how the policy treats shared walls. The DC Property Insurance Facility covers homes private insurers decline. The data stop in ${yr(4)}.`,
  body: (h) => `
<h2>Northwest against east of the river</h2>
<p>In a city, the premium per policy mostly follows the house. Upper Northwest, with detached houses in Cleveland Park, Woodley Park and Forest Hills, carries the highest dwelling limits and the highest premiums: ${hi[0].zip} at ${K.usd(hi[0].prem)}. ZIP ${hi[1].zip}, around Dupont Circle, paid ${K.usd(hi[1].prem)}. In Wards 7 and 8, where rowhouses and smaller homes dominate, ${lo[0].zip} paid ${K.usd(lo[0].prem)} and ${lo[1].zip} ${K.usd(lo[1].prem)}. The cheapest tenth of District ZIP codes paid under ${K.usd(st.p10)}, the dearest tenth over ${K.usd(st.p90)}.</p>
<h2>A busy ${yr(0)}, then calmer years</h2>
<p>Paid claims were ${K.dec(st.freqY[0] * 100, 1)} per 100 policies in ${yr(0)}, a wet year with heavy summer rain, then ${K.dec(st.freqY[4] * 100, 1)} in ${yr(4)}. The paid loss ratio followed, from ${K.pct(st.lrY[0], 0)} down to ${K.pct(st.lrY[4], 0)}. Water is the common urban claim: a burst pipe, a backed-up sewer line or a roof leak in an older building. Sewer backup is excluded from many standard policies unless an endorsement is added, and it is a cheap one to buy in a city of old basements.</p>
${h.mini('claim', { t: 'A small water claim in the District', p: ['dmg', 'ded', 'pr'], d: { dmg: 3800, ded: 1000, pr: 2100 } })}
<h2>Rowhouses, condos and renters</h2>
<p>A rowhouse owner insures the whole structure under a homeowners policy, including its share of the party walls, while a condominium owner buys an HO-6 policy for the unit's interior and relies on the association's master policy for the building. The figures here cover HO-3 and HO-5 homeowners policies only. Many District households rent; the ${h.a('renters-insurance-calculator', 'renters calculator')} sizes a renters policy from an inventory.</p>
<h2>The DC facility and the regulator</h2>
<p>The ${planLink(0)} writes named-peril dwelling, homeowners, renters and condominium forms for properties that cannot find coverage elsewhere. The ${regLink()} licenses insurers and handles complaints. Nonrenewals in the median ZIP code were ${K.rate(st.nonren[4])} in ${yr(4)}, up from ${K.rate(st.nonren[3])} the year before, and cancellations for nonpayment ran at ${K.rate(st.npc)}, one of the lowest rates in the country. An owner who receives a notice can ask the facility for a quote while shopping private insurers, so there is no gap in coverage.</p>
`,
  faqs: [
    { q: 'How much is homeowners insurance in Washington, DC?', a: `The median District ZIP code paid ${K.usd(st.prem[4])} per policy in ${yr(4)} in the Treasury file, about ${K.usd(K.today(st.prem[4]))} at ${K.ppiMonth} prices. Upper Northwest ZIP codes paid more than twice that, and ZIP codes east of the river paid less. The lookup gives each ZIP code.` },
    { q: 'Does DC homeowners insurance cover sewer backup?', a: `Not on many standard policies, which exclude water that backs up through drains or sewers unless you add a water backup endorsement. In a city with many old basements and combined sewers, the endorsement is worth pricing. Flood from surface water is excluded too and needs a separate flood policy.` },
    { q: 'What is the DC Property Insurance Facility?', a: `It is the District's insurer of last resort, listed in the Treasury report. It writes named-peril dwelling, homeowners, renters and condominium policies for properties that cannot find coverage with a private insurer. Its policies are not in the Treasury premium data, which covers private insurers only.` },
  ],
  related: ['renters-insurance-calculator', 'state:maryland', 'state:virginia', 'should-i-file-a-home-insurance-claim'],
});
