import { defineState } from '../../lib/page-types';
import { ctx } from './_ctx';

const { K, N, st, c, regLink, planLink, hi, lo, yr } = ctx('virginia');
const fx = c('Fairfax County'), aug = c('Augusta County'), lou = c('Loudoun County'), roc = c('Rockingham County');

export default defineState({
  slug: 'virginia',
  title: 'Homeowners Insurance Virginia 2026: NoVA to the Valley',
  description: `Homeowners insurance in Virginia 2026: premium per policy by ZIP code and county, 2018 to 2022, Fairfax, Loudoun, the Shenandoah Valley and nonrenewals.`,
  intro: `Virginia homeowners insurers declined to renew ${K.rate(st.nonren[4])} of policies in the typical ZIP code in ${yr(4)}, ranked ${st.rankNonren} of the 50 states and DC; premiums stayed below average.`,
  resume: `Virginia's typical homeowners premium per policy was ${K.usd(st.prem[4])} in ${yr(4)} in the Treasury file, ranked ${st.rankPrem} of the 50 states and DC and below the national ${K.usd(N.prem[4])}, after a rise of ${K.sgn(st.chg)} after inflation from ${yr(0)}. Renewals got harder: the typical nonrenewal rate went from ${K.rate(st.nonren[0])} in ${yr(0)} to ${K.rate(st.nonren[4])} in ${yr(4)}, ranked ${st.rankNonren} of the 50 states and DC, high for a state with modest losses. Insurers paid out ${K.pct(st.lrY[0], 0)} of premium in claims in ${yr(0)}, a year of record rain and of Hurricane Michael's winds as it crossed the state, then ${K.pct(st.lrY[4], 0)} in ${yr(4)}. Northern Virginia pays more: Fairfax County ${K.usd(fx.prem)}, Loudoun ${K.usd(lou.prem)}, with Loudoun's ZIP ${hi[0].zip} in hunt country the dearest in the state at ${K.usd(hi[0].prem)}. The Shenandoah Valley is among the cheapest: Augusta County ${K.usd(aug.prem)}. The Virginia Property Insurance Association covers homes declined elsewhere. The data stop in ${yr(4)}.`,
  body: (h) => `
<h2>Northern Virginia</h2>
<p>Fairfax County had ${fx.zips} ZIP codes in the file and a typical figure of ${K.usd(fx.prem)} in ${yr(4)}, up ${K.sgn(fx.chg ?? 0)} after inflation. Loudoun County paid ${K.usd(lou.prem)} after ${K.sgn(lou.chg ?? 0)}. ZIP ${hi[0].zip}, Upperville, paid ${K.usd(hi[0].prem)}, and ${hi[1].zip} in ${hi[1].county}, McLean, ${K.usd(hi[1].prem)}. High house values set the dwelling limits here, and the dwelling limit, more than the weather, drives the premium per policy.</p>
<h2>The Valley and the southwest</h2>
<p>Augusta County paid ${K.usd(aug.prem)}, and its ZIP ${lo[0].zip} was the cheapest in the state at ${K.usd(lo[0].prem)}; Rockingham County, Harrisonburg, paid ${K.usd(roc.prem)}. ZIP ${lo[1].zip} in ${lo[1].county}, in the southwest, paid ${K.usd(lo[1].prem)}. The cheapest tenth of Virginia ZIP codes paid under ${K.usd(st.p10)}, the dearest over ${K.usd(st.p90)}. Older farmhouses in the Valley can cost more to rebuild than to buy, so the dwelling limit deserves a check against a builder's estimate, as the ${h.a('how-much-dwelling-coverage', 'dwelling coverage page')} explains.</p>
<p>Virginia, odds of a nonrenewal ahead: the ${h.a('home-insurance-non-renewal', 'nonrenewal calculator')} runs it with your own figures.</p>
<h2>Nonrenewals rose, losses did not</h2>
<p>The typical nonrenewal rate went ${st.nonren.map((x) => K.rate(x)).join(', ')} from ${yr(0)} to ${yr(4)}, and in ${K.pct(st.highNonren, 0)} of the state's ZIP codes the ${yr(4)} rate was above the national top-tenth line. Over the same years paid claims fell from ${K.dec(st.freqY[0] * 100, 1)} per 100 policies to ${K.dec(st.freqY[4] * 100, 1)}, and the loss ratio from ${K.pct(st.lrY[0], 0)} to ${K.pct(st.lrY[4], 0)}. Rising nonrenewals with falling losses usually mean insurers tightening rules, on roof age or coastal exposure in Hampton Roads, rather than reacting to one bad year. The ${h.a('home-insurance-non-renewal', 'nonrenewal page')} explains what to do with a notice.</p>
<h3>Hampton Roads and the plan of last resort</h3>
<p>The Norfolk, Virginia Beach and Hampton area faces hurricanes and nor'easters, and many policies there carry a percentage hurricane deductible; recurrent tidal flooding is a separate flood matter. The ${planLink(0)} writes basic and broad dwelling fire forms for homes that cannot find a private insurer. The ${regLink()}, part of the State Corporation Commission, handles complaints and publishes premium comparison guides.</p>
`,
  faqs: [
    { q: 'How much is homeowners insurance in Fairfax County?', a: `The typical ZIP code of Fairfax County paid ${K.usd(fx.prem)} per policy in ${yr(4)}, after a rise of ${K.sgn(fx.chg ?? 0)} after inflation from ${yr(0)}, above the Virginia typical figure of ${K.usd(st.prem[4])}. At ${K.ppiMonth} prices that is about ${K.usd(K.today(fx.prem))}. The lookup on the home page gives each ZIP code with its five years.` },
    { q: 'Why are Virginia homeowners getting nonrenewal notices?', a: `The typical Virginia nonrenewal rate rose from ${K.rate(st.nonren[0])} in ${yr(0)} to ${K.rate(st.nonren[4])} in ${yr(4)} in the Treasury file, while losses fell. The data give no reasons; insurers commonly cite roof age, claims history and coastal exposure. Ask for the reason in writing and shop other insurers early.` },
    { q: 'What is the Virginia Property Insurance Association?', a: `It is Virginia's FAIR plan, listed in the Treasury report, writing basic and broad dwelling fire forms for property that private insurers decline. Those forms are narrower than a homeowners policy and leave out theft and liability. Its policies are not part of the Treasury premium figures.` },
  ],
  related: ['home-insurance-non-renewal', 'hurricane-deductible', 'state:maryland', 'state:north-carolina'],
});
