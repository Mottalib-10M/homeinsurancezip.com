import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const N = K.N;
const prem = Math.round(K.today(N.prem[4]));
const small = K.E.claimOrNot({ damage: 4500, deductible: 1500, premium: prem, surcharge: 0.2, years: 3 });
const big = K.E.claimOrNot({ damage: 25000, deductible: 1500, premium: prem, surcharge: 0.2, years: 3 });
const sevHi = K.rank((s) => s.sev);
const sevLo = [...sevHi].reverse();
const cases = [2500, 4000, 6000, 10000, 20000].map((d) => { const r = K.E.claimOrNot({ damage: d, deductible: 1500, premium: prem, surcharge: 0.2, years: 3 }); return [K.usd(d), K.usd(r.paid), K.usd(r.cost), `${r.net >= 0 ? '+' : '-'}${K.usd(Math.abs(r.net))}`]; });

export default defineGuide({
  id: 'should-i-file-a-home-insurance-claim', group: 'policy', order: 9, slug: 'should-i-file-a-home-insurance-claim',
  nav: 'File a claim or not', card: 'What a small claim pays after the deductible against the surcharge it can bring at renewal.',
  title: 'Should I File a Home Insurance Claim? 2026 Calculator',
  description: `Should you file a home insurance claim in 2026? What a small claim pays after the deductible against the surcharge it can add at renewal, and the average claim.`,
  h1: 'Should I file a home insurance claim?',
  intro: `On ${K.usd(4500)} of damage with a ${K.usd(1500)} deductible, a claim pays ${K.usd(small.paid)}; a 20 percent surcharge for three years on a ${K.usd(prem)} premium costs ${K.usd(small.cost)}.`,
  resume: `A claim is worth filing when what it pays clearly exceeds what it will cost you later. The payment is the damage minus the deductible. The later cost is a surcharge or a lost claim-free discount at renewal, for the number of years your insurer counts claims, and in some cases the risk of a nonrenewal. With ${K.usd(4500)} of damage and a ${K.usd(1500)} deductible, the claim pays ${K.usd(small.paid)}. If it raises a ${K.usd(prem)} premium by 20 percent for three years, that costs ${K.usd(small.cost)}, so you come out ${small.net >= 0 ? 'ahead' : 'behind'} by ${K.usd(Math.abs(small.net))}. On ${K.usd(25000)} of damage the claim is clearly worth it, ahead by ${K.usd(big.net)}. Real claims are large: the average claim paid in the median ZIP code of the Treasury file was ${K.usd(N.sev)} over ${N.years[0]} to ${N.years[4]}. Surcharge rules vary by insurer and state; the 20 percent here is an assumption you can change.`,
  body: (h) => `
<h2>The arithmetic of a small claim</h2>
<p>Three numbers decide it: the damage, the deductible and the extra premium the claim could bring. The first two give the payment. The third is harder to know, because insurers do not publish their surcharge schedules in a form a homeowner reads, and some apply none for one claim but drop a claim-free discount instead. The calculator asks you for a percentage and a number of years; use what your insurer or agent tells you, or try a few values to see where the answer flips.</p>
${h.table(['Damage', 'Claim pays', 'Surcharge cost over 3 years', 'Net'], cases, `Deductible ${K.usd(1500)}, premium ${K.usd(prem)} (the national median ZIP of ${N.years[4]} at ${K.ppiMonth} prices), surcharge assumed at 20 percent for 3 years.`, ['r', 'r', 'r', 'r'])}
<p>The pattern holds for most premiums: claims a little above the deductible tend to cost more than they pay, while a claim several times the deductible is what insurance is for. The break-even point moves up with a high premium, a large surcharge or a long look-back period.</p>
${h.mini('roof', { t: 'A roof claim: what an older roof pays after the deductible', p: ['c', 'age', 'd'] })}
<h2>More than the surcharge</h2>
<p>A claim also goes into the industry claims databases that insurers consult when you apply elsewhere, usually for several years. Two or three claims in a short period, even small ones, are a common reason for a nonrenewal, which the ${h.a('home-insurance-non-renewal', 'nonrenewal page')} measures area by area. Water damage claims weigh more than others with many insurers, because they are frequent and often repeat. An inquiry about coverage that does not become a claim may or may not be recorded, depending on how it is reported; asking your agent a general question is safer than opening a claim file to ask.</p>
<h2>When to file without hesitation</h2>
<p>Large or uncertain damage should be reported at once. A roof leak that has reached the ceiling, a fire, a burst pipe that soaked the floors or a tree on the house can turn out much larger than it looks, and most policies require prompt notice and steps to prevent further damage. Liability is another case: if someone is hurt on your property, notify the insurer even if no one has asked for money, since late notice can weaken your coverage. The calculator is for the small, clear repairs you could pay yourself.</p>
<h2>How big claims are where you live</h2>
<p>The Treasury file gives the average claim paid in each ZIP code, losses paid divided by paid claims, over ${N.years[0]} to ${N.years[4]}. The median ZIP code was at ${K.usd(N.sev)}. State medians range from ${K.usd(sevLo[0].sev)} in ${sevLo[0].name} to ${K.usd(sevHi[0].sev)} in ${sevHi[0].name}; ${sevHi[1].name} and ${sevHi[2].name} follow at ${K.usd(sevHi[1].sev)} and ${K.usd(sevHi[2].sev)}. Those averages include total losses from fire, so a typical repair claim is smaller than the figure suggests, but they show that most paid claims are far above a ${K.usd(1000)} or ${K.usd(2500)} deductible.</p>
<h2>How often claims are paid</h2>
<p>Claims are rarer than many people think. In the median ZIP code of the Treasury file, ${K.dec(N.freq * 100, 1)} claims were paid per 100 policies a year from ${N.years[0]} to ${N.years[4]}, about one claim per policy every ${K.num(1 / N.freq)} years on average. In the states with the most claims it is close to double: ${K.rank((s) => s.freq).slice(0, 2).map((s) => `${s.name} ${K.dec(s.freq * 100, 1)}`).join(' and ')} per 100 policies. An insurer looks at your history against that background: one claim in five years rarely stands out, three do. Before filing, ask yourself whether this repair is worth spending one of the claims your record can carry.</p>
<h2>If you decide not to file</h2>
<p>Pay for the repair, keep the invoice and photos, and fix the cause, such as a failing water heater or a loose shingle. If the same damage comes back larger later, the insurer will ask about the earlier event, and a documented repair helps. Do not let a small leak go: most policies exclude damage from continuous or repeated seepage over weeks, so a delay can turn a covered claim into an excluded one.</p>
<h2>Raise the deductible instead</h2>
<p>If you already know you will not file claims below a few thousand dollars, a higher deductible makes that decision official and lowers the premium every year. Keep the difference in savings so a repair below the deductible does not strain the budget. Check that a percentage wind or hurricane deductible, if your policy has one, is not already much higher than the deductible you are choosing, as the ${h.a('hurricane-deductible', 'hurricane deductible page')} shows. For roof damage, check whether the roof is settled at actual cash value first: the ${h.a('roof-claim-actual-cash-value', 'roof calculator')} shows what an older roof is worth to the insurer.</p>
`,
  faqs: [
    { q: 'How much does home insurance go up after a claim?', a: `It depends on the insurer, the state and the type of claim. Some insurers add a surcharge for three to five years, others remove a claim-free discount, and some apply nothing for a single weather claim. Ask your agent how your insurer treats a claim before filing. The calculator lets you test any percentage and duration.` },
    { q: 'Is it worth filing a claim for 2,000 dollars of damage?', a: `With a ${K.usd(1000)} deductible the claim pays ${K.usd(1000)}, and a modest surcharge for a few years can cost as much or more. With a ${K.usd(1500)} deductible it pays only ${K.usd(500)}. Small claims near the deductible rarely pay off once later premiums are counted, unless the damage may grow.` },
    { q: 'Does an act of nature claim raise my premium?', a: `Many insurers weigh weather claims less than claims they consider within your control, such as water damage from a leak, and some states limit surcharges for catastrophe claims. But wide storm losses raise the rate of the whole area at the next filing, so premiums can rise after a storm whether you file or not.` },
  ],
  tool: 'claim',
  related: ['roof-claim-actual-cash-value', 'hurricane-deductible', 'home-insurance-non-renewal', 'why-is-home-insurance-going-up'],
  sources: ['fio_data', 'fio_report'],
});
