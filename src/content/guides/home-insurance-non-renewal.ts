import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const N = K.N;
const F = K.P.florida;
const rep = K.STATES.filter(K.hasNonren);
const top = K.rank((s) => s.nonren[4]).filter(K.hasNonren);
const rose = [...rep].sort((a, b) => ((b.nonren[4] ?? 0) - (b.nonren[0] ?? 0)) - ((a.nonren[4] ?? 0) - (a.nonren[0] ?? 0)));
const ca = K.S('california'), mi = K.S('michigan'), ne = K.S('nebraska'), nc = K.S('north-carolina');
const odds5 = K.E.nonrenewalOdds(N.nonren[4], 5);
// Délais de préavis lus dans la loi de chaque État (params-2026.json > nonrenewalNotice, lus le 2026-11-09).
const NN = (K.P as unknown as { nonrenewalNotice: { read: string; states: Array<{ code: string; days: number; cite: string; source: string; reason: boolean }> } }).nonrenewalNotice;
const noticeRows = NN.states.map((x) => [K.SC(x.code).name, `${x.days} days`, x.reason ? 'yes' : 'no']);
const sixty = NN.states.filter((x) => x.days === 60).map((x) => K.SC(x.code).name);
const rows = top.slice(0, 10).map((s) => [s.name, K.rate(s.nonren[0]), K.rate(s.nonren[2]), K.rate(s.nonren[4])]);

export default defineGuide({
  id: 'home-insurance-non-renewal', group: 'cost', order: 3, slug: 'home-insurance-non-renewal',
  nav: 'Nonrenewal rates', card: 'How often insurers declined to renew, state by state, and the odds over your next renewals.',
  title: 'Home Insurance Non-Renewal 2026: Notice and Rates by State',
  description: `Home insurance non-renewal 2026: how often insurers declined to renew in each state and ZIP code from 2018 to 2022, the notice you are owed, and what to do next`,
  h1: 'Home insurance non-renewal: how often it happens and what to do',
  intro: `Home insurance non-renewal, an insurer declining to renew a policy, hit ${K.pct(N.nonren[4], 2)} of homeowners policies in the typical U.S. ZIP code in ${N.years[4]}. Got a notice? Check below that it came in time, then ask other insurers for quotes at once.`,
  resume: `A nonrenewal is the insurer's decision not to offer a new term when the policy ends. The Treasury file counts them for each ZIP code: in the typical ZIP code, ${K.pct(N.nonren[4], 2)} of standard homeowners policies were not renewed in ${N.years[4]}, up from ${K.pct(N.nonren[2], 2)} in ${N.years[2]}. One ZIP code in ten was above ${K.pct(N.nonren90, 2)}. The highest state typical figures in ${N.years[4]} were ${top[0].name} (${K.rate(top[0].nonren[4])}), ${top[1].name} (${K.rate(top[1].nonren[4])}) and ${top[2].name} (${K.rate(top[2].nonren[4])}). At the national rate, the chance of at least one nonrenewal over five renewals is about ${K.pct(odds5, 1)}, small for one household but large across a city. Texas insurers did not report nonrenewals, so Texas has no figure. The rate counts only insurer decisions, not owners who left, and it stops in ${N.years[4]}. A notice is not the end: states set a minimum warning, ${F.nonrenewalNoticeDays} days in Florida and 60 in ${sixty.join(', ').replace(/, ([^,]*)$/, ' and $1')}.`,
  body: (h) => `
<h2>What the home insurance non-renewal rate measures</h2>
<p>The Treasury workbook counts the nonrenewals of a year and divides them by the policies in force at year end. It is the insurer's choice, for reasons the definition names: "the risk profiles of properties (e.g., the age of the roof) or areas". A homeowner who shops and leaves is not in it, and neither is a cancellation during the term, which the file counts apart. At ${K.pct(N.nonren[4], 2)}, the national figure looks small, yet in a ZIP code of 5,000 insured homes it means about ${K.num(5000 * N.nonren[4])} notices in a year, and over a decade of renewals it adds up.</p>
${h.table(['State', `Typical ZIP code, ${N.years[0]}`, `${N.years[2]}`, `${N.years[4]}`], rows, 'The ten states with the highest rates in 2022. Treasury workbook, typical (middle) ZIP code of each state; Texas did not report.', ['l', 'r', 'r', 'r'])}
<p>The largest increases from ${N.years[0]} to ${N.years[4]} were in ${rose.slice(0, 3).map((s) => `${s.name} (${K.rate(s.nonren[0])} to ${K.rate(s.nonren[4])})`).join(', ')}. ${ne.name} stands out with ${K.rate(ne.nonren[4])} in ${N.years[4]}, a year when its paid claims rose to ${K.dec(ne.freqY[4] * 100, 1)} per 100 policies. ${ca.name} jumped earlier, from ${K.rate(ca.nonren[0])} in ${N.years[0]} to ${K.rate(ca.nonren[1])} in ${N.years[1]}, after the wildfires of 2017 and 2018, and stayed there. A rate that climbs year after year in your ZIP code, which the lookup on the ${h.a('home', 'home page')} shows, means several insurers are pulling back. Florida's low rate is misleading: an insurer that leaves the state or fails ends policies in other ways than a nonrenewal, and many homes moved to the state-run insurer.</p>
<h2>Nonrenewal notice requirements by state</h2>
<p>Each state sets the notice an insurer must give before a homeowners policy ends without renewal. Florida's law is one of the most detailed: ${F.nonrenewalNoticeDays} days' written notice of nonrenewal, ${F.renewalNoticeDays} days' notice of a renewal premium, and ${F.nonpaymentNoticeDays} days when a policy is cancelled for nonpayment (${h.src('fl_627_4133', 'Florida law')}). The table lists the states whose law this site has read on the legislature's own website; the exact texts are under Sources. A state missing from it has its own rule, which its insurance department publishes and the state pages of this site link to.</p>
${h.table(['State', 'Minimum notice before the end date', 'Reason must be given'], noticeRows, `Read on ${K.day(NN.read)}: ${h.src('fl_627_4133', 'Florida')}, ${h.src('mn_65a29', 'Minnesota')}, ${h.src('sc_38_75', 'South Carolina')}, ${h.src('wa_48_18_2901', 'Washington')}.`, ['l', 'r', 'l'])}
${h.mini('notice', { t: 'Was your nonrenewal notice sent in time?', p: ['nx', 'dn'] })}
<p>Count the days from the date the notice was mailed or delivered to the date the policy ends. A notice that arrives late is a question for the state insurance department, which handles complaints against insurers at no cost; in some states a late notice keeps the policy in force until the full period has run.</p>
<h2>What to do with a nonrenewal notice</h2>
<p>Read the reason first. A roof that is too old, an unrepaired claim or a dog breed can sometimes be fixed before the end date, and some insurers will reconsider with proof of the work. Ask for quotes at once from other licensed insurers and from an independent agent who places several companies. If no private insurer will take the house, the state's FAIR plan or Citizens plan is the fallback in most states, described on the ${h.a('fair-plan-insurance', 'last-resort insurers page')}. Keep your mortgage company informed: if the policy lapses, it can buy a policy for you and add it to your payment, which usually costs far more and protects only the lender.</p>
<p>In order, then: write down the end date printed on the notice; call your agent the same week; ask the insurer in writing for the exact reason; fix what can be fixed and send the proof; and get at least two quotes before the end date, so the house is never uninsured, not even for a day. A gap in coverage makes the next policy harder to get and can break the terms of your mortgage.</p>
<p>A cancellation during the term is different and rarer: after the first weeks of a new policy, most states allow it only for nonpayment, fraud or a major change in the risk. In the file, ${K.pct(N.oc, 2)} of policies in the typical ZIP code were cancelled for reasons other than nonpayment, and ${K.pct(N.npc, 2)} for nonpayment. A premium paid through the mortgage rarely lapses, but a jump at renewal can leave that account short; the ${h.a('homeowners-insurance-cost-per-month', 'escrow calculator')} shows how the payment catches up.</p>
`,
  faqs: [
    { q: 'Why would an insurance company not renew a homeowners policy?', a: `The Treasury definition names the risk of the property, such as the age of the roof, and the risk of the area, such as wildfire or hurricane exposure. Insurers also drop policies after several claims, when a house is vacant or needs repairs, or when they reduce how many homes they write in a state.` },
    { q: 'How much notice must an insurer give before nonrenewal?', a: `It depends on the state. Florida requires ${F.nonrenewalNoticeDays} days' written notice; ${sixty.join(', ').replace(/, ([^,]*)$/, ' and $1')} require 60 days, and all four want the reason stated. Check your state insurance department's rule, linked from each state page here, and the conditions section of your policy.` },
    { q: 'Does a nonrenewal make it harder to get a new policy?', a: `It can. Applications usually ask whether a policy was cancelled or not renewed in recent years, and claim histories are shared through industry databases. A nonrenewal for an area or a portfolio decision weighs less than one for claims or the condition of the house. Explain the reason to the new insurer or agent.` },
  ],
  tool: 'nonrenew',
  related: ['fair-plan-insurance', 'homeowners-insurance-by-state', 'why-is-home-insurance-going-up', 'roof-claim-actual-cash-value'],
  sources: ['fio_data', 'fio_report', 'fl_627_4133', 'mn_65a29', 'sc_38_75', 'wa_48_18_2901', 'naic_pcmi'],
});
