import { defineState } from '../../lib/page-types';
import { ctx } from './_ctx';

const { K, N, st, c, regLink, planLink, hi, lo, yr } = ctx('illinois');
const cook = c('Cook County'), dup = c('DuPage County'), will = c('Will County'), cham = c('Champaign County');

export default defineState({
  slug: 'illinois',
  title: 'Homeowners Insurance Illinois 2026: Chicago and Downstate',
  description: `Homeowners insurance in Illinois 2026: premium per policy by ZIP code and county, 2018 to 2022, Cook and the collar counties, downstate and the FAIR Plan.`,
  intro: `Illinois's median ZIP code paid ${K.usd(st.prem[4])} per policy in ${yr(4)}, up ${K.sgn(st.chg)} after inflation, ranked ${st.rankChg} of 51 for growth.`,
  resume: `Illinois has one of the largest sets of ZIP codes in the Treasury file, ${K.num(st.zips)}, and its median homeowners premium per policy was ${K.usd(st.prem[4])} in ${yr(4)}, close to the national ${K.usd(N.prem[4])}. What stands out is the steady rise: ${K.sgn(st.chg)} after inflation from ${yr(0)}, ranked ${st.rankChg} of 51, with every year higher than the last. The premium range is narrow for a large state, from under ${K.usd(st.p10)} for the cheapest tenth of ZIP codes to over ${K.usd(st.p90)} for the dearest. Cook County's ${cook.zips} ZIP codes had a median of ${K.usd(cook.prem)}, nearly the same as DuPage at ${K.usd(dup.prem)} and Will at ${K.usd(will.prem)}. The dearest ZIP codes were downtown Chicago's ${hi[0].zip} and ${hi[1].zip}. Claims peaked in ${yr(2)}, the year of the August derecho, at ${K.dec(st.freqY[2] * 100, 1)} per 100 policies. The Illinois FAIR Plan covers homes private insurers decline. The data stop in ${yr(4)}.`,
  body: (h) => `
<h2>Chicago and the collar counties</h2>
<p>Cook County rose ${K.sgn(cook.chg ?? 0)} after inflation from ${yr(0)} to ${yr(4)}, DuPage ${K.sgn(dup.chg ?? 0)} and Will ${K.sgn(will.chg ?? 0)}. The suburban counties pay about the same per policy as the city, which reflects similar storm exposure and similar house values on average. The two dearest ZIP codes in the state, ${hi[0].zip} and ${hi[1].zip} in the Near North Side and River North, paid ${K.usd(hi[0].prem)} and ${K.usd(hi[1].prem)} per policy: a small number of homeowners policies on large houses and townhouses, in areas where most residents rent or own condominiums insured on other forms.</p>
<h2>Downstate</h2>
<p>Champaign County, home of the University of Illinois, had a median of ${K.usd(cham.prem)} and one of the faster rises, ${K.sgn(cham.chg ?? 0)}. The cheapest ZIP codes were in the north of the state, ${lo[0].zip} in ${lo[0].county} at ${K.usd(lo[0].prem)} and ${lo[1].zip} in ${lo[1].county} at ${K.usd(lo[1].prem)}. Illinois has many small towns with long-established mutual insurers, and some of them were not asked to report in the data call, so rural ZIP codes may be less well represented than urban ones.</p>
${h.mini('state', { t: 'Illinois against a neighboring state', p: ['sx', 'mine'], d: { sx: 'illinois' } })}
<h2>Wind and hail</h2>
<p>Paid claims ran at ${K.dec(st.freq * 100, 1)} per 100 policies a year, ranked ${st.rankFreq} of 51, with a peak of ${K.dec(st.freqY[2] * 100, 1)} in ${yr(2)} when the derecho of August 10 crossed northern Illinois with hurricane-force winds. The paid loss ratio that year was ${K.pct(st.lrY[2], 0)}, then fell to ${K.pct(st.lrY[4], 0)} in ${yr(4)}. The average claim, ${K.usd(st.sev)}, was a little below the national figure. Many Illinois policies now carry a separate wind and hail deductible; the ${h.a('roof-claim-actual-cash-value', 'roof claim page')} shows how it combines with roof depreciation.</p>
<h2>Renewals and the FAIR Plan</h2>
<p>Insurers declined to renew ${K.rate(st.nonren[4])} of policies in the median ZIP code in ${yr(4)}, close to the national rate. The ${planLink(0)} writes dwelling and homeowners forms, both named-peril and multi-peril, for homes that cannot find a private insurer, which makes it broader than many FAIR plans. The ${regLink()} reviews complaints. Basement water is the classic Chicago-area claim; sewer and drain backup needs its own endorsement on most policies.</p>
`,
  faqs: [
    { q: 'How much is homeowners insurance in Chicago?', a: `The median ZIP code of Cook County paid ${K.usd(cook.prem)} per policy in ${yr(4)}, after a rise of ${K.sgn(cook.chg ?? 0)} after inflation from ${yr(0)}. At ${K.ppiMonth} prices that is about ${K.usd(K.today(cook.prem))}. City ZIP codes vary widely; enter yours in the lookup.` },
    { q: 'Why did Illinois home insurance claims jump in 2020?', a: `The derecho of August 10, ${yr(2)} crossed northern Illinois with winds comparable to a hurricane, damaging roofs, siding and trees. Paid claims in the median Illinois ZIP code reached ${K.dec(st.freqY[2] * 100, 1)} per 100 policies that year, against ${K.dec(st.freqY[0] * 100, 1)} in ${yr(0)}, and the paid loss ratio rose to ${K.pct(st.lrY[2], 0)}.` },
    { q: 'Does Illinois homeowners insurance cover basement flooding?', a: `Water that backs up through a floor drain or sewer line is excluded from most standard policies unless you add a water backup endorsement. Surface water flooding is excluded too and needs a flood policy. Both matter in the Chicago area, where heavy rain regularly overwhelms combined sewers.` },
  ],
  related: ['roof-claim-actual-cash-value', 'should-i-file-a-home-insurance-claim', 'state:indiana', 'state:iowa'],
});
