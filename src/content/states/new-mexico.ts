import { defineState } from '../../lib/page-types';
import { ctx } from './_ctx';

const { K, N, st, c, regLink, planLink, hi, lo, yr } = ctx('new-mexico');
const ber = c('Bernalillo County'), rio = c('Rio Arriba County'), dona = c('Doña Ana County'), san = c('Sandoval County');

export default defineState({
  slug: 'new-mexico',
  title: 'Homeowners Insurance New Mexico 2026: Albuquerque and Taos',
  description: `Homeowners insurance in New Mexico 2026: premium per policy by ZIP code and county, 2018 to 2022, Albuquerque, Las Cruces, the northern mountains and wildfire.`,
  intro: `New Mexico's median ZIP code paid ${K.usd(st.prem[4])} per policy in ${yr(4)}; Bernalillo County, Albuquerque, paid less, ${K.usd(ber.prem)}.`,
  resume: `New Mexico homeowners paid ${K.usd(st.prem[4])} per policy in the median ZIP code in ${yr(4)} in the Treasury file, ranked ${st.rankPrem} of 51 and a little below the national ${K.usd(N.prem[4])}, after a rise of ${K.sgn(st.chg)} after inflation. Cities pay less than the mountains. Bernalillo County, Albuquerque, paid ${K.usd(ber.prem)} and Doña Ana County, Las Cruces, ${K.usd(dona.prem)}, while Rio Arriba County in the north paid ${K.usd(rio.prem)}. The dearest ZIP codes were in the Sangre de Cristo range, ${hi[0].zip} in San Miguel County at ${K.usd(hi[0].prem)} and ${hi[1].zip} in Taos County at ${K.usd(hi[1].prem)}. Wildfire is the risk behind those figures, and the ${yr(4)} Hermits Peak and Calf Canyon fire, the largest in state history, burned in that area. Claims were average in number and size. Nonrenewals rose to ${K.rate(st.nonren[4])} in ${yr(4)}. New Mexico's FAIR plan writes a basic dwelling fire policy. The data stop in ${yr(4)}.`,
  body: (h) => `
<h2>Albuquerque, Rio Rancho and Las Cruces</h2>
<p>Bernalillo County had ${ber.zips} ZIP codes in the file and a median of ${K.usd(ber.prem)} in ${yr(4)}, up ${K.sgn(ber.chg ?? 0)} after inflation. Sandoval County, with Rio Rancho, paid ${K.usd(san.prem)}, and Doña Ana County ${K.usd(dona.prem)}. Hail along the Rio Grande corridor and wind are the usual urban claims. The cheapest ZIP codes in the state were in Grant County in the southwest, ${lo[0].zip} at ${K.usd(lo[0].prem)} and ${lo[1].zip} at ${K.usd(lo[1].prem)}.</p>
<h2>The northern mountains</h2>
<p>Rio Arriba County paid ${K.usd(rio.prem)}, flat at ${K.sgn(rio.chg ?? 0)} after inflation, an unusual pause for a wildfire area that may reflect insurers writing fewer of its most exposed homes. ZIP ${hi[0].zip} and ${hi[1].zip} paid ${K.usd(hi[0].prem)} and ${K.usd(hi[1].prem)}. The Hermits Peak and Calf Canyon fire of spring ${yr(4)} destroyed hundreds of homes in Mora and San Miguel counties; it was started by federal prescribed burns, and Congress set up a separate compensation fund for its victims, outside the insurance system. The state's range, from under ${K.usd(st.p10)} for the cheapest tenth of ZIP codes to over ${K.usd(st.p90)} for the dearest, is one of the wider ones.</p>
${h.mini('coins', { t: 'A mountain home: is the limit enough after a fire?', p: ['rc', 'lim', 'loss'], d: { rc: 380000, lim: 280000, loss: 380000 } })}
<h2>Claims and the policy</h2>
<p>Paid claims ran at ${K.dec(st.freq * 100, 1)} per 100 policies a year, ranked ${st.rankFreq} of 51, at ${K.usd(st.sev)} on average. After a total loss by fire, the dwelling limit is the ceiling of the payment, so a limit set years ago can fall short of rebuild costs that rise after a disaster. The calculator above shows how much a limit below the cost to rebuild leaves uncovered; the ${h.a('how-much-dwelling-coverage', 'dwelling coverage page')} explains the rule.</p>
<h2>Renewals and the FAIR plan</h2>
<p>The median nonrenewal rate went ${st.nonren.map((x) => K.rate(x)).join(', ')} from ${yr(0)} to ${yr(4)}. ${planLink(0)} writes a basic dwelling fire policy covering fire, lightning, windstorm and hail for homes that cannot find a private insurer. The ${regLink()} handles complaints.</p>
`,
  faqs: [
    { q: 'How much is homeowners insurance in Albuquerque?', a: `The median ZIP code of Bernalillo County, which includes Albuquerque, paid ${K.usd(ber.prem)} per policy in ${yr(4)}, below the New Mexico median of ${K.usd(st.prem[4])}. At ${K.ppiMonth} prices that is about ${K.usd(K.today(ber.prem))}. Foothill ZIP codes paid more than the valley ones.` },
    { q: 'Did homeowners insurance pay for the Hermits Peak fire?', a: `Insured homes were covered by their homeowners policies for fire, up to their limits. Because the fire was started by federal prescribed burns, Congress also created a separate federal claims office to compensate victims, including uninsured losses. A claim to that office is filed separately from any insurance claim.` },
    { q: 'Why is home insurance so high near Taos?', a: `Wildfire risk in forested mountain areas and higher-value homes. ZIP ${hi[1].zip} in Taos County paid ${K.usd(hi[1].prem)} per policy in ${yr(4)}, against ${K.usd(st.prem[4])} for the median New Mexico ZIP code. Defensible space and a fire-resistant roof can help with both price and renewal.` },
  ],
  related: ['how-much-dwelling-coverage', 'home-insurance-non-renewal', 'state:arizona', 'state:colorado'],
});
