import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const N = K.N;
const C = K.P.coinsurance;
const under = K.E.coinsurance({ replacementCost: 420000, limit: 300000, loss: 60000, deductible: 1000, share: C.defaultShare });
const ok = K.E.coinsurance({ replacementCost: 420000, limit: 340000, loss: 60000, deductible: 1000, share: C.defaultShare });
const sev = K.rank((s) => s.sev);
const ex = [0.6, 0.7, 0.8, 1].map((r) => { const x = K.E.coinsurance({ replacementCost: 400000, limit: 400000 * r, loss: 50000, deductible: 1000, share: C.defaultShare }); return [K.pct(r, 0), K.usd(400000 * r), K.usd(x.paid), K.usd(x.penalty)]; });

export default defineGuide({
  id: 'how-much-dwelling-coverage', group: 'policy', order: 7, slug: 'how-much-dwelling-coverage',
  nav: 'How much to insure the house for (the 80% rule)', card: 'How a dwelling limit below 80 percent of the rebuild cost cuts a partial claim, with the calculator.',
  title: 'Dwelling Coverage Calculator 2026: The 80% Rebuild Rule',
  description: `Dwelling coverage calculator 2026: how much Coverage A a house needs, what the 80 percent rule does to a partial claim, and why market value misleads.`,
  h1: 'How much dwelling coverage do you need?',
  intro: `With a ${K.usd(300000)} dwelling coverage limit on a house that costs ${K.usd(420000)} to rebuild, a ${K.usd(60000)} claim pays ${K.usd(under.paid)} instead of ${K.usd(ok.paid)}.`,
  resume: `Dwelling coverage, Coverage A, should equal what it would cost to rebuild the house, not its market value or the loan balance. The cost to rebuild excludes the land, but it includes demolition, current building code and local labor, which is why it can be well above or below a sale price. The limit matters even on small claims. Most homeowners forms pay replacement cost only when the limit is at least ${K.pct(C.defaultShare, 0)} of the full replacement cost; below that, a partial loss is paid in proportion. On a house costing ${K.usd(420000)} to rebuild, the line is ${K.usd(under.required)}. With a limit of ${K.usd(300000)}, a ${K.usd(60000)} kitchen fire pays ${K.usd(under.paid)} after the deductible instead of ${K.usd(ok.paid)}. Claims are large: the five-year average paid claim in the median ZIP code of the Treasury file was ${K.usd(N.sev)}, and above ${K.usd(sev[2].sev)} in ${sev[0].name}, ${sev[1].name} and ${sev[2].name}.`,
  body: (h) => `
<h2>Rebuild cost, market value and the loan</h2>
<p>Three numbers get confused. The market value is what the house and its land would sell for. The loan balance is what you owe. The replacement cost is what a contractor would charge to clear the site and rebuild the same house with materials of like kind and quality at today's prices and to today's code. Only the third belongs in Coverage A. In a city where land is most of the price, the rebuild cost can be far below the market value; in a rural area, or for an older house with plaster and detailed trim, it can be above it. Insurers estimate it with software from the square footage, construction and finishes, and that estimate is only as good as the description you gave.</p>
<h2>The replacement cost condition</h2>
<p>The loss settlement clause of most HO-3 and HO-5 forms works as follows, in our words. If the dwelling limit at the time of the loss is at least ${K.pct(C.defaultShare, 0)} of the full replacement cost, a covered loss is paid at replacement cost, up to the limit. If it is lower, the insurer pays the larger of the actual cash value of the damage or a share of the replacement cost equal to the limit divided by ${K.pct(C.defaultShare, 0)} of the replacement cost. The calculator models the second figure; the actual cash value alternative depends on the depreciation of the damaged parts, which only an adjuster sets.</p>
${h.table(['Limit as share of rebuild cost', 'Dwelling limit', 'Paid on a ' + K.usd(50000) + ' loss', 'Reduction'], ex, `House costing ${K.usd(400000)} to rebuild, ${K.usd(1000)} deductible, condition at ${K.pct(C.defaultShare, 0)}.`, ['l', 'r', 'r', 'r'])}
${h.mini('coins', { t: 'Check your limit against the rebuild cost', p: ['rc', 'lim', 'loss'] })}
<h2>Why limits fall behind</h2>
<p>A limit set when the house was bought drifts below the rebuild cost as construction costs rise, and the years after ${N.years[4]} saw fast increases in labor and materials. Many policies carry an inflation guard that raises the limit each year, and many insurers update their estimate at renewal. An addition, a finished basement or a new kitchen also raises the rebuild cost without changing the policy unless you report it. Every few years, and after any renovation, compare the limit with a fresh estimate: from the insurer's tool, an independent appraiser or a local builder's cost per square foot.</p>
<h2>Extended replacement cost</h2>
<p>Some insurers sell an endorsement that pays above the dwelling limit, often by 20 to 50 percent, when a total loss costs more to rebuild than expected, for example after a wildfire when every contractor in the region is busy. A few remove the cap altogether. These endorsements are worth asking about in wildfire and hurricane areas, where demand surges push rebuild costs up after a disaster. Ordinance or law coverage, which pays the extra cost of meeting current code, is a separate item and often limited to 10 percent of the dwelling limit unless you buy more.</p>
<h2>Too much dwelling coverage costs money too</h2>
<p>The premium is roughly proportional to the dwelling limit, so a limit far above the rebuild cost pays for coverage you can never use: the insurer pays at most what it costs to rebuild. A limit set at the market value in a high land-value area is the common case. Lenders sometimes ask for a limit equal to the loan; federal mortgage guidelines generally accept the replacement cost estimate instead, so a servicer's request for more is worth questioning.</p>
<h2>After a total loss</h2>
<p>When the house is destroyed, the dwelling limit is the ceiling of what the insurer pays for the structure, whatever the condition clause says. Debris removal is often paid within that limit, with a small extra amount in some forms, and the cost of temporary housing comes from loss of use, a separate limit. That is the moment when a limit set years ago shows its gap, and it is why a check every few years is worth the time.</p>
<h2>Other structures and contents follow</h2>
<p>Coverage B for detached structures and Coverage C for personal property are often set as a percentage of Coverage A, commonly 10 percent and 50 to 70 percent. Raising or lowering the dwelling limit moves them too. If the contents are worth more or less than that, ask for the percentage to be changed. Renters, who have no dwelling limit, size the contents limit from an inventory, as the ${h.a('renters-insurance-calculator', 'renters calculator')} does. For the cost of the premium itself by ZIP code, see the ${h.a('homeowners-insurance-by-state', 'state ranking')}.</p>
`,
  faqs: [
    { q: 'Should dwelling coverage equal the home value?', a: `No. It should equal the cost to rebuild the house at today's prices, which excludes the land and can be above or below the market value. Insuring at the market value in an expensive area means paying for coverage the insurer will never pay out, and in a cheap area it can leave you short.` },
    { q: 'What is the 80 percent rule in homeowners insurance?', a: `Most homeowners forms pay partial losses at full replacement cost only if the dwelling limit is at least ${K.pct(C.defaultShare, 0)} of the cost to rebuild. Below that line, the payment is reduced in proportion to how far the limit falls short, or limited to actual cash value. Check the loss settlement clause of your policy.` },
    { q: 'How often should I update my dwelling coverage?', a: `Check it at each renewal against the insurer's estimate, and get a fresh estimate after a renovation, an addition or a big rise in local building costs. An inflation guard endorsement raises the limit yearly, but it follows an index, not your house, so it can still drift away from the real rebuild cost.` },
  ],
  tool: 'coins',
  related: ['roof-claim-actual-cash-value', 'why-is-home-insurance-going-up', 'hurricane-deductible', 'renters-insurance-calculator'],
  sources: ['fio_data', 'fio_report'],
});
