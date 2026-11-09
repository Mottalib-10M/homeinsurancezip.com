import { defineState } from '../../lib/page-types';
import { ctx } from './_ctx';

const { K, N, st, c, regLink, hi, lo, yr } = ctx('idaho');
const bon = c('Bonner County'), ada = c('Ada County'), bonn = c('Bonneville County'), can = c('Canyon County');

export default defineState({
  slug: 'idaho',
  title: 'Homeowners Insurance Idaho 2026: Fast Rise From a Low Base',
  description: `Homeowners insurance in Idaho 2026: premium per policy by ZIP code and county, 2018 to 2022, Boise and the north, Sun Valley's high rates, rising nonrenewals.`,
  intro: `Idaho's median ZIP code paid ${K.usd(st.prem[4])} per homeowners insurance policy in ${yr(4)}, after a rise of ${K.sgn(st.chg)} after inflation, ranked ${st.rankChg} of 51.`,
  resume: `Idaho is still one of the cheaper states for homeowners insurance, but it was one of the fastest rising. The median ZIP code paid ${K.usd(st.prem[0])} per policy in ${yr(0)} and ${K.usd(st.prem[4])} in ${yr(4)}, a rise of ${K.sgn(st.chg)} after inflation, ranked ${st.rankChg} of 51. Ada County, around Boise, rose ${K.sgn(ada.chg ?? 0)} and Bonneville County, around Idaho Falls, ${K.sgn(bonn.chg ?? 0)}, as the state's population and building costs grew quickly. Insurers' paid loss ratio climbed every year, from ${K.pct(st.lrY[0], 0)} to ${K.pct(st.lrY[4], 0)}, and nonrenewals rose to ${K.rate(st.nonren[4])} in ${yr(4)}, ranked ${st.rankNonren} of 51. Claims were rare but large, ${K.usd(st.sev)} on average. Blaine County, home of Sun Valley and Ketchum, had the two dearest ZIP codes, above ${K.usd(Math.floor(hi[1].prem / 100) * 100)}. Idaho has no FAIR plan for homes. The data stop in ${yr(4)}.`,
  body: (h) => `
<h2>Boise, Nampa and the growth years</h2>
<p>Ada County had ${ada.zips} ZIP codes in the file and a median of ${K.usd(ada.prem)} in ${yr(4)}. Canyon County, around Nampa and Caldwell, was at ${K.usd(can.prem)} after a rise of ${K.sgn(can.chg ?? 0)}. Both are lower than the state median, and the cheapest ZIP code in Idaho, ${lo[0].zip} in ${lo[0].county}, paid ${K.usd(lo[0].prem)}. The rise in the Treasure Valley came with a construction boom: when labor and materials cost more, the cost to rebuild a house rises, and so do dwelling limits and premiums.</p>
<h2>North Idaho and the mountains</h2>
<p>Bonner County, around Sandpoint, had a higher median than the Boise area, ${K.usd(bon.prem)}, with wildfire the main concern in forested areas. ZIP ${lo[1].zip} in ${lo[1].county}, in the Silver Valley, paid ${K.usd(lo[1].prem)}. At the top, ${hi[0].zip} and ${hi[1].zip} in ${hi[0].county} paid ${K.usd(hi[0].prem)} and ${K.usd(hi[1].prem)}: second homes of high value in the Wood River Valley. The state's dearest tenth of ZIP codes paid over ${K.usd(st.p90)}.</p>
${h.mini('rise', { t: 'An Idaho premium from 2022 to today', p: ['p22', 'now'], d: { p22: 1235 } })}
<h2>Losses rose every year</h2>
<p>Paid claims per 100 policies were low throughout, between ${K.dec(Math.min(...st.freqY) * 100, 1)} and ${K.dec(Math.max(...st.freqY) * 100, 1)}, but the paid loss ratio rose steadily: ${st.lrY.map((x) => K.pct(x, 0)).join(', ')} from ${yr(0)} to ${yr(4)}. The average claim was ${K.usd(st.sev)}, ranked ${st.rankSev} of 51, pointing to fires and large water losses rather than many small repairs. Winter pipe bursts in vacant second homes are a classic Idaho claim; a policy may limit freezing coverage when a house is unheated or unoccupied.</p>
<h2>Renewals and where to turn</h2>
<p>The nonrenewal rate went from ${K.rate(st.nonren[2])} in ${yr(2)} to ${K.rate(st.nonren[4])} in ${yr(4)}. Wildfire exposure is the reason most often given in forested ZIP codes. Idaho has no residual market plan for homes listed in the Treasury report, so a declined home goes to surplus lines insurers through an agent. The ${regLink()} handles complaints; the ${h.a('home-insurance-non-renewal', 'nonrenewal page')} lists what to do after a notice.</p>
`,
  faqs: [
    { q: 'Why is homeowners insurance going up in Boise?', a: `Ada County's median premium per policy rose ${K.sgn(ada.chg ?? 0)} after inflation from ${yr(0)} to ${yr(4)}, to ${K.usd(ada.prem)}. Rebuilding costs rose with the construction boom, which raises dwelling limits, and Idaho insurers saw their paid loss ratio climb every year. The national index added more after ${yr(4)}.` },
    { q: 'Does homeowners insurance cover frozen pipes in a vacant Idaho cabin?', a: `Often only if you kept the heat on or drained the water system. Many policies exclude freezing damage in an unheated or unoccupied house, and some reduce coverage after a set number of days of vacancy. Read the freezing and vacancy clauses of your policy before leaving a second home for the winter.` },
    { q: 'What happens if no insurer will cover my house in Idaho?', a: `Idaho has no FAIR plan for homes listed in the Treasury report. A licensed agent can place the house with a surplus lines insurer, usually at a higher price and with narrower terms. Clearing vegetation around the house and replacing an old roof can bring admitted insurers back.` },
  ],
  related: ['home-insurance-non-renewal', 'why-is-home-insurance-going-up', 'state:montana', 'state:washington'],
});
