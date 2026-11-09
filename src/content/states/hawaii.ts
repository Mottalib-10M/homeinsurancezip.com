import { defineState } from '../../lib/page-types';
import { ctx } from './_ctx';

const { K, N, st, c, regLink, planLink, hi, lo, yr } = ctx('hawaii');
const hon = c('Honolulu County'), maui = c('Maui County'), haw = c('Hawaii County'), kau = c('Kauai County');

export default defineState({
  slug: 'hawaii',
  title: 'Homeowners Insurance Hawaii 2026: Premiums on Each Island',
  description: `Homeowners insurance in Hawaii 2026: premium per policy on Oahu, Maui, Kauai and the Big Island, 2018 to 2022, the lowest nonrenewal rate in the US, and HPIA.`,
  intro: `Hawaii's median ZIP code paid ${K.usd(st.prem[4])} per policy in ${yr(4)}, ranked ${st.rankPrem} of 51, with the lowest nonrenewal rate of any state.`,
  resume: `Only ${st.zips} Hawaii ZIP codes meet the Treasury file's threshold, spread over the four counties. Their median premium per homeowners policy was ${K.usd(st.prem[4])} in ${yr(4)}, above the national ${K.usd(N.prem[4])} and ranked ${st.rankPrem} of 51, after a rise of ${K.sgn(st.chg)} after inflation from ${yr(0)}. Kauai County had the highest county median, ${K.usd(kau.prem)}, and its ZIP ${hi[0].zip} the highest in the state, ${K.usd(hi[0].prem)}. Claims were rare, ${K.dec(st.freq * 100, 1)} per 100 policies a year, and the paid loss ratio was among the lowest in the country, falling to ${K.pct(st.lrY[4], 0)} in ${yr(4)}. Insurers also kept their customers: only ${K.rate(st.nonren[4])} of policies were not renewed in ${yr(4)}, ranked ${st.rankNonren} of 51. The figures end before the Lahaina fire of August 2023, which changed the market on Maui. Lava zones on the Big Island are often served by the Hawaii Property Insurance Association, outside these figures.`,
  body: (h) => `
<h2>Four counties, four markets</h2>
<p>Honolulu County, the island of Oahu, had ${hon.zips} ZIP codes in the file and a median of ${K.usd(hon.prem)} in ${yr(4)}, up ${K.sgn(hon.chg ?? 0)} after inflation. Maui County paid ${K.usd(maui.prem)} after the fastest rise of the four, ${K.sgn(maui.chg ?? 0)}. Hawaii County, the Big Island, paid ${K.usd(haw.prem)}, and Kauai County ${K.usd(kau.prem)}. The cheapest ZIP codes were ${lo[0].zip} in ${lo[0].county} at ${K.usd(lo[0].prem)} and ${lo[1].zip} in ${lo[1].county} at ${K.usd(lo[1].prem)}. Because so few ZIP codes reach ten insurers and fifty policies, the file leaves out many rural parts of the islands.</p>
<h2>Hurricanes are rare, and expensive when they come</h2>
<p>Hawaii's insurers paid few claims in these years, ${K.dec(st.freq * 100, 1)} per 100 policies on average, ranked ${st.rankFreq} of 51, and the five-year average claim was ${K.usd(st.sev)}. The paid loss ratio fell from ${K.pct(st.lrY[1], 0)} in ${yr(1)} to ${K.pct(st.lrY[4], 0)} in ${yr(4)}. That calm is what a long gap between hurricanes looks like. Kauai was hit hard by Hurricane Iniki in 1992, and many standard homeowners policies on the islands still exclude hurricane damage, which owners buy separately. Read the declarations page to see whether hurricane is covered and with what deductible.</p>
${h.mini('hurricane', { t: 'A hurricane deductible on an island home', p: ['a', 'p', 'd'], d: { a: 700000, p: 2, d: 40000 } })}
<h2>Lahaina and after</h2>
<p>The Treasury data stop in ${yr(4)}, a year before the Lahaina wildfire destroyed most of the town in August 2023. Losses of that size do not appear in these figures, and Maui premiums and underwriting rules have changed since. The ${h.a('how-much-dwelling-coverage', 'dwelling coverage page')} explains why the cost to rebuild, and not the market value, should set the limit; island construction costs and the surge after a disaster make that question sharper in Hawaii than almost anywhere.</p>
<h2>The plan of last resort</h2>
<p>The ${planLink(0)} writes dwelling and homeowners named-peril policies, mostly in the lava zones of the Big Island where private insurers do not write. Its policies are outside the Treasury file. The ${regLink()} regulates insurers and handles complaints; nonpayment cancellations were rare in Hawaii, ${K.rate(st.npc)} over the period.</p>
`,
  faqs: [
    { q: 'Does homeowners insurance in Hawaii cover hurricanes?', a: `Not always. Many Hawaii homeowners policies exclude hurricane, and owners buy separate hurricane coverage with its own percentage deductible. Read your declarations page and endorsements. The Treasury premium figures, ${K.usd(st.prem[4])} for the median ZIP code in ${yr(4)}, do not tell you whether hurricane was included in each policy.` },
    { q: 'How much is homeowners insurance on Maui?', a: `The median ZIP code of Maui County paid ${K.usd(maui.prem)} per policy in ${yr(4)}, after a rise of ${K.sgn(maui.chg ?? 0)} after inflation from ${yr(0)}. The data end before the Lahaina fire of August 2023, so they do not show the changes in price and availability that followed it on the island.` },
    { q: 'Who insures homes in lava zones on the Big Island?', a: `Homes in lava zones 1 and 2 on the island of Hawaii are often declined by private insurers and placed with the Hawaii Property Insurance Association, the state's plan of last resort, which writes named-peril dwelling and homeowners forms. Those policies are not part of the Treasury figures.` },
  ],
  related: ['hurricane-deductible', 'how-much-dwelling-coverage', 'fair-plan-insurance', 'state:california'],
});
