import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const N = K.N;
const freq = K.rank((s) => s.freq);
const ex = K.E.roofClaim({ cost: 16000, age: 12, life: 25, deductible: 2500 });
const ages = [5, 10, 15, 20, 25].map((a) => { const r = K.E.roofClaim({ cost: 16000, age: a, life: 25, deductible: 2500 }); return [`${a} years`, K.pct(r.left, 0), K.usd(r.rcv), K.usd(r.acv)]; });
const ne = K.S('nebraska'), sd = K.S('south-dakota'), mn = K.S('minnesota'), co = K.S('colorado');

export default defineGuide({
  id: 'roof-claim-actual-cash-value', group: 'policy', order: 6, slug: 'roof-claim-actual-cash-value',
  nav: 'Roof claims: today\'s value or full replacement', card: 'What an older roof is paid after hail or wind at actual cash value, against replacement cost.',
  title: 'Roof Claim Actual Cash Value 2026: Payout by Roof Age',
  description: `Roof claim at actual cash value in 2026: what a hail or wind claim pays on an older roof against replacement cost, by roof age, with hail states' claim rates.`,
  h1: 'Roof claim at actual cash value: what an older roof is paid',
  intro: `A ${K.usd(16000)} roof that is 12 years into a 25-year life is paid ${K.usd(ex.acv)} at actual cash value after a ${K.usd(2500)} deductible, against ${K.usd(ex.rcv)} at replacement cost.`,
  resume: `More and more homeowners policies settle the roof at actual cash value, the cost to replace it minus depreciation for its age, instead of replacement cost. The difference is large on an older roof. Take a roof that would cost ${K.usd(16000)} to replace, with a 25-year expected life, and a ${K.usd(2500)} deductible. At replacement cost the claim pays ${K.usd(ex.rcv)}. At actual cash value, 12 years in, about half its value is gone and the claim pays ${K.usd(ex.acv)}, leaving a gap of ${K.usd(ex.gap)}. At 20 years it pays almost nothing. Roof claims weigh most where hail is frequent: the Treasury file counts ${K.dec(freq[0].freq * 100, 1)} paid claims per 100 policies a year in ${freq[0].name} and ${K.dec(freq[2].freq * 100, 1)} in ${freq[2].name}, against ${K.dec(N.freq * 100, 1)} in the median ZIP code. The calculator uses straight-line depreciation; your insurer may use its own schedule, printed in the policy or an endorsement.`,
  body: (h) => `
<h2>Actual cash value or replacement cost: two ways to settle a roof</h2>
<p>Replacement cost pays what it costs to put on a new roof of like kind and quality, less the deductible. Actual cash value pays the replacement cost minus depreciation, the share of the roof's useful life already used, less the deductible. Many standard policies pay replacement cost on the dwelling but allow an endorsement, sometimes called a roof surfacing payment schedule, that switches the roof alone to actual cash value or to a schedule by age and material. Insurers have used these endorsements more as hail claims have grown, and some will only write an older roof on those terms.</p>
${h.table(['Age of roof', 'Value left', 'Paid at replacement cost', 'Paid at actual cash value'], ages, `Roof costing ${K.usd(16000)} to replace, 25-year expected life, ${K.usd(2500)} deductible, straight-line depreciation.`, ['l', 'r', 'r', 'r'])}
<p>The table shows why the age of the roof is often the first question an insurer asks. Past the middle of its life, an actual cash value roof pays less than half of the replacement cost, and near the end the deductible takes everything.</p>
${h.mini('roof', { t: 'Your roof: age, cost and deductible', p: ['c', 'age', 'd'] })}
<h2>Where roof claims are most frequent</h2>
<p>The Treasury file does not split claims by cause, but the states with the most paid claims per policy are the hail states. Over ${N.years[0]} to ${N.years[4]}, ${freq.slice(0, 5).map((s) => `${s.name} (${K.dec(s.freq * 100, 1)})`).join(', ')} had the highest median rates per 100 policies a year. Single bad years stand out: ${sd.name} went to ${K.dec(sd.freqY[4] * 100, 1)} claims per 100 policies in ${N.years[4]} and ${mn.name} to ${K.dec(mn.freqY[4] * 100, 1)}, against ${K.dec(sd.freqY[3] * 100, 1)} and ${K.dec(mn.freqY[3] * 100, 1)} the year before. ${ne.name}'s paid loss ratio that year was ${K.pct(ne.lrY[4], 0)}, up from ${K.pct(ne.lrY[3], 0)}. Those are the markets where roof schedules and percentage wind and hail deductibles spread first.</p>
<h2>What sets the expected life</h2>
<p>The depreciation depends on the life the insurer gives the material. Three-tab asphalt shingles are often given about 20 years, architectural shingles 25 to 30, metal and tile much longer, and wood shakes less in wildfire and hail country. A roof schedule endorsement may skip the arithmetic and print a percentage by age band: for example full payment up to ten years, then a falling share. The calculator lets you enter the life your policy uses. If the policy is silent, the adjuster's estimate will state the depreciation applied, and you can ask how it was set and dispute it with a roofer's report on the real condition of the roof.</p>
<h2>The deductible on top</h2>
<p>Depreciation and deductible stack. Where a percentage wind and hail deductible applies, 1 or 2 percent of the dwelling limit, the deductible on a ${K.usd(350000)} house is ${K.usd(3500)} to ${K.usd(7000)}, and an older roof on actual cash value can be worth less than that. The ${h.a('hurricane-deductible', 'hurricane and wind deductible page')} shows how those percentages work.</p>
<h2>Recoverable depreciation</h2>
<p>A replacement cost policy often pays in two steps. First the actual cash value, then the withheld depreciation once the roof has been replaced and the invoice sent, usually within a time limit stated in the policy. That is different from an actual cash value roof, where the depreciation is never paid. Read the loss settlement section: the words "recoverable depreciation" or "holdback" mean the first case. If you do not replace the roof, a replacement cost policy will usually pay only the actual cash value.</p>
<h2>Cosmetic damage and matching</h2>
<p>Some endorsements exclude cosmetic hail damage to metal roofs, dents that do not let water in. Others limit what the insurer owes when undamaged parts of the roof no longer match the repaired section. These clauses vary by insurer and state, and they can matter more than depreciation after a hailstorm. Ask for them in writing when you compare quotes.</p>
<h2>Deciding what to do with an older roof</h2>
<p>An old roof on actual cash value is close to uninsured for wind and hail, so the choice is between replacing it, which often lowers the premium and restores replacement cost, or setting money aside for the gap. In ${co.name}, where hail claims are common, a newer impact-resistant roof can also earn a discount with many insurers. If the insurer will not renew because of the roof, the ${h.a('home-insurance-non-renewal', 'nonrenewal page')} explains your notice rights, and the ${h.a('should-i-file-a-home-insurance-claim', 'claim calculator')} helps decide whether a small roof repair is worth a claim at all. For the cost of the work itself, ask two roofers for written estimates.</p>
`,
  faqs: [
    { q: 'How is roof depreciation calculated on an insurance claim?', a: `Insurers usually divide the roof's age by its expected life for the material and apply that share to the replacement cost. A roof 12 years into a 25-year life is depreciated by about 48 percent. Some policies use a printed schedule by age and material instead; the endorsement on your declarations page names it.` },
    { q: 'Can my insurer switch my roof to actual cash value?', a: `Insurers can change terms at renewal, with the notice your state requires, and many now offer roof coverage on older roofs only at actual cash value or on a schedule. The change appears as an endorsement on the renewal declarations. You can shop for an insurer that still pays replacement cost, often at a higher premium.` },
    { q: 'Is a roof claim worth filing if the roof is old?', a: `At actual cash value, an old roof may be worth less than the deductible, so the claim pays nothing and can still count on your claims history. Run the figures in the calculator first. With a replacement cost policy, the claim is usually worth it if the damage clearly exceeds the deductible.` },
  ],
  tool: 'roof',
  related: ['hurricane-deductible', 'should-i-file-a-home-insurance-claim', 'how-much-dwelling-coverage', 'home-insurance-non-renewal'],
  sources: ['fio_data', 'fio_report'],
});
