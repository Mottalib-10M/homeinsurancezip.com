import { defineState } from '../../lib/page-types';
import { ctx } from './_ctx';

const { K, N, st, c, regLink, hi, lo, yr } = ctx('oklahoma');
const okc = c('Oklahoma County'), tul = c('Tulsa County'), cle = c('Cleveland County'), lef = c('Le Flore County');

export default defineState({
  slug: 'oklahoma',
  title: 'Homeowners Insurance Oklahoma 2026: Third Highest Median',
  description: `Homeowners insurance in Oklahoma 2026: premium per policy by ZIP code and county, 2018 to 2022, Oklahoma City against Tulsa, and hail and tornado claims.`,
  intro: `Oklahoma's median ZIP code paid ${K.usd(st.prem[4])} per policy in ${yr(4)}, the third highest state median; even its cheapest ZIP code paid ${K.usd(lo[0].prem)}.`,
  resume: `Oklahoma ranks third for homeowners premiums in the Treasury file: the median ZIP code paid ${K.usd(st.prem[4])} per policy in ${yr(4)}, about ${K.pct(st.prem[4] / N.prem[4] - 1, 0)} above the national ${K.usd(N.prem[4])}, after a rise of ${K.sgn(st.chg)} after inflation. Even the cheapest tenth of ZIP codes paid over ${K.usd(st.p10)}. Hail and tornadoes explain it. Claims ran at ${K.dec(st.freq * 100, 1)} per 100 policies a year, and they were large for a hail state, ${K.usd(st.sev)} on average, ranked ${st.rankSev} of 51, since tornadoes destroy houses outright. Oklahoma County paid ${K.usd(okc.prem)}, much more than Tulsa County at ${K.usd(tul.prem)}; Cleveland County, Norman and Moore, ${K.usd(cle.prem)}. Nonrenewals were moderate, ${K.rate(st.nonren[4])} in ${yr(4)}, ranked ${st.rankNonren} of 51. Oklahoma has no FAIR plan for homes. The data stop in ${yr(4)}, before later rate increases.`,
  body: (h) => `
<h2>Oklahoma City against Tulsa</h2>
<p>Oklahoma County had ${okc.zips} ZIP codes in the file and a median of ${K.usd(okc.prem)} in ${yr(4)}, a little lower after inflation than in ${yr(0)}. Cleveland County, to the south, paid ${K.usd(cle.prem)}. Central Oklahoma lies in the most tornado-prone part of the state, and Moore, in Cleveland County, was struck by violent tornadoes in 1999 and 2013. Tulsa County, with ${tul.zips} ZIP codes, paid ${K.usd(tul.prem)} after a rise of ${K.sgn(tul.chg ?? 0)}, and its ZIP codes ${lo[0].zip} and ${lo[1].zip} were the cheapest in the state at ${K.usd(lo[0].prem)} and ${K.usd(lo[1].prem)}. The dearest were ${hi[0].zip} and ${hi[1].zip} in ${hi[0].county}, at ${K.usd(hi[0].prem)} and ${K.usd(hi[1].prem)}.</p>
<h2>Hail and tornadoes</h2>
<p>Paid claims went ${st.freqY.map((x) => K.dec(x * 100, 1)).join(', ')} per 100 policies from ${yr(0)} to ${yr(4)}, with ${yr(2)} the busiest. The paid loss ratio peaked at ${K.pct(st.lrY[2], 0)} that year. Most Oklahoma policies carry a percentage wind and hail deductible, often 1 or 2 percent of the dwelling limit, which applies to every hail claim. Impact-resistant shingles earn a discount with many insurers in the state.</p>
${h.mini('hurricane', { t: 'An Oklahoma hail claim with a 2 percent wind deductible', p: ['a', 'p', 'd'], d: { a: 280000, p: 2, d: 14000 } })}
<h2>Eastern Oklahoma</h2>
<p>Le Flore County, on the Arkansas line, paid ${K.usd(lef.prem)} after a rise of ${K.sgn(lef.chg ?? 0)}. Rural ZIP codes in the east and south pay less than the cities but more than most of the country. Many rural Oklahoma homes are manufactured homes, insured on other forms and outside these HO-3 and HO-5 figures.</p>
<h2>Renewals and where to turn</h2>
<p>The median nonrenewal rate went ${st.nonren.map((x) => K.rate(x)).join(', ')} from ${yr(0)} to ${yr(4)}. Oklahoma has no residual market plan for homes listed in the Treasury report, so a declined home goes to surplus lines insurers. The ${regLink()} handles complaints and runs a program that helps owners pay for roofs built to a fortified standard. With large average claims, the dwelling limit matters: the ${h.a('how-much-dwelling-coverage', 'dwelling coverage calculator')} checks it against the cost to rebuild.</p>
`,
  faqs: [
    { q: 'Why is homeowners insurance so expensive in Oklahoma?', a: `Hail and tornadoes. Oklahoma's median ZIP code paid ${K.usd(st.prem[4])} per policy in ${yr(4)}, the third highest state median in the Treasury file, with ${K.dec(st.freq * 100, 1)} paid claims per 100 policies a year at ${K.usd(st.sev)} on average. Tornadoes destroy houses outright, which makes claims large.` },
    { q: 'How much is homeowners insurance in Oklahoma City?', a: `The median ZIP code of Oklahoma County, which includes most of Oklahoma City, paid ${K.usd(okc.prem)} per policy in ${yr(4)}, among the highest county medians in the country. At ${K.ppiMonth} prices that is about ${K.usd(K.today(okc.prem))}. Your quote depends heavily on the roof and the wind deductible.` },
    { q: 'Is home insurance cheaper in Tulsa than in Oklahoma City?', a: `Yes, in the Treasury file. Tulsa County's median ZIP code paid ${K.usd(tul.prem)} per policy in ${yr(4)}, against ${K.usd(okc.prem)} in Oklahoma County. Central Oklahoma's greater tornado exposure is the usual explanation. Both are well above the national median of ${K.usd(N.prem[4])}, and both rose after ${yr(4)} with the national index.` },
  ],
  related: ['hurricane-deductible', 'roof-claim-actual-cash-value', 'state:kansas', 'state:texas'],
});
