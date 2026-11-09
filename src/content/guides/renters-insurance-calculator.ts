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
  intro: `An apartment with ${K.usd(ex.total)} of belongings needs a ${K.usd(limit)} personal property limit; an actual cash value policy would pay about ${K.usd(ex.acv)} on a total loss.`,
  resume: `A renters policy, the HO-4 form, covers your belongings, your liability to others and extra living costs if the apartment becomes unlivable; the landlord's policy covers only the building. The coverage you choose is the personal property limit, and the way to set it is an inventory at today's replacement prices. A one-bedroom with ${K.usd(6000)} of furniture, ${K.usd(3500)} of electronics, ${K.usd(4000)} of clothes, ${K.usd(2500)} of kitchen goods and ${K.usd(2000)} of other items adds up to ${K.usd(ex.total)}, so a ${K.usd(limit)} limit. Choose replacement cost if you can: an actual cash value policy deducts wear, and at 40 percent average wear it would pay about ${K.usd(ex.acv)} on a total loss. The Treasury file has no renters data, so this site does not show a price by ZIP code. The BLS consumer price index for tenants' and household insurance rose ${K.sgn(since22)} from ${N.years[4]} to ${K.ppiMonth}, slower than homeowners insurance (${K.sgn(ppi22)}).`,
  body: (h) => `
<h2>What a renters policy covers</h2>
<p>Most renters policies have three main parts. Personal property pays to repair or replace your belongings after a covered peril such as fire, smoke, theft, vandalism, windstorm or water from a burst pipe, usually anywhere in the world, not only in the apartment. Personal liability pays claims and legal costs if you injure someone or damage someone else's property, often with a ${K.usd(100000)} or ${K.usd(300000)} limit. Loss of use pays the extra cost of living elsewhere while the apartment is being repaired, covered on the ${h.a('renters-insurance-loss-of-use', 'loss of use page')}. Flood and earthquake are excluded and need separate policies.</p>
<h2>Building the inventory</h2>
<p>Go room by room and price what it would cost to buy each item new today, not what you paid. People tend to underestimate clothes, kitchen goods and small items, which add up quickly. The ranges below are rough orders of magnitude to check your list against, not data; your own figures go in the calculator.</p>
${h.table(['Room', 'What to count', 'Typical order of magnitude'], rooms, 'Illustrative ranges for a check, not statistics. Enter your own values in the calculator.', ['l', 'l', 'r'])}
${h.mini('ale', { t: 'If the apartment becomes unlivable: will loss of use cover it?', p: ['m', 'tr', 'lim'] })}
<h2>Replacement cost or actual cash value</h2>
<p>An actual cash value policy pays what the item was worth at the time of the loss: a five-year-old sofa or laptop is worth a fraction of its price new. A replacement cost policy pays what it costs to buy a new equivalent, often after you have bought it and sent the receipt. The difference in premium is usually small next to the difference on a large claim. The advanced field of the calculator sets the average wear of your belongings, and the result shows both payments on a total loss.</p>
<h2>Sublimits and what to list apart</h2>
<p>Inside the personal property limit, policies cap some categories: jewelry and watches, furs, cash, collectibles, firearms, silverware and sometimes electronics used for business, often at ${K.usd(1500)} or ${K.usd(2500)} per category for theft. If an engagement ring or a camera kit is worth more, schedule it on an endorsement with an appraisal or receipt; scheduled items are usually covered without a deductible and against more causes of loss. A roommate's belongings are not covered by your policy unless they are named on it.</p>
<h2>What it costs, and what the index shows</h2>
<p>Renters insurance is one of the cheapest lines of personal insurance, because the insurer does not cover the building. There is no federal file of renters premiums by ZIP code comparable to the Treasury homeowners data, so this site does not publish one; prices you read elsewhere come from insurer quotes or industry samples. What the BLS does publish is a price index for tenants' and household insurance. It barely moved from ${N.years[0]} to ${N.years[4]} (${K.sgn(K.idxGrowth(T, 2018, 2022))}), then rose ${K.sgn(since22)} from ${N.years[4]} to ${K.ppiMonth}, while consumer prices overall rose ${K.sgn(cpi22)} over the same years. Your quote depends on the limit, the deductible, the city and the building.</p>
<h2>Liability and medical payments</h2>
<p>The liability part is often the most valuable part of a renters policy and the least thought about. If a guest trips on your rug, or a fire that starts in your kitchen spreads to the unit next door, the claim against you can exceed the value of everything you own. A ${K.usd(300000)} limit usually costs little more than ${K.usd(100000)}. Medical payments to others, a small separate coverage, pays a guest's minor medical bills without a lawsuit. Damage you cause to the landlord's building is a liability matter too, which is why many leases set a minimum.</p>
<h2>Keeping the inventory useful</h2>
<p>An inventory is also the proof you will need on a claim. Walk through the apartment with a phone video once a year, open closets and drawers, and keep receipts for large purchases in an e-mail folder or cloud storage, outside the apartment. After a fire or a burglary, a list made beforehand settles a claim faster than one rebuilt from memory.</p>
<h2>Landlords and leases</h2>
<p>Many leases require renters insurance with a minimum liability limit and ask that the landlord be listed as an interested party, so it hears if the policy lapses. Listing the landlord does not give it coverage under your policy; it only receives notices. If a landlord offers its own program, compare its limits and deductible with a policy you buy yourself. When you move, the policy moves with you: update the address and the limit before the move, since belongings in transit and in storage may have their own limits.</p>
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
