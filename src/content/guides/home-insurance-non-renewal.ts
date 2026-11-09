import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const N = K.N;
const F = K.P.florida;
const rep = K.STATES.filter(K.hasNonren);
const top = K.rank((s) => s.nonren[4]).filter(K.hasNonren);
const rose = [...rep].sort((a, b) => ((b.nonren[4] ?? 0) - (b.nonren[0] ?? 0)) - ((a.nonren[4] ?? 0) - (a.nonren[0] ?? 0)));
const ca = K.S('california'), mi = K.S('michigan'), ne = K.S('nebraska'), nc = K.S('north-carolina');
const odds5 = K.E.nonrenewalOdds(N.nonren[4], 5);
const rows = top.slice(0, 10).map((s) => [s.name, K.rate(s.nonren[0]), K.rate(s.nonren[2]), K.rate(s.nonren[4])]);

export default defineGuide({
  id: 'home-insurance-non-renewal', group: 'cost', order: 3, slug: 'home-insurance-non-renewal',
  nav: 'Nonrenewal rates', card: 'How often insurers declined to renew, state by state, and the odds over your next renewals.',
  title: 'Home Insurance Non-Renewal 2026: Rates by State and ZIP',
  description: `Home insurance non-renewal 2026: how often insurers declined to renew in each state and ZIP code from 2018 to 2022, the notice you are owed, and what to do next`,
  h1: 'Home insurance nonrenewal: how often it happens and what to do',
  intro: `In the median ZIP code, insurers declined to renew ${K.pct(N.nonren[4], 2)} of homeowners policies in ${N.years[4]}; in ${top[0].name}, ${K.rate(top[0].nonren[4])}.`,
  resume: `A nonrenewal is the insurer's decision not to offer a new term when the policy ends. The Treasury file counts them for each ZIP code: in the median ZIP code, ${K.pct(N.nonren[4], 2)} of HO-3 and HO-5 policies were not renewed in ${N.years[4]}, up from ${K.pct(N.nonren[2], 2)} in ${N.years[2]}. One ZIP code in ten was above ${K.pct(N.nonren90, 2)}. The highest state medians in ${N.years[4]} were ${top[0].name} (${K.rate(top[0].nonren[4])}), ${top[1].name} (${K.rate(top[1].nonren[4])}) and ${top[2].name} (${K.rate(top[2].nonren[4])}). At the national rate, the chance of at least one nonrenewal over five renewals is about ${K.pct(odds5, 1)}, small for one household but large across a city. Texas insurers did not report nonrenewals, so Texas has no figure. The rate counts only insurer decisions, not owners who left, and it stops in ${N.years[4]}. A notice is not the end: most states require advance warning, ${F.nonrenewalNoticeDays} days in Florida.`,
  body: (h) => `
<h2>What the rate measures</h2>
<p>The workbook defines the nonrenewal rate as the count of nonrenewals in the year divided by the policies in force at year end. It is the insurer's choice, for reasons the definition names: "the risk profiles of properties (e.g., the age of the roof) or areas". A homeowner who shops and leaves is not in it, and neither is a cancellation during the term, which the file counts apart. At ${K.pct(N.nonren[4], 2)}, the national median looks small, yet in a ZIP code of 5,000 insured homes it means about ${K.num(5000 * N.nonren[4])} notices in a year.</p>
${h.table(['State', `Median ZIP ${N.years[0]}`, `${N.years[2]}`, `${N.years[4]}`], rows, 'The ten highest state medians in 2022. Treasury FIO workbook, medians across ZIP codes; Texas not reported.', ['l', 'r', 'r', 'r'])}
<h2>Where it rose, and where it fell</h2>
<p>The largest increases from ${N.years[0]} to ${N.years[4]} were in ${rose.slice(0, 4).map((s) => `${s.name} (${K.rate(s.nonren[0])} to ${K.rate(s.nonren[4])})`).join(', ')}. ${ne.name} stands out with ${K.rate(ne.nonren[4])} in ${N.years[4]}, a year when its paid claims rose to ${K.dec(ne.freqY[4] * 100, 1)} per 100 policies, and ${nc.name} reached ${K.rate(nc.nonren[4])}. ${ca.name} jumped earlier: from ${K.rate(ca.nonren[0])} in ${N.years[0]} to ${K.rate(ca.nonren[1])} in ${N.years[1]}, after the wildfires of 2017 and 2018, and stayed there. ${mi.name} went the other way, from ${K.rate(mi.nonren[0])} to ${K.rate(mi.nonren[4])}.</p>
${h.mini('nonrenew', { t: 'Odds of a nonrenewal over the years ahead', p: ['sx', 'yrs'], d: { sx: 'north-carolina', yrs: 10 } })}
<h2>Reading the figure for your own ZIP code</h2>
<p>The lookup on the home page gives the nonrenewal rate of each ZIP code for each year. Two readings help. A rate several times the state median in one year, then back to normal, often follows one insurer leaving the area or cutting a block of policies; it says little about your house. A rate that climbs year after year means several insurers are pulling back, and that is the setting in which renewals get harder and the state plan grows. Remember the threshold of the file: a ZIP code is listed only where ${K.P.data.minInsurers} or more insurers reported, so the most thinly served places are missing altogether. The Treasury also warns that it did not validate each ZIP code, and that anomalies may matter more for one ZIP code than for a region.</p>
<h2>Cancellation during the term is rarer</h2>
<p>A nonrenewal ends a policy at its anniversary. A cancellation ends it during the term, and states restrict it much more tightly: after the first weeks of a new policy, most allow it only for nonpayment, fraud or misrepresentation, or a major change in the risk. In the file, cancellations for reasons other than nonpayment ran at ${K.pct(N.oc, 2)} in the median ZIP code. If you receive a midterm cancellation for any other reason, ask the insurer to cite the clause and the state rule that allows it.</p>
<h2>The notice you are owed</h2>
<p>Each state sets the notice an insurer must give before a policy ends without renewal. Florida's statute is one of the most detailed: ${F.nonrenewalNoticeDays} days' written notice of nonrenewal, ${F.renewalNoticeDays} days' notice of a renewal premium, and ${F.nonpaymentNoticeDays} days when a policy is cancelled for nonpayment (${h.src('fl_627_4133', 'Fla. Stat. 627.4133')}). Other states use shorter periods, often 30 to 60 days, and many require the insurer to state the reason. Your state's insurance department publishes the rule; the state pages of this site link to each one.</p>
<h2>What to do with a nonrenewal notice</h2>
<p>Read the reason first. A roof that is too old, an unrepaired claim or a dog breed can sometimes be fixed before the end date, and some insurers will reconsider with proof of the work. Ask for quotes at once from other admitted insurers and from an independent agent who places several companies. If no admitted insurer will write the house, the state's FAIR plan or Citizens plan is the fallback in most states, described on the ${h.a('fair-plan-insurance', 'FAIR plan page')}. Keep the mortgage servicer informed: a lapse lets the servicer buy force-placed coverage, which usually costs far more and protects only the lender.</p>
<h2>Nonpayment is a different problem</h2>
<p>The file also counts cancellations for nonpayment: ${K.pct(N.npc, 2)} of policies in the median ZIP code over the period, against ${K.pct(N.oc, 2)} cancelled for other reasons. A premium paid through escrow rarely lapses for nonpayment, but a jump at renewal can leave the escrow account short; the ${h.a('homeowners-insurance-cost-per-month', 'monthly cost page')} shows how a servicer spreads that shortage.</p>
`,
  faqs: [
    { q: 'Why would an insurance company not renew a homeowners policy?', a: `The Treasury definition names the risk of the property, such as the age of the roof, and the risk of the area, such as wildfire or hurricane exposure. Insurers also drop policies after several claims, when a house is vacant or needs repairs, or when they reduce how many homes they write in a state.` },
    { q: 'How much notice must an insurer give before nonrenewal?', a: `It depends on the state. Florida requires ${F.nonrenewalNoticeDays} days' written notice under Fla. Stat. 627.4133; many states require 30 to 60 days. The notice usually has to give the reason. Check your state insurance department's rule, linked from each state page here, and the conditions section of your policy.` },
    { q: 'Does a nonrenewal make it harder to get a new policy?', a: `It can. Applications usually ask whether a policy was cancelled or not renewed in recent years, and claim histories are shared through industry databases. A nonrenewal for an area or a portfolio decision weighs less than one for claims or the condition of the house. Explain the reason to the new insurer or agent.` },
  ],
  tool: 'nonrenew', toolArg: { sx: 'california' },
  related: ['fair-plan-insurance', 'homeowners-insurance-by-state', 'why-is-home-insurance-going-up', 'roof-claim-actual-cash-value'],
  sources: ['fio_data', 'fio_report', 'fl_627_4133', 'naic_pcmi'],
});
