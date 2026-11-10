import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const N = K.N;
const E = K.P.escrow;
const today = K.today(N.prem[4]);
const top = K.rank((s) => s.prem[4]);
const low = [...top].reverse();
const ex = K.E.escrowChange({ oldPremium: 1800, newPremium: 2400, otherYearly: 4200, cushionMax: E.cushionMax, months: E.shortageMonths });
const rows = [top[0], top[1], top[2], K.S('california'), K.S('new-york'), low[2], low[1], low[0]].map((s) => [s.name, K.usd(K.today(s.prem[4]) / 12), K.usd(s.prem[4] / 12), K.usd(K.today(s.p90) / 12)]);
// Écart entre le dixième le plus cher et le milieu de l'État, calculé (testeurs naïfs du 2026-11-09 : « three or four times » contredisait le tableau).
const spread = K.rank((s) => s.p90 / s.prem[4])[0];

export default defineGuide({
  id: 'homeowners-insurance-cost-per-month', group: 'cost', order: 4, slug: 'homeowners-insurance-cost-per-month',
  nav: 'Cost per month and escrow', card: 'The premium as a monthly amount, and what a renewal increase does to an escrow payment.',
  title: 'Homeowners Insurance Cost per Month 2026: Escrow and ZIP',
  description: `Homeowners insurance cost per month in 2026: the median ZIP code premium divided by twelve, by state, and what a renewal increase does to your escrow payment.`,
  h1: 'Homeowners insurance cost per month, and the escrow effect',
  intro: `Homeowners insurance costs about ${K.usd(today / 12)} a month in the typical U.S. ZIP code at ${K.ppiMonth} prices, an estimate built from the ${K.usd(N.prem[4] / 12)} a month owners really paid per policy in ${N.years[4]}.`,
  resume: `Divided by twelve, the typical homeowners premium per policy in the Treasury file was ${K.usd(N.prem[4] / 12)} a month in ${N.years[4]}. The BLS price index for homeowner's insurance has risen since, so the same coverage would cost about ${K.usd(today / 12)} a month at ${K.ppiMonth} prices, an estimate for the typical ZIP code, not a quote. By state, the monthly figure runs from ${K.usd(low[0].prem[4] / 12)} in ${low[0].name} to ${K.usd(top[0].prem[4] / 12)} in ${top[0].name}. Most owners with a mortgage do not pay the insurer monthly: the company that collects the mortgage payment (the servicer) puts one-twelfth of the yearly premium into an account it holds for the bills (escrow) and pays the bill once a year. When the premium jumps at renewal, the escrow payment moves twice: once for the new premium, and once to repay the shortage the old payment left, which federal rules let the servicer spread over ${E.shortageMonths} months. A ${K.usd(600)} rise can add about ${K.usd(ex.firstYear)} a month in the first year.`,
  body: (h) => `
<h2>Homeowners insurance cost per month, state by state</h2>
<p>Insurers price homeowners coverage by the year, and many let you pay in monthly installments for a small fee. The table turns the Treasury figures into monthly amounts so they can sit next to a mortgage payment. The first column is today's estimate: the ${N.years[4]} figure raised by the national price index of home insurance, the closest public measure of today's level. Local changes since ${N.years[4]} can be larger or smaller, so treat it as a benchmark, not a quote.</p>
${h.table(['State', `Per month at ${K.ppiMonth} prices (estimate)`, `Per month in ${N.years[4]}`, `Most expensive 10% of ZIP codes, at ${K.ppiMonth} prices, over`], rows, 'Treasury file, premium per policy of the middle ZIP code divided by 12; the national price index of home insurance (Bureau of Labor Statistics) for today\'s prices.', ['l', 'r', 'r', 'r'])}
<p>The most expensive tenth of ZIP codes matters for buyers. Inside one state, the dearest ZIP codes can cost well above the typical one: in ${spread.name}, the most expensive 10% paid over ${K.dec(spread.p90 / spread.prem[4], 1)} times the state's typical figure in ${N.years[4]}, and those are often the places with water views or larger houses. The lookup on the ${h.a('home', 'home page')} gives the figure for one ZIP code, and a premium somewhat above it is common for the area.</p>
<p>For a household budget, add the monthly insurance figure to the loan payment and the property tax: together they make the real monthly cost of owning the house.</p>
<h2>How escrow collects the premium, and why one increase is felt twice</h2>
<p>Most owners with a mortgage do not pay the insurer themselves. The company that collects the mortgage payment, called the servicer, adds one-twelfth of the yearly insurance and property tax bills to each monthly payment, keeps the money in an escrow account and pays the bills when they come. A federal rule (see Sources) also lets it keep a cushion of no more than one-sixth of those bills over the year. Once a year it checks the account against the next twelve months of bills, and that is where a higher premium shows up.</p>
${h.mini('escrow', { t: 'What a renewal increase does to your monthly mortgage payment', p: ['old', 'new', 'tax'] })}
<p>Take a premium going from ${K.usd(1800)} to ${K.usd(2400)}. The monthly deposit goes up by ${K.usd(ex.deposit)}, because ${K.usd(600)} divided by twelve is ${K.usd(50)}. But the insurer was already paid the new premium from an account funded for the old one, so the account is short, and the cushion has to grow too. When the shortfall equals one month's escrow payment or more, the servicer may spread it over at least ${E.shortageMonths} months. During that first year the payment can rise by up to ${K.usd(ex.firstYear)}; the year after, it settles back to the new deposit. Paying the shortfall in one sum, when the servicer allows it, avoids the double step.</p>
<h2>Lowering the monthly amount, and checking a quote</h2>
<p>The monthly cost follows the yearly premium, so the levers are the same: the deductible, the amount the house is insured for and the insurer. Raising the ordinary deductible (fire, theft and other losses) from ${K.usd(1000)} to ${K.usd(2500)} lowers the premium on most policies, but only makes sense if you could pay that amount after a loss. The amount insured should match the cost to rebuild, as explained on the ${h.a('how-much-dwelling-coverage', 'rebuild cost page')}. Insuring the car with the same company and paying the year in full usually earn discounts; monthly installments outside escrow often carry a fee.</p>
<p>To compare two quotes, use the price per ${K.usd(1000)} insured from the calculator above: the yearly premium divided by the amount insured, times 1,000. The lower number is the cheaper policy, provided both quotes have the same deductibles and pay the roof the same way, since a cheaper quote that pays an old roof at its value after wear is not the same product, as the ${h.a('roof-claim-actual-cash-value', 'roof claim page')} shows. A quote at twice your ZIP code's figure or more is worth a question to the agent: a high insured amount, a low deductible, a past claim or an older roof can each explain part of it. If your lender requires insurance and the policy lapses, the servicer can buy a policy for you and add it to the payment; it protects the lender and usually costs much more.</p>
`,
  faqs: [
    { open: true, q: 'Why did my mortgage payment go up when my insurance went up?', a: `The escrow account was funded for the old premium, so it ran short when the new one was paid. The company that collects your mortgage payment raises the monthly deposit for the new premium and, under the federal escrow rule, may spread the catch-up over at least ${E.shortageMonths} months, so the payment rises more in the first year than afterwards.` },
    { q: 'Is homeowners insurance paid monthly or yearly?', a: `The premium is set for a year. With a mortgage, the servicer usually collects one-twelfth each month in the escrow payment and pays the insurer once a year. Without escrow, insurers let you pay the year in full or in installments, often with a small fee for each installment.` },
    { q: 'How much is homeowners insurance a month on a 300,000 dollar house?', a: `There is no single price: the premium depends on the ZIP code, the cost to rebuild and the deductible. As a reference, the typical ZIP code in the Treasury file paid ${K.usd(N.prem[4] / 12)} a month in ${N.years[4]}, about ${K.usd(today / 12)} at ${K.ppiMonth} prices. Use the lookup for your own ZIP code.` },
  ],
  tool: 'monthly',
  related: ['why-is-home-insurance-going-up', 'homeowners-insurance-by-state', 'how-much-dwelling-coverage', 'home-insurance-non-renewal'],
  sources: ['fio_data', 'bls_ppi', 'ecfr_escrow'],
});
