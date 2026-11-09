import { defineState } from '../../lib/page-types';
import { ctx } from './_ctx';

const { K, N, st, c, regLink, planLink, hi, lo, yr } = ctx('california');
const la = c('Los Angeles County'), sd = c('San Diego County'), oc = c('Orange County'), sb = c('San Bernardino County');

export default defineState({
  slug: 'california',
  title: 'Homeowners Insurance California 2026: Wildfire and Renewals',
  description: `Homeowners insurance in California 2026: premium per policy by ZIP code and county from 2018 to 2022, the largest rise of any state, nonrenewals, the FAIR Plan.`,
  intro: `California's median ZIP code premium for homeowners insurance rose ${K.sgn(st.chg)} after inflation from ${yr(0)} to ${yr(4)}, the largest rise of any state, to ${K.usd(st.prem[4])}.`,
  resume: `California had the steepest premium rise in the Treasury file: the median ZIP code went from ${K.usd(st.prem[0])} per policy in ${yr(0)} to ${K.usd(st.prem[4])} in ${yr(4)}, ${K.sgn(st.chg)} after inflation, ranked ${st.rankChg} of 51. The level is still middling, ranked ${st.rankPrem}, because California's ${K.num(st.zips)} ZIP codes include many dense urban areas with low exposure. The wildfire years show in the renewals: the share of policies insurers declined to renew nearly doubled between ${yr(0)} and ${yr(1)}, from ${K.rate(st.nonren[0])} to ${K.rate(st.nonren[1])}, and stayed there. Claims were rare but large, ${K.usd(st.sev)} on average, ranked ${st.rankSev} of 51. San Diego County rose ${K.sgn(sd.chg ?? 0)} and Orange County ${K.sgn(oc.chg ?? 0)}. Homes that lose private coverage turn to the California FAIR Plan, whose policies are not in these figures. The data stop in ${yr(4)}, before the later withdrawals of large insurers.`,
  body: (h) => `
<h2>Rare claims, very large claims</h2>
<p>California's insurers paid only ${K.dec(st.freq * 100, 1)} claims per 100 policies a year in the median ZIP code, ranked ${st.rankFreq} of 51, but the average paid claim was ${K.usd(st.sev)}, second only to Alaska. A wildfire destroys whole neighborhoods at once, and rebuilding costs in California are among the highest in the country. The paid loss ratio of the median ZIP code climbed to ${K.pct(st.lrY[4], 0)} in ${yr(4)}. A median of ZIP codes gives little weight to a fire that burns in a handful of them, so the fire years show more in the renewals than in that ratio.</p>
<h2>The four big southern counties</h2>
<p>Los Angeles County, with ${la.zips} ZIP codes, had a median of ${K.usd(la.prem)} in ${yr(4)}, up ${K.sgn(la.chg ?? 0)}. San Diego County paid ${K.usd(sd.prem)}, Orange County ${K.usd(oc.prem)} and San Bernardino County ${K.usd(sb.prem)}. Within the state the range is wide: the dearest tenth of ZIP codes paid over ${K.usd(st.p90)}, led by ${hi[0].zip} in ${hi[0].county} at ${K.usd(hi[0].prem)} and ${hi[1].zip} in ${hi[1].county} at ${K.usd(hi[1].prem)}. The cheapest, ${lo[0].zip} in ${lo[0].county}, paid ${K.usd(lo[0].prem)}.</p>
${h.mini('nonrenew', { t: 'California: odds of a nonrenewal over the next renewals', p: ['sx', 'yrs'], d: { sx: 'california', yrs: 10 } })}
<h2>Nonrenewals after the fires</h2>
<p>The jump in ${yr(1)} followed the 2017 and 2018 fire seasons. In ${K.pct(st.highNonren, 0)} of California ZIP codes, the ${yr(4)} rate was above the line that marks the top tenth of ZIP codes nationally. State law adds protections after a declared wildfire: the ${regLink()} can order a one-year moratorium on nonrenewals in ZIP codes next to a fire perimeter, and it publishes those orders.</p>
<h2>The FAIR Plan and a second policy</h2>
<p>The ${planLink(0)} writes a basic dwelling policy covering fire, lightning, windstorm and hail. Owners typically pair it with a "difference in conditions" policy from a private insurer for theft, liability and water damage. The combined cost is the real price of insuring a home in many foothill and mountain areas, and it is not in the Treasury figures. The ${h.a('fair-plan-insurance', 'FAIR plan page')} explains how these plans work across states. Earthquake coverage is separate again, from the California Earthquake Authority or a private insurer.</p>
`,
  faqs: [
    { q: 'Why is it hard to get home insurance in California?', a: `Wildfire losses. The Treasury file shows California's nonrenewal rate nearly doubling between ${yr(0)} and ${yr(1)}, after the 2017 and 2018 fires, and its median premium rising ${K.sgn(st.chg)} after inflation by ${yr(4)}, the largest rise of any state. Average claims of ${K.usd(st.sev)} make each fire year very costly for insurers.` },
    { q: 'How much is homeowners insurance in Los Angeles County?', a: `The median ZIP code of Los Angeles County paid ${K.usd(la.prem)} per policy in ${yr(4)}, up ${K.sgn(la.chg ?? 0)} after inflation since ${yr(0)}. Hillside and canyon ZIP codes paid several times that. At ${K.ppiMonth} prices the county median would be about ${K.usd(K.today(la.prem))}, before any change specific to California.` },
    { q: 'Is the California FAIR Plan included in these figures?', a: `No. The Treasury data call excluded residual market plans such as the California FAIR Plan, and surplus lines insurers. In areas where many owners rely on the FAIR Plan plus a second policy, the median describes the private policies that remain and can understate what homeowners pay.` },
  ],
  related: ['fair-plan-insurance', 'home-insurance-non-renewal', 'how-much-dwelling-coverage', 'state:oregon'],
});
