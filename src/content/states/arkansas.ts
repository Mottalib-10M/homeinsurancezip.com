import { defineState } from '../../lib/page-types';
import { ctx } from './_ctx';

const { K, N, st, c, regLink, hi, lo, yr } = ctx('arkansas');
const pul = c('Pulaski County'), ben = c('Benton County'), seb = c('Sebastian County'), wash = c('Washington County');

export default defineState({
  slug: 'arkansas',
  title: 'Homeowners Insurance Arkansas 2026: Hail Claims and Premiums',
  description: `Homeowners insurance in Arkansas 2026: premium per policy by ZIP code and county from 2018 to 2022, one of the highest claim rates in the US, and loss ratios.`,
  intro: `Arkansas homeowners insurers paid ${K.dec(st.freq * 100, 1)} claims per 100 policies a year, ranked ${st.rankFreq} of the 50 states and DC; the typical ZIP code paid ${K.usd(st.prem[4])} in ${yr(4)}.`,
  resume: `Arkansas homeowners file claims more often than almost anyone else. Over ${yr(0)} to ${yr(4)}, the typical ZIP code in the Treasury file had ${K.dec(st.freq * 100, 1)} paid claims per 100 policies a year, second only to Louisiana, against ${K.dec(N.freq * 100, 1)} nationally. Each claim was modest, ${K.usd(st.sev)} on average, consistent with hail and wind damage to roofs rather than total losses. The premium per policy in the typical ZIP code was ${K.usd(st.prem[4])} in ${yr(4)}, ranked ${st.rankPrem} of the 50 states and DC, and it rose ${K.sgn(st.chg)} after inflation over five years. The strain shows in the loss ratio: insurers paid out ${K.pct(st.lrY[4], 0)} of premium in claims in ${yr(4)}, up from ${K.pct(st.lrY[0], 0)}. Pulaski County around Little Rock had the highest county typical figure, ${K.usd(pul.prem)}. Arkansas has no FAIR plan for homes. The data stop in ${yr(4)}.`,
  body: (h) => `
<h2>Claims in almost every year</h2>
<p>Most states have one bad year and four ordinary ones. Arkansas had none below ${K.dec(Math.min(...st.freqY) * 100, 1)} paid claims per 100 policies, with a peak of ${K.dec(st.freqY[2] * 100, 1)} in ${yr(2)}. Spring hail and tornado outbreaks across the state produce a steady flow of roof and siding claims. Insurers answer that pattern with higher wind and hail deductibles, often a percentage of the dwelling limit, and with roof schedules that pay older roofs at actual cash value. The ${h.a('roof-claim-actual-cash-value', 'roof claim calculator')} shows what that means on a claim.</p>
<p>An Arkansas hail claim on a 15-year roof: the ${h.a('roof-claim-actual-cash-value', 'roof claim calculator')} runs it with your own figures.</p>
<h2>Little Rock and Northwest Arkansas</h2>
<p>Pulaski County's ${pul.zips} ZIP codes had a typical figure of ${K.usd(pul.prem)} in ${yr(4)}. The two fast-growing counties of Northwest Arkansas, Benton and Washington, paid ${K.usd(ben.prem)} and ${K.usd(wash.prem)}, with rises of ${K.sgn(ben.chg ?? 0)} and ${K.sgn(wash.chg ?? 0)} after inflation. Sebastian County, around Fort Smith, was at ${K.usd(seb.prem)}. The dearest ZIP codes were ${hi[0].zip} and ${hi[1].zip}, both in ${hi[0].county}, at ${K.usd(hi[0].prem)} and ${K.usd(hi[1].prem)}. The cheapest was ${lo[0].zip} in ${lo[0].county}, ${K.usd(lo[0].prem)}.</p>
<h2>A loss ratio that kept rising</h2>
<p>The paid loss ratio is the share of premium returned as claims. In Arkansas it went from ${K.pct(st.lrY[0], 0)} in ${yr(0)} to ${K.pct(st.lrY[2], 0)} in ${yr(2)} and ${K.pct(st.lrY[4], 0)} in ${yr(4)}, above the national typical figure every year. A rising ratio usually comes before rate filings, which is why the premium increases of ${yr(4) + 1} and after, outside this file, were steep in hail states. The ${h.a('why-is-home-insurance-going-up', 'page on rising premiums')} carries the ${yr(4)} figure forward with the BLS index.</p>
<h3>Renewals and where to turn</h3>
<p>Insurers declined to renew ${K.rate(st.nonren[4])} of policies in the typical ZIP code in ${yr(4)}, ranked ${st.rankNonren} of the 50 states and DC. Cancellations for nonpayment ran at ${K.rate(st.npc)}. There is no residual market plan for homes in Arkansas listed in the Treasury report, so a declined home goes to the surplus lines market. Complaints go to the ${regLink()}.</p>
`,
  faqs: [
    { q: 'Why is home insurance going up in Arkansas?', a: `Claims. Arkansas had ${K.dec(st.freq * 100, 1)} paid claims per 100 policies a year from ${yr(0)} to ${yr(4)}, one of the highest rates in the country, and insurers paid out ${K.pct(st.lrY[4], 0)} of premium in claims in ${yr(4)}. Hail and wind damage to roofs is the main cause, and rate increases follow such loss ratios.` },
    { q: 'How much is homeowners insurance in Little Rock?', a: `The typical ZIP code of Pulaski County, which includes Little Rock, paid ${K.usd(pul.prem)} per policy in ${yr(4)} in the Treasury file, the highest county typical figure in the state. At ${K.ppiMonth} prices that is about ${K.usd(K.today(pul.prem))}. Your own price depends on the roof, the deductible and the insurer.` },
    { q: 'Does Arkansas have a wind and hail deductible?', a: `Many Arkansas policies carry a separate wind and hail deductible, often 1 or 2 percent of the dwelling limit, rather than the flat all-other-perils deductible. On a house insured for ${K.usd(250000)}, 1 percent is ${K.usd(2500)}. Your declarations page states which one applies; the hurricane deductible calculator works the same way.` },
  ],
  related: ['roof-claim-actual-cash-value', 'should-i-file-a-home-insurance-claim', 'state:oklahoma', 'state:missouri'],
});
