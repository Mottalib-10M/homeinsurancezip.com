import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const N = K.N;
const I = N.index;
const ppi1822 = K.idxGrowth(I.ppi, 2018, 2022);
const ppiNow = K.idxGrowth(I.ppi, 2022);
const cpi1822 = K.idxGrowth(I.cpi, 2018, 2022);
const cpiNow = K.idxGrowth(I.cpi, 2022);
const ppi2324 = K.idxGrowth(I.ppi, 2023, 2024);
const up = K.rank((s) => s.chg);
const down = [...up].reverse();
const lrUp = K.rank((s) => s.lrY[4] - s.lrY[0]);
const today = K.today(N.prem[4]);
const yrs = ['2022', '2023', '2024', '2025'].map((y) => [y, K.dec(I.ppi.annual[y], 1), K.sgn(I.ppi.annual[y] / I.ppi.annual['2022'] - 1), K.sgn(I.cpi.annual[y] / I.cpi.annual['2022'] - 1)]);

export default defineGuide({
  id: 'why-is-home-insurance-going-up', group: 'cost', order: 2, slug: 'why-is-home-insurance-going-up',
  nav: 'Why premiums rise', card: 'What drove premiums from 2018 to 2022, and the 2022 figure carried to today with the price index.',
  title: 'Home Insurance Going Up 2026: Premium Rise Since 2018',
  description: `Why home insurance is going up in 2026: claims, losses and rebuilding costs behind the 2018 to 2022 rise, and a calculator that carries a 2022 premium to today.`,
  h1: 'Why is home insurance going up?',
  intro: `The BLS price index for homeowner's insurance rose ${K.sgn(ppiNow)} from its ${N.years[4]} average to ${K.ppiMonth}, far faster than consumer prices.`,
  resume: `Homeowners insurance prices rose slowly until ${N.years[4]} and fast afterwards. In the Treasury file, the median ZIP code premium went from ${K.usd(N.prem[0])} in ${N.years[0]} to ${K.usd(N.prem[4])} in ${N.years[4]}, ${K.sgn(N.chg)} after inflation. Since the file ends there, the price index of the Bureau of Labor Statistics shows what came next: the index for homeowner's insurance climbed ${K.sgn(ppiNow)} from its ${N.years[4]} average to ${K.ppiMonth}, while consumer prices rose ${K.sgn(cpiNow)}. Carried with that index, the national median of ${N.years[4]} would be about ${K.usd(today)} today. The data point to losses as the driver: insurers paid out ${K.pct(N.lrY[0], 0)} of premium in claims in the median ZIP code in ${N.years[0]} and ${K.pct(N.lrY[4], 0)} in ${N.years[4]}. The Treasury report lists climate-related risk, inflation, the cost of rebuilding and reinsurance as the factors behind premiums. Rises were sharpest in ${up[0].name}, ${up[1].name} and ${up[2].name}.`,
  body: (h) => `
<h2>Two speeds: before and after ${N.years[4]}</h2>
<p>From ${N.years[0]} to ${N.years[4]}, the BLS producer price index for homeowner's insurance rose ${K.sgn(ppi1822)} in total, while consumer prices rose ${K.sgn(cpi1822)}. Insurance lagged general inflation in those years: premiums are set by filings that take months to approve, and a policy renews once a year. The catch-up came after. The index rose ${K.sgn(ppi2324)} between ${2023} and ${2024} alone, and it kept climbing in ${2025} and ${2026}.</p>
${h.table(['Year', 'PPI homeowner\'s insurance', 'Index change since 2022', 'Consumer prices since 2022'], yrs, 'BLS series PCU5241265241262 and CUUR0000SA0, yearly averages.', ['l', 'r', 'r', 'r'])}
<p>The index measures the price of comparable coverage, not the bill of one household. A bill can rise faster than the index when the insured value of the house is raised at renewal, or slower when a deductible goes up. That is why the calculator above asks for your premium today and compares it with the index path, not with your neighbor.</p>
<h2>Losses rose before premiums did</h2>
<p>The paid loss ratio is the share of premium an insurer pays back in claims in a year. In the median ZIP code it went from ${K.pct(N.lrY[0], 0)} in ${N.years[0]} to ${K.pct(N.lrY[4], 0)} in ${N.years[4]}, a slow climb nationally that hides sharp jumps locally. ${lrUp[0].name} went from ${K.pct(lrUp[0].lrY[0], 0)} to ${K.pct(lrUp[0].lrY[4], 0)}, ${lrUp[1].name} from ${K.pct(lrUp[1].lrY[0], 0)} to ${K.pct(lrUp[1].lrY[4], 0)}. The workbook's own definition says that sustained high paid loss ratios "may lead insurers to request rate increases, change policy terms and conditions, decide not to renew policies, or exit a market entirely". The order matters for homeowners: a bad year shows up in the claims first and in the premium one or two renewals later.</p>
${h.mini('rise', { t: 'Your 2022 premium at today\'s index', p: ['p22', 'now'] })}
<h2>Claims got more expensive, not only more frequent</h2>
<p>Nationally, the number of paid claims per 100 policies barely moved: ${K.dec(N.freqY[0] * 100, 1)} in ${N.years[0]}, ${K.dec(N.freqY[4] * 100, 1)} in ${N.years[4]}. What changed is the cost of each one. A roof, a kitchen or a frame repair after ${2021} cost more in labor and materials than the same work a few years earlier, and the five-year average claim in the median ZIP code was ${K.usd(N.sev)}. Insurers also buy reinsurance to cover their catastrophe years; the Treasury report names it among the costs behind premiums, and in exposed states that cost is spread over every policy.</p>
<h2>The insured value climbs on its own</h2>
<p>Many policies raise the dwelling limit at each renewal through an inflation guard or a new replacement cost estimate. The premium is roughly proportional to that limit, so a ten percent rise in the estimated cost to rebuild produces a similar rise in the bill even if the rate per thousand dollars has not changed. That part of the increase is not a price rise in the index sense: you are buying more coverage because the house costs more to rebuild. It is worth checking the new limit on the declarations page against a builder's or an appraiser's figure, since an estimate that runs ahead of real costs means paying for coverage you cannot use.</p>
<h2>Where premiums rose and where they fell</h2>
<p>The largest rises after inflation from ${N.years[0]} to ${N.years[4]} were in ${up.slice(0, 5).map((s) => `${s.name} (${K.sgn(s.chg)})`).join(', ')}. Hail on the Plains and wildfire in the West are common to that list. A handful of states fell: ${down.slice(0, 3).map((s) => `${s.name} (${K.sgn(s.chg)})`).join(', ')}. A fall is not always good news. In Florida, private insurers withdrew and many owners moved to the state plan, whose policies are not in the file, so the private market that remains is not the same set of houses. The ${h.a('homeowners-insurance-by-state', 'state ranking')} has every state.</p>
<h2>What you can act on</h2>
<p>The price trend of the whole market is not something a household controls. Three things are. The dwelling limit: an insurer that raises it at renewal raises the premium in proportion, and the ${h.a('how-much-dwelling-coverage', 'dwelling coverage page')} shows how to check that it matches the cost to rebuild, no more and no less. The deductible: a higher one lowers the premium, and in coastal states a percentage wind deductible already shifts much of the storm risk to you, as the ${h.a('hurricane-deductible', 'hurricane deductible calculator')} shows. And small claims, which can cost more in later surcharges than they pay, covered in ${h.a('should-i-file-a-home-insurance-claim', 'should I file a claim')}. If a renewal jumps far above the index path, quotes from other insurers are the test of whether the rise is the market or your policy.</p>
`,
  faqs: [
    { q: 'How much has home insurance gone up since 2022?', a: `The Bureau of Labor Statistics price index for homeowner's insurance rose ${K.sgn(ppiNow)} from its ${N.years[4]} average to ${K.ppiMonth}. Consumer prices rose ${K.sgn(cpiNow)} over the same period. Individual bills can differ a lot from the index, depending on the state, the insured value and any claim.` },
    { q: 'Will homeowners insurance keep going up in 2027?', a: `Nobody publishes a reliable forecast, and this site makes none. The drivers seen in the data, rising claim costs and loss ratios in catastrophe states, have not reversed. Your renewal notice states the new premium in advance; many states set a minimum notice period, ${K.P.florida.renewalNoticeDays} days in Florida.` },
    { q: 'Is my premium going up because of my claims or because of the market?', a: `Compare your increase with the index. If your premium rose about as much as the BLS index (${K.sgn(ppiNow)} since ${N.years[4]}), it is mostly the market. A rise well above it points to your own policy: a higher dwelling limit, a lost discount, a claim surcharge or a new insurer after a nonrenewal.` },
    { q: 'Why did my premium go up when I had no claims?', a: `Premiums are priced on the losses of everyone in your area and rating group, not only on your own history. When neighbors file hail or storm claims, rebuilding costs rise, or the insurer pays more for reinsurance, the rate for the whole territory goes up at the next filing, claim free or not.` },
  ],
  tool: 'rise',
  related: ['homeowners-insurance-by-state', 'homeowners-insurance-cost-per-month', 'home-insurance-non-renewal', 'how-much-dwelling-coverage'],
  sources: ['fio_data', 'fio_report', 'bls_ppi', 'bls_cpi'],
});
