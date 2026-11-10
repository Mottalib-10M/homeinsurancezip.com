import { defineState } from '../../lib/page-types';
import { ctx } from './_ctx';

const { K, N, st, c, regLink, hi, lo, yr } = ctx('nebraska');
const lan = c('Lancaster County'), dou = c('Douglas County'), cass = c('Cass County'), sar = c('Sarpy County');

export default defineState({
  slug: 'nebraska',
  title: 'Homeowners Insurance Nebraska 2026: Top Nonrenewal Rate',
  description: `Homeowners insurance in Nebraska 2026: premium per policy by ZIP code and county, 2018 to 2022, Omaha and Lincoln, the top nonrenewal rate in the US, hail.`,
  intro: `Nebraska homeowners insurers declined to renew ${K.rate(st.nonren[4])} of policies in the typical ZIP code in ${yr(4)}, the highest rate of any state.`,
  resume: `Nebraska had the highest nonrenewal rate in the Treasury file in ${yr(4)}: insurers declined to renew ${K.rate(st.nonren[4])} of homeowners policies in the typical ZIP code, up from ${K.rate(st.nonren[1])} in ${yr(1)}, and in ${K.pct(st.highNonren, 0)} of Nebraska ZIP codes the rate was above the line that marks the top tenth nationally. Premiums were high too: the typical ZIP code paid ${K.usd(st.prem[4])} per policy, ranked ${st.rankPrem} of the 50 states and DC, after a rise of ${K.sgn(st.chg)} after inflation. Even the cheapest tenth of ZIP codes paid over ${K.usd(st.p10)}, more than the national typical figure of ${K.usd(N.prem[4])}. Hail is the reason. Paid claims ran at ${K.dec(st.freq * 100, 1)} per 100 policies a year and reached ${K.dec(st.freqY[4] * 100, 1)} in ${yr(4)}. Douglas County, Omaha, paid ${K.usd(dou.prem)}; Sarpy County rose ${K.sgn(sar.chg ?? 0)}. Nebraska has no FAIR plan for homes. The data stop in ${yr(4)}.`,
  body: (h) => `
<h2>Nonrenewals on the Plains</h2>
<p>Nebraska's typical nonrenewal rate went ${st.nonren.map((x) => K.rate(x)).join(', ')} from ${yr(0)} to ${yr(4)}. That is not one insurer leaving: the rate rose in most of the state's ZIP codes at once. Insurers in hail country tighten their rules on roof age and condition when losses climb, and a roof that would have renewed a few years earlier is declined. The file does not give reasons, but the pattern, with claims rising in the same years, fits that account. The ${h.a('home-insurance-non-renewal', 'nonrenewal page')} explains the notice and the options.</p>
<p>Nebraska, odds of a nonrenewal ahead: the ${h.a('home-insurance-non-renewal', 'nonrenewal calculator')} runs it with your own figures.</p>
<h2>Omaha and Lincoln</h2>
<p>Douglas County had ${dou.zips} ZIP codes in the file and a typical figure of ${K.usd(dou.prem)} in ${yr(4)}, up ${K.sgn(dou.chg ?? 0)} after inflation. Lancaster County, Lincoln, paid ${K.usd(lan.prem)} after ${K.sgn(lan.chg ?? 0)}; Sarpy County, south of Omaha, ${K.usd(sar.prem)} after ${K.sgn(sar.chg ?? 0)}; and Cass County ${K.usd(cass.prem)}. The dearest ZIP codes were ${hi[0].zip} in ${hi[0].county} at ${K.usd(hi[0].prem)} and ${hi[1].zip} in ${hi[1].county} at ${K.usd(hi[1].prem)}. The cheapest were in the southwest, ${lo[0].zip} in ${lo[0].county} at ${K.usd(lo[0].prem)}, still above the national typical figure.</p>
<h2>Hail and the ${yr(4)} jump</h2>
<p>Paid claims held near ${K.dec(st.freqY[0] * 100, 1)} per 100 policies from ${yr(0)} to ${yr(3)}, then rose to ${K.dec(st.freqY[4] * 100, 1)} in ${yr(4)}; the paid loss ratio rose from ${K.pct(st.lrY[3], 0)} to ${K.pct(st.lrY[4], 0)}. The average claim, ${K.usd(st.sev)}, is typical of roof and siding repairs. Nebraska policies commonly carry a percentage wind and hail deductible, and many settle older roofs at actual cash value; the ${h.a('roof-claim-actual-cash-value', 'roof claim calculator')} shows the effect on a payment.</p>
<h3>Where a declined home goes</h3>
<p>Nebraska has no residual market plan for homes listed in the Treasury report. A home that admitted insurers will not renew is placed with a surplus lines insurer through an agent, usually at a higher price. Replacing an old roof with impact-resistant shingles is often what brings admitted insurers back. The ${regLink()} handles complaints.</p>
`,
  faqs: [
    { q: 'Why are so many Nebraska homeowners being non-renewed?', a: `Nebraska's typical nonrenewal rate reached ${K.rate(st.nonren[4])} in ${yr(4)}, the highest of any state in the Treasury file, as hail claims rose. Insurers usually cite the age or condition of the roof. Ask for the reason in writing; a new roof or proof of repairs can change the decision.` },
    { q: 'How much is homeowners insurance in Omaha?', a: `The typical ZIP code of Douglas County, which includes Omaha, paid ${K.usd(dou.prem)} per policy in ${yr(4)}, after a rise of ${K.sgn(dou.chg ?? 0)} after inflation from ${yr(0)}. At ${K.ppiMonth} prices that is about ${K.usd(K.today(dou.prem))}. Hail deductibles and roof terms affect the quote a lot.` },
    { q: 'What can I do if no insurer will renew my home in Nebraska?', a: `Get quotes from several admitted insurers through an independent agent, fix what the notice cites, often the roof, and ask about impact-resistant materials. Nebraska has no FAIR plan for homes, so the fallback is a surplus lines policy, which is usually dearer and narrower.` },
  ],
  related: ['home-insurance-non-renewal', 'roof-claim-actual-cash-value', 'state:kansas', 'state:iowa'],
});
