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
const lrUp = K.rank((s) => s.lrY[4] - s.lrY[0]);
const today = K.today(N.prem[4]);
const yrs = [...['2022', '2023', '2024', '2025'].map((y) => [y, K.dec(I.ppi.annual[y], 1), K.sgn(I.ppi.annual[y] / I.ppi.annual['2022'] - 1), K.sgn(I.cpi.annual[y] / I.cpi.annual['2022'] - 1)]),
  [K.ppiMonth, K.dec(I.ppi.last.v, 1), K.sgn(I.ppi.last.v / I.ppi.annual['2022'] - 1), K.sgn(I.cpi.last.v / I.cpi.annual['2022'] - 1)]];

export default defineGuide({
  id: 'why-is-home-insurance-going-up', group: 'cost', order: 2, slug: 'why-is-home-insurance-going-up',
  nav: 'Why premiums rise', card: 'Why renewals jump, five things you can act on, and your own increase against the market.',
  title: 'Home Insurance Going Up 2026: Premium Rise Since 2018',
  description: `Why home insurance is going up in 2026: claims, losses and rebuilding costs behind the 2018 to 2022 rise, and a calculator that carries a 2022 premium to today.`,
  h1: 'Why is home insurance going up?',
  intro: `Four things push a renewal up: repairs cost more, insurers pay more for their own reinsurance, the insured value of your house is raised each year, and in some states insurers have left. Nationally, home insurance prices rose ${K.sgn(ppiNow)} from ${N.years[4]} to ${K.ppiMonth}.`,
  resume: `Homeowners insurance prices rose slowly until ${N.years[4]} and fast afterwards. In the Treasury file, the typical ZIP code premium went from ${K.usd(N.prem[0])} in ${N.years[0]} to ${K.usd(N.prem[4])} in ${N.years[4]}, ${K.sgn(N.chg)} after inflation. Since the file ends there, the price index of the Bureau of Labor Statistics shows what came next: the index for homeowner's insurance climbed ${K.sgn(ppiNow)} from its ${N.years[4]} average to ${K.ppiMonth}, while consumer prices rose ${K.sgn(cpiNow)}. Carried with that index, the national typical figure of ${N.years[4]} would be about ${K.usd(today)} today. The data point to losses as the driver: insurers paid out ${K.pct(N.lrY[0], 0)} of premium in claims in the typical ZIP code in ${N.years[0]} and ${K.pct(N.lrY[4], 0)} in ${N.years[4]}. The Treasury report lists climate-related risk, inflation, the cost of rebuilding and reinsurance as the factors behind premiums. Rises were sharpest in ${up[0].name}, ${up[1].name} and ${up[2].name}.`,
  body: (h) => `
<h2 id="act">What you can act on</h2><!--ouvert-->
<p>The price trend of the whole market is not something a household controls. These five things are, and each one has its calculator on this site:</p>
<ul>
<li><strong>Compare two quotes per ${K.usd(1000)} insured.</strong> Divide each yearly price by the amount the house is insured for and multiply by 1,000: the lower number is the cheaper policy. If your renewal jumped far above the market, quotes from other insurers for the same coverage tell you whether the rise is the market or your policy. The ${h.a('homeowners-insurance-cost-per-month', 'monthly cost calculator')} does the division.</li>
<li><strong>Check the amount the house is insured for.</strong> An insurer that raises it at renewal raises the premium in proportion. It should match the cost to rebuild, no more and no less: the ${h.a('how-much-dwelling-coverage', 'rebuild cost page')} shows how.</li>
<li><strong>Weigh a higher deductible.</strong> It lowers the premium, but only if you could pay it in cash after a loss. On the coast a storm deductible in percent may already be large, as the ${h.a('hurricane-deductible', 'hurricane deductible calculator')} shows.</li>
<li><strong>Think twice before a small claim.</strong> A claim close to the deductible can cost more in later price increases than it pays: ${h.a('should-i-file-a-home-insurance-claim', 'file a claim or not')}.</li>
<li><strong>Ask for the discounts.</strong> Insuring the car with the same company and paying the year in one go usually lower the price; a new roof often does too. Ask the agent which ones you do not have yet.</li>
</ul>
<p>If the premium is paid through your mortgage, the rise also moves the monthly payment for a year: the ${h.a('homeowners-insurance-cost-per-month', 'escrow calculator')} shows by how much.</p>
<h2>Home insurance going up at two speeds: before and after ${N.years[4]}</h2>
<p>From ${N.years[0]} to ${N.years[4]}, the government's price index of home insurance (Bureau of Labor Statistics) rose ${K.sgn(ppi1822)} in total, while everyday prices rose ${K.sgn(cpi1822)}. Insurance lagged in those years: insurers need state approval to raise rates, which takes months, and a policy renews only once a year. The catch-up came after. The index rose ${K.sgn(ppi2324)} between ${2023} and ${2024} alone, and it kept climbing in ${2025} and ${2026}.</p>
${h.table(['Year', 'Home insurance price index', 'Home insurance prices since 2022', 'Everyday prices since 2022'], yrs, `Bureau of Labor Statistics: price index of home insurance and consumer price index, yearly averages, then the latest month, ${K.ppiMonth}.`, ['l', 'r', 'r', 'r'])}
<p>Losses rose before premiums did. The paid loss ratio is the share of each premium dollar an insurer pays back in claims in a year: at 60 percent, it pays out 60 cents. In the middle ZIP code it went from ${K.pct(N.lrY[0], 0)} in ${N.years[0]} to ${K.pct(N.lrY[4], 0)} in ${N.years[4]}, a slow climb nationally that hides sharp jumps locally: ${lrUp[0].name} went from ${K.pct(lrUp[0].lrY[0], 0)} to ${K.pct(lrUp[0].lrY[4], 0)}. A bad year shows up in the claims first and in the premium one or two renewals later.</p>
<p>Claims also got more expensive, not more frequent. Paid claims per 100 policies barely moved, ${K.dec(N.freqY[0] * 100, 1)} in ${N.years[0]} and ${K.dec(N.freqY[4] * 100, 1)} in ${N.years[4]}, but a roof, a kitchen or a frame repair after ${2021} cost more in labor and materials than the same work a few years earlier; the average paid claim in the middle ZIP code was ${K.usd(N.sev)}. Insurers also buy reinsurance to cover their catastrophe years, and in exposed states that cost is spread over every policy.</p>
<h2>Why your own bill can rise faster than the market</h2>
<p>Many policies raise the amount the house is insured for at each renewal, through an automatic yearly increase or a new estimate of the cost to rebuild. The premium follows that amount, so a ten percent higher estimate produces a bill about ten percent higher even if the price per ${K.usd(1000)} has not changed. You are then buying more coverage because the house costs more to rebuild. Check the new amount on the first page of your policy against a builder's figure: an estimate that runs ahead of real costs means paying for coverage you cannot use.</p>
<p>Where you live matters as much. The largest rises after inflation from ${N.years[0]} to ${N.years[4]} were in ${up.slice(0, 3).map((s) => `${s.name} (${K.sgn(s.chg)})`).join(', ')}, places of hail on the Plains and wildfire in the West. A few states fell, but a fall is not always good news: in Florida, private insurers withdrew and many owners moved to the state-run insurer, whose policies are not in the data, so the homes that remain are not the same set. The calculator above compares your own increase with the national market since the year you choose; a gap of more than a few points is the moment to ask your agent what changed. The ${h.a('homeowners-insurance-by-state', 'state ranking')} has every state.</p>
`,
  faqs: [
    { open: true, q: 'Why did my premium go up when I had no claims?', a: `Premiums are priced on the losses of everyone with a similar home in your area, not only on your own history. When neighbors file hail or storm claims, rebuilding costs rise, or the insurer pays more for reinsurance, the price for the whole area goes up at the next rate change, claim free or not.` },
    { q: 'How much has home insurance gone up since 2022?', a: `The Bureau of Labor Statistics price index for homeowner's insurance rose ${K.sgn(ppiNow)} from its ${N.years[4]} average to ${K.ppiMonth}. Consumer prices rose ${K.sgn(cpiNow)} over the same period. Individual bills can differ a lot from the index, depending on the state, the insured value and any claim.` },
    { q: 'Is my premium going up because of my claims or because of the market?', a: `Compare your increase with the index. If your premium rose about as much as the BLS index (${K.sgn(ppiNow)} since ${N.years[4]}), it is mostly the market. A rise well above it points to your own policy: a higher dwelling limit, a lost discount, a claim surcharge or a new insurer after a nonrenewal.` },
  ],
  tool: 'rise',
  related: ['homeowners-insurance-by-state', 'homeowners-insurance-cost-per-month', 'home-insurance-non-renewal', 'how-much-dwelling-coverage'],
  sources: ['fio_data', 'fio_report', 'bls_ppi', 'bls_cpi'],
});
