import { defineState } from '../../lib/page-types';
import { ctx } from './_ctx';

const { K, N, st, c, regLink, planLink, hi, lo, yr } = ctx('wisconsin');
const mil = c('Milwaukee County'), dane = c('Dane County'), wauk = c('Waukesha County'), dod = c('Dodge County');

export default defineState({
  slug: 'wisconsin',
  title: 'Homeowners Insurance Wisconsin 2026: Milwaukee and Madison',
  description: `Homeowners insurance in Wisconsin 2026: premium per policy by ZIP code and county, 2018 to 2022, Milwaukee, Madison, Waukesha, the Northwoods, renewals.`,
  intro: `Wisconsin's median ZIP code paid ${K.usd(st.prem[4])} per policy in ${yr(4)}, ranked ${st.rankPrem} of 51; Dane County, Madison, rose ${K.sgn(dane.chg ?? 0)}.`,
  resume: `Wisconsin is one of the cheaper states for homeowners insurance in the Treasury file. Its ${K.num(st.zips)} ZIP codes had a median of ${K.usd(st.prem[4])} per policy in ${yr(4)}, ranked ${st.rankPrem} of 51 and below the national ${K.usd(N.prem[4])}, after a rise of ${K.sgn(st.chg)} after inflation. The range is narrow: the dearest ZIP code in the state, ${hi[0].zip} on Geneva Lake, paid ${K.usd(hi[0].prem)}, a low top figure for a large state. Dane County, Madison, rose fastest of the three largest counties, ${K.sgn(dane.chg ?? 0)}, to ${K.usd(dane.prem)}; Milwaukee County paid ${K.usd(mil.prem)} and Waukesha ${K.usd(wauk.prem)}. Claims were few, ${K.dec(st.freq * 100, 1)} per 100 policies a year, and the paid loss ratio stayed between ${K.pct(Math.min(...st.lrY), 0)} and ${K.pct(Math.max(...st.lrY), 0)}. Insurers rarely declined to renew: ${K.rate(st.nonren[4])} in ${yr(4)}. Many Wisconsin homes are insured by local town mutuals, some of which may not have reported. Wisconsin's FAIR plan writes an HO-8 form. The data stop in ${yr(4)}.`,
  body: (h) => `
<h2>Milwaukee and its suburbs</h2>
<p>Milwaukee County had ${mil.zips} ZIP codes in the file and a median of ${K.usd(mil.prem)} in ${yr(4)}, up ${K.sgn(mil.chg ?? 0)} after inflation. Waukesha County, to the west, paid ${K.usd(wauk.prem)}, and its ZIP ${hi[1].zip} ${K.usd(hi[1].prem)}, the second highest in the state. Older city houses with basements are common in Milwaukee; sewer backup after heavy rain is excluded from standard policies unless an endorsement is added, and it is one of the most useful endorsements in the region.</p>
<h2>Madison and the rest of the state</h2>
<p>Dane County paid ${K.usd(dane.prem)} after a rise of ${K.sgn(dane.chg ?? 0)}, with a fast-growing housing stock. Dodge County paid ${K.usd(dod.prem)}. In the Northwoods, ${lo[0].zip} in ${lo[0].county} and ${lo[1].zip} in ${lo[1].county} paid ${K.usd(lo[0].prem)} and ${K.usd(lo[1].prem)}, among the cheapest ZIP codes in the country. Lake cabins left empty in winter carry the usual freezing and vacancy limits; read those clauses before closing a cabin for the season.</p>
${h.mini('claim', { t: 'A Wisconsin basement water claim', p: ['dmg', 'ded', 'sur'], d: { dmg: 5000, ded: 1000, pr: 1350 } })}
<h2>Low losses, small claims</h2>
<p>Paid claims per 100 policies went ${st.freqY.map((x) => K.dec(x * 100, 1)).join(', ')} from ${yr(0)} to ${yr(4)}, with ${yr(4)} the busiest. The average claim, ${K.usd(st.sev)}, was close to the national figure. The paid loss ratio of ${K.pct(st.lrY[4], 0)} in ${yr(4)} was the highest of the period. Hail in the south of the state and winter water damage are the common claims; a small water claim is often worth weighing against a surcharge first, as the calculator above does.</p>
<h2>Town mutuals, renewals and the FAIR plan</h2>
<p>Wisconsin has many small town mutual insurers, some over a century old, that write farm and rural homes. The data call targeted larger insurers, so rural ZIP codes where town mutuals dominate may be thin or missing in the file. The median nonrenewal rate went ${st.nonren.map((x) => K.rate(x)).join(', ')} from ${yr(0)} to ${yr(4)}. ${planLink(0)} writes an HO-8 homeowners form for homes that private insurers decline. The office of the ${regLink()} handles complaints.</p>
`,
  faqs: [
    { q: 'How much is homeowners insurance in Milwaukee?', a: `The median ZIP code of Milwaukee County paid ${K.usd(mil.prem)} per policy in ${yr(4)}, after a rise of ${K.sgn(mil.chg ?? 0)} after inflation from ${yr(0)}, below the national median of ${K.usd(N.prem[4])}. At ${K.ppiMonth} prices that is about ${K.usd(K.today(mil.prem))}. The lookup on the home page gives each ZIP code with its five years.` },
    { q: 'How much is homeowners insurance in Madison, Wisconsin?', a: `The median ZIP code of Dane County, which includes Madison, paid ${K.usd(dane.prem)} per policy in ${yr(4)}, after a rise of ${K.sgn(dane.chg ?? 0)} after inflation, the fastest of Wisconsin's three largest counties. At ${K.ppiMonth} prices that is about ${K.usd(K.today(dane.prem))}. Newer suburbs and the isthmus differ.` },
    { q: 'What is a town mutual insurance company in Wisconsin?', a: `A small insurer owned by its policyholders, often serving one or a few rural counties, that writes farm and home policies. Wisconsin has many of them. They were not all asked to report in the Treasury data call, so the Treasury figures may describe rural Wisconsin less well than its cities.` },
  ],
  related: ['should-i-file-a-home-insurance-claim', 'state:minnesota', 'state:michigan', 'state:illinois'],
});
