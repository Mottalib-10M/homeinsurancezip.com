import { defineState } from '../../lib/page-types';
import { ctx } from './_ctx';

const { K, N, st, c, regLink, planLink, hi, lo, yr } = ctx('connecticut');
const hart = c('Hartford County'), fair = c('Fairfield County'), nh = c('New Haven County'), litch = c('Litchfield County');

export default defineState({
  slug: 'connecticut',
  title: 'Homeowners Insurance Connecticut 2026: Flat Prices by ZIP',
  description: `Homeowners insurance in Connecticut 2026: premium per policy by ZIP code and county, 2018 to 2022, Greenwich against Hartford, storms and the FAIR Plan.`,
  intro: `Connecticut's typical ZIP code paid ${K.usd(st.prem[4])} per homeowners insurance policy in ${yr(4)}, almost exactly what it paid in ${yr(0)} after inflation.`,
  resume: `Connecticut homeowners premiums held still from ${yr(0)} to ${yr(4)} in the Treasury file: the typical ZIP code paid ${K.usd(st.prem[0])} per policy at the start and ${K.usd(st.prem[4])} at the end, a change of ${K.sgn(st.chg)} after inflation, ranked ${st.rankChg} of the 50 states and DC for growth. The level is above the national typical figure of ${K.usd(N.prem[4])}, ranked ${st.rankPrem}. The state has only eight counties, and Fairfield County, on Long Island Sound next to New York, stands apart with a typical figure of ${K.usd(fair.prem)}, against ${K.usd(hart.prem)} in Hartford County. The two dearest ZIP codes, ${hi[0].zip} and ${hi[1].zip} in Greenwich, paid close to ${K.usd(Math.round(hi[0].prem / 100) * 100)} per policy. Claims spiked in ${yr(2)}, the year Tropical Storm Isaias knocked down trees across the state, at ${K.dec(st.freqY[2] * 100, 1)} per 100 policies. The Connecticut FAIR Plan covers homes private insurers decline. The data stop in ${yr(4)}.`,
  body: (h) => `
<h2>Fairfield County and the rest</h2>
<p>Hartford County, with ${hart.zips} ZIP codes, had a typical figure of ${K.usd(hart.prem)} in ${yr(4)}, slightly lower after inflation than in ${yr(0)}. New Haven County was at ${K.usd(nh.prem)} and Litchfield County, in the northwest hills, at ${K.usd(litch.prem)}. Fairfield County's typical figure, ${K.usd(fair.prem)}, reflects large houses and shoreline exposure. Its ZIP code ${hi[0].zip} paid ${K.usd(hi[0].prem)} and ${hi[1].zip} paid ${K.usd(hi[1].prem)}. The cheapest ZIP codes, ${lo[0].zip} in ${lo[0].county} and ${lo[1].zip} in ${lo[1].county}, paid around ${K.usd(lo[0].prem)}. The state's dearest tenth of ZIP codes paid over ${K.usd(st.p90)}, more than twice the cheapest tenth.</p>
<h2>Trees, wind and the ${yr(2)} spike</h2>
<p>Connecticut's claim rate, ${K.dec(st.freq * 100, 1)} per 100 policies a year, sits near the middle of the states. The exception was ${yr(2)}, when paid claims reached ${K.dec(st.freqY[2] * 100, 1)} per 100 policies and the paid loss ratio rose to ${K.pct(st.lrY[2], 0)}: Isaias in August of that year brought down trees and power lines over much of the state. Old, tall trees near houses are a feature of the Connecticut suburbs, and a tree on a roof is a typical wind claim. Many shoreline policies also carry a percentage hurricane deductible that typically applies only once the National Weather Service has issued a hurricane warning for the state.</p>
<p>A shoreline hurricane deductible: the ${h.a('hurricane-deductible', 'hurricane deductible calculator')} runs it with your own figures.</p>
<h2>Foundations and the policy</h2>
<p>In the northeast of the state, many houses have crumbling concrete foundations caused by a mineral in the aggregate. Standard homeowners policies generally do not pay for that gradual deterioration, and the state set up a separate fund to help owners. It is a reminder that a policy covers sudden, accidental damage, not wear or defects; the ${h.a('should-i-file-a-home-insurance-claim', 'claim page')} discusses when a claim is worth filing.</p>
<h3>Renewals and the FAIR Plan</h3>
<p>Insurers declined to renew ${K.rate(st.nonren[4])} of policies in the typical ZIP code in ${yr(4)}, near the national figure. The ${planLink(0)} writes a basic dwelling fire policy covering fire, lightning, wind and hail for homes that cannot find a private insurer. The ${regLink()} handles complaints and reviews rates.</p>
`,
  faqs: [
    { q: 'How much is homeowners insurance in Fairfield County, Connecticut?', a: `The typical ZIP code of Fairfield County paid ${K.usd(fair.prem)} per policy in ${yr(4)}, the highest county typical figure in the state, against ${K.usd(st.prem[4])} for Connecticut as a whole. Greenwich ZIP codes were far higher. At ${K.ppiMonth} prices the county typical figure would be about ${K.usd(K.today(fair.prem))}.` },
    { q: 'Does homeowners insurance cover crumbling foundations in Connecticut?', a: `Generally not. Standard policies exclude gradual deterioration and defects in materials, and insurers have denied many of these claims. The state created the Connecticut Foundation Solutions Indemnity Company to help affected owners pay for replacement. Ask your insurer in writing what your own policy says.` },
    { q: 'When does a hurricane deductible apply in Connecticut?', a: `On policies that carry one, usually when the National Weather Service issues a hurricane warning for any part of the state and the storm causes the damage. Outside such an event, the ordinary all-other-perils deductible applies. The percentage is of the dwelling limit, so check the amount on your declarations page.` },
  ],
  related: ['hurricane-deductible', 'state:new-york', 'state:massachusetts', 'should-i-file-a-home-insurance-claim'],
});
