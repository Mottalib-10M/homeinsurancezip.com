import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const N = K.N;
const ex = K.E.lossOfUse({ months: 4, tempRent: 2600, rent: 1500, extra: 300, limit: 6000 });
const pct20 = 0.2, pct30 = 0.3;
const cases = [1, 3, 6, 9, 12].map((m) => { const r = K.E.lossOfUse({ months: m, tempRent: 2600, rent: 1500, extra: 300, limit: 6000 }); return [`${m} ${m === 1 ? 'month' : 'months'}`, K.usd(r.need), K.usd(r.paid), K.usd(r.kept)]; });

export default defineGuide({
  id: 'renters-insurance-loss-of-use', group: 'renters', order: 11, slug: 'renters-insurance-loss-of-use',
  nav: 'Loss of use for renters', card: 'What the policy pays while the apartment cannot be lived in, and whether its limit lasts.',
  title: 'Renters Insurance Loss of Use 2026: What It Pays, How Long',
  description: `Renters insurance loss of use in 2026: the extra living costs it pays after a fire or burst pipe, why only the rise over rent counts, and if the limit lasts.`,
  h1: 'Renters insurance loss of use: what it pays while you are out',
  intro: `Four months in a ${K.usd(2600)} rental while paying ${K.usd(1500)} of normal rent, plus ${K.usd(300)} a month of extras, is ${K.usd(ex.need)} of loss of use under renters insurance; a ${K.usd(6000)} limit leaves ${K.usd(ex.kept)} to you.`,
  resume: `Loss of use, Coverage D of a renters policy, pays additional living expenses when a covered loss such as a fire, smoke or a burst pipe makes your apartment unlivable. It pays the increase over your normal costs, not the whole bill: the hotel or short-term rental minus the rent you would have paid anyway, if you no longer pay it, plus extra costs such as meals out, a longer commute or laundry. The limit is often set as a percentage of the personal property limit, commonly ${K.pct(pct20, 0)} to ${K.pct(pct30, 0)}, so a ${K.usd(20000)} policy may carry only ${K.usd(4000)} to ${K.usd(6000)}. In the example above, a temporary rental at ${K.usd(2600)} a month for four months against ${K.usd(1500)} of rent, plus ${K.usd(300)} a month of extras, needs ${K.usd(ex.need)}; a ${K.usd(6000)} limit pays ${K.usd(ex.paid)}. Repairs after a fire often take longer than expected, so check that the limit covers six months or more.`,
  body: (h) => `
<h2>How renters insurance loss of use counts the extra costs</h2>
<p>The principle is simple: the policy puts you back in the position you would have been in without the loss, no better. If your lease is suspended while the apartment is repaired and you stop paying rent, the insurer pays the temporary housing cost minus your usual rent. If you must keep paying rent, the full temporary cost can count as extra. Food is the same: the extra cost of eating out above your normal grocery bill, not the whole restaurant bill. The calculator above has a line for those other extra costs, ${K.usd(300)} a month in the example. Keep every receipt and a short note of what you would have spent normally.</p>
${h.table(['Time out of the apartment', 'Extra living costs', 'Paid with a ' + K.usd(6000) + ' limit', 'Left to you'], cases, `Temporary rental ${K.usd(2600)} a month, normal rent ${K.usd(1500)}, other extra costs ${K.usd(300)} a month.`, ['l', 'r', 'r', 'r'])}
<p>The table shows how fast a limit runs out: past the fourth month, every extra month is paid by you. Many policies also pay for a limited time, often two weeks, when the authorities order you out because of damage nearby, for example a fire in the next building; an evacuation for an approaching storm without damage to your building may not qualify.</p>
<h2>The limit, the time, and how to choose it</h2>
<p>Loss of use limits come in two shapes. Many policies set a dollar amount, often a percentage of the personal property limit, commonly ${K.pct(pct20, 0)} to ${K.pct(pct30, 0)}. Others pay for a period, such as twelve months, or the shorter of the time to repair and the time to settle elsewhere. Either way, the limit runs out faster than people expect after a serious fire, because rebuilding a unit in an apartment building waits on the landlord, the landlord's insurer, permits and contractors. A tenant has no control over that schedule.</p>
<p>To choose the limit, price a furnished short-term rental near work or school for a month, subtract your rent, add a few hundred dollars for food and transport, and multiply by six. If the result is above the loss of use limit on the first page of your policy, ask the insurer the cost of raising it or of a policy that pays for a period of time. It is usually a small change in premium. Temporary housing is where rising prices hit a claim hardest, since short-term rents move faster than a limit printed years earlier: the government's price index for tenants' insurance rose ${K.sgn(K.idxGrowth(N.index.tenants, 2022))} from ${N.years[4]} to ${K.ppiMonth}.</p>
<h2>Making the claim, and what renters insurance loss of use does not pay</h2>
<p>Call the insurer as soon as you know you cannot stay, and ask what it will approve before you book anything long term: some insurers arrange housing directly, others pay you back. Choose housing comparable to your apartment, not better; a two-bedroom for a one-bedroom tenant may be paid only in part. Send receipts every few weeks rather than at the end, so payments keep pace with costs. If your landlord ends the lease because the building cannot be repaired, tell the insurer at once, since the period changes to the time needed to find a new place.</p>
<p>It does not pay for a move you choose without a covered loss, for a unit unlivable because of a flood or an earthquake, which the policy excludes, or for costs you would have had anyway. It also stops when the apartment is fit to live in again or, if you move for good, when a reasonable time to settle elsewhere has passed. Belongings damaged in the same event are paid under personal property, sized with the ${h.a('renters-insurance-calculator', 'renters calculator')}.</p>
<p>The moment to check is now, not after a fire. Find the loss of use line on the first page of your policy, run the calculator above with the price of a furnished rental near you, and see how many months the limit lasts. If it is fewer than six, ask your insurer what a higher limit would cost before you need it, not after.</p>
`,
  faqs: [
    { q: 'How long does renters insurance pay for a hotel?', a: `Until the apartment is fit to live in again, up to the loss of use limit, or for the period the policy states, often up to twelve months. If you move permanently, payments stop after a reasonable time to settle. The dollar limit is often the binding one, so check it against local short-term rents.` },
    { q: 'Does loss of use pay my rent?', a: `Not your normal rent. It pays the extra cost of living elsewhere above what you would have spent anyway. If your landlord suspends rent while repairs are made, the insurer pays the temporary housing cost minus that rent. If you must keep paying rent, more of the temporary cost counts as extra.` },
    { q: 'What happens if my loss of use limit runs out?', a: `You pay the rest yourself. That is why the limit should cover at least six months of extra housing costs at local prices. Some insurers let you raise Coverage D for a small premium; others pay for a period of time instead of a dollar amount, which avoids the problem.` },
  ],
  tool: 'ale',
  related: ['renters-insurance-calculator', 'how-much-dwelling-coverage', 'should-i-file-a-home-insurance-claim', 'homeowners-insurance-cost-per-month'],
  sources: ['bls_cpi'],
});
