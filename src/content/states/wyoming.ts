import { defineState } from '../../lib/page-types';
import { ctx } from './_ctx';

const { K, N, st, c, regLink, hi, lo, yr } = ctx('wyoming');
const car = c('Carbon County'), lin = c('Lincoln County'), lar = c('Laramie County'), nat = c('Natrona County');

export default defineState({
  slug: 'wyoming',
  title: 'Homeowners Insurance Wyoming 2026: Cheyenne, Casper, Jackson',
  description: `Homeowners insurance in Wyoming 2026: premium per policy by ZIP code and county, 2018 to 2022, Cheyenne's hail, Casper, Jackson Hole and falling claim rates.`,
  intro: `Wyoming's typical ZIP code paid ${K.usd(st.prem[4])} per homeowners insurance policy in ${yr(4)}; Jackson's ${hi[0].zip} paid ${K.usd(hi[0].prem)}, and Laramie County rose ${K.sgn(lar.chg ?? 0)}.`,
  resume: `Only ${st.zips} Wyoming ZIP codes reach the Treasury file's threshold, and their typical premium per homeowners policy was ${K.usd(st.prem[4])} in ${yr(4)}, ranked ${st.rankPrem} of the 50 states and DC and above the national ${K.usd(N.prem[4])}, after a rise of ${K.sgn(st.chg)} after inflation. Laramie County, Cheyenne, stands out: ${K.usd(lar.prem)} after a rise of ${K.sgn(lar.chg ?? 0)}, with hail on the high plains the reason. Natrona County, Casper, paid ${K.usd(nat.prem)}. The dearest ZIP codes were in Teton County, ${hi[0].zip}, Jackson, at ${K.usd(hi[0].prem)} and ${hi[1].zip} at ${K.usd(hi[1].prem)}, where house values are among the highest in the country. Paid claims fell every year, from ${K.dec(st.freqY[0] * 100, 1)} per 100 policies in ${yr(0)} to ${K.dec(st.freqY[4] * 100, 1)} in ${yr(4)}, but were large, ${K.usd(st.sev)} on average. Nonrenewals peaked at ${K.rate(st.nonren[3])} in ${yr(3)}. Wyoming has no FAIR plan for homes. The data stop in ${yr(4)}.`,
  body: (h) => `
<h2>Cheyenne and the high plains</h2>
<p>Laramie County had ${lar.zips} ZIP codes in the file and a typical figure of ${K.usd(lar.prem)} in ${yr(4)}, well above the state typical figure and far above Natrona County's ${K.usd(nat.prem)}. Cheyenne is one of the most hail-prone cities in the country, and many policies there carry a percentage wind and hail deductible and settle older roofs at actual cash value. The ${h.a('roof-claim-actual-cash-value', 'roof claim calculator')} shows what that means on a claim.</p>
<p>A Cheyenne hail claim on a 10-year roof: the ${h.a('roof-claim-actual-cash-value', 'roof claim calculator')} runs it with your own figures.</p>
<h2>Jackson Hole</h2>
<p>ZIP ${hi[0].zip} paid ${K.usd(hi[0].prem)} per policy and ${hi[1].zip} ${K.usd(hi[1].prem)}: very large houses, many of them second homes, with high dwelling limits and wildfire exposure. Remote sites and a short building season make rebuilding expensive, and the ${h.a('how-much-dwelling-coverage', 'dwelling coverage page')} explains why a limit set on the purchase price can fall short.</p>
<h2>The rest of Wyoming</h2>
<p>Carbon County, Rawlins, paid ${K.usd(car.prem)} and Lincoln County, Star Valley and Kemmerer, ${K.usd(lin.prem)}. The cheapest ZIP codes were ${lo[0].zip} in ${lo[0].county}, Rock Springs, at ${K.usd(lo[0].prem)} and ${lo[1].zip} in ${lo[1].county} at ${K.usd(lo[1].prem)}. Much of rural Wyoming has too few insurers or policies to appear in the file, and manufactured homes, common there, are insured on other forms. Ranch houses far from a fire station are rated for that distance, which can weigh more on the premium than the weather.</p>
<h3>Claims, renewals and the regulator</h3>
<p>Paid claims went ${st.freqY.map((x) => K.dec(x * 100, 1)).join(', ')} per 100 policies from ${yr(0)} to ${yr(4)}, falling each year, and the paid loss ratio ${st.lrY.map((x) => K.pct(x, 0)).join(', ')}. The average claim, ${K.usd(st.sev)}, ranked ${st.rankSev} of the 50 states and DC. The typical nonrenewal rate went ${st.nonren.map((x) => K.rate(x)).join(', ')}. Wyoming has no residual market plan for homes listed in the Treasury report. The ${regLink()} handles complaints. Winter pipe freezes in vacant homes are a common claim; many policies limit them unless heat is maintained. With claims this large, a limit that matches the cost to rebuild matters more than the deductible.</p>
`,
  faqs: [
    { q: 'Why is homeowners insurance expensive in Cheyenne?', a: `Hail. Laramie County's typical ZIP code paid ${K.usd(lar.prem)} per policy in ${yr(4)}, after a rise of ${K.sgn(lar.chg ?? 0)} after inflation, well above the Wyoming typical figure of ${K.usd(st.prem[4])}. Cheyenne sits in one of the most hail-prone parts of the country, and roof claims drive its rates.` },
    { q: 'How much is homeowners insurance in Jackson, Wyoming?', a: `ZIP ${hi[0].zip}, Jackson, paid ${K.usd(hi[0].prem)} per policy in ${yr(4)} in the Treasury file, the highest in Wyoming, reflecting very high house values and wildfire exposure. At ${K.ppiMonth} prices, using the national BLS index, that is about ${K.usd(K.today(hi[0].prem))}. Wildfire terms matter in quotes there.` },
    { q: 'How much is homeowners insurance in Casper?', a: `The typical ZIP code of Natrona County, which includes Casper, paid ${K.usd(nat.prem)} per policy in ${yr(4)}, after a rise of ${K.sgn(nat.chg ?? 0)} after inflation from ${yr(0)}. At ${K.ppiMonth} prices that is about ${K.usd(K.today(nat.prem))}. Use the lookup for a single ZIP code.` },
  ],
  related: ['roof-claim-actual-cash-value', 'how-much-dwelling-coverage', 'state:colorado', 'state:montana'],
});
