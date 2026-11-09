import { defineState } from '../../lib/page-types';
import { ctx } from './_ctx';

const { K, N, st, c, regLink, planLink, hi, lo, yr } = ctx('indiana');
const mar = c('Marion County'), lake = c('Lake County'), allen = c('Allen County'), sj = c('St. Joseph County');

export default defineState({
  slug: 'indiana',
  title: 'Homeowners Insurance Indiana 2026: Steady Prices by ZIP Code',
  description: `Homeowners insurance in Indiana 2026: premium per policy by ZIP code and county, 2018 to 2022, Indianapolis, Fort Wayne, Hamilton County and the FAIR Plan.`,
  intro: `Indiana's median ZIP code paid ${K.usd(st.prem[4])} per policy in ${yr(4)}, below the national median, and barely more than in ${yr(0)} after inflation.`,
  resume: `Indiana homeowners premiums were steady in the Treasury file. The median ZIP code paid ${K.usd(st.prem[0])} per policy in ${yr(0)} and ${K.usd(st.prem[4])} in ${yr(4)}, a rise of ${K.sgn(st.chg)} after inflation, ranked ${st.rankChg} of 51, and below the national ${K.usd(N.prem[4])}. The large counties move together: Marion County, Indianapolis, was at ${K.usd(mar.prem)}, Lake County in the northwest at ${K.usd(lake.prem)}, Allen County, Fort Wayne, at ${K.usd(allen.prem)} and St. Joseph County, South Bend, at ${K.usd(sj.prem)}, all within two percent of where they were after inflation. The dearest ZIP codes were in Hamilton County north of Indianapolis, ${hi[0].zip} at ${K.usd(hi[0].prem)}. Claims were moderate, ${K.dec(st.freq * 100, 1)} per 100 policies a year, and the paid loss ratio stayed between ${K.pct(Math.min(...st.lrY), 0)} and ${K.pct(Math.max(...st.lrY), 0)}. Insurers declined to renew ${K.rate(st.nonren[4])} of policies in ${yr(4)}. The Indiana FAIR Plan is the last resort. The data stop in ${yr(4)}.`,
  body: (h) => `
<h2>Indianapolis and its suburbs</h2>
<p>Marion County's ${mar.zips} ZIP codes had a median of ${K.usd(mar.prem)} in ${yr(4)}, a change of ${K.sgn(mar.chg ?? 0)} after inflation. Hamilton County, the fast-growing suburban county to the north, had the two dearest ZIP codes in the state: ${hi[0].zip} at ${K.usd(hi[0].prem)} and ${hi[1].zip} at ${K.usd(hi[1].prem)}, where houses are newer and larger. In Fort Wayne, ${lo[0].zip} and ${lo[1].zip} in ${lo[0].county} were the cheapest ZIP codes in Indiana, ${K.usd(lo[0].prem)} and ${K.usd(lo[1].prem)}. The range from the cheapest tenth of ZIP codes, under ${K.usd(st.p10)}, to the dearest tenth, over ${K.usd(st.p90)}, is narrow.</p>
<h2>Calm years for insurers</h2>
<p>Indiana's paid claims per 100 policies averaged ${K.dec(st.freq * 100, 1)}, ranked ${st.rankFreq} of 51, with a peak of ${K.dec(st.freqY[1] * 100, 1)} in ${yr(1)}. The paid loss ratio was ${K.pct(st.lrY[3], 0)} in ${yr(3)}, one of the lowest in the Midwest, and ${K.pct(st.lrY[4], 0)} in ${yr(4)}. The average claim was ${K.usd(st.sev)}. With losses that low, insurers had little reason to raise rates faster than inflation before ${yr(4)}; the national price index rose much faster after.</p>
${h.mini('escrow', { t: 'An Indiana escrow payment after a renewal increase', p: ['old', 'new', 'tax'], d: { old: 1450, new: 1800, tax: 2200 } })}
<h2>Nonrenewals came down, then back</h2>
<p>The median nonrenewal rate was ${K.rate(st.nonren[0])} in ${yr(0)}, fell to ${K.rate(st.nonren[2])} in ${yr(2)}, and returned to ${K.rate(st.nonren[4])} in ${yr(4)}, ranked ${st.rankNonren} of 51. In ${K.pct(st.highNonren, 0)} of Indiana ZIP codes, the ${yr(4)} rate was above the line of the top tenth nationally. Cancellations for nonpayment were higher than the national median, ${K.rate(st.npc)} against ${K.rate(N.npc)}; the ${h.a('homeowners-insurance-cost-per-month', 'monthly cost page')} explains how an escrow shortage can be spread over a year.</p>
<h2>The FAIR Plan</h2>
<p>The ${planLink(0)} writes dwelling forms and HO-2 and HO-8 homeowners forms for properties that private insurers decline, often older urban homes. The ${regLink()} handles complaints and licenses agents. Tornado season brings most of the state's wind claims, and a few Indiana policies now use percentage wind and hail deductibles; check your declarations page to see which deductible applies to a storm claim.</p>
`,
  faqs: [
    { q: 'How much is homeowners insurance in Indianapolis?', a: `The median ZIP code of Marion County, Indianapolis, paid ${K.usd(mar.prem)} per policy in ${yr(4)} in the Treasury file, below the national median of ${K.usd(N.prem[4])}. At ${K.ppiMonth} prices that is about ${K.usd(K.today(mar.prem))}. Suburban Hamilton County ZIP codes paid noticeably more.` },
    { q: 'What is an HO-8 policy in Indiana?', a: `HO-8 is a modified homeowners form for older homes whose market value is well below the cost to rebuild. It pays repairs with common materials or at actual cash value, rather than full replacement. The Indiana FAIR Plan offers it, along with HO-2 and dwelling fire forms, for homes private insurers decline.` },
    { q: 'Did Indiana home insurance go up from 2018 to 2022?', a: `Only slightly. The median ZIP code rose ${K.sgn(st.chg)} after inflation, from ${K.usd(st.prem[0])} to ${K.usd(st.prem[4])} per policy, as losses stayed moderate. The BLS price index for homeowner's insurance rose much faster afterwards nationally, so current Indiana renewals are likely higher than these figures.` },
  ],
  related: ['homeowners-insurance-cost-per-month', 'fair-plan-insurance', 'state:illinois', 'state:ohio'],
});
