import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const N = K.N;
const F = K.P.florida;
const fl = K.S('florida'), la = K.S('louisiana'), sc = K.S('south-carolina'), al = K.S('alabama'), ms = K.S('mississippi');
const cty = (s: typeof fl, n: string) => s.topCounties.find((c) => c.name === n)!;
const palm = cty(fl, 'Palm Beach County'), broward = cty(fl, 'Broward County'), charleston = cty(sc, 'Charleston County'), baldwin = cty(al, 'Baldwin County'), harrison = cty(ms, 'Harrison County');
const ex = K.E.hurricaneClaim({ coverageA: 350000, share: 0.02, flat: 1000, damage: 18000 });
const ex5 = K.E.hurricaneClaim({ coverageA: 350000, share: 0.05, flat: 1000, damage: 18000 });
/** The two-storm example of the mini-calculator (same defaults), read from the engine. */
const two = { used: 12000, damage: 30000, ...K.E.hurricaneClaim({ coverageA: 350000, share: 0.05, flat: 1000, damage: 30000, usedThisYear: 12000 }) };
const opts = F.hurricaneOptions.map((o) => [o < 1 ? K.pct(o, 0) + ' of Coverage A' : K.usd(o), K.usd(o < 1 ? 250000 * o : o), K.usd(o < 1 ? 400000 * o : o)]);

export default defineGuide({
  id: 'hurricane-deductible', group: 'policy', order: 5, slug: 'hurricane-deductible',
  nav: 'Hurricane, wind and hail deductibles', card: 'What a 2, 5 or 10 percent deductible costs on a storm claim, with the Florida once-a-year rule.',
  title: 'Hurricane Deductible Calculator 2026: 2%, 5% and 10% Cost',
  description: `Hurricane deductible calculator 2026: what a 2, 5 or 10 percent wind deductible keeps from a storm claim, the Florida once-a-year rule, and coastal premiums.`,
  h1: 'Hurricane, wind and hail deductibles: what a percentage costs on a claim',
  intro: `A 2 percent hurricane deductible on a ${K.usd(350000)} dwelling limit is ${K.usd(7000)}: on ${K.usd(18000)} of storm damage the insurer pays ${K.usd(ex.paid)}, not ${K.usd(ex.paidFlat)}.`,
  resume: `A hurricane, named storm or wind deductible is usually a percentage of the dwelling limit (the most the policy pays to rebuild the house, called Coverage A), not of the damage. On a house insured for ${K.usd(350000)}, a 2 percent deductible is ${K.usd(7000)} and a 5 percent one is ${K.usd(17500)}, against perhaps ${K.usd(1000)} for a kitchen fire. With ${K.usd(18000)} of roof and siding damage from a storm, the insurer pays ${K.usd(ex.paid)} at 2 percent and ${K.usd(ex5.paid)} at 5 percent. Florida law requires insurers to offer hurricane deductibles of ${K.usd(F.hurricaneOptions[0])}, 2, 5 and 10 percent, and applies the deductible once per calendar year to all hurricanes with the same insurer, which the calculator handles. Choosing a higher percentage lowers the premium, and premiums on the coast are the highest in the Treasury file: the median ZIP code of Palm Beach County paid ${K.usd(palm.prem)} per policy in ${N.years[4]}, against ${K.usd(N.prem[4])} nationally. The data stop in ${N.years[4]}.`,
  body: (h) => `
<h2>A percentage of the house, not of the damage</h2>
<p>The ordinary deductible, the one for fire, theft and every other loss (insurers call it the all-other-perils deductible), is a flat amount, often ${K.usd(1000)} or ${K.usd(2500)}. The hurricane deductible written on most coastal policies is a percentage, and the percentage applies to the dwelling limit printed on the declarations page. That is why it surprises people: on a modest storm claim, the deductible can take most of the payment. The table shows the amounts the Florida options produce for two common limits.</p>
${h.table(['Option required in Florida', `Dwelling limit ${K.usd(250000)}`, `Dwelling limit ${K.usd(400000)}`], opts, `Fla. Stat. 627.701(3)(a). The percentage is of the Coverage A limit.`, ['l', 'r', 'r'])}
<p>The calculator above also shows what the same claim would pay under the flat deductible. The difference, ${K.usd(ex.extra)} in the example of ${K.usd(18000)} of damage at 2 percent, is the part of the storm risk you have taken on in exchange for a lower premium.</p>
<h2>The Florida rules</h2>
<p>Florida's law (${h.src('fl_627_701', 'Florida Statutes, section 627.701')}) is the most detailed. Insurers must offer deductibles of ${K.usd(F.hurricaneOptions[0])}, 2 percent, 5 percent and 10 percent of the dwelling limit, and the hurricane deductible applies once per calendar year: when two hurricanes hit the same house in one season with the same insurer, the second claim uses whatever is left of the hurricane deductible, or the ordinary deductible if that is larger. The calculator's "More options" take the hurricane deductible you already paid on an earlier storm this year for that reason: in the example below, a first storm used ${K.usd(two.used)} of a ${K.usd(two.full)} deductible, so only ${K.usd(two.deductible)} is left for the second, and on ${K.usd(two.damage)} of damage the insurer pays ${K.usd(two.paid)}. The hurricane deductible applies only to losses from a hurricane as the policy defines it; a summer thunderstorm uses the ordinary deductible.</p>
${h.mini('hurricane', { t: `Two storms in one season, same ${K.usd(350000)} house, 5 percent deductible: the first storm already used ${K.usd(two.used)} of it`, p: ['p', 'd', 'u'], d: { p: 5, d: two.damage, u: two.used } })}
<h2>Other coastal states</h2>
<p>Most states from Texas to Maine allow percentage hurricane or named storm deductibles, with their own triggers, often a hurricane watch or warning issued by the National Weather Service, and their own limits on the percentages. Inland, many policies carry a percentage wind and hail deductible instead, which applies to any wind or hail loss and not only to named storms. The policy's deductible endorsement names the trigger; it is worth reading before the season, not after a storm.</p>
<h2>What coastal owners pay</h2>
<p>The Treasury file shows how much of the premium on the coast is storm risk. In ${N.years[4]}, the median ZIP code of Palm Beach County paid ${K.usd(palm.prem)} per policy and Broward ${K.usd(broward.prem)}, while ${fl.name} as a whole was at ${K.usd(fl.prem[4])}. Charleston County in ${sc.name} paid ${K.usd(charleston.prem)} against ${K.usd(sc.prem[4])} for the state; Baldwin County in ${al.name} ${K.usd(baldwin.prem)}; Harrison County in ${ms.name} ${K.usd(harrison.prem)}. In ${la.name}, the paid loss ratio reached ${K.pct(la.lrY[3], 0)} in ${N.years[3]}, the year of Hurricane Ida, with ${K.dec(la.freqY[3] * 100, 1)} paid claims per 100 policies. Many of these owners also have a wind pool or Citizens policy, which the file does not include, so the real cost is higher.</p>
<h2>Picking a hurricane deductible percentage</h2>
<p>A higher hurricane deductible lowers the premium; how much depends on the insurer and the area, and the only way to know is to ask for quotes at each option. The test is whether you could pay the deductible in cash after a storm, along with the costs a policy does not cover. If 5 percent of the dwelling limit is more than your emergency savings, the saving on the premium is buying risk you cannot carry. A lender may also cap the deductible you are allowed to choose. Remember that flood is a separate policy everywhere, and that storm surge damage is flood, not wind.</p>
<h2>Wind pools and split policies</h2>
<p>In parts of the coast, private insurers exclude wind entirely, and the owner buys wind coverage from a state pool such as the Texas Windstorm Insurance Association or a beach plan. Each policy then has its own deductible: the private one for fire and theft, the pool's for wind. Two deductibles on one storm are possible when both wind and another covered peril cause damage. The ${h.a('fair-plan-insurance', 'FAIR plan page')} lists the plans state by state, with the link to each one.</p>
<h2>Making a hurricane claim</h2>
<p>Photograph the damage before temporary repairs, keep receipts for tarps and boarding, and report the claim quickly. The insurer applies the hurricane deductible to the whole hurricane loss at the dwelling, other structures and contents together under most forms, not to each part separately. If the roof is old, the settlement may also be at actual cash value, which reduces the payment further, as the ${h.a('roof-claim-actual-cash-value', 'roof claim calculator')} shows.</p>
`,
  faqs: [
    { q: 'How is a 2 percent hurricane deductible calculated?', a: `It is 2 percent of the dwelling limit, Coverage A, on the declarations page, not 2 percent of the damage. A house insured for ${K.usd(350000)} has a ${K.usd(7000)} hurricane deductible. The insurer pays the hurricane damage above that amount, up to the policy limits.` },
    { q: 'Does the hurricane deductible apply twice if two storms hit in one year?', a: `In Florida, no. Fla. Stat. 627.701 applies the hurricane deductible once per calendar year to all hurricane losses with the same insurer or group; the second claim uses what is left of it, or the all-other-perils deductible if that is larger. Other states have their own rules, so read your policy.` },
    { q: 'Can I choose a flat hurricane deductible instead of a percentage?', a: `In Florida, insurers must offer a ${K.usd(F.hurricaneOptions[0])} hurricane deductible option along with 2, 5 and 10 percent, though eligibility rules apply and the premium is higher. In other states it depends on the insurer and the area; many coastal policies require a percentage. Ask the agent for the premium at each available option.` },
  ],
  tool: 'hurricane',
  related: ['roof-claim-actual-cash-value', 'fair-plan-insurance', 'should-i-file-a-home-insurance-claim', 'state:florida'],
  sources: ['fl_627_701', 'fio_data', 'fio_report'],
});
