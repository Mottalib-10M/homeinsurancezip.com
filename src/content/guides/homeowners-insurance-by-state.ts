import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const N = K.N;
const byPrem = K.rank((s) => s.prem[4]);
const byChg = K.rank((s) => s.chg);
const bySpread = K.rank((s) => s.p90 / s.p10);
const [a, b, c] = byPrem;
const low = byPrem.slice(-3).reverse();
const fl = K.S('florida'), ca = K.S('california'), co = K.S('colorado'), ne = K.S('nebraska'), ok = K.S('oklahoma'), pa = K.S('pennsylvania'), ny = K.S('new-york'), tx = K.S('texas');
const plains = [ok, ne, K.S('kansas')];
const wide = bySpread[0];
const rows = byPrem.slice(0, 10).map((s) => [s.name, K.usd(K.today(s.prem[4])), K.usd(s.prem[4]), K.usd(s.p10), K.usd(s.p90)]);

export default defineGuide({
  id: 'homeowners-insurance-by-state', group: 'cost', order: 1, slug: 'homeowners-insurance-by-state',
  nav: 'Cost by state', card: 'Typical premium per policy in every state, the spread inside each one and the change after inflation.',
  title: 'Homeowners Insurance by State 2026: Average Cost per Policy',
  description: `Homeowners insurance by state 2026: what the median ZIP code paid per policy in all 50 states and DC, the cheap and dear tenth, and the change after inflation.`,
  h1: 'Homeowners insurance by state: what policies really cost',
  intro: `${a.name} has the most expensive homeowners insurance of any state: about ${K.usd(K.today(a.prem[4]))} a year in its typical ZIP code at ${K.ppiMonth} prices (${K.usd(a.prem[4])} paid in ${N.years[4]}). ${low[0].name} is the cheapest, about ${K.usd(K.today(low[0].prem[4]))} (${K.usd(low[0].prem[4])} in ${N.years[4]}).`,
  resume: `Across the ${K.num(N.zips)} ZIP codes of the Treasury file, the typical homeowners premium per policy was ${K.usd(N.prem[4])} in ${N.years[4]}. The state typical figures run from ${K.usd(low[0].prem[4])} in ${low[0].name} to ${K.usd(a.prem[4])} in ${a.name}, a ratio of about ${K.dec(a.prem[4] / low[0].prem[4], 1)} to 1. Second and third are ${b.name} (${K.usd(b.prem[4])}) and ${c.name} (${K.usd(c.prem[4])}), which shows that hail and wind on the Plains cost insurers as much as hurricanes on the coast. The state figure hides a wide range: in ${wide.name} the dearest tenth of ZIP codes pays more than ${K.dec(wide.p90 / wide.p10, 1)} times what the cheapest tenth pays. ${byChg[0].name} had the largest rise after inflation from ${N.years[0]} to ${N.years[4]}, ${K.sgn(byChg[0].chg)}, while ${fl.name} fell ${K.sgn(fl.chg)} as policies moved to Citizens. These are premiums written per standard homeowners policy, not quotes, and they stop in ${N.years[4]}.`,
  body: (h) => `
<h2>The state ranking of homeowners insurance, and what it is made of</h2>
<p>Each state figure here is the typical (middle) ZIP code of the state: line up every ZIP code by its premium per policy and take the one in the center, so half paid more and half less. That choice keeps a few very expensive beach or ski towns from pulling the number up, and it gives every part of the state the same weight. The ranking is not the one quote sites publish. Those sites price one invented house with the same insured amount in every state; the Treasury figure is what insurers charged for the real houses of each area, divided by the policies they had. The first column carries the ${N.years[4]} figure to ${K.ppiMonth} prices with the national price index of home insurance, an estimate and not a quote.</p>
${h.table(['State', `Typical ZIP code at ${K.ppiMonth} prices (estimate)`, `Typical ZIP code, ${N.years[4]}`, 'Cheapest 10% paid under', 'Most expensive 10% paid over'], rows, `The ten most expensive states. Treasury file, typical (middle) ZIP code of each state; the last two columns are ${N.years[4]} figures.`, ['l', 'r', 'r', 'r', 'r'])}
<p>${a.name} leads because coastal counties pay several times the inland ones: the dearest tenth of its ZIP codes paid more than ${K.usd(a.p90)}. ${plains.map((s) => `${s.name} (${K.usd(s.prem[4])})`).join(', ')} follow for a different reason, the repeated hail and windstorms of the Plains, which give ${ne.name} ${K.dec(ne.freq * 100, 1)} paid claims per 100 policies a year against ${K.dec(N.freq * 100, 1)} nationally. ${co.name}, with hail along the Front Range and wildfire in the mountains, ranks ${co.rankPrem} among the 50 states and DC. A state also tells you how likely insurers are to stay: the ${h.a('home-insurance-non-renewal', 'nonrenewal calculator')} turns each state's rate into the chance of being dropped while you own the house.</p>
<h2>Where homeowners pay the least, and where prices rose fastest</h2>
<p>${low.map((s) => `${s.name} (${K.usd(s.prem[4])})`).join(', ')} sit at the bottom. ${pa.name} has the third largest number of ZIP codes in the file and few catastrophe years: its average claim was ${K.usd(pa.sev)}, and insurers paid back about ${K.pct(pa.lr, 0)} of premiums as claims. A low state figure does not mean low prices everywhere. In ${ny.name}, whose typical ZIP code paid ${K.usd(ny.prem[4])}, the dearest tenth of ZIP codes paid over ${K.usd(ny.p90)}, and the county figures of Suffolk, Nassau and Westchester were all above ${K.usd(2500)}.</p>
<p>From ${N.years[0]} to ${N.years[4]}, the national typical premium went from ${K.usd(N.prem[0])} to ${K.usd(N.prem[4])}, ${K.sgn(N.chg)} on top of general inflation. The steepest rises were in ${byChg.slice(0, 3).map((s) => `${s.name} (${K.sgn(s.chg)})`).join(', ')}. ${ca.name}'s rise came with a jump in nonrenewals after the 2018 fires. ${fl.name} seems to have moved the other way, ${K.sgn(fl.chg)}, but that is not cheaper insurance: private insurers dropped many of the costliest coastal homes, those owners moved to the state-run insurer, and its policies are not in this data. The ${h.a('why-is-home-insurance-going-up', 'page on rising premiums')} carries these figures to ${K.ppiMonth}.</p>
<h2>Using a state figure with your own bill</h2>
<p>Choose your state in the calculator above and type your yearly premium. A bill well above the state figure is not proof of overcharging: a larger house, a lower deductible, a past claim, a wood roof or a coastal ZIP code all raise it. That is why the ZIP code lookup on the ${h.a('home', 'home page')} is the better benchmark: a bill far above your own ZIP code, at today's prices, is a reason to ask other insurers for quotes and to check the amount the house is insured for, explained on the ${h.a('how-much-dwelling-coverage', 'rebuild cost page')}.</p>
<p>Two caveats. ${tx.name}, ranked ${tx.rankPrem} at ${K.usd(tx.prem[4])}, has no nonrenewal figures, because its insurers did not report them to regulators. And the file covers the standard homeowners policies of the insurers that reported, about ${K.pct(K.P.data.marketShare, 0)} of that market nationwide; a ZIP code appears only when ${K.P.data.minInsurers} insurers and ${K.P.data.minPolicies} policies reported there, so some rural areas are missing. Each state page lists its largest counties and its dearest and cheapest ZIP codes.</p>
<p>If you are buying a house, ask the seller or your agent for the current premium before you make an offer, and look up the ZIP code. In the dearest tenth of ZIP codes of a state, the premium can be several times the state figure, and it belongs in the monthly cost of the house just like the property tax and the loan payment.</p>
`,
  faqs: [
    { q: 'Which state has the cheapest homeowners insurance?', a: `In the Treasury file, ${low[0].name} had the lowest typical premium per policy in ${N.years[4]}, ${K.usd(low[0].prem[4])}, followed by ${low[1].name} at ${K.usd(low[1].prem[4])} and ${low[2].name} at ${K.usd(low[2].prem[4])}. These are typical figures of ZIP codes, so parts of each state pay much more, and the figures end in ${N.years[4]}.` },
    { q: 'Why is home insurance so expensive in Oklahoma and Nebraska?', a: `Hail and windstorms. Both states have more paid claims per 100 policies than the country: ${K.dec(ok.freq * 100, 1)} in ${ok.name} and ${K.dec(ne.freq * 100, 1)} in ${ne.name}, against ${K.dec(N.freq * 100, 1)} for the typical ZIP code nationally. Roof claims after hail are frequent and costly, and insurers price that into every policy in the area.` },
    { q: 'Do state averages include Citizens or FAIR plan policies?', a: `No. The Treasury data call covered admitted insurers only. Policies written by state plans of last resort and by surplus lines insurers are outside it. In states where many owners rely on such a plan, the typical figure describes the private market that remains, which can differ from what the average household pays.` },
  ],
  tool: 'state',
  related: ['why-is-home-insurance-going-up', 'homeowners-insurance-cost-per-month', 'home-insurance-non-renewal', 'state:florida'],
  sources: ['fio_data', 'fio_report', 'bls_ppi'],
});
