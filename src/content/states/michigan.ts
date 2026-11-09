import { defineState } from '../../lib/page-types';
import { ctx } from './_ctx';

const { K, N, st, c, regLink, planLink, hi, lo, yr } = ctx('michigan');
const oak = c('Oakland County'), way = c('Wayne County'), mac = c('Macomb County'), kent = c('Kent County');

export default defineState({
  slug: 'michigan',
  title: 'Homeowners Insurance Michigan 2026: Falling Nonrenewals',
  description: `Homeowners insurance in Michigan 2026: premium per policy by ZIP code and county, 2018 to 2022, Detroit and Oakland County, falling nonrenewals, MBPIA.`,
  intro: `Michigan's nonrenewal rate fell from ${K.rate(st.nonren[0])} in ${yr(0)} to ${K.rate(st.nonren[4])} in ${yr(4)}; the median ZIP code paid ${K.usd(st.prem[4])} per policy.`,
  resume: `Michigan is a low-premium state in the Treasury file: its median ZIP code paid ${K.usd(st.prem[4])} per homeowners policy in ${yr(4)}, ranked ${st.rankPrem} of 51, and the figure did not move after inflation from ${yr(0)}, ${K.sgn(st.chg)}. What changed is renewals. In ${yr(0)} insurers declined to renew ${K.rate(st.nonren[0])} of policies in the median ZIP code, one of the highest rates in the country; by ${yr(4)} the rate was ${K.rate(st.nonren[4])}, a fall of about two thirds. Detroit's Wayne County paid ${K.usd(way.prem)} and Oakland County ${K.usd(oak.prem)}, both above the state median, while Kent County, Grand Rapids, paid ${K.usd(kent.prem)}. The cheapest ZIP codes were up north in Roscommon County, ${lo[0].zip} at ${K.usd(lo[0].prem)}. The paid loss ratio crept up to ${K.pct(st.lrY[4], 0)}. The Michigan Basic Property Insurance Association covers homes private insurers decline. The data stop in ${yr(4)}.`,
  body: (h) => `
<h2>Nonrenewals came down</h2>
<p>The median nonrenewal rate went ${st.nonren.map((x) => K.rate(x)).join(', ')} from ${yr(0)} to ${yr(4)}., falling every single year. The file does not give reasons, and an insurer's decision to stop writing a line or to transfer policies to an affiliate can show up as nonrenewals in one year. Whatever the cause, a Michigan homeowner in ${yr(4)} faced odds of a nonrenewal close to the national median, ranked ${st.rankNonren} of 51.</p>
${h.mini('nonrenew', { t: 'Michigan odds over the coming renewals', p: ['sx', 'yrs'], d: { sx: 'michigan', yrs: 5 } })}
<h2>Detroit and the suburbs</h2>
<p>Wayne County had ${way.zips} ZIP codes in the file and a median of ${K.usd(way.prem)} in ${yr(4)}; Oakland County, with ${oak.zips}, had ${K.usd(oak.prem)}; both fell slightly after inflation. Macomb County paid ${K.usd(mac.prem)}. The dearest ZIP codes in the state were ${hi[0].zip} in ${hi[0].county}, around New Center, at ${K.usd(hi[0].prem)}, and ${hi[1].zip} in ${hi[1].county}, Bloomfield Hills, at ${K.usd(hi[1].prem)}. Inside Detroit, premiums vary a great deal from one ZIP code to the next, so the county median is only a starting point; the lookup gives each ZIP code with its five years.</p>
<h2>West Michigan and the north</h2>
<p>Kent County paid ${K.usd(kent.prem)} after a change of ${K.sgn(kent.chg ?? 0)}. In the northern Lower Peninsula, ${lo[0].zip} and ${lo[1].zip} in ${lo[0].county} paid ${K.usd(lo[0].prem)} and ${K.usd(lo[1].prem)}, among the lowest figures in the country, though many of the homes there are seasonal cottages. The cheapest tenth of Michigan ZIP codes paid under ${K.usd(st.p10)}; the dearest tenth over ${K.usd(st.p90)}.</p>
<h2>Losses, basements and the plan of last resort</h2>
<p>Paid claims averaged ${K.dec(st.freq * 100, 1)} per 100 policies a year, and the paid loss ratio rose from ${K.pct(st.lrY[0], 0)} to ${K.pct(st.lrY[4], 0)}. Southeast Michigan saw heavy flooding of basements in June ${yr(3)}; sewer backup is excluded from most standard policies unless an endorsement is added, and surface flooding needs a flood policy. The ${planLink(0)} writes dwelling fire and HO-2, HO-3, HO-4 and HO-6 forms for homes declined elsewhere. The ${regLink()} handles complaints.</p>
`,
  faqs: [
    { q: 'How much is homeowners insurance in Detroit?', a: `The median ZIP code of Wayne County, which includes Detroit, paid ${K.usd(way.prem)} per policy in ${yr(4)}, above the Michigan median of ${K.usd(st.prem[4])}. Some Detroit ZIP codes paid much more. At ${K.ppiMonth} prices the county figure would be about ${K.usd(K.today(way.prem))}. Use the lookup for one ZIP code.` },
    { q: 'Why did Michigan nonrenewals fall from 2018 to 2022?', a: `The Treasury file does not give reasons. The median rate went from ${K.rate(st.nonren[0])} in ${yr(0)} to ${K.rate(st.nonren[4])} in ${yr(4)}. One insurer leaving a line of business or moving policies to an affiliate can inflate one year's rate, and falling rates can mean such moves were over.` },
    { q: 'What is the Michigan Basic Property Insurance Association?', a: `It is Michigan's insurer of last resort for homes private insurers decline, listed in the Treasury report. It writes dwelling fire forms and HO-2, HO-3, HO-4 and HO-6 homeowners forms, broader than many state plans. Its policies are not part of the Treasury premium data.` },
  ],
  related: ['home-insurance-non-renewal', 'fair-plan-insurance', 'state:ohio', 'state:wisconsin'],
});
