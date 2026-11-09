import { defineState } from '../../lib/page-types';
import { ctx } from './_ctx';

const { K, N, st, c, regLink, hi, lo, yr } = ctx('tennessee');
const shel = c('Shelby County'), dav = c('Davidson County'), ham = c('Hamilton County'), knox = c('Knox County');

export default defineState({
  slug: 'tennessee',
  title: 'Homeowners Insurance Tennessee 2026: Memphis to Knoxville',
  description: `Homeowners insurance in Tennessee 2026: premium per policy by ZIP code and county, 2018 to 2022, Memphis, Nashville, Chattanooga, Knoxville, tornadoes.`,
  intro: `Tennessee's median ZIP code paid ${K.usd(st.prem[4])} per homeowners insurance policy in ${yr(4)}; Shelby County, Memphis, paid ${K.usd(shel.prem)}, the most of the big four.`,
  resume: `Tennessee homeowners paid ${K.usd(st.prem[4])} per policy in the median ZIP code in ${yr(4)} in the Treasury file, ranked ${st.rankPrem} of 51 and a little above the national ${K.usd(N.prem[4])}, after a rise of only ${K.sgn(st.chg)} after inflation. The four big counties differ more than the state figure suggests. Shelby County, Memphis, paid ${K.usd(shel.prem)}; Davidson County, Nashville, ${K.usd(dav.prem)} after the fastest rise, ${K.sgn(dav.chg ?? 0)}; Hamilton County, Chattanooga, ${K.usd(ham.prem)}; Knox County, Knoxville, ${K.usd(knox.prem)}. Claims rose to ${K.dec(st.freqY[2] * 100, 1)} per 100 policies in ${yr(2)}, the year of the March tornado through Nashville and Cookeville. Nonrenewals reached ${K.rate(st.nonren[4])} in ${yr(4)}, ranked ${st.rankNonren} of 51, and cancellations for nonpayment ran above the national rate. Tennessee has no FAIR plan for homes, so a declined house goes to surplus lines insurers. The data stop in ${yr(4)}.`,
  body: (h) => `
<h2>Memphis and West Tennessee</h2>
<p>Shelby County had ${shel.zips} ZIP codes in the file and a median of ${K.usd(shel.prem)} in ${yr(4)}, up ${K.sgn(shel.chg ?? 0)} after inflation. West Tennessee sits on the edge of the Mississippi Valley storm belt, with frequent severe weather in spring, and the New Madrid seismic zone runs under the region. Earthquake is excluded from homeowners policies and needs an endorsement, which is worth pricing west of the Tennessee River.</p>
<h2>Nashville, Chattanooga and Knoxville</h2>
<p>Davidson County paid ${K.usd(dav.prem)}, and its ZIP ${hi[1].zip}, Green Hills, ${K.usd(hi[1].prem)}. The dearest ZIP code in the state was ${hi[0].zip} in ${hi[0].county}, Lookout Mountain above Chattanooga, at ${K.usd(hi[0].prem)}. Hamilton County as a whole paid ${K.usd(ham.prem)}. Knox County, ${K.usd(knox.prem)}, was slightly cheaper after inflation in ${yr(4)} than in ${yr(0)}. The cheapest ZIP codes were in the northeast, ${lo[0].zip} in ${lo[0].county} at ${K.usd(lo[0].prem)} and ${lo[1].zip} in ${lo[1].county} at ${K.usd(lo[1].prem)}.</p>
${h.mini('state', { t: 'Tennessee against a neighbor', p: ['sx', 'mine'], d: { sx: 'tennessee' } })}
<h2>Tornadoes and the ${yr(2)} spike</h2>
<p>Paid claims per 100 policies went ${st.freqY.map((x) => K.dec(x * 100, 1)).join(', ')} from ${yr(0)} to ${yr(4)}. The tornado of March 3, ${yr(2)} crossed Nashville and struck Cookeville hard, and the paid loss ratio that year rose to ${K.pct(st.lrY[2], 0)}. The December ${yr(3)} outbreak that devastated western Kentucky also reached northwest Tennessee. The average claim, ${K.usd(st.sev)}, was a little below the national figure. Tornado damage is wind, covered by homeowners policies; the August ${yr(3)} flood in Waverly was not, without a flood policy.</p>
<h2>Renewals, nonpayment and the regulator</h2>
<p>The median nonrenewal rate went ${st.nonren.map((x) => K.rate(x)).join(', ')} from ${yr(0)} to ${yr(4)}. Cancellations for nonpayment ran at ${K.rate(st.npc)}, above the national ${K.rate(N.npc)}. Tennessee has no residual market plan for homes listed in the Treasury report, so a declined home goes to surplus lines insurers. The ${regLink()} handles complaints. The ${h.a('home-insurance-non-renewal', 'nonrenewal page')} explains notices and options, and the ${h.a('should-i-file-a-home-insurance-claim', 'claim calculator')} helps decide whether a small storm repair is worth a claim.</p>
`,
  faqs: [
    { q: 'How much is homeowners insurance in Nashville?', a: `The median ZIP code of Davidson County, which includes Nashville, paid ${K.usd(dav.prem)} per policy in ${yr(4)}, after a rise of ${K.sgn(dav.chg ?? 0)} after inflation from ${yr(0)}, the fastest of the four metro counties. At ${K.ppiMonth} prices that is about ${K.usd(K.today(dav.prem))}. The lookup on the home page gives each ZIP code with its five years.` },
    { q: 'Should I buy earthquake coverage in Memphis?', a: `It is worth pricing. West Tennessee lies over the New Madrid seismic zone, and standard homeowners policies exclude earthquake. An endorsement adds it, usually with a percentage deductible of 10 percent or more of the dwelling limit. Compare the premium with what you could absorb after a quake.` },
    { q: 'How much is homeowners insurance in Memphis?', a: `The median ZIP code of Shelby County, which includes Memphis, paid ${K.usd(shel.prem)} per policy in ${yr(4)}, the highest of Tennessee's four largest counties and above the national median of ${K.usd(N.prem[4])}. At ${K.ppiMonth} prices that is about ${K.usd(K.today(shel.prem))}. East Memphis and Germantown ZIP codes differ a lot.` },
  ],
  related: ['home-insurance-non-renewal', 'state:kentucky', 'state:georgia', 'state:mississippi'],
});
