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
  intro: `The median ZIP code paid ${K.usd(N.prem[4] / 12)} a month in ${N.years[4]}; carried with the price index, about ${K.usd(today / 12)} a month at ${K.ppiMonth} prices.`,
  resume: `Divided by twelve, the median homeowners premium per policy in the Treasury file was ${K.usd(N.prem[4] / 12)} a month in ${N.years[4]}. The BLS price index for homeowner's insurance has risen since, so the same coverage would cost about ${K.usd(today / 12)} a month at ${K.ppiMonth} prices, an estimate for the median ZIP code, not a quote. By state, the monthly figure runs from ${K.usd(low[0].prem[4] / 12)} in ${low[0].name} to ${K.usd(top[0].prem[4] / 12)} in ${top[0].name}. Most owners with a mortgage do not pay the insurer monthly: the servicer collects one-twelfth of the yearly premium in the escrow payment and pays the bill once a year. When the premium jumps at renewal, the escrow payment moves twice: once for the new premium, and once to repay the shortage the old payment left, which federal rules let the servicer spread over ${E.shortageMonths} months. A ${K.usd(600)} rise can add about ${K.usd(ex.firstYear)} a month in the first year.`,
  body: (h) => `
<h2>The monthly figure, state by state</h2>
<p>Insurers price homeowners coverage by the year, and many offer monthly installments for a small fee. The table turns the Treasury figures into monthly amounts so they can sit next to a mortgage payment. The figures at ${K.ppiMonth} prices raise the ${N.years[4]} median with the national price index of home insurance, the closest public estimate of today's level; local changes since ${N.years[4]} can be larger or smaller.</p>
${h.table(['State', `Per month at ${K.ppiMonth} prices`, `Per month in ${N.years[4]}`, `Dearest tenth of ZIP codes, at ${K.ppiMonth} prices, over`], rows, 'Treasury file, premium per policy of the middle ZIP code divided by 12; the national price index of home insurance (Bureau of Labor Statistics) for today\'s prices.', ['l', 'r', 'r', 'r'])}
<p>The dearest-tenth figures matter for buyers. Inside one state, the dearest ZIP codes can cost well above the middle: in ${spread.name}, the dearest tenth paid over ${K.dec(spread.p90 / spread.prem[4], 1)} times the state median in ${N.years[4]}, and those are often the places with water views or larger houses. The lookup on the ${h.a('home', 'home page')} gives the figure for one ZIP code.</p>
<h2>How escrow collects the premium</h2>
<p>Under Regulation X (${h.src('ecfr_escrow', '12 CFR 1024.17')}), a servicer may collect each month one-twelfth of the yearly escrow disbursements, insurance and property tax together, plus a cushion of no more than one-sixth of those disbursements over the year. Once a year it runs an escrow analysis: it projects the next twelve months of bills and compares them with what the account will hold. A premium that rose at renewal shows up there.</p>
${h.mini('escrow', { t: 'What a renewal increase does to the escrow payment', p: ['old', 'new'] })}
<h2>Why one increase is felt twice</h2>
<p>Take a premium going from ${K.usd(1800)} to ${K.usd(2400)}. The new monthly deposit is ${K.usd(ex.deposit)} higher, because ${K.usd(600)} divided by twelve is ${K.usd(50)}. But the insurer was already paid the new premium from an account that had been funded for the old one, so the account is short, and the cushion has to grow too. When the shortage equals one month's escrow payment or more, the servicer may ask for it in installments over at least ${E.shortageMonths} months. During that first year the payment can rise by up to ${K.usd(ex.firstYear)}; the year after, it settles back to the new deposit. Paying the shortage in one sum, when the servicer allows it, avoids the double step.</p>
<h2>Lowering the monthly amount</h2>
<p>The monthly cost follows the yearly premium, so the levers are the same: the deductible, the dwelling limit and the insurer. Raising the all-other-perils deductible from ${K.usd(1000)} to ${K.usd(2500)} lowers the premium on most policies, but the saving must be weighed against the extra you would carry on a claim. The dwelling limit should match the cost to rebuild, as explained on the ${h.a('how-much-dwelling-coverage', 'dwelling coverage page')}. Bundling with a car policy and paying the year in full usually earn discounts; monthly installments outside escrow often carry a fee.</p>
<h2>Per thousand dollars of coverage</h2>
<p>A monthly figure is easier to budget, but a rate per ${K.usd(1000)} of dwelling limit is easier to compare between two quotes for houses of different sizes. The calculator above gives it: divide the yearly premium by the dwelling limit and multiply by 1,000. Two quotes for the same house should be compared on the same limit, the same deductibles and the same roof settlement, since a cheaper quote that pays the roof at actual cash value is not the same product, as the ${h.a('roof-claim-actual-cash-value', 'roof claim page')} shows.</p>
<h2>Checking a quote against your ZIP code</h2>
<p>Enter the quoted premium in the lookup next to your ZIP code. The comparison uses the ${N.years[4]} figure carried to ${K.ppiMonth} prices. A quote within a few tens of percent of it is ordinary for the area. A quote at twice the ZIP figure is worth a question to the agent: a high dwelling limit, a low deductible, a past claim, a wood shake roof or an older electrical system can each explain part of it. The ZIP figure is an average of every house there, large and small, so it is a benchmark and not a target.</p>
<h2>What a lender requires</h2>
<p>A mortgage lender requires hazard coverage at least equal to the loan balance or the cost to rebuild, whichever its rules use, and names itself on the policy. If the policy lapses, the servicer can buy force-placed insurance and add it to the escrow payment; it protects the lender's interest and is usually much dearer. The ${h.a('home-insurance-non-renewal', 'nonrenewal page')} explains what to do if your insurer will not renew.</p>
`,
  faqs: [
    { open: true, q: 'Why did my mortgage payment go up when my insurance went up?', a: `The escrow account was funded for the old premium, so it ran short when the new one was paid. The servicer raises the monthly deposit for the new premium and, under 12 CFR 1024.17, may spread the shortage over at least ${E.shortageMonths} months, so the payment rises more in the first year than afterwards.` },
    { q: 'Is homeowners insurance paid monthly or yearly?', a: `The premium is set for a year. With a mortgage, the servicer usually collects one-twelfth each month in the escrow payment and pays the insurer once a year. Without escrow, insurers let you pay the year in full or in installments, often with a small fee for each installment.` },
    { q: 'How much is homeowners insurance a month on a 300,000 dollar house?', a: `There is no single price: the premium depends on the ZIP code, the cost to rebuild and the deductible. As a reference, the median ZIP code in the Treasury file paid ${K.usd(N.prem[4] / 12)} a month in ${N.years[4]}, about ${K.usd(today / 12)} at ${K.ppiMonth} prices. Use the lookup for your own ZIP code.` },
  ],
  tool: 'monthly',
  related: ['why-is-home-insurance-going-up', 'homeowners-insurance-by-state', 'how-much-dwelling-coverage', 'home-insurance-non-renewal'],
  sources: ['fio_data', 'bls_ppi', 'ecfr_escrow'],
});
