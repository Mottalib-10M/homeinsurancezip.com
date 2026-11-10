import { defineState } from '../../lib/page-types';
import { ctx } from './_ctx';

const { K, N, st, c, regLink, hi, lo, yr } = ctx('utah');
const slc = c('Salt Lake County'), uc = c('Utah County'), wash = c('Washington County'), cache = c('Cache County');

export default defineState({
  slug: 'utah',
  title: 'Homeowners Insurance Utah 2026: Cheap but Rising Fast',
  description: `Homeowners insurance in Utah 2026: premium per policy by ZIP code and county, 2018 to 2022, Salt Lake, Utah County, St. George, Park City and a fast rise.`,
  intro: `Utah's typical ZIP code paid ${K.usd(st.prem[4])} per homeowners insurance policy in ${yr(4)}, second lowest of any state, after a rise of ${K.sgn(st.chg)} after inflation.`,
  resume: `Utah is one of the cheapest states for homeowners insurance in the Treasury file and one of the fastest rising. The typical ZIP code paid ${K.usd(st.prem[0])} per policy in ${yr(0)} and ${K.usd(st.prem[4])} in ${yr(4)}, a rise of ${K.sgn(st.chg)} after inflation, ranked ${st.rankChg} of the 50 states and DC, while its level ranked ${st.rankPrem}. Every large county rose by about a sixth or more: Salt Lake ${K.sgn(slc.chg ?? 0)} to ${K.usd(slc.prem)}, Utah County ${K.sgn(uc.chg ?? 0)}, Washington County around St. George ${K.sgn(wash.chg ?? 0)}, Cache County ${K.sgn(cache.chg ?? 0)}. Rapid growth, rising construction costs and a climbing loss ratio, from ${K.pct(st.lrY[0], 0)} in ${yr(0)} to ${K.pct(st.lrY[4], 0)} in ${yr(4)}, went with it. Park City's ${hi[0].zip} was the dearest ZIP code, ${K.usd(hi[0].prem)}. Claims were few and modest, ${K.usd(st.sev)} on average. Utah has no FAIR plan for homes. Earthquake is a separate policy. The data stop in ${yr(4)}.`,
  body: (h) => `
<h2>The Wasatch Front</h2>
<p>Salt Lake County had ${slc.zips} ZIP codes in the file and a typical figure of ${K.usd(slc.prem)} in ${yr(4)}; Utah County, Provo and Orem, paid ${K.usd(uc.prem)}. Both sit along the Wasatch Fault, and earthquake is excluded from standard homeowners policies; a separate endorsement or policy, usually with a deductible of 10 percent or more of the dwelling limit, adds it. Few Utah households carry it. Brick and unreinforced masonry houses in older Salt Lake neighborhoods are the most exposed, and Salt Lake City has run a program to help owners retrofit them.</p>
<p>A Utah premium carried from 2022 to today: the ${h.a('why-is-home-insurance-going-up', 'renewal increase calculator')} runs it with your own figures.</p>
<h2>St. George, Logan and the resort towns</h2>
<p>Washington County paid ${K.usd(wash.prem)} after a rise of ${K.sgn(wash.chg ?? 0)}, and Cache County, Logan, ${K.usd(cache.prem)} after ${K.sgn(cache.chg ?? 0)}, one of the fastest rises of the large counties. Summit County holds both of the dearest ZIP codes, ${hi[0].zip}, Park City, at ${K.usd(hi[0].prem)} and ${hi[1].zip} at ${K.usd(hi[1].prem)}, with high-value homes and wildfire exposure on the mountain slopes. The cheapest were rural ZIP codes in the south, ${lo[0].zip} in ${lo[0].county} and ${lo[1].zip} in ${lo[1].county}, around ${K.usd(lo[0].prem)}.</p>
<h2>Why a cheap state rose fast</h2>
<p>Utah's paid claims per 100 policies went ${st.freqY.map((x) => K.dec(x * 100, 1)).join(', ')} from ${yr(0)} to ${yr(4)}, and the paid loss ratio ${st.lrY.map((x) => K.pct(x, 0)).join(', ')}. More frequent claims raise rates, and a growing stock of new houses, built when labor and materials were expensive, raises dwelling limits; both lift the premium per policy. The national index added more after ${yr(4)}. The ${h.a('why-is-home-insurance-going-up', 'page on rising premiums')} explains the mechanics.</p>
<h3>Renewals and the regulator</h3>
<p>The typical nonrenewal rate went ${st.nonren.map((x) => K.rate(x)).join(', ')} from ${yr(0)} to ${yr(4)}, ranked ${st.rankNonren} of the 50 states and DC. Utah has no residual market plan for homes listed in the Treasury report. The ${regLink()} handles complaints. Winter pipe freezes and water damage are the common Utah claims; the ${h.a('should-i-file-a-home-insurance-claim', 'claim calculator')} helps decide whether a small one is worth filing.</p>
`,
  faqs: [
    { q: 'Why is homeowners insurance going up in Utah?', a: `The typical Utah ZIP code rose ${K.sgn(st.chg)} after inflation from ${yr(0)} to ${yr(4)}, one of the fastest rises in the Treasury file, as the paid loss ratio climbed from ${K.pct(st.lrY[0], 0)} to ${K.pct(st.lrY[4], 0)} and construction costs rose with fast growth. Premiums are still among the lowest of any state.` },
    { q: 'How much is homeowners insurance in Salt Lake City?', a: `The typical ZIP code of Salt Lake County paid ${K.usd(slc.prem)} per policy in ${yr(4)}, after a rise of ${K.sgn(slc.chg ?? 0)} after inflation from ${yr(0)}. At ${K.ppiMonth} prices that is about ${K.usd(K.today(slc.prem))}. Earthquake coverage, if added, costs extra. The lookup on the home page gives each ZIP code with its five years.` },
    { q: 'Does Utah homeowners insurance cover earthquakes?', a: `No. Standard homeowners policies exclude earthquake, and the Wasatch Front lies along an active fault. Coverage comes as an endorsement or a separate policy, usually with a deductible of 10 percent or more of the dwelling limit. Brick and older masonry houses are the most exposed and the most worth insuring.` },
  ],
  related: ['why-is-home-insurance-going-up', 'should-i-file-a-home-insurance-claim', 'state:idaho', 'state:colorado'],
});
