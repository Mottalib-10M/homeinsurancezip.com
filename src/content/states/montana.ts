import { defineState } from '../../lib/page-types';
import { ctx } from './_ctx';

const { K, N, st, c, regLink, hi, lo, yr } = ctx('montana');
const mis = c('Missoula County'), cas = c('Cascade County'), fla = c('Flathead County'), lake = c('Lake County');

export default defineState({
  slug: 'montana',
  title: 'Homeowners Insurance Montana 2026: Big Sky and Bozeman Rates',
  description: `Homeowners insurance in Montana 2026: premium per policy by ZIP code and county, 2018 to 2022, Missoula, Flathead, Big Sky, wildfire and rising nonrenewals.`,
  intro: `Montana's median ZIP code paid ${K.usd(st.prem[4])} per homeowners insurance policy in ${yr(4)}; ZIP ${hi[0].zip}, Big Sky, paid ${K.usd(hi[0].prem)}.`,
  resume: `Montana's median homeowners premium per policy was ${K.usd(st.prem[4])} in ${yr(4)} in the Treasury file, above the national ${K.usd(N.prem[4])} and ranked ${st.rankPrem} of 51, after a rise of ${K.sgn(st.chg)} after inflation from ${yr(0)}. Only ${st.zips} Montana ZIP codes reach the file's threshold, most of them in the western valleys and the larger towns. Cascade County, Great Falls, rose fastest of the large counties, ${K.sgn(cas.chg ?? 0)}, to ${K.usd(cas.prem)}. Missoula County paid ${K.usd(mis.prem)} and Flathead County ${K.usd(fla.prem)}. The resort ZIP code ${hi[0].zip} at Big Sky paid ${K.usd(hi[0].prem)}, and ${hi[1].zip} near Bozeman ${K.usd(hi[1].prem)}. Claims were infrequent but large, ${K.usd(st.sev)} on average, ranked ${st.rankSev} of 51, the profile of fire and winter water losses. Nonrenewals tripled from ${K.rate(st.nonren[2])} in ${yr(2)} to ${K.rate(st.nonren[4])} in ${yr(4)}, as insurers pulled back from wildfire areas. Montana has no FAIR plan for homes. The data stop in ${yr(4)}.`,
  body: (h) => `
<h2>The western valleys</h2>
<p>Missoula County had ${mis.zips} ZIP codes in the file and a median of ${K.usd(mis.prem)} in ${yr(4)}, up ${K.sgn(mis.chg ?? 0)} after inflation. Flathead County, around Kalispell and Whitefish, paid ${K.usd(fla.prem)}, and Lake County, around Flathead Lake and Polson, ${K.usd(lake.prem)}. Both sit next to national forest, and wildfire is the risk insurers price there. The cheapest ZIP codes were ${lo[0].zip} in ${lo[0].county} at ${K.usd(lo[0].prem)} and ${lo[1].zip} in ${lo[1].county} at ${K.usd(lo[1].prem)}.</p>
<h2>Big Sky, Bozeman and second homes</h2>
<p>ZIP ${hi[0].zip}, in the ${hi[0].county} part of Big Sky, paid ${K.usd(hi[0].prem)} per policy, and ${hi[1].zip} in ${hi[1].county} ${K.usd(hi[1].prem)}. Those are very large houses, often second homes, with high dwelling limits. A vacant home in a Montana winter carries a risk of freezing that many policies limit unless the heat is kept on or the water is shut off and drained. The state's range from the cheapest tenth of ZIP codes, under ${K.usd(st.p10)}, to the dearest, over ${K.usd(st.p90)}, is wide for a rural state.</p>
${h.mini('coins', { t: 'A Montana house: dwelling limit and rebuild cost', p: ['rc', 'lim', 'loss'], d: { rc: 520000, lim: 400000, loss: 90000 } })}
<h2>Rare claims, large claims</h2>
<p>Montana insurers paid ${K.dec(st.freq * 100, 1)} claims per 100 policies a year, ranked ${st.rankFreq} of 51, at an average of ${K.usd(st.sev)}. When losses are mostly fires, the dwelling limit decides how much of a rebuild the policy pays. Remote building sites, a short construction season and the demand surge after a wildfire push rebuild costs above what a quick estimate gives, so the calculator above is worth running with a builder's figure. The ${h.a('how-much-dwelling-coverage', 'dwelling coverage page')} explains the replacement cost condition.</p>
<h2>Nonrenewals and the regulator</h2>
<p>Montana's median nonrenewal rate went ${st.nonren.map((x) => K.rate(x)).join(', ')} from ${yr(0)} to ${yr(4)}. Montana has no residual market plan for homes listed in the Treasury report, so a home declined by admitted insurers goes to the surplus lines market. The office of the ${regLink('Montana Commissioner of Securities and Insurance')} handles complaints. Creating defensible space around the house and a fire-resistant roof can help with both renewal and price.</p>
`,
  faqs: [
    { q: 'Why is home insurance expensive in Big Sky, Montana?', a: `ZIP ${hi[0].zip} paid ${K.usd(hi[0].prem)} per policy in ${yr(4)} in the Treasury file, the highest in Montana. Large, high-value houses carry high dwelling limits, and wildfire risk, remote locations and winter water damage make each loss expensive. The median Montana ZIP code paid ${K.usd(st.prem[4])}.` },
    { q: 'Are insurers dropping homes in Montana because of wildfire?', a: `The Treasury file shows Montana's median nonrenewal rate rising from ${K.rate(st.nonren[2])} in ${yr(2)} to ${K.rate(st.nonren[4])} in ${yr(4)}. It does not give reasons, but the rise matches insurers' moves in wildfire areas across the West. Defensible space and a class A roof help with renewals.` },
    { q: 'How much is homeowners insurance in Missoula?', a: `The median ZIP code of Missoula County paid ${K.usd(mis.prem)} per policy in ${yr(4)}, after a rise of ${K.sgn(mis.chg ?? 0)} after inflation from ${yr(0)}, slightly under the Montana median. At ${K.ppiMonth} prices that is about ${K.usd(K.today(mis.prem))}. The lookup gives each ZIP code.` },
  ],
  related: ['how-much-dwelling-coverage', 'home-insurance-non-renewal', 'state:idaho', 'state:wyoming'],
});
