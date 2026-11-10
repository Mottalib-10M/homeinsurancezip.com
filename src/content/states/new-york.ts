import { defineState } from '../../lib/page-types';
import { ctx } from './_ctx';

const { K, N, st, c, regLink, planLink, hi, lo, yr } = ctx('new-york');
const suf = c('Suffolk County'), wes = c('Westchester County'), nas = c('Nassau County'), erie = c('Erie County');

export default defineState({
  slug: 'new-york',
  title: 'Homeowners Insurance New York 2026: Long Island vs Upstate',
  description: `Homeowners insurance in New York 2026: premium per policy by ZIP code and county, 2018 to 2022, Long Island, Westchester, Buffalo and upstate, the NYPIUA plan.`,
  intro: `New York's typical ZIP code paid ${K.usd(st.prem[4])} per homeowners insurance policy in ${yr(4)}, but Suffolk, Nassau and Westchester counties paid over ${K.usd(2500)}.`,
  resume: `New York has two homeowners insurance markets. Across its ${K.num(st.zips)} ZIP codes in the Treasury file, the typical paid ${K.usd(st.prem[4])} per policy in ${yr(4)}, ranked ${st.rankPrem} of the 50 states and DC and well below the national ${K.usd(N.prem[4])}, after a rise of ${K.sgn(st.chg)} after inflation. That typical figure is set by upstate, where Erie County, Buffalo, paid ${K.usd(erie.prem)}. Downstate suburbs pay more than twice as much: Suffolk County ${K.usd(suf.prem)}, Nassau ${K.usd(nas.prem)} and Westchester ${K.usd(wes.prem)}. The state's spread is one of the widest in the country, from under ${K.usd(st.p10)} for the cheapest tenth of ZIP codes to over ${K.usd(st.p90)} for the dearest, and the East End of Long Island tops it: ZIP ${hi[0].zip} paid ${K.usd(hi[0].prem)}. Insurers rarely declined to renew, ${K.rate(st.nonren[4])} in ${yr(4)}, ranked ${st.rankNonren} of the 50 states and DC. The New York Property Insurance Underwriting Association covers homes declined elsewhere. New York City ZIP codes are mostly condos and co-ops, insured on other forms. The data stop in ${yr(4)}.`,
  body: (h) => `
<h2>Long Island and Westchester</h2>
<p>Suffolk County had ${suf.zips} ZIP codes in the file, the most of any New York county, and a typical figure of ${K.usd(suf.prem)} in ${yr(4)}. Nassau paid ${K.usd(nas.prem)} and Westchester ${K.usd(wes.prem)}, both nearly flat after inflation. Two things drive those figures: house values, which set dwelling limits, and coastal storm exposure on Long Island. ZIP ${hi[0].zip} and ${hi[1].zip}, Sagaponack and Water Mill in the Hamptons, paid ${K.usd(hi[0].prem)} and ${K.usd(hi[1].prem)}. Many Long Island policies carry a percentage hurricane or windstorm deductible that applies after a hurricane warning.</p>
<p>A Long Island house with a hurricane deductible: the ${h.a('hurricane-deductible', 'hurricane deductible calculator')} runs it with your own figures.</p>
<h2>Upstate</h2>
<p>Erie County had ${erie.zips} ZIP codes and a typical figure of ${K.usd(erie.prem)}, up ${K.sgn(erie.chg ?? 0)} after inflation. The cheapest ZIP codes in the state were ${lo[0].zip} in ${lo[0].county} at ${K.usd(lo[0].prem)} and ${lo[1].zip} in ${lo[1].county}, Syracuse, at ${K.usd(lo[1].prem)}, among the lowest figures in the country. Upstate claims are mostly winter ones: snow load, ice dams and frozen pipes. The paid loss ratio of the typical ZIP code was low throughout, ${st.lrY.map((x) => K.pct(x, 0)).join(', ')} from ${yr(0)} to ${yr(4)}.</p>
<h2>New York City</h2>
<p>Most New York City households rent or own a condominium or co-op apartment, insured on HO-4 and HO-6 forms, and the city's ZIP codes contribute few standard homeowners policies to the file. A one-to-four family house in Queens or Staten Island is insured like any other house, and its ZIP code figure is in the lookup. Renters can size a policy with the ${h.a('renters-insurance-calculator', 'renters calculator')}.</p>
<h3>Renewals and the plan</h3>
<p>New York's typical nonrenewal rate stayed between ${K.rate(st.nonren[2])} and ${K.rate(st.nonren[0])} over the five years. In ${yr(4)} it was ${K.rate(st.nonren[4])}, well under the national typical figure, and cancellations for nonpayment ran at ${K.rate(st.npc)}. The ${planLink(0)} writes basic and broad dwelling fire policies for homes that cannot find a private insurer, many of them on Long Island. The ${regLink()} reviews complaints.</p>
`,
  faqs: [
    { q: 'How much is homeowners insurance on Long Island?', a: `The typical ZIP code of Suffolk County paid ${K.usd(suf.prem)} per policy in ${yr(4)}, and Nassau County ${K.usd(nas.prem)}, more than twice the New York typical figure of ${K.usd(st.prem[4])}. East End ZIP codes paid several times that. At ${K.ppiMonth} prices the Suffolk figure would be about ${K.usd(K.today(suf.prem))}.` },
    { q: 'Why is homeowners insurance cheap in upstate New York?', a: `Low losses and moderate house values. Erie County's typical ZIP code paid ${K.usd(erie.prem)} per policy in ${yr(4)}, and some upstate ZIP codes paid under ${K.usd(800)}. New York's paid loss ratio stayed near ${K.pct(st.lr, 0)} over ${yr(0)} to ${yr(4)}, below the national typical figure.` },
    { q: 'What is the New York Property Insurance Underwriting Association?', a: `It is New York's FAIR plan, listed in the Treasury report, writing basic and broad dwelling fire policies for property private insurers decline. Many of its policies are on Long Island. It does not include theft or liability like a homeowners policy, and its premiums are not in the Treasury figures.` },
  ],
  related: ['hurricane-deductible', 'renters-insurance-calculator', 'state:new-jersey', 'state:connecticut'],
});
