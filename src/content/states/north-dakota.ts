import { defineState } from '../../lib/page-types';
import { ctx } from './_ctx';

const { K, N, st, c, regLink, hi, lo, yr } = ctx('north-dakota');
const cass = c('Cass County'), gf = c('Grand Forks County'), ward = c('Ward County'), bur = c('Burleigh County');

export default defineState({
  slug: 'north-dakota',
  title: 'Homeowners Insurance North Dakota 2026: Fargo and Bismarck',
  description: `Homeowners insurance in North Dakota 2026: premium per policy by ZIP code and county, 2018 to 2022, Fargo, Bismarck and Minot, hail claims and low loss ratios.`,
  intro: `North Dakota's median ZIP code paid ${K.usd(st.prem[4])} per homeowners insurance policy in ${yr(4)}, ranked ${st.rankPrem} of 51, with low loss ratios.`,
  resume: `North Dakota homeowners paid ${K.usd(st.prem[4])} per policy in the median ZIP code in ${yr(4)} in the Treasury file, ranked ${st.rankPrem} of 51 and above the national ${K.usd(N.prem[4])}, after a rise of ${K.sgn(st.chg)} after inflation from ${yr(0)}. Only ${st.zips} ZIP codes reach the file's threshold, in and around the cities. Burleigh County, Bismarck, paid ${K.usd(bur.prem)}, the highest of the large counties, and Cass County, Fargo, ${K.usd(cass.prem)}. Prices are high for a state where insurers paid out little: the paid loss ratio stayed between ${K.pct(Math.min(...st.lrY), 0)} and ${K.pct(Math.max(...st.lrY), 0)}, among the lowest in the country. Claims were frequent but small, ${K.dec(st.freq * 100, 1)} per 100 policies a year at ${K.usd(st.sev)} on average, the pattern of hail on roofs and siding. Nonrenewals rose from ${K.rate(st.nonren[0])} in ${yr(0)} to ${K.rate(st.nonren[3])} in ${yr(3)}. North Dakota has no FAIR plan for homes. Flood along the Red River is a separate policy. The data stop in ${yr(4)}.`,
  body: (h) => `
<h2>Bismarck, Fargo, Grand Forks and Minot</h2>
<p>Burleigh County had ${bur.zips} ZIP codes in the file and a median of ${K.usd(bur.prem)} in ${yr(4)}; the two dearest ZIP codes in the state, ${hi[0].zip} and ${hi[1].zip}, at ${K.usd(hi[0].prem)} and ${K.usd(hi[1].prem)}, are both in that county. Cass County had ${cass.zips} ZIP codes and ${K.usd(cass.prem)}, up ${K.sgn(cass.chg ?? 0)} after inflation; Grand Forks County paid ${K.usd(gf.prem)} and Ward County, Minot, ${K.usd(ward.prem)}. The range is narrow: the cheapest tenth of ZIP codes paid under ${K.usd(st.p10)}, the dearest over ${K.usd(st.p90)}. The cheapest ZIP code, ${lo[0].zip} in ${lo[0].county}, paid ${K.usd(lo[0].prem)}.</p>
<h2>Hail, wind and winter</h2>
<p>Paid claims per 100 policies went from ${K.dec(st.freqY[0] * 100, 1)} in ${yr(0)} to ${K.dec(st.freqY[4] * 100, 1)} in ${yr(4)}, ranked ${st.rankFreq} of 51 over the period. The average claim, ${K.usd(st.sev)}, ranked ${st.rankSev}, among the smallest: roof, siding and window repairs after summer storms rather than total losses. Winter adds frozen pipes and ice damage. Most North Dakota policies carry a separate wind and hail deductible, and a roof schedule can pay an older roof at actual cash value; the ${h.a('roof-claim-actual-cash-value', 'roof claim calculator')} shows the effect.</p>
${h.mini('roof', { t: 'A North Dakota hail claim on a 12-year roof', p: ['c', 'age', 'd'], d: { c: 14000, age: 12, d: 2000 } })}
<h2>Low loss ratios</h2>
<p>A paid loss ratio of ${K.pct(st.lrY[4], 0)} in ${yr(4)} means insurers paid out about a quarter of the premium they collected in claims, before their own costs. The ratio stayed in that range all five years. Low ratios for several years usually limit rate increases. The file itself is thin here: many small-town ZIP codes do not reach ten reporting insurers and are left out, so the state figures describe the cities and larger towns.</p>
<h2>Renewals, flood and the regulator</h2>
<p>The median nonrenewal rate went ${st.nonren.map((x) => K.rate(x)).join(', ')} from ${yr(0)} to ${yr(4)}. North Dakota has no residual market plan for homes listed in the Treasury report. The ${regLink()} handles complaints. Fargo and Grand Forks sit on the Red River, whose spring floods are excluded from homeowners policies; flood coverage is separate and usually starts after a waiting period, so it must be bought before the spring melt.</p>
`,
  faqs: [
    { q: 'How much is homeowners insurance in Fargo?', a: `The median ZIP code of Cass County, which includes Fargo, paid ${K.usd(cass.prem)} per policy in ${yr(4)}, after a rise of ${K.sgn(cass.chg ?? 0)} after inflation from ${yr(0)}. At ${K.ppiMonth} prices that is about ${K.usd(K.today(cass.prem))}. Wind and hail deductibles and roof age change a quote a lot.` },
    { q: 'Why is North Dakota home insurance above average when losses are low?', a: `Claims are frequent, ${K.dec(st.freq * 100, 1)} per 100 policies a year, mostly hail repairs, and the file covers mainly the cities and larger towns. North Dakota's median ZIP code paid ${K.usd(st.prem[4])} per policy in ${yr(4)}, while insurers paid out between ${K.pct(Math.min(...st.lrY), 0)} and ${K.pct(Math.max(...st.lrY), 0)} of premium in claims.` },
    { q: 'Does North Dakota homeowners insurance cover Red River flooding?', a: `No. Flood from rising water is excluded from homeowners policies. Owners near the Red River need a separate flood policy, usually with a waiting period before it takes effect, so it has to be bought well before the spring melt. Sewer backup during a flood needs its own endorsement.` },
  ],
  related: ['roof-claim-actual-cash-value', 'state:minnesota', 'state:south-dakota', 'homeowners-insurance-by-state'],
});
