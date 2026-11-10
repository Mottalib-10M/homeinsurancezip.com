import { defineState } from '../../lib/page-types';
import { ctx } from './_ctx';

const { K, N, st, c, regLink, hi, lo, yr } = ctx('vermont');
const wsr = c('Windsor County'), ora = c('Orange County'), rut = c('Rutland County'), whm = c('Windham County');

export default defineState({
  slug: 'vermont',
  title: 'Homeowners Insurance Vermont 2026: Low Losses, Falling Drops',
  description: `Homeowners insurance in Vermont 2026: premium per policy by ZIP code and county, 2018 to 2022, the smallest average claim in the US, Burlington, Windsor.`,
  intro: `Vermont homeowners insurers paid the smallest average claim of any state, ${K.usd(st.sev)}; the typical ZIP code paid ${K.usd(st.prem[4])} per policy in ${yr(4)}.`,
  resume: `Vermont is a low-loss state in the Treasury file. Insurers paid ${K.dec(st.freq * 100, 1)} claims per 100 policies a year, ranked ${st.rankFreq} of the 50 states and DC, and the smallest average claim of any state, ${K.usd(st.sev)}. The paid loss ratio stayed between ${K.pct(Math.min(...st.lrY), 0)} and ${K.pct(Math.max(...st.lrY), 0)}. The typical ZIP code paid ${K.usd(st.prem[4])} per homeowners policy in ${yr(4)}, ranked ${st.rankPrem} of the 50 states and DC and below the national ${K.usd(N.prem[4])}, and the figure fell ${K.sgn(st.chg)} after inflation from ${yr(0)}, one of the few declines. Nonrenewals fell every year, from ${K.rate(st.nonren[0])} in ${yr(0)} to ${K.rate(st.nonren[4])} in ${yr(4)}. Windsor County paid ${K.usd(wsr.prem)}, Windham ${K.usd(whm.prem)}; the cheapest ZIP codes were in Chittenden County around Burlington, ${lo[0].zip} at ${K.usd(lo[0].prem)}. The data stop in ${yr(4)}, a year before the July 2023 floods, which homeowners policies did not cover. Vermont has no FAIR plan for homes.`,
  body: (h) => `
<h2>Small claims, low premiums</h2>
<p>An average paid claim of ${K.usd(st.sev)} over ${yr(0)} to ${yr(4)}, against ${K.usd(N.sev)} for the typical ZIP code nationally, points to repairs rather than total losses: ice dams, frozen pipes, wind and fallen trees. Paid claims per 100 policies fell from ${K.dec(st.freqY[0] * 100, 1)} in ${yr(0)} to ${K.dec(st.freqY[4] * 100, 1)} in ${yr(4)}, and the paid loss ratio was ${st.lrY.map((x) => K.pct(x, 0)).join(', ')}. With losses that low, premiums did not keep up with general inflation. With claims this small, a repair near the deductible is often better paid directly, as the calculator below shows.</p>
<p>A small Vermont claim: file or pay? The ${h.a('should-i-file-a-home-insurance-claim', 'claim calculator')} answers it with your own figures.</p>
<h2>Counties and ZIP codes</h2>
<p>Windsor County had ${wsr.zips} ZIP codes in the file and a typical figure of ${K.usd(wsr.prem)} in ${yr(4)}; Orange County ${K.usd(ora.prem)}, Rutland ${K.usd(rut.prem)} and Windham ${K.usd(whm.prem)}. All four fell after inflation. The dearest ZIP codes were ${hi[0].zip} in ${hi[0].county}, Woodstock, at ${K.usd(hi[0].prem)} and ${hi[1].zip} in ${hi[1].county}, Dorset, at ${K.usd(hi[1].prem)}, with large old houses and second homes. The cheapest, ${lo[0].zip} and ${lo[1].zip} in ${lo[0].county}, paid ${K.usd(lo[0].prem)} and ${K.usd(lo[1].prem)}.</p>
<h2>Floods are a separate policy</h2>
<p>Vermont's worst recent disasters were floods: Irene in 2011 and the July 2023 rains that flooded Montpelier, Barre and many valley towns. Homeowners policies exclude flood from rising water, and few Vermont households outside mapped flood zones carried a flood policy. Those losses do not appear in these figures. If your house is near a river or a brook, a flood policy is a separate purchase, usually with a waiting period before it starts.</p>
<h3>Renewals and the regulator</h3>
<p>The typical nonrenewal rate went ${st.nonren.map((x) => K.rate(x)).join(', ')} from ${yr(0)} to ${yr(4)}, falling every year. Cancellations for nonpayment were above the national typical figure, ${K.rate(st.npc)}. Vermont has no residual market plan for homes listed in the Treasury report. The ${regLink()} handles complaints. Wood stoves and old wiring are common questions on applications for Vermont farmhouses; the ${h.a('how-much-dwelling-coverage', 'dwelling coverage page')} explains how to set a limit for a house that would cost more to rebuild than to buy.</p>
`,
  faqs: [
    { q: 'Is homeowners insurance cheap in Vermont?', a: `Below average. The typical Vermont ZIP code paid ${K.usd(st.prem[4])} per policy in ${yr(4)}, against ${K.usd(N.prem[4])} nationally, and insurers paid the smallest average claim of any state, ${K.usd(st.sev)}. Prices fell after inflation from ${yr(0)}. Flood coverage, which Vermont often needs, is separate.` },
    { q: 'Did homeowners insurance cover the 2023 Vermont floods?', a: `No. Standard homeowners policies exclude flood from rising water, so owners without a separate flood policy had no coverage for that damage. The Treasury data end in ${yr(4)} and do not include those losses. Sewer backup during a flood needs an endorsement as well.` },
    { q: 'How much is homeowners insurance around Burlington, Vermont?', a: `Chittenden County's ZIP ${lo[0].zip}, Winooski, next to Burlington, paid ${K.usd(lo[0].prem)} per policy in ${yr(4)}, one of the lowest figures in the state. At ${K.ppiMonth} prices that is about ${K.usd(K.today(lo[0].prem))}. Other Chittenden ZIP codes paid more; the lookup gives each one.` },
  ],
  related: ['should-i-file-a-home-insurance-claim', 'how-much-dwelling-coverage', 'state:new-hampshire', 'state:maine'],
});
