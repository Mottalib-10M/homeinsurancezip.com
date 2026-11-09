import { defineState } from '../../lib/page-types';
import { ctx } from './_ctx';

const { K, N, st, c, regLink, planLink, hi, lo, yr } = ctx('missouri');
const jack = c('Jackson County'), stl = c('St. Louis County'), fra = c('Franklin County'), clay = c('Clay County');

export default defineState({
  slug: 'missouri',
  title: 'Homeowners Insurance Missouri 2026: St. Louis, Kansas City',
  description: `Homeowners insurance in Missouri 2026: premium per policy by ZIP code and county, 2018 to 2022, St. Louis against Kansas City, nonrenewals, FAIR Plan.`,
  intro: `Missouri's median ZIP code paid ${K.usd(st.prem[4])} per homeowners insurance policy in ${yr(4)}, ranked ${st.rankPrem} of 51, and nonrenewals rose to ${K.rate(st.nonren[4])}.`,
  resume: `Missouri is one of the dearer states for homeowners insurance in the Treasury file. The median ZIP code paid ${K.usd(st.prem[4])} per policy in ${yr(4)}, ranked ${st.rankPrem} of 51 and about ${K.pct(st.prem[4] / N.prem[4] - 1, 0)} above the national median, after a rise of ${K.sgn(st.chg)} after inflation. Even the cheapest tenth of ZIP codes paid over ${K.usd(st.p10)}. The rise was uneven: Clay County, north of Kansas City, rose ${K.sgn(clay.chg ?? 0)}, while St. Louis County rose only ${K.sgn(stl.chg ?? 0)}. The change that stands out is renewals: the share of policies insurers declined to renew went from ${K.rate(st.nonren[1])} in ${yr(1)} to ${K.rate(st.nonren[4])} in ${yr(4)}, ranked ${st.rankNonren} of 51, high for an inland state. Hail and tornadoes drive the claims, ${K.dec(st.freq * 100, 1)} per 100 policies a year. The dearest ZIP code was ${hi[0].zip} in St. Louis County, ${K.usd(hi[0].prem)}. The Missouri FAIR Plan covers homes private insurers decline. The data stop in ${yr(4)}.`,
  body: (h) => `
<h2>St. Louis</h2>
<p>St. Louis County had ${stl.zips} ZIP codes in the file and a median of ${K.usd(stl.prem)} in ${yr(4)}. Its western suburbs carry the highest figures in the state: ZIP ${hi[0].zip}, Ladue and Frontenac, paid ${K.usd(hi[0].prem)}. Franklin County, further west, paid ${K.usd(fra.prem)}, and its ZIP ${hi[1].zip} ${K.usd(hi[1].prem)}. Large houses with high dwelling limits explain much of it. Inside the city of St. Louis, an independent city counted apart from the county, older brick houses are common, and the cost to rebuild them with matching materials can exceed their market value, which is worth checking against the dwelling limit.</p>
<h2>Kansas City</h2>
<p>Jackson County had ${jack.zips} ZIP codes and a median of ${K.usd(jack.prem)}, up ${K.sgn(jack.chg ?? 0)} after inflation. Clay County, north of the river, paid ${K.usd(clay.prem)} after the fastest rise of the large counties. Kansas City sits in the path of the spring hail that crosses Kansas and Missouri, and many policies there carry a percentage wind and hail deductible. The cheapest ZIP codes were in the Ozarks and mid-Missouri, ${lo[0].zip} in ${lo[0].county} at ${K.usd(lo[0].prem)} and ${lo[1].zip} in ${lo[1].county} at ${K.usd(lo[1].prem)}.</p>
${h.mini('nonrenew', { t: 'Missouri: odds of a nonrenewal in coming years', p: ['sx', 'yrs'], d: { sx: 'missouri', yrs: 7 } })}
<h2>Renewals got harder after ${yr(2)}</h2>
<p>Missouri's median nonrenewal rate went ${st.nonren.map((x) => K.rate(x)).join(', ')} from ${yr(0)} to ${yr(4)}. In ${K.pct(st.highNonren, 0)} of its ZIP codes the ${yr(4)} rate was above the line of the top tenth nationally. Interestingly, the paid loss ratio fell over the same years, from ${K.pct(st.lrY[1], 0)} in ${yr(1)} to ${K.pct(st.lrY[4], 0)} in ${yr(4)}, which suggests insurers tightening their rules, often on roof age, rather than reacting to a single bad year. The ${h.a('home-insurance-non-renewal', 'nonrenewal page')} explains what to do with a notice.</p>
<h2>Claims and the FAIR Plan</h2>
<p>Paid claims averaged ${K.dec(st.freq * 100, 1)} per 100 policies a year at ${K.usd(st.sev)} each, both near the national figures. Cancellations for nonpayment ran at ${K.rate(st.npc)}, above the national ${K.rate(N.npc)}. The ${planLink(0)} writes a basic dwelling fire policy covering fire, lightning, windstorm and hail. The ${regLink()} handles complaints.</p>
`,
  faqs: [
    { q: 'How much is homeowners insurance in Kansas City, Missouri?', a: `The median ZIP code of Jackson County, which includes most of Kansas City, paid ${K.usd(jack.prem)} per policy in ${yr(4)}, after a rise of ${K.sgn(jack.chg ?? 0)} after inflation from ${yr(0)}. At ${K.ppiMonth} prices that is about ${K.usd(K.today(jack.prem))}. Clay County, north of the river, paid a little more.` },
    { q: 'Why are Missouri insurers not renewing homes?', a: `The Treasury file does not give reasons, but the median rate rose from ${K.rate(st.nonren[1])} in ${yr(1)} to ${K.rate(st.nonren[4])} in ${yr(4)} while loss ratios fell, which suggests insurers tightening their rules, often on older roofs in hail areas. Ask your insurer for the reason in writing.` },
    { q: 'Is homeowners insurance expensive in St. Louis County?', a: `The median ZIP code of St. Louis County paid ${K.usd(stl.prem)} per policy in ${yr(4)}, above the national median of ${K.usd(N.prem[4])} but close to the Missouri median. Western suburbs with large houses paid several times that. The lookup shows each ZIP code from ${yr(0)} to ${yr(4)}.` },
  ],
  related: ['home-insurance-non-renewal', 'roof-claim-actual-cash-value', 'state:kansas', 'state:illinois'],
});
