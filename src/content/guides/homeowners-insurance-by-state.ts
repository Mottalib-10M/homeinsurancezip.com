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
const bySev = K.rank((s) => s.sev);
const byFreq = K.rank((s) => s.freq);
const rows = byPrem.slice(0, 12).map((s) => [s.name, K.usd(s.prem[4]), K.usd(s.p10), K.usd(s.p90), K.sgn(s.chg)]);

export default defineGuide({
  id: 'homeowners-insurance-by-state', group: 'cost', order: 1, slug: 'homeowners-insurance-by-state',
  nav: 'Cost by state', card: 'Median premium per policy in every state, the spread inside each one and the change after inflation.',
  title: 'Homeowners Insurance by State 2026: Average Cost per Policy',
  description: `Homeowners insurance by state 2026: what the median ZIP code paid per policy in all 50 states and DC, the cheap and dear tenth, and the change after inflation.`,
  h1: 'Homeowners insurance by state: what policies really cost',
  intro: `${a.name} had the highest median premium per policy in ${N.years[4]}, ${K.usd(a.prem[4])}; ${low[0].name} the lowest, ${K.usd(low[0].prem[4])}.`,
  resume: `Across the ${K.num(N.zips)} ZIP codes of the Treasury file, the median homeowners premium per policy was ${K.usd(N.prem[4])} in ${N.years[4]}. The state medians run from ${K.usd(low[0].prem[4])} in ${low[0].name} to ${K.usd(a.prem[4])} in ${a.name}, a ratio of about ${K.dec(a.prem[4] / low[0].prem[4], 1)} to 1. Second and third are ${b.name} (${K.usd(b.prem[4])}) and ${c.name} (${K.usd(c.prem[4])}), which shows that hail and wind on the Plains cost insurers as much as hurricanes on the coast. The state figure hides a wide range: in ${wide.name} the dearest tenth of ZIP codes pays more than ${K.dec(wide.p90 / wide.p10, 1)} times what the cheapest tenth pays. ${byChg[0].name} had the largest rise after inflation from ${N.years[0]} to ${N.years[4]}, ${K.sgn(byChg[0].chg)}, while ${fl.name} fell ${K.sgn(fl.chg)} as policies moved to Citizens. These are premiums written per HO-3 or HO-5 policy, not quotes, and they stop in ${N.years[4]}.`,
  body: (h) => `
<h2>The ranking, and what it is made of</h2>
<p>Each state figure here is the middle ZIP code of the state: line up every ZIP code by its premium per policy and take the one in the center. That choice keeps a few very expensive beach or ski towns from pulling the number up, and it gives every part of the state the same weight. The ranking is not the one quote sites publish. Those sites price one invented house with the same dwelling limit in every state; the Treasury figure is what insurers wrote for the real houses of each area, divided by the policies in force.</p>
${h.table(['State', `Median ZIP ${N.years[4]}`, 'Cheapest tenth under', 'Dearest tenth over', `Change ${N.years[0]}-${N.years[4]}`], rows, 'The twelve highest state medians. Treasury FIO workbook, medians across ZIP codes, inflation-adjusted as published.', ['l', 'r', 'r', 'r', 'r'])}
<p>${a.name} leads because coastal counties pay several times the inland ones: the dearest tenth of its ZIP codes paid more than ${K.usd(a.p90)}. ${plains.map((s) => `${s.name} (${K.usd(s.prem[4])})`).join(', ')} follow for a different reason, the repeated hail and windstorms of the Plains, which give ${ne.name} a claim rate of ${K.dec(ne.freq * 100, 1)} paid claims per 100 policies a year against ${K.dec(N.freq * 100, 1)} nationally. ${co.name}, with hail along the Front Range and wildfire in the mountains, ranks ${co.rankPrem} of 51.</p>
${h.mini('nonrenew', { t: 'Your state: the chance of a nonrenewal while you own the house', p: ['sx', 'yrs'] })}
<h2>Where homeowners pay the least</h2>
<p>${low.map((s) => `${s.name} (${K.usd(s.prem[4])})`).join(', ')} sit at the bottom. ${pa.name} has the third largest number of ZIP codes in the file and few catastrophe years: its average claim was ${K.usd(pa.sev)}, ranked ${pa.rankSev} of 51, and its paid loss ratio stayed near ${K.pct(pa.lr, 0)}. Low state medians do not mean low prices everywhere. In ${ny.name}, whose median is ${K.usd(ny.prem[4])}, the dearest tenth of ZIP codes paid over ${K.usd(ny.p90)}, and the county medians of Suffolk, Nassau and Westchester were all above ${K.usd(2500)}.</p>
<h2>Who rose fastest after inflation</h2>
<p>From ${N.years[0]} to ${N.years[4]} the national median premium went from ${K.usd(N.prem[0])} to ${K.usd(N.prem[4])}, ${K.sgn(N.chg)} on top of general inflation. The steepest rises were in ${byChg.slice(0, 4).map((s) => `${s.name} (${K.sgn(s.chg)})`).join(', ')}. ${ca.name} stands out because its rise came with a jump in nonrenewals after the 2018 fires, covered on the ${h.a('home-insurance-non-renewal', 'nonrenewal page')}. ${fl.name} moved the other way, ${K.sgn(fl.chg)}, which is not good news for buyers there: private insurers shed policies, the remaining book changed, and many owners ended up with the state plan, whose policies are outside this file. The ${h.a('why-is-home-insurance-going-up', 'page on rising premiums')} carries these figures to ${K.ppiMonth}.</p>
<h2>Frequent small claims or rare large ones</h2>
<p>Two states can reach the same premium by different roads. In ${byFreq[0].name}, ${byFreq[1].name} and ${byFreq[2].name} insurers paid the most claims per policy, ${K.dec(byFreq[0].freq * 100, 1)}, ${K.dec(byFreq[1].freq * 100, 1)} and ${K.dec(byFreq[2].freq * 100, 1)} per 100 policies a year. The largest average claims were elsewhere: ${bySev[0].name} (${K.usd(bySev[0].sev)}), ${bySev[1].name} (${K.usd(bySev[1].sev)}) and ${bySev[2].name} (${K.usd(bySev[2].sev)}), where a fire or a total loss weighs more than many roof repairs. A state with frequent claims tends to raise deductibles and inspect roofs; a state with rare, large ones tends to see insurers limit how many homes they write in the riskiest areas.</p>
<h2>Texas and the other caveats</h2>
<p>${tx.name}, ranked ${tx.rankPrem} of 51 at ${K.usd(tx.prem[4])}, has no nonrenewal figures: its insurers did not report them in the data call. In every state the file covers the HO-3 and HO-5 forms of the reporting insurers, about ${K.pct(K.P.data.marketShare, 0)} of that market nationwide, so a state where small local insurers write much of the business is less well represented. A ZIP code appears only when ${K.P.data.minInsurers} insurers and ${K.P.data.minPolicies} policies reported there, so some rural areas are missing. The state pages list the highest and lowest ZIP codes and the largest counties for each state, and the lookup at the top of the ${h.a('home', 'home page')} works for any ZIP code in the file.</p>
<h2>Using a state median with your own bill</h2>
<p>Enter your premium in the calculator above. A bill well above the state median is not proof of overcharging: a larger house, a lower deductible, a claim, a wood roof or a coastal ZIP code all raise it. A bill far above your own ZIP code, at today's prices, is a reason to ask for quotes from other insurers and to check the dwelling limit, explained on the ${h.a('how-much-dwelling-coverage', 'dwelling coverage page')}.</p>
`,
  faqs: [
    { q: 'Which state has the cheapest homeowners insurance?', a: `In the Treasury file, ${low[0].name} had the lowest median premium per policy in ${N.years[4]}, ${K.usd(low[0].prem[4])}, followed by ${low[1].name} at ${K.usd(low[1].prem[4])} and ${low[2].name} at ${K.usd(low[2].prem[4])}. These are medians of ZIP codes, so parts of each state pay much more, and the figures end in ${N.years[4]}.` },
    { q: 'Why is home insurance so expensive in Oklahoma and Nebraska?', a: `Hail and windstorms. Both states have more paid claims per 100 policies than the country: ${K.dec(ok.freq * 100, 1)} in ${ok.name} and ${K.dec(ne.freq * 100, 1)} in ${ne.name}, against ${K.dec(N.freq * 100, 1)} for the median ZIP code nationally. Roof claims after hail are frequent and costly, and insurers price that into every policy in the area.` },
    { q: 'Do state averages include Citizens or FAIR plan policies?', a: `No. The Treasury data call covered admitted insurers only. Policies written by state plans of last resort and by surplus lines insurers are outside it. In states where many owners rely on such a plan, the median describes the private market that remains, which can differ from what the average household pays.` },
  ],
  tool: 'state',
  related: ['why-is-home-insurance-going-up', 'homeowners-insurance-cost-per-month', 'home-insurance-non-renewal', 'state:florida'],
  sources: ['fio_data', 'fio_report', 'bls_ppi'],
});
