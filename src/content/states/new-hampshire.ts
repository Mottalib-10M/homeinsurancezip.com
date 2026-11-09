import { defineState } from '../../lib/page-types';
import { ctx } from './_ctx';

const { K, N, st, c, regLink, hi, lo, yr } = ctx('new-hampshire');
const gra = c('Grafton County'), roc = c('Rockingham County'), hil = c('Hillsborough County'), car = c('Carroll County');

export default defineState({
  slug: 'new-hampshire',
  title: 'Homeowners Insurance New Hampshire 2026: Seacoast to North',
  description: `Homeowners insurance in New Hampshire 2026: premium per policy by ZIP code and county, 2018 to 2022, the Seacoast, Manchester, the North Country, low losses.`,
  intro: `New Hampshire's median ZIP code paid ${K.usd(st.prem[4])} per policy in ${yr(4)}, below the national median, with paid loss ratios near ${K.pct(st.lrY[4], 0)}.`,
  resume: `New Hampshire homeowners paid ${K.usd(st.prem[4])} per policy in the median ZIP code in ${yr(4)} in the Treasury file, ranked ${st.rankPrem} of 51 and below the national ${K.usd(N.prem[4])}, after a small rise of ${K.sgn(st.chg)} after inflation. Insurers had calm years: paid claims fell from ${K.dec(st.freqY[0] * 100, 1)} per 100 policies in ${yr(0)} to ${K.dec(st.freqY[4] * 100, 1)} in ${yr(4)}, and the paid loss ratio stayed between ${K.pct(Math.min(...st.lrY), 0)} and ${K.pct(Math.max(...st.lrY), 0)}, among the lowest in the country. Rockingham County, on the Seacoast, paid ${K.usd(roc.prem)}; Hillsborough County, Manchester and Nashua, ${K.usd(hil.prem)}; Grafton County, around Hanover and the White Mountains, ${K.usd(gra.prem)}. The dearest ZIP code was ${hi[0].zip} in Rockingham, ${K.usd(hi[0].prem)}, on the shore; the cheapest ${lo[0].zip} in Coos County, the far north. Nonrenewals fell from ${K.rate(st.nonren[0])} in ${yr(0)} to ${K.rate(st.nonren[4])}. New Hampshire has no FAIR plan for homes. The data stop in ${yr(4)}.`,
  body: (h) => `
<h2>The Seacoast and the southern tier</h2>
<p>Rockingham County had ${roc.zips} ZIP codes in the file and a median of ${K.usd(roc.prem)} in ${yr(4)}, up ${K.sgn(roc.chg ?? 0)} after inflation. Its ZIP ${hi[0].zip}, Rye and the shore, paid ${K.usd(hi[0].prem)}, and ${hi[1].zip} in ${hi[1].county} ${K.usd(hi[1].prem)}. Coastal homes face nor'easters and the occasional tropical storm. Hillsborough County, the most populous, paid ${K.usd(hil.prem)} after a rise of ${K.sgn(hil.chg ?? 0)}. Southern New Hampshire's suburbs, many built for Boston commuters, sit close to the state median.</p>
<h2>Lakes, mountains and the North Country</h2>
<p>Carroll County, with Lake Winnipesaukee's eastern shore and the Mount Washington valley, paid ${K.usd(car.prem)}. Grafton County paid ${K.usd(gra.prem)}. The cheapest ZIP codes were ${lo[0].zip} and ${lo[1].zip} in ${lo[0].county}, at ${K.usd(lo[0].prem)} and ${K.usd(lo[1].prem)}. Many lake and mountain houses are seasonal; a policy may limit coverage for freezing or for vandalism when a house stands empty for long periods, so a second home needs the vacancy and heating clauses read carefully.</p>
${h.mini('claim', { t: 'A New Hampshire winter claim near the deductible', p: ['dmg', 'ded', 'sur'], d: { dmg: 2800, ded: 1000, pr: 1400 } })}
<h2>Low losses, winter claims</h2>
<p>New Hampshire's paid loss ratio was ${st.lrY.map((x) => K.pct(x, 0)).join(', ')} from ${yr(0)} to ${yr(4)}. The average claim, ${K.usd(st.sev)}, was close to the national figure, but claims were rare, ${K.dec(st.freq * 100, 1)} per 100 policies a year, ranked ${st.rankFreq} of 51. Winter brings most of them: ice dams, frozen pipes, snow load and fallen trees. With so few claims, the claims history of one household stands out more, and a small claim near the deductible may cost more in later premiums than it pays, as the calculator above shows.</p>
<h2>Renewals and the regulator</h2>
<p>The median nonrenewal rate fell from ${K.rate(st.nonren[0])} in ${yr(0)} to ${K.rate(st.nonren[4])} in ${yr(4)}, ranked ${st.rankNonren} of 51. Cancellations for nonpayment ran at ${K.rate(st.npc)}. New Hampshire has no residual market plan for homes listed in the Treasury report. The ${regLink()} reviews rates and handles complaints. The ${h.a('should-i-file-a-home-insurance-claim', 'claim page')} has more on small claims.</p>
`,
  faqs: [
    { q: 'How much is homeowners insurance in Manchester, New Hampshire?', a: `The median ZIP code of Hillsborough County, which includes Manchester and Nashua, paid ${K.usd(hil.prem)} per policy in ${yr(4)} in the Treasury file, after a rise of ${K.sgn(hil.chg ?? 0)} after inflation. At ${K.ppiMonth} prices that is about ${K.usd(K.today(hil.prem))}. The lookup gives each ZIP code.` },
    { q: 'Is homeowners insurance cheap in New Hampshire?', a: `Below average. The median New Hampshire ZIP code paid ${K.usd(st.prem[4])} per policy in ${yr(4)}, against ${K.usd(N.prem[4])} nationally, ranked ${st.rankPrem} of 51, and insurers paid out a small share of premium in claims. Seacoast ZIP codes paid much more than inland ones.` },
    { q: 'Does insurance cover a vacant lake house in New Hampshire in winter?', a: `Often with limits. Many policies exclude freezing damage unless the heat is kept on or the water is shut off and drained, and some reduce coverage for vandalism or glass breakage after a set period of vacancy. Read those clauses and ask the insurer about a seasonal home endorsement.` },
  ],
  related: ['should-i-file-a-home-insurance-claim', 'state:maine', 'state:vermont', 'state:massachusetts'],
});
