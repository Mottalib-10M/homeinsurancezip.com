import { defineState } from '../../lib/page-types';
import { ctx } from './_ctx';

const { K, N, st, c, regLink, planLink, hi, lo, yr } = ctx('maryland');
const mont = c('Montgomery County'), balt = c('Baltimore County'), aa = c('Anne Arundel County'), pg = c("Prince George's County");

export default defineState({
  slug: 'maryland',
  title: 'Homeowners Insurance Maryland 2026: Premiums and Loss Ratios',
  description: `Homeowners insurance in Maryland 2026: premium per policy by ZIP code and county, 2018 to 2022, Baltimore, the DC suburbs, loss ratios and the joint plan.`,
  intro: `Maryland homeowners insurers paid out ${K.pct(st.lrY[0], 0)} of premium in claims in ${yr(0)}, one of the highest ratios that year; the median ZIP code paid ${K.usd(st.prem[4])} in ${yr(4)}.`,
  resume: `Maryland's median homeowners premium per policy was ${K.usd(st.prem[4])} in ${yr(4)} in the Treasury file, close to the national ${K.usd(N.prem[4])} and ranked ${st.rankPrem} of 51, after a rise of ${K.sgn(st.chg)} after inflation from ${yr(0)}. The striking figure is the loss ratio: insurers paid out ${K.pct(st.lrY[0], 0)} of premium in claims in ${yr(0)}, a year of heavy rain and flash floods around Ellicott City, and stayed near half in later years, ${K.pct(st.lrY[4], 0)} in ${yr(4)}, well above the national median. Baltimore County paid ${K.usd(balt.prem)}, Anne Arundel ${K.usd(aa.prem)} and Montgomery ${K.usd(mont.prem)}. The dearest ZIP code was ${hi[0].zip} on the Anne Arundel shore, ${K.usd(hi[0].prem)}; the cheapest ${lo[0].zip} on the Eastern Shore, ${K.usd(lo[0].prem)}. Nonrenewals stayed low, ${K.rate(st.nonren[4])}. The Maryland Joint Insurance Association covers homes declined elsewhere. The data stop in ${yr(4)}.`,
  body: (h) => `
<h2>The suburbs of Washington and Baltimore</h2>
<p>Montgomery County had ${mont.zips} ZIP codes in the file and a median of ${K.usd(mont.prem)} in ${yr(4)}, up ${K.sgn(mont.chg ?? 0)} after inflation. Prince George's County paid ${K.usd(pg.prem)}, Baltimore County ${K.usd(balt.prem)} and Anne Arundel County ${K.usd(aa.prem)}, all with rises of 8 to 12 percent. The dearest ZIP codes in the state were ${hi[0].zip}, on the Chesapeake shore in ${hi[0].county}, at ${K.usd(hi[0].prem)}, and ${hi[1].zip} in ${hi[1].county}, horse country north of the city, at ${K.usd(hi[1].prem)}.</p>
<h2>Losses near half of premium</h2>
<p>A paid loss ratio of ${K.pct(st.lrY[0], 0)} means insurers paid out more than half of what they collected, before their own costs. Maryland's ratio was ${st.lrY.map((x) => K.pct(x, 0)).join(', ')} from ${yr(0)} to ${yr(4)}, above the national median every year. Claims were frequent, ${K.dec(st.freq * 100, 1)} per 100 policies a year, ranked ${st.rankFreq} of 51, and of ordinary size, ${K.usd(st.sev)}. The file does not split claims by cause, but the frequency points to many ordinary repairs rather than a few catastrophes. Sustained ratios like these lead to rate filings, which is why later renewals rose faster than these figures.</p>
${h.mini('state', { t: 'Maryland against Virginia or Pennsylvania', p: ['sx', 'mine'], d: { sx: 'maryland' } })}
<h2>The Eastern Shore and western Maryland</h2>
<p>The cheapest ZIP codes were ${lo[0].zip} in ${lo[0].county}, on the Eastern Shore, at ${K.usd(lo[0].prem)}, and ${lo[1].zip} in ${lo[1].county}, in the west, at ${K.usd(lo[1].prem)}. The state's range is wide, from under ${K.usd(st.p10)} for the cheapest tenth of ZIP codes to over ${K.usd(st.p90)} for the dearest. Low-lying Eastern Shore towns face storm surge, which is flood and needs its own policy.</p>
<h2>Renewals and the joint association</h2>
<p>Maryland's nonrenewal rate was ${K.rate(st.nonren[4])} in ${yr(4)}, ranked ${st.rankNonren} of 51, and cancellations for nonpayment were rare, ${K.rate(st.npc)}. The ${planLink(0)} writes dwelling fire and homeowners named-peril forms for homes that cannot find a private insurer. The ${regLink()} reviews complaints. For water damage claims, the ${h.a('should-i-file-a-home-insurance-claim', 'claim calculator')} helps decide whether a small one is worth filing.</p>
`,
  faqs: [
    { q: 'How much is homeowners insurance in Montgomery County, Maryland?', a: `The median ZIP code of Montgomery County paid ${K.usd(mont.prem)} per policy in ${yr(4)}, after a rise of ${K.sgn(mont.chg ?? 0)} after inflation from ${yr(0)}, according to the Treasury file. At ${K.ppiMonth} prices that is about ${K.usd(K.today(mont.prem))}. Your ZIP code may differ; use the lookup.` },
    { q: 'Why are Maryland home insurance loss ratios so high?', a: `Maryland insurers paid out ${K.pct(st.lrY[0], 0)} of premium in claims in ${yr(0)} and ${K.pct(st.lrY[4], 0)} in ${yr(4)}, above the national median each year. Claims were frequent, ${K.dec(st.freq * 100, 1)} per 100 policies a year, without one dominant catastrophe. High loss ratios usually lead insurers to file for rate increases.` },
    { q: 'What is the Maryland Joint Insurance Association?', a: `It is Maryland's residual market plan for property that private insurers decline, listed in the Treasury report. It writes dwelling fire and homeowners named-peril policies, narrower than a standard HO-3. Its policies are not included in the Treasury premium figures, which cover private insurers.` },
  ],
  related: ['should-i-file-a-home-insurance-claim', 'state:district-of-columbia', 'state:virginia', 'state:delaware'],
});
