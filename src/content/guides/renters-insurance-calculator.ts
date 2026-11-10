import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const N = K.N;
const T = N.index.tenants;
const since22 = K.idxGrowth(T, 2022);
const ppi22 = K.idxGrowth(N.index.ppi, 2022);
const cpi22 = K.idxGrowth(N.index.cpi, 2022);
const ex = K.E.rentersNeed([6000, 3500, 4000, 2500, 2000], 0.4);
const limit = Math.ceil(ex.total / 5000) * 5000;
const rooms = [
  ['Living room', 'Sofa, chairs, tables, lamps, rugs, television, speakers', '$3,000 to $10,000'],
  ['Bedrooms', 'Beds, mattresses, dressers, bedding, clothes, shoes', '$3,000 to $12,000 each'],
  ['Kitchen', 'Small appliances, cookware, dishes, food', '$1,500 to $5,000'],
  ['Work and study', 'Laptop, monitor, printer, desk, chair, books', '$1,500 to $6,000'],
  ['Storage and outdoor', 'Bicycle, tools, luggage, sports equipment', '$500 to $4,000'],
];

export default defineGuide({
  id: 'renters-insurance-calculator', group: 'renters', order: 10, slug: 'renters-insurance-calculator',
  nav: 'How much renters insurance', card: 'The personal property limit from a room-by-room inventory, at replacement cost or actual cash value.',
  title: 'Renters Insurance Calculator 2026: How Much Coverage to Get',
  description: `Renters insurance calculator 2026: set the personal property limit from an inventory, compare replacement cost and actual cash value, and see the price index.`,
  h1: 'Renters insurance calculator: how much coverage you need',
  intro: `An apartment with ${K.usd(ex.total)} of belongings needs renters insurance with a ${K.usd(limit)} personal property limit; an actual cash value policy would pay about ${K.usd(ex.acv)} on a total loss.`,
  resume: `A renters policy (insurers call it the HO-4 form) covers your belongings, your liability and extra living costs if the apartment becomes unlivable; the landlord's policy covers only the building. The coverage you choose is the personal property limit, and the way to set it is an inventory at today's replacement prices. A one-bedroom with ${K.usd(6000)} of furniture, ${K.usd(3500)} of electronics, ${K.usd(4000)} of clothes, ${K.usd(2500)} of kitchen goods and ${K.usd(2000)} of other items adds up to ${K.usd(ex.total)}, so a ${K.usd(limit)} limit. Choose replacement cost if you can: an actual cash value policy deducts wear, and at 40 percent average wear it would pay about ${K.usd(ex.acv)} on a total loss. The Treasury file has no renters data, so this site does not show a price by ZIP code. The BLS consumer price index for tenants' and household insurance rose ${K.sgn(since22)} from ${N.years[4]} to ${K.ppiMonth}, slower than homeowners insurance (${K.sgn(ppi22)}).`,
  body: (h) => `
<h2>What renters insurance covers</h2>
<p>Most renters policies have three main parts. Personal property pays to repair or replace your belongings after a covered cause of damage such as fire, smoke, theft, vandalism, windstorm or water from a burst pipe, usually anywhere in the world, not only in the apartment. Personal liability pays claims and legal costs if you injure someone or damage someone else's property, often with a ${K.usd(100000)} or ${K.usd(300000)} limit. Loss of use pays the extra cost of living elsewhere while the apartment is being repaired: the ${h.a('renters-insurance-loss-of-use', 'loss of use calculator')} checks whether your limit lasts. Flood and earthquake are excluded and need separate policies.</p>
<p>The liability part is often the most valuable and the least thought about. If a guest trips on your rug, or a fire that starts in your kitchen spreads to the unit next door, the claim against you can exceed the value of everything you own. A ${K.usd(300000)} limit usually costs little more than ${K.usd(100000)}. Damage you cause to the landlord's building is a liability matter too, which is why many leases set a minimum and ask that the landlord be told if the policy lapses; that does not give the landlord any coverage under your policy.</p>
<h2>Building the inventory</h2>
<p>Go room by room and price what it would cost to buy each item new today, not what you paid. People tend to underestimate clothes, kitchen goods and small items, which add up quickly. The ranges below are rough orders of magnitude to check your list against, not data; your own figures go in the calculator.</p>
${h.table(['Room', 'What to count', 'Typical order of magnitude'], rooms, 'Illustrative ranges for a check, not statistics. Enter your own values in the calculator.', ['l', 'l', 'r'])}
<p>Then choose how a claim is paid. An actual cash value policy pays what the item was worth at the time of the loss: a five-year-old sofa or laptop is worth a fraction of its price new. A replacement cost policy pays what it costs to buy a new equivalent, often after you have bought it and sent the receipt. The difference in premium is usually small next to the difference on a large claim. Inside the limit, policies cap some categories, often at ${K.usd(1500)} or ${K.usd(2500)} for theft of jewelry, watches, cash or collectibles; if a ring or a camera kit is worth more, list it on its own with a receipt or an appraisal. Keep the inventory as a phone video of every room, opening closets and drawers, updated once a year and stored outside the apartment.</p>
<h2>What renters insurance costs</h2>
<p>Renters insurance is one of the cheapest kinds of personal insurance, because the insurer does not cover the building. There is no federal file of renters premiums by ZIP code comparable to the Treasury homeowners data, so this site does not publish one; prices you read elsewhere come from insurer quotes or industry samples. What the government does publish is a price index for tenants' and household insurance (Bureau of Labor Statistics). It barely moved from ${N.years[0]} to ${N.years[4]} (${K.sgn(K.idxGrowth(T, 2018, 2022))}), then rose ${K.sgn(since22)} from ${N.years[4]} to ${K.ppiMonth}, while everyday prices rose ${K.sgn(cpi22)}. Your quote depends on the limit, the deductible, the city and the building.</p>
<p>A roommate's belongings are not covered by your policy unless the roommate is named on it, and sharing one policy also means sharing its limit and claims history. When you move, the policy moves with you: update the address and the limit before the move, since belongings in transit and in storage may have their own limits.</p>
<p>To buy a policy, ask two or three insurers for the same three figures: the personal property limit from the calculator above, a liability limit of at least ${K.usd(100000)}, and the deductible you could pay without trouble. Ask each one whether belongings are paid at replacement cost, and compare the yearly prices only once those terms match. A policy that looks cheap because it pays used-item prices is not the same product, and the difference shows only on the day you claim.</p>
`,
  faqs: [
    { q: 'How much personal property coverage do I need for renters insurance?', a: `As much as it would cost to replace everything you own at today's prices. Add up an inventory room by room, then round up; many people find they need ${K.usd(20000)} to ${K.usd(40000)} for a furnished apartment. List jewelry, collectibles and expensive equipment apart, since they have lower limits inside the policy.` },
    { q: 'Does renters insurance cover my roommate?', a: `Not automatically. A renters policy covers the named insured and resident relatives. An unrelated roommate needs to be named on the policy, if the insurer allows it, or to buy a separate policy. Sharing one policy also means sharing its limit and claims history, so separate policies are usually simpler.` },
    { q: 'Does renters insurance cover water damage from a neighbor?', a: `Damage to your belongings from a sudden leak, such as a burst pipe or an overflowing bathtub in the unit above, is usually covered under personal property, minus your deductible. Flooding from outside the building is not. Your insurer may then seek repayment from the neighbor's insurer.` },
  ],
  tool: 'renters',
  related: ['renters-insurance-loss-of-use', 'how-much-dwelling-coverage', 'should-i-file-a-home-insurance-claim', 'homeowners-insurance-cost-per-month'],
  sources: ['bls_cpi', 'bls_ppi'],
});
