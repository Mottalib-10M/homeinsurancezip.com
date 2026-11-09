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
<h2>How additional living expenses are counted</h2>
<p>The principle is simple: the policy puts you back in the position you would have been in without the loss, no better. If your lease is suspended while the apartment is repaired and you stop paying rent, the insurer pays the temporary housing cost minus your usual rent. If you must keep paying rent, the full temporary cost can count as extra. Food is the same: the extra cost of eating out above your normal grocery bill, not the whole restaurant bill. Keep every receipt and a short note of what you would have spent normally.</p>
${h.table(['Time out of the apartment', 'Extra living costs', 'Paid with a ' + K.usd(6000) + ' limit', 'Left to you'], cases, `Temporary rental ${K.usd(2600)} a month, normal rent ${K.usd(1500)}, other extras ${K.usd(300)} a month.`, ['l', 'r', 'r', 'r'])}
<h2>The limit and the time</h2>
<p>Loss of use limits come in two shapes. Many policies set a dollar amount, often a percentage of the personal property limit. Others pay for a period, such as twelve months, or the shorter of the time to repair and the time to settle elsewhere. Either way, the limit runs out faster than people expect after a serious fire, because rebuilding a unit in a multifamily building waits on the landlord, the landlord's insurer, permits and contractors. A tenant has no control over that schedule.</p>
${h.mini('ale', { t: 'Will your loss of use limit last?', p: ['m', 'tr', 'r', 'lim'] })}
<h2>Making the claim</h2>
<p>Call the insurer as soon as you know you cannot stay, and ask what it will approve before you book anything long term: some insurers arrange housing directly, others reimburse. Choose housing comparable to your apartment, not better; a two-bedroom for a one-bedroom tenant may be paid only in part. Send receipts every few weeks rather than at the end, so payments keep pace with costs. If your landlord ends the lease because the building cannot be repaired, tell the insurer at once, since the period of loss of use changes to the time needed to find a new place.</p>
<h2>Choosing the limit</h2>
<p>Price a furnished short-term rental near work or school for a month, subtract your rent, add a few hundred dollars for food and transport, and multiply by six. If the result is above the loss of use limit on your declarations page, ask the insurer the cost of raising it or of a policy that pays for a period of time. It is usually a small change in premium.</p>
<h2>Civil authority and evacuations</h2>
<p>Many policies also pay loss of use for a limited time, often two weeks, when a civil authority orders you out because of damage nearby from a covered peril, for example a fire in the next building. An evacuation for an approaching storm or wildfire without damage to your building may not qualify; read the clause, since the wording differs between insurers.</p>
<h2>What renters insurance loss of use does not pay</h2>
<p>It does not pay for a move you choose without a covered loss, for a unit unlivable because of a flood or an earthquake, which the policy excludes, or for costs that would have occurred anyway. It also stops when the apartment is fit to live in again or, if you move for good, when a reasonable time to settle elsewhere has passed. Belongings damaged in the same event are paid under personal property, sized with the ${h.a('renters-insurance-calculator', 'renters calculator')}.</p>
<h2>Fair rental value for owners</h2>
<p>Homeowners policies carry the same coverage under the same letter, and also pay fair rental value if you rent part of your home to someone and that part becomes unlivable. On a homeowners policy, loss of use is usually a larger share of the dwelling limit, but the same logic of the increase over normal costs applies. The ${h.a('how-much-dwelling-coverage', 'dwelling coverage page')} explains how the other limits of a homeowners policy follow Coverage A.</p>
<h2>Prices since the Treasury data end</h2>
<p>Temporary housing is where inflation hits a claim hardest, since short-term rents and hotel prices move faster than the limit printed on a policy bought years earlier. The Treasury homeowners file stops in ${N.years[4]} and has no renters figures. The BLS price index for tenants' and household insurance rose ${K.sgn(K.idxGrowth(N.index.tenants, 2022))} from ${N.years[4]} to ${K.ppiMonth}; consumer prices rose ${K.sgn(K.idxGrowth(N.index.cpi, 2022))}. Review the limit when you renew, and raise it if local rents have gone up.</p>
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
