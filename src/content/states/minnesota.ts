import { defineState } from '../../lib/page-types';
import { ctx } from './_ctx';

const { K, N, st, c, regLink, planLink, hi, lo, yr } = ctx('minnesota');
const hen = c('Hennepin County'), stl = c('St. Louis County'), ste = c('Stearns County'), ram = c('Ramsey County');

export default defineState({
  slug: 'minnesota',
  title: 'Homeowners Insurance Minnesota 2026: The 2022 Hail Year',
  description: `Homeowners insurance in Minnesota 2026: premium per policy by ZIP code and county, 2018 to 2022, Hennepin and Ramsey, the 2022 storm losses, FAIR Plan.`,
  intro: `Minnesota homeowners insurers paid ${K.dec(st.freqY[4] * 100, 1)} claims per 100 policies in ${yr(4)}, twice the year before; the typical ZIP code paid ${K.usd(st.prem[4])}.`,
  resume: `Minnesota's typical homeowners premium per policy rose from ${K.usd(st.prem[0])} in ${yr(0)} to ${K.usd(st.prem[4])} in ${yr(4)} in the Treasury file, ${K.sgn(st.chg)} after inflation, ranked ${st.rankChg} of the 50 states and DC for growth and ${st.rankPrem} for level, above the national ${K.usd(N.prem[4])}. The rise was steady, and then ${yr(4)} brought the worst loss year of the period: paid claims jumped to ${K.dec(st.freqY[4] * 100, 1)} per 100 policies, from ${K.dec(st.freqY[3] * 100, 1)}, and the paid loss ratio to ${K.pct(st.lrY[4], 0)}, after hail and windstorms, including a derecho in May. Hennepin County, Minneapolis, paid ${K.usd(hen.prem)}, much more than St. Louis County, Duluth, at ${K.usd(stl.prem)}. Insurers rarely declined to renew: ${K.rate(st.nonren[4])} of policies in ${yr(4)}, ranked ${st.rankNonren} of the 50 states and DC. The Minnesota FAIR Plan writes homes declined elsewhere. Premiums after ${yr(4)}, outside this file, reflected those losses. The data stop in ${yr(4)}.`,
  body: (h) => `
<h2>The Twin Cities</h2>
<p>Hennepin County had ${hen.zips} ZIP codes in the file and a typical figure of ${K.usd(hen.prem)} in ${yr(4)}, up ${K.sgn(hen.chg ?? 0)} after inflation; Ramsey County, Saint Paul, paid ${K.usd(ram.prem)}. Both are well above the state typical figure. The dearest ZIP codes in Minnesota were ${hi[0].zip}, downtown Minneapolis, at ${K.usd(hi[0].prem)}, and ${hi[1].zip}, on the western edge of Hennepin County, at ${K.usd(hi[1].prem)}. Hail has hit the metro area repeatedly, and its roofs carry much of the claim history behind those premiums.</p>
<h2>Greater Minnesota</h2>
<p>Stearns County, around St. Cloud, paid ${K.usd(ste.prem)} after the fastest rise of the large counties, ${K.sgn(ste.chg ?? 0)}. St. Louis County, with Duluth and the Iron Range, paid ${K.usd(stl.prem)}, and its ZIP ${lo[0].zip} was the cheapest in the state at ${K.usd(lo[0].prem)}, ahead of ${lo[1].zip} in ${lo[1].county} at ${K.usd(lo[1].prem)}. The North Shore and the northern lakes have little hail; the southern and western farm counties have a lot.</p>
<p>A Minnesota hail claim on an older roof: the ${h.a('roof-claim-actual-cash-value', 'roof claim calculator')} runs it with your own figures.</p>
<h2>A record loss year</h2>
<p>Minnesota's paid loss ratio was ${st.lrY.map((x) => K.pct(x, 0)).join(', ')} from ${yr(0)} to ${yr(4)}. The last figure means insurers paid out about two thirds of premium in claims, before their own costs. Storms of that kind damage roofs over whole regions at once, and insurers responded with higher wind and hail deductibles and roof schedules that pay older roofs at actual cash value. The calculator above shows how a schedule cuts a claim on a roof in its second half of life; the ${h.a('roof-claim-actual-cash-value', 'roof claim page')} explains the two settlement methods.</p>
<h3>Renewals and the FAIR Plan</h3>
<p>The nonrenewal rate of the typical ZIP code stayed low, between ${K.rate(Math.min(...(st.nonren as number[])))} and ${K.rate(Math.max(...(st.nonren as number[])))}. Cancellations for nonpayment ran at ${K.rate(st.npc)}. The ${planLink(0)} writes dwelling fire, renters, condominium and HO-8 forms for homes that cannot find a private insurer. The ${regLink()} handles complaints. Minnesota winters add ice dams and frozen pipes to the hail season.</p>
`,
  faqs: [
    { q: 'Why did Minnesota home insurance go up after 2022?', a: `${yr(4)} was the worst loss year of the period in the Treasury file: paid claims rose to ${K.dec(st.freqY[4] * 100, 1)} per 100 policies and insurers paid out ${K.pct(st.lrY[4], 0)} of premium in claims, after hail and windstorms. Insurers filed rate increases and raised deductibles in the following years.` },
    { q: 'How much is homeowners insurance in Minneapolis?', a: `The typical ZIP code of Hennepin County, which includes Minneapolis, paid ${K.usd(hen.prem)} per policy in ${yr(4)}, after a rise of ${K.sgn(hen.chg ?? 0)} after inflation from ${yr(0)}. At ${K.ppiMonth} prices that is about ${K.usd(K.today(hen.prem))}. Enter your ZIP code in the lookup for your neighborhood.` },
    { q: 'What does the Minnesota FAIR Plan offer?', a: `It writes dwelling fire policies and renters, condominium and HO-8 homeowners forms for properties that private insurers decline, according to the Treasury report. HO-8 is a modified form for older homes that pays repairs with common materials. Its policies are not in the Treasury premium data.` },
  ],
  related: ['roof-claim-actual-cash-value', 'why-is-home-insurance-going-up', 'state:wisconsin', 'state:north-dakota'],
});
