import { defineState } from '../../lib/page-types';
import { ctx } from './_ctx';

const { K, N, st, c, regLink, planLink, hi, lo, yr } = ctx('kansas');
const sed = c('Sedgwick County'), joh = c('Johnson County'), sha = c('Shawnee County'), but = c('Butler County');

export default defineState({
  slug: 'kansas',
  title: 'Homeowners Insurance Kansas 2026: Hail Premiums by County',
  description: `Homeowners insurance in Kansas 2026: premium per policy by ZIP code and county, 2018 to 2022, Wichita and Johnson County, doubling nonrenewals, FAIR Plan.`,
  intro: `Kansas's median ZIP code paid ${K.usd(st.prem[4])} per homeowners insurance policy in ${yr(4)}, ranked ${st.rankPrem} of 51, and nonrenewals doubled from ${yr(1)} to ${yr(4)}.`,
  resume: `Kansas is one of the dearest states for homeowners insurance in the Treasury file. Its median ZIP code paid ${K.usd(st.prem[4])} per policy in ${yr(4)}, ranked ${st.rankPrem} of 51 and about ${K.pct(st.prem[4] / N.prem[4] - 1, 0)} above the national ${K.usd(N.prem[4])}, after a rise of ${K.sgn(st.chg)} after inflation. Even the cheapest ZIP codes were expensive: the lowest tenth paid under ${K.usd(st.p10)}, more than the national median. The cause is hail and wind on the Plains: Kansas had ${K.dec(st.freq * 100, 1)} paid claims per 100 policies a year, ranked ${st.rankFreq} of 51, with ${K.dec(st.freqY[4] * 100, 1)} in ${yr(4)}. The average claim, ${K.usd(st.sev)}, was modest. Nonrenewals rose from ${K.rate(st.nonren[1])} in ${yr(1)} to ${K.rate(st.nonren[4])} in ${yr(4)}, ranked ${st.rankNonren}. Sedgwick County, Wichita, paid ${K.usd(sed.prem)}; Johnson County, in the Kansas City suburbs, ${K.usd(joh.prem)}. The Kansas FAIR Plan writes a narrow policy for homes declined elsewhere. The data stop in ${yr(4)}.`,
  body: (h) => `
<h2>Wichita pays more than the suburbs</h2>
<p>Sedgwick County's ${sed.zips} ZIP codes had a median of ${K.usd(sed.prem)} in ${yr(4)}, higher than Johnson County's ${K.usd(joh.prem)} in the Kansas City suburbs. Johnson County rose faster, ${K.sgn(joh.chg ?? 0)} against ${K.sgn(sed.chg ?? 0)}. Butler County, east of Wichita, paid ${K.usd(but.prem)}, and Shawnee County, Topeka, ${K.usd(sha.prem)} after a rise of ${K.sgn(sha.chg ?? 0)}. The dearest ZIP codes were ${hi[0].zip} and ${hi[1].zip} in ${hi[0].county}, at ${K.usd(hi[0].prem)} and ${K.usd(hi[1].prem)}. The cheapest, ${lo[0].zip} in ${lo[0].county}, paid ${K.usd(lo[0].prem)}, still near the national median.</p>
<h2>Many small claims</h2>
<p>Kansas insurers paid claims often but not large ones: ${K.dec(st.freq * 100, 1)} per 100 policies a year at an average of ${K.usd(st.sev)}, against ${K.dec(N.freq * 100, 1)} and ${K.usd(N.sev)} for the median ZIP code nationally. That is the signature of hail: roofs, gutters, siding and windows, across whole towns at once. The response of insurers is a percentage wind and hail deductible and roof schedules that pay older roofs at actual cash value. On a ${K.usd(300000)} house, a 1 percent wind and hail deductible is ${K.usd(3000)}, and it applies to every wind or hail claim, not only to large storms.</p>
${h.mini('roof', { t: 'A Kansas roof at actual cash value', p: ['c', 'age', 'd'], d: { c: 13000, age: 14, d: 3000 } })}
<h2>Nonrenewals doubled</h2>
<p>The median nonrenewal rate was ${K.rate(st.nonren[0])} in ${yr(0)} and ${K.rate(st.nonren[1])} in ${yr(1)}, then rose to ${K.rate(st.nonren[3])} in ${yr(3)} and ${K.rate(st.nonren[4])} in ${yr(4)}. In ${K.pct(st.highNonren, 0)} of Kansas ZIP codes the ${yr(4)} rate was above the line of the top tenth nationally. The age and condition of the roof is the most common reason in hail states. The ${h.a('home-insurance-non-renewal', 'nonrenewal page')} explains the notice and the options.</p>
<h2>A narrow FAIR plan</h2>
<p>The ${planLink(0)} writes a dwelling policy limited to fire and lightning, with extended coverage for wind and hail only by endorsement. That is much less than a homeowners policy, so a home that lands there may need other coverage for theft and liability. The ${regLink()} handles complaints and rate questions.</p>
`,
  faqs: [
    { q: 'Why is homeowners insurance so expensive in Kansas?', a: `Hail and wind. Kansas insurers paid ${K.dec(st.freq * 100, 1)} claims per 100 policies a year from ${yr(0)} to ${yr(4)}, ranked ${st.rankFreq} of 51, and the median ZIP code paid ${K.usd(st.prem[4])} per policy in ${yr(4)}. Frequent roof claims across whole towns push rates up for every policy in the area.` },
    { q: 'How much is homeowners insurance in Wichita?', a: `The median ZIP code of Sedgwick County, which includes Wichita, paid ${K.usd(sed.prem)} per policy in ${yr(4)}, after a rise of ${K.sgn(sed.chg ?? 0)} after inflation from ${yr(0)}. At ${K.ppiMonth} prices that is about ${K.usd(K.today(sed.prem))}. Your premium depends on the roof and the deductible.` },
    { q: 'What does the Kansas FAIR Plan cover?', a: `A dwelling policy limited to fire and lightning, with wind and hail added only by endorsement, according to the Treasury report's description. It does not include theft or personal liability like a homeowners policy, so owners who rely on it should look at what else they need.` },
  ],
  related: ['roof-claim-actual-cash-value', 'home-insurance-non-renewal', 'state:oklahoma', 'state:missouri'],
});
