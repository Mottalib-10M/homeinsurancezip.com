import { defineState } from '../../lib/page-types';
import { ctx } from './_ctx';

const { K, N, st, c, regLink, planLink, hi, lo, yr } = ctx('kentucky');
const jeff = c('Jefferson County'), pike = c('Pike County'), fay = c('Fayette County'), brk = c('Breckinridge County');

export default defineState({
  slug: 'kentucky',
  title: 'Homeowners Insurance Kentucky 2026: Louisville and Lexington',
  description: `Homeowners insurance in Kentucky 2026: premium per policy by ZIP code and county, 2018 to 2022, Louisville's fall, the tornado claims and the FAIR Plan.`,
  intro: `Kentucky's median ZIP code paid ${K.usd(st.prem[4])} per policy in ${yr(4)}, slightly less than in ${yr(0)} after inflation, with few nonrenewals.`,
  resume: `Kentucky is one of the few states where the median homeowners premium per policy fell after inflation in the Treasury file: from ${K.usd(st.prem[0])} in ${yr(0)} to ${K.usd(st.prem[4])} in ${yr(4)}, ${K.sgn(st.chg)}, close to the national ${K.usd(N.prem[4])}. Jefferson County, Louisville, fell further, ${K.sgn(jeff.chg ?? 0)}, to ${K.usd(jeff.prem)}. Fayette County, Lexington, was at ${K.usd(fay.prem)}, and Pike County in the eastern coalfields at ${K.usd(pike.prem)}. Insurers rarely declined to renew: ${K.rate(st.nonren[4])} of policies in ${yr(4)}, ranked ${st.rankNonren} of 51. Claims were frequent but small, ${K.dec(st.freq * 100, 1)} per 100 policies a year at an average of ${K.usd(st.sev)}, ranked ${st.rankSev} for size. The paid loss ratio jumped to ${K.pct(st.lrY[4], 0)} in ${yr(4)}, after the December ${yr(3)} tornado outbreak in western Kentucky and the July ${yr(4)} floods in the east, though flood itself is outside homeowners policies. The Kentucky FAIR Plan writes homes declined elsewhere. The data stop in ${yr(4)}.`,
  body: (h) => `
<h2>Louisville and Lexington</h2>
<p>Jefferson County had ${jeff.zips} ZIP codes in the file, with a median of ${K.usd(jeff.prem)} in ${yr(4)}. Its fall of ${K.sgn(jeff.chg ?? 0)} after inflation from ${yr(0)} means premiums rose more slowly than prices in general. Fayette County barely moved, ${K.sgn(fay.chg ?? 0)}. The dearest ZIP codes in the state were ${hi[0].zip} in ${hi[0].county}, at ${K.usd(hi[0].prem)}, and ${hi[1].zip} in ${hi[1].county}, Lexington's horse-farm and estate edge, at ${K.usd(hi[1].prem)}. The cheapest were ${lo[0].zip} in ${lo[0].county}, ${K.usd(lo[0].prem)}, and ${lo[1].zip} in ${lo[1].county}, across the river from Cincinnati, ${K.usd(lo[1].prem)}.</p>
<h2>Western tornadoes, eastern floods</h2>
<p>Paid claims per 100 policies ranged from ${K.dec(Math.min(...st.freqY) * 100, 1)} to ${K.dec(Math.max(...st.freqY) * 100, 1)} over the five years. The tornadoes of December 10 and 11, ${yr(3)}, destroyed much of Mayfield and Dawson Springs; wind claims of that kind are covered by homeowners policies, and the paid loss ratio of ${yr(4)}, ${K.pct(st.lrY[4], 0)}, reflects claims still being paid. The floods of July ${yr(4)} in eastern Kentucky were not covered by homeowners policies at all: flood needs a separate policy, which few owners in the hollows carried. Breckinridge County, with ${brk.zips} ZIP codes, paid ${K.usd(brk.prem)}, below the state median.</p>
${h.mini('claim', { t: 'A small wind claim in Kentucky', p: ['dmg', 'ded', 'pr'], d: { dmg: 3500, ded: 1000, pr: 1600 } })}
<h2>Few nonrenewals, more nonpayment</h2>
<p>Kentucky's median nonrenewal rate stayed low throughout, between ${K.rate(st.nonren[2])} and ${K.rate(st.nonren[0])}. Cancellations for nonpayment were more common, ${K.rate(st.npc)} over the period, above the national ${K.rate(N.npc)}. A cancellation for nonpayment leaves a gap in coverage that the next insurer will ask about; paying through escrow, or setting up automatic payment, avoids it. The ${h.a('homeowners-insurance-cost-per-month', 'monthly cost page')} explains escrow.</p>
<h2>The FAIR Plan</h2>
<p>The ${planLink(0)} writes dwelling forms and HO-4, HO-6 and HO-8 forms for properties that cannot find a private insurer. The ${regLink()} reviews rates and handles complaints. With claims averaging ${K.usd(st.sev)}, a small repair close to the deductible is often better paid directly; the ${h.a('should-i-file-a-home-insurance-claim', 'claim calculator')} weighs it against a surcharge.</p>
`,
  faqs: [
    { q: 'How much is homeowners insurance in Louisville, Kentucky?', a: `The median ZIP code of Jefferson County, which includes Louisville, paid ${K.usd(jeff.prem)} per policy in ${yr(4)}, down ${K.sgn(jeff.chg ?? 0)} after inflation from ${yr(0)}. At ${K.ppiMonth} prices, using the national BLS index, that is about ${K.usd(K.today(jeff.prem))}. Enter your ZIP code for your own area.` },
    { q: 'Did homeowners insurance cover the 2021 Kentucky tornadoes?', a: `Yes, wind damage from tornadoes is covered by standard homeowners policies, subject to the deductible and limits. The paid loss ratio of the median Kentucky ZIP code rose to ${K.pct(st.lrY[4], 0)} in ${yr(4)} as those claims were paid. Owners with dwelling limits below the cost to rebuild received less than a full rebuild.` },
    { q: 'Does Kentucky homeowners insurance cover flooding?', a: `No. Standard homeowners policies exclude flood from rising water, which is why many eastern Kentucky owners had no coverage after the July ${yr(4)} floods. Flood insurance is a separate policy, from the federal program or a private insurer, usually with a waiting period before it starts.` },
  ],
  related: ['should-i-file-a-home-insurance-claim', 'how-much-dwelling-coverage', 'state:tennessee', 'state:indiana'],
});
