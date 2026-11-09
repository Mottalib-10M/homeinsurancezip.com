import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const st = K.S('texas');
const N = K.N;
const c = (n: string) => st.topCounties.find((x) => x.name === n)!;
const harris = c('Harris County'), dallas = c('Dallas County'), bexar = c('Bexar County'), tarrant = c('Tarrant County');
const [hi1, hi2] = st.hi;
const lo1 = st.lo[0];

export default defineState({
  slug: 'texas',
  title: 'Homeowners Insurance Texas 2026: Premium by ZIP and County',
  description: `Homeowners insurance in Texas 2026: median premium per policy by ZIP code and county, 2018 to 2022, the 2021 freeze claims, TWIA and the Texas FAIR Plan.`,
  intro: `The median Texas ZIP code paid ${K.usd(st.prem[4])} per homeowners insurance policy in ${N.years[4]}, ranked ${st.rankPrem} of 51; Dallas and Tarrant counties rose fastest.`,
  resume: `Texas homeowners in the median ZIP code paid ${K.usd(st.prem[4])} per HO-3 or HO-5 policy in ${N.years[4]}, against ${K.usd(N.prem[4])} for the country, which ranks the state ${st.rankPrem} of 51 in the Treasury file. The figure covers ${K.num(st.zips)} ZIP codes in ${st.counties} counties, more counties than any other state. The statewide change after inflation was modest, ${K.sgn(st.chg)} from ${N.years[0]} to ${N.years[4]}, but the Dallas and Fort Worth area moved much faster: Dallas County ${K.sgn(dallas.chg ?? 0)} and Tarrant County ${K.sgn(tarrant.chg ?? 0)}. The worst year for insurers was ${N.years[3]}, the year of the February freeze, when paid claims reached ${K.dec(st.freqY[3] * 100, 1)} per 100 policies. Texas insurers did not report nonrenewals or cancellations to the data call, so those rates are missing here. The figures stop in ${N.years[4]}; at ${K.ppiMonth} prices the state median would be about ${K.usd(K.today(st.prem[4]))}.`,
  body: (h) => `
<h2>Houston against Dallas: two different markets</h2>
<p>Harris County, with ${harris.zips} ZIP codes in the file, had a median premium of ${K.usd(harris.prem)} in ${N.years[4]}, up ${K.sgn(harris.chg ?? 0)} after inflation since ${N.years[0]}. Dallas County was at ${K.usd(dallas.prem)} and Tarrant at ${K.usd(tarrant.prem)}, after rises of ${K.sgn(dallas.chg ?? 0)} and ${K.sgn(tarrant.chg ?? 0)}. North Texas has no hurricane season, but it has hail, and hail claims on roofs are what moved its premiums. Bexar County, around San Antonio, paid far less, ${K.usd(bexar.prem)}.</p>
${h.mini('state', { t: 'Texas against another state', p: ['sx', 'mine'], d: { sx: 'texas' } })}
<h2>The freeze year in the claims</h2>
<p>Paid claims per 100 policies ran between ${K.dec(Math.min(...st.freqY) * 100, 1)} and ${K.dec(st.freqY[2] * 100, 1)} in the other years, then jumped to ${K.dec(st.freqY[3] * 100, 1)} in ${N.years[3]}. Frozen and burst pipes in February ${N.years[3]} produced claims across the whole state at once. Insurers paid out ${K.pct(st.lrY[3], 0)} of the premium they wrote that year in losses, against ${K.pct(st.lrY[2], 0)} the year before. Over the five years, the average paid claim in Texas was ${K.usd(st.sev)}, ranked ${st.rankSev} of 51.</p>
<h2>What the data cannot show for Texas</h2>
<p>The Treasury report notes that Texas insurers did not provide nonrenewal data. The workbook's Texas nonrenewal and cancellation rates read zero, which we treat as not reported rather than as no nonrenewals. The nonrenewal calculator therefore shows "not reported" for Texas rather than a zero. Two other parts of the Texas market are outside the file entirely. The ${h.ext('https://www.twia.org', 'Texas Windstorm Insurance Association')} writes wind and hail coverage on the coast where private policies exclude it, and the ${h.ext('https://www.texasfairplan.org', 'Texas FAIR Plan Association')} writes homes that cannot find an admitted insurer. A Galveston or Corpus Christi owner who pays a TWIA premium on top of a private policy will see a total far above the ZIP code figure.</p>
<h2>Highest and lowest ZIP codes</h2>
<p>ZIP ${hi1.zip} in ${hi1.county} had the highest premium per policy, ${K.usd(hi1.prem)}, followed by ${hi2.zip} in ${hi2.county} at ${K.usd(hi2.prem)}: neighborhoods of large houses, where the dwelling limit, not the weather, explains the price. The lowest was ${lo1.zip} in ${lo1.county}, ${K.usd(lo1.prem)}, a coastal ZIP code where wind is often insured by TWIA rather than by the private policy. The cheapest tenth of Texas ZIP codes paid under ${K.usd(st.p10)}; the dearest tenth over ${K.usd(st.p90)}.</p>
<p>The ${h.ext('https://www.tdi.texas.gov', 'Texas Department of Insurance')} publishes its own market overview with later years, built from rate filings of the largest insurers; it is the place to look for ${N.years[4] + 1} and after. The ${h.a('hurricane-deductible', 'hurricane deductible calculator')} shows what a percentage wind deductible costs on a coastal claim.</p>
`,
  faqs: [
    { q: 'Why did home insurance in Dallas go up so much?', a: `Between ${N.years[0]} and ${N.years[4]}, the median ZIP code of Dallas County rose ${K.sgn(dallas.chg ?? 0)} after inflation, to ${K.usd(dallas.prem)} per policy. North Texas has frequent hail, which damages roofs across whole neighborhoods at once, and the ${N.years[3]} freeze added pipe claims. Insurers price those losses into renewals.` },
    { q: 'Are TWIA premiums included in the Texas figures?', a: `No. The Texas Windstorm Insurance Association is a residual market plan, and the Treasury data call excluded those plans. On the coast, where a private policy often excludes wind and hail, the real cost of insuring a home is the private premium plus the TWIA premium, so the ZIP code figure understates it.` },
    { q: 'How many Texas homeowners lose their policy each year?', a: `The Treasury data cannot say: Texas insurers did not report nonrenewals in the data call, as the report notes. For the country, the median ZIP code saw ${K.pct(N.nonren[4], 2)} of policies not renewed in ${N.years[4]}. The Texas Department of Insurance handles complaints about a nonrenewal notice.` },
  ],
  related: ['homeowners-insurance-by-state', 'hurricane-deductible', 'roof-claim-actual-cash-value', 'fair-plan-insurance'],
});
