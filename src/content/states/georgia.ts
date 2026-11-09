import { defineState } from '../../lib/page-types';
import { ctx } from './_ctx';

const { K, N, st, c, regLink, planLink, hi, lo, yr } = ctx('georgia');
const ful = c('Fulton County'), dek = c('DeKalb County'), cobb = c('Cobb County'), gwin = c('Gwinnett County');

export default defineState({
  slug: 'georgia',
  title: 'Homeowners Insurance Georgia 2026: Atlanta Up, Coast Highest',
  description: `Homeowners insurance in Georgia 2026: premium per policy by ZIP code and county, 2018 to 2022, metro Atlanta's rise, nonrenewals and the coastal plan.`,
  intro: `Georgia's median ZIP code paid ${K.usd(st.prem[4])} per homeowners insurance policy in ${yr(4)}; the four core Atlanta counties rose ${K.sgn(Math.min(ful.chg ?? 0, dek.chg ?? 0, cobb.chg ?? 0, gwin.chg ?? 0), 0)} to ${K.sgn(Math.max(ful.chg ?? 0, dek.chg ?? 0, cobb.chg ?? 0, gwin.chg ?? 0), 0)} after inflation.`,
  resume: `Georgia's median homeowners premium per policy was ${K.usd(st.prem[4])} in ${yr(4)} in the Treasury file, close to the national ${K.usd(N.prem[4])} and ranked ${st.rankPrem} of 51. Statewide it rose a modest ${K.sgn(st.chg)} after inflation from ${yr(0)}, but metro Atlanta moved much faster: Fulton County ${K.sgn(ful.chg ?? 0)} to ${K.usd(ful.prem)}, DeKalb ${K.sgn(dek.chg ?? 0)}, Cobb ${K.sgn(cobb.chg ?? 0)} and Gwinnett ${K.sgn(gwin.chg ?? 0)}. The state has the second largest number of counties after Texas, ${st.counties}, and most rural counties pay much less. The other change is renewals: the share of policies insurers declined to renew rose from ${K.rate(st.nonren[3])} in ${yr(3)} to ${K.rate(st.nonren[4])} in ${yr(4)}, ranked ${st.rankNonren} of 51. On the coast, ZIP ${hi[0].zip} in ${hi[0].county}, the Golden Isles, paid ${K.usd(hi[0].prem)}. The Georgia Underwriting Association insures homes private insurers decline. The data stop in ${yr(4)}.`,
  body: (h) => `
<h2>Metro Atlanta</h2>
<p>Fulton County's ${ful.zips} ZIP codes had a median of ${K.usd(ful.prem)} in ${yr(4)}, DeKalb's ${K.usd(dek.prem)}, Cobb's ${K.usd(cobb.prem)} and Gwinnett's ${K.usd(gwin.prem)}. All four rose between ${K.sgn(Math.min(ful.chg ?? 0, dek.chg ?? 0, cobb.chg ?? 0, gwin.chg ?? 0), 0)} and ${K.sgn(Math.max(ful.chg ?? 0, dek.chg ?? 0, cobb.chg ?? 0, gwin.chg ?? 0), 0)} after inflation, more than twice the state figure. Rebuilding costs in a fast-growing metro area and frequent hail and wind storms are the usual explanations. ZIP ${hi[1].zip}, in Buckhead, paid ${K.usd(hi[1].prem)}, the highest outside the coast.</p>
<h2>Rural Georgia pays less</h2>
<p>Much of the state's ${K.num(st.zips)} ZIP codes in the file are rural, and the cheapest tenth paid under ${K.usd(st.p10)}. ZIP ${lo[0].zip} in ${lo[0].county} and ${lo[1].zip} in ${lo[1].county}, in South Georgia, paid ${K.usd(lo[0].prem)} and ${K.usd(lo[1].prem)}. Claims across the state ran at ${K.dec(st.freq * 100, 1)} per 100 policies a year, ranked ${st.rankFreq} of 51, highest in ${yr(0)} at ${K.dec(st.freqY[0] * 100, 1)}, the year Hurricane Michael crossed southwest Georgia. The average claim, ${K.usd(st.sev)}, was below the national figure.</p>
${h.mini('nonrenew', { t: 'Georgia: odds of a nonrenewal ahead', p: ['sx', 'yrs'], d: { sx: 'georgia', yrs: 6 } })}
<h2>Nonrenewals jumped in ${yr(4)}</h2>
<p>The median nonrenewal rate held between ${K.rate(st.nonren[2])} and ${K.rate(st.nonren[0])} from ${yr(0)} to ${yr(3)}, then rose to ${K.rate(st.nonren[4])}. In ${K.pct(st.highNonren, 0)} of Georgia ZIP codes the ${yr(4)} rate was above the line of the top tenth nationally. A rise of that kind usually follows insurers tightening their rules on roof age and claims history; the ${h.a('home-insurance-non-renewal', 'nonrenewal page')} explains the notice you are owed and what to do.</p>
<h2>The coast and the plan of last resort</h2>
<p>Glynn County's barrier islands carry the state's highest premium per policy: ${hi[0].zip} paid ${K.usd(hi[0].prem)} in ${yr(4)}. The ${planLink(0)} writes dwelling fire and HO-8 policies statewide, and wind and hail only policies in the six coastal counties. Cancellations for nonpayment ran at ${K.rate(st.npc)}, above the national ${K.rate(N.npc)}. The ${regLink()} handles complaints about claims and notices. Coastal owners should also price flood coverage, which no homeowners policy includes, and check whether their wind deductible is a percentage.</p>
`,
  faqs: [
    { q: 'How much did home insurance go up in Atlanta?', a: `From ${yr(0)} to ${yr(4)}, the median ZIP code of Fulton County rose ${K.sgn(ful.chg ?? 0)} after inflation, to ${K.usd(ful.prem)} per policy, and Gwinnett rose ${K.sgn(gwin.chg ?? 0)}. The BLS price index for homeowner's insurance rose another ${K.sgn(K.N.ppiFactor - 1)} nationally from ${yr(4)} to ${K.ppiMonth}, so today's bills are higher still.` },
    { q: 'Why is homeowners insurance so high on Sea Island, Georgia?', a: `ZIP ${hi[0].zip} in Glynn County paid ${K.usd(hi[0].prem)} per policy in ${yr(4)}, the highest in Georgia. Barrier islands face hurricane wind and many high-value homes. Owners there often pay a percentage hurricane deductible and may need a wind policy from the Georgia Underwriting Association.` },
    { q: 'What is the Georgia Underwriting Association?', a: `It is Georgia's insurer of last resort for property that private insurers decline, listed in the Treasury report. It writes dwelling fire and HO-8 policies across the state and wind and hail only policies in the six coastal counties. Its policies are not in the Treasury premium figures.` },
  ],
  related: ['home-insurance-non-renewal', 'hurricane-deductible', 'state:florida', 'state:south-carolina'],
});
