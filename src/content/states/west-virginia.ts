import { defineState } from '../../lib/page-types';
import { ctx } from './_ctx';

const { K, N, st, c, regLink, planLink, hi, lo, yr } = ctx('west-virginia');
const kan = c('Kanawha County'), ral = c('Raleigh County'), fay = c('Fayette County'), logan = c('Logan County');

export default defineState({
  slug: 'west-virginia',
  title: 'Homeowners Insurance West Virginia 2026: Falling Premiums',
  description: `Homeowners insurance in West Virginia 2026: premium per policy by ZIP code and county, 2018 to 2022, Charleston, the southern coalfields and nonpayment.`,
  intro: `West Virginia's median ZIP code premium fell ${K.sgn(st.chg)} after inflation from ${yr(0)} to ${yr(4)}, to ${K.usd(st.prem[4])} per policy.`,
  resume: `West Virginia is one of only a handful of states where the median homeowners premium per policy fell after inflation in the Treasury file: from ${K.usd(st.prem[0])} in ${yr(0)} to ${K.usd(st.prem[4])} in ${yr(4)}, ${K.sgn(st.chg)}, ranked ${st.rankPrem} of 51 for level. Every large county fell: Kanawha County, Charleston, ${K.sgn(kan.chg ?? 0)} to ${K.usd(kan.prem)}; Raleigh County, Beckley, ${K.sgn(ral.chg ?? 0)}; Logan County ${K.sgn(logan.chg ?? 0)}. Insurers' losses were among the lowest in the country: paid claims of ${K.dec(st.freq * 100, 1)} per 100 policies a year, ranked ${st.rankFreq} of 51, and a paid loss ratio between ${K.pct(Math.min(...st.lrY), 0)} and ${K.pct(Math.max(...st.lrY), 0)}. The weak point is nonpayment: ${K.rate(st.npc)} of policies were cancelled for it, nearly double the national ${K.rate(N.npc)}. The range is narrow, from under ${K.usd(st.p10)} to over ${K.usd(st.p90)}. The West Virginia Essential Property Insurance Association writes homes declined elsewhere. Flood, the state's main disaster risk, is separate. The data stop in ${yr(4)}.`,
  body: (h) => `
<h2>Charleston and the southern counties</h2>
<p>Kanawha County had ${kan.zips} ZIP codes in the file and a median of ${K.usd(kan.prem)} in ${yr(4)}. Raleigh County paid ${K.usd(ral.prem)}, Fayette County ${K.usd(fay.prem)} and Logan County ${K.usd(logan.prem)}, after the steepest fall of the large counties, ${K.sgn(logan.chg ?? 0)}. Falling premiums in the southern coalfields may go with falling house values and a shrinking population; the premium per policy follows the dwelling limits of the houses insured.</p>
<h2>The highlands and Morgantown</h2>
<p>The dearest ZIP codes were in the mountain counties, ${hi[0].zip} in ${hi[0].county}, around Snowshoe, at ${K.usd(hi[0].prem)} and ${hi[1].zip} in ${hi[1].county} at ${K.usd(hi[1].prem)}. The cheapest were ${lo[0].zip} in ${lo[0].county}, near Morgantown, at ${K.usd(lo[0].prem)} and ${lo[1].zip} in ${lo[1].county} at ${K.usd(lo[1].prem)}. Mountain houses far from a fire station often pay more for that reason, since insurers rate the distance to the nearest station and hydrant.</p>
${h.mini('escrow', { t: 'Escrow or direct payment: a renewal increase', p: ['old', 'new'], d: { old: 1140, new: 1350, tax: 900 } })}
<h2>Nonpayment cancellations</h2>
<p>A policy cancelled for nonpayment leaves a gap that the next insurer asks about, and with a mortgage it brings force-placed coverage at a much higher price. West Virginia's rate, ${K.rate(st.npc)}, is one of the highest in the country. Paying through escrow spreads the premium over twelve mortgage payments, and federal rules let a servicer spread a shortage after a renewal increase over a year, as the calculator above shows. The ${h.a('homeowners-insurance-cost-per-month', 'monthly cost page')} explains it.</p>
<h2>Flood, the plan and the regulator</h2>
<p>West Virginia's worst disasters are floods, such as June 2016 in Greenbrier and Kanawha counties. Flood from rising water is excluded from homeowners policies and needs its own policy; it does not appear in these figures. Nonrenewals were low, ${K.rate(st.nonren[4])} in ${yr(4)}. The ${planLink(0)} writes a basic dwelling fire policy covering fire, lightning, wind and hail. The ${regLink()} handles complaints. Mine subsidence coverage, separate in some states, is required on West Virginia homeowners policies unless the owner waives it in writing.</p>
`,
  faqs: [
    { q: 'Why did home insurance get cheaper in West Virginia?', a: `After inflation, the median West Virginia ZIP code paid ${K.sgn(st.chg)} less per policy in ${yr(4)} than in ${yr(0)}, in the Treasury file. Losses were low, with paid loss ratios no higher than ${K.pct(Math.max(...st.lrY), 0)}, and in the southern counties falling house values may have lowered dwelling limits. Before the inflation adjustment, premiums still rose.` },
    { q: 'How much is homeowners insurance in Charleston, West Virginia?', a: `The median ZIP code of Kanawha County, which includes Charleston, paid ${K.usd(kan.prem)} per policy in ${yr(4)}, below the national median of ${K.usd(N.prem[4])}. At ${K.ppiMonth} prices, using the national BLS index, that is about ${K.usd(K.today(kan.prem))}. The lookup on the home page gives each ZIP code with its five years.` },
    { q: 'Is mine subsidence covered in West Virginia?', a: `West Virginia law makes mine subsidence coverage part of homeowners policies unless the owner rejects it in writing, with the risk reinsured by a state fund. It pays for damage from the ground sinking over old mines, up to its limit. Check your declarations page to see whether it was kept or waived.` },
  ],
  related: ['homeowners-insurance-cost-per-month', 'state:pennsylvania', 'state:kentucky', 'state:virginia'],
});
