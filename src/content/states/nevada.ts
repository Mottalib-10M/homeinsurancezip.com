import { defineState } from '../../lib/page-types';
import { ctx } from './_ctx';

const { K, N, st, c, regLink, hi, lo, yr } = ctx('nevada');
const clark = c('Clark County'), wash = c('Washoe County'), dou = c('Douglas County'), nye = c('Nye County');

export default defineState({
  slug: 'nevada',
  title: 'Homeowners Insurance Nevada 2026: Las Vegas and Reno Costs',
  description: `Homeowners insurance in Nevada 2026: premium per policy by ZIP code and county, 2018 to 2022, Las Vegas, Reno, Lake Tahoe, low claim rates, the wildfire edge.`,
  intro: `Nevada's median ZIP code paid ${K.usd(st.prem[4])} per policy in ${yr(4)}, among the lowest, while Lake Tahoe's ${hi[0].zip} paid ${K.usd(hi[0].prem)}.`,
  resume: `Nevada is one of the cheapest states for homeowners insurance in the Treasury file: the median ZIP code paid ${K.usd(st.prem[4])} per policy in ${yr(4)}, ranked ${st.rankPrem} of 51, after a rise of ${K.sgn(st.chg)} after inflation from ${yr(0)}. Clark County, Las Vegas, with ${clark.zips} ZIP codes, paid ${K.usd(clark.prem)}; Washoe County, Reno, ${K.usd(wash.prem)}. Claims are rare in the desert, ${K.dec(st.freq * 100, 1)} per 100 policies a year, ranked ${st.rankFreq} of 51, with no hurricanes and little hail. The exception is the Sierra edge: Douglas County, at Lake Tahoe and the Carson Valley, paid ${K.usd(dou.prem)}, and its ZIP ${hi[0].zip} ${K.usd(hi[0].prem)}, with wildfire the concern. The cheapest ZIP codes in the state were in Clark County too, ${lo[0].zip} at ${K.usd(lo[0].prem)}. Nonrenewals rose to ${K.rate(st.nonren[4])} in ${yr(4)}. Nevada has no FAIR plan for homes. The data stop in ${yr(4)}.`,
  body: (h) => `
<h2>Las Vegas</h2>
<p>Clark County's median of ${K.usd(clark.prem)} in ${yr(4)} rose ${K.sgn(clark.chg ?? 0)} after inflation from ${yr(0)}. Most Las Vegas homes are newer stucco and tile construction, with little exposure to hail or wind, so weather plays a smaller part in claims than in most states. ZIP ${lo[0].zip} and ${lo[1].zip}, both in ${lo[0].county}, paid ${K.usd(lo[0].prem)} and ${K.usd(lo[1].prem)}, among the lowest figures in the country. The cheapest tenth of Nevada ZIP codes paid under ${K.usd(st.p10)}. Water is the claim to watch in a desert city: a supply line under a sink or behind a refrigerator can soak a slab-built house before anyone notices, and a leak detector with an automatic shutoff costs less than most deductibles.</p>
<h2>Reno and the Sierra edge</h2>
<p>Washoe County paid ${K.usd(wash.prem)} after a rise of ${K.sgn(wash.chg ?? 0)}. Its ZIP ${hi[1].zip}, on the north shore of Lake Tahoe, paid ${K.usd(hi[1].prem)}, and Douglas County's ${hi[0].zip} at Glenbrook, on the east shore, ${K.usd(hi[0].prem)}. Douglas County as a whole rose ${K.sgn(dou.chg ?? 0)}. Forest and brush close to houses are the wildfire risk insurers price in these ZIP codes, and they are where nonrenewals concentrate.</p>
${h.mini('state', { t: 'Nevada against Arizona or Utah', p: ['sx', 'mine'], d: { sx: 'nevada' } })}
<h2>Rural Nevada</h2>
<p>Nye County, with Pahrump, paid ${K.usd(nye.prem)}, below the state median, after a rise of only ${K.sgn(nye.chg ?? 0)}. Much of rural Nevada has too few insurers or policies to appear in the file. Manufactured homes, common in rural areas, are usually insured on other forms and are outside these HO-3 and HO-5 figures.</p>
<h2>Claims, renewals and the regulator</h2>
<p>Paid claims ran at ${K.dec(st.freq * 100, 1)} per 100 policies a year, at ${K.usd(st.sev)} on average, and the paid loss ratio rose from ${K.pct(st.lrY[0], 0)} to ${K.pct(st.lrY[4], 0)}. Nonrenewals went from ${K.rate(st.nonren[2])} in ${yr(2)} to ${K.rate(st.nonren[4])} in ${yr(4)}. Nevada has no residual market plan for homes listed in the Treasury report, so declined homes go to surplus lines insurers. The ${regLink()} handles complaints. For water claims, the ${h.a('should-i-file-a-home-insurance-claim', 'claim calculator')} helps decide whether a small one is worth filing.</p>
`,
  faqs: [
    { q: 'How much is homeowners insurance in Las Vegas?', a: `The median ZIP code of Clark County, which includes Las Vegas, paid ${K.usd(clark.prem)} per policy in ${yr(4)}, among the lowest county medians in the country. At ${K.ppiMonth} prices, using the BLS index, that is about ${K.usd(K.today(clark.prem))}. Newer houses and few storms keep premiums low.` },
    { q: 'Why is home insurance so expensive near Lake Tahoe in Nevada?', a: `Wildfire risk and high-value houses. Douglas County's ZIP ${hi[0].zip}, on the Nevada side of the lake, paid ${K.usd(hi[0].prem)} per policy in ${yr(4)}, against ${K.usd(st.prem[4])} for the median Nevada ZIP code. Insurers have also become stricter about writing homes close to forest.` },
    { q: 'Does Nevada have a FAIR plan for homeowners?', a: `No residual market plan for homes is listed for Nevada in the Treasury report. A home that admitted insurers decline, often in wildfire areas around Lake Tahoe or Reno, is placed with a surplus lines insurer through a licensed agent, usually at a higher price and with narrower terms.` },
  ],
  related: ['should-i-file-a-home-insurance-claim', 'home-insurance-non-renewal', 'state:california', 'state:arizona'],
});
