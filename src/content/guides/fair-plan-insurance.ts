import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import REG from '../../data/regulators.json';

const N = K.N;
const F = K.P.florida;
type Plan = { name: string; url: string; writes: string };
const R = REG as unknown as Record<string, { regulator: string; url: string; plans: Plan[] }>;
const withPlan = K.STATES.filter((s) => R[s.code].plans.length);
const without = K.STATES.filter((s) => !R[s.code].plans.length);
const rows = withPlan.flatMap((s) => R[s.code].plans.map((p) => [s.name, p.url ? `<a href="${p.url}" target="_blank" rel="nofollow noopener noreferrer">${p.name}</a>` : p.name, p.writes]));
const ex = K.E.citizensTest({ citizens: 3200, privateOffer: 3700, margin: F.citizensMargin });
const fl = K.S('florida'), ca = K.S('california'), la = K.S('louisiana');

export default defineGuide({
  id: 'fair-plan-insurance', group: 'cost', order: 8, slug: 'fair-plan-insurance',
  nav: 'FAIR plans and Citizens', card: 'The insurer of last resort in each state, what it covers, and the Florida Citizens 20 percent rule.',
  title: 'FAIR Plan Insurance 2026: Last-Resort Home Cover by State',
  description: `FAIR plan insurance in 2026: the last-resort home insurer of each state, what its policy covers and leaves out, and the Florida Citizens 20 percent rule.`,
  h1: 'FAIR plan insurance: the insurer of last resort, state by state',
  intro: `${withPlan.length - 1} states and the District of Columbia have a residual market plan for homes; Florida and Louisiana run theirs as Citizens corporations.`,
  resume: `A FAIR plan, a beach or windstorm plan, or a Citizens corporation insures homes that no admitted private insurer will take. The Treasury report lists such a plan in ${withPlan.length - 1} states and the District of Columbia; ${without.length} states have none for homes. Most FAIR plans write a narrow dwelling fire policy covering fire, lightning and often wind and hail, without theft, liability or water damage, so owners add a separate policy for the rest. Coastal pools such as the Texas Windstorm Insurance Association write wind and hail only. Florida's Citizens Property Insurance Corporation writes full homeowners policies, but the law keeps it a last resort: a primary residence offered comparable coverage by a private insurer at no more than ${K.pct(F.citizensMargin, 0)} above the Citizens premium is not eligible. With Citizens at ${K.usd(3200)}, an offer of ${K.usd(3700)} is ${K.pct(ex.over, 0)} higher, so the owner must take it. These plans are not in the Treasury premium file, which covers admitted insurers only.`,
  body: (h) => `
<h2>Why these plans exist</h2>
<p>Where a state has a residual market plan, the insurers writing homeowners coverage there must take part in it: if a home cannot find coverage, the plan they fund offers something. The first FAIR plans, for Fair Access to Insurance Requirements, were set up in the late 1960s for city neighborhoods that insurers avoided. Today they mostly serve homes in wildfire, hurricane and hail areas, older homes and homes with past claims. Their size goes up when the private market pulls back, which is why the ${h.a('home-insurance-non-renewal', 'nonrenewal rates')} of an area are the early sign.</p>
<h2>Every plan the Treasury report lists</h2>
<p>The table follows the appendix of the Treasury report. The descriptions are ours, in short; each plan's site gives its forms, limits and eligibility rules. Where no link is given, the plan's own site could not be reached when this page was built: the state insurance department, linked from each state page, has the contact.</p>
${h.table(['State', 'Plan', 'What it writes'], rows, 'Residual market plans for homes named in the appendix of the Treasury report (January 2025). Descriptions summarized from the report and the plans.', ['l', 'l', 'l'])}
<h2>What a FAIR plan policy leaves out</h2>
<p>A basic dwelling fire policy covers the named perils and nothing else. Theft, personal liability, water from a burst pipe and loss of use are usually missing, and the limits can be lower than the cost to rebuild. Owners commonly buy a "difference in conditions" policy from a private insurer to fill the gaps; in California this pairing is the usual answer for homes in wildfire zones where the FAIR plan covers fire and a second policy covers the rest. The premium of the FAIR plan plus the second policy is the real cost of insuring the house, and it can be well above the ${K.usd(ca.prem[4])} median of ${ca.name}'s private market in ${N.years[4]}.</p>
${h.mini('citizens', { t: 'The Florida 20 percent test', p: ['cit', 'pri'] })}
<h2>The Florida rule for Citizens</h2>
<p>Florida's statute (${h.src('fl_627_351', 'Fla. Stat. 627.351(6)(c)5.a')}) says a personal lines risk offered coverage by an authorized insurer at a premium no more than ${K.pct(F.citizensMargin, 0)} above the comparable Citizens premium is not eligible for a Citizens policy. The comparison is for comparable coverage. Citizens runs a clearinghouse that puts private offers in front of applicants and policyholders for that reason. A homeowner who receives a qualifying offer must take it or leave Citizens; above the line, Citizens stays available. The calculator applies the line to the two premiums you enter; Citizens' other rules, such as limits on the value of the home, still apply.</p>
<h2>Wildfire country: the California case</h2>
<p>${ca.name} shows how a plan grows. In the Treasury file, the share of policies its insurers declined to renew went from ${K.rate(ca.nonren[0])} in the median ZIP code in ${N.years[0]} to ${K.rate(ca.nonren[1])} in ${N.years[1]}, and stayed near that level through ${N.years[4]}, while the median premium rose ${K.sgn(ca.chg)} after inflation, the largest rise of any state. Owners who were not renewed in the foothills and the mountains turned to the California FAIR Plan for fire coverage and a private policy for the rest. The data in the file end before the later withdrawals of large insurers from new business in the state.</p>
<h2>Florida and Louisiana in the private data</h2>
<p>Because the Treasury file excludes residual plans, it shows the private market that remains in states where a Citizens plan grew. ${fl.name}'s median private premium per policy fell from ${K.usd(fl.prem[0])} in ${N.years[0]} to ${K.usd(fl.prem[4])} in ${N.years[4]}, after inflation, as private insurers withdrew from the dearest coastal homes and those homes moved to Citizens. ${la.name}'s private median rose to ${K.usd(la.prem[4])}, with a paid loss ratio of ${K.pct(la.lrY[3], 0)} in ${N.years[3]}, the year of Hurricane Ida. In both states the figure describes the homes private insurers kept.</p>
<h2>Getting out of the plan</h2>
<p>A residual plan is meant to be temporary. Ask an independent agent to shop the house each year, especially after replacing a roof, adding storm shutters or clearing brush around the house, since those changes can bring private insurers back. Keep a record of any private offer and the coverage it includes, since in Florida that offer decides eligibility. Compare deductibles too: plan policies and private policies may use different wind deductibles, explained on the ${h.a('hurricane-deductible', 'hurricane deductible page')}.</p>
`,
  faqs: [
    { q: 'What does a FAIR plan cover?', a: `Most FAIR plans write a basic dwelling fire policy that covers fire, lightning and, in many states, windstorm and hail, sometimes also smoke and vandalism. Theft, liability, water damage and loss of use are usually not included. Some plans, as in Illinois, Massachusetts or Michigan, also offer broader homeowners forms. Each plan's site lists its forms.` },
    { q: 'Who is eligible for a FAIR plan?', a: `Generally an owner who could not find coverage from an admitted insurer, often shown by refusals or a nonrenewal notice. The plans also inspect the property and can decline homes in poor condition. Rules differ by state; the plan's site or the state insurance department gives the conditions and the application route, usually through a licensed agent.` },
    { q: 'Can Citizens make me switch to a private insurer in Florida?', a: `Yes, if a private insurer offers comparable coverage at a premium no more than ${K.pct(F.citizensMargin, 0)} above your Citizens premium for comparable coverage. Under Fla. Stat. 627.351(6)(c)5.a your home is then no longer eligible for Citizens. If the private offer is more than ${K.pct(F.citizensMargin, 0)} higher, you may stay.` },
    { q: 'Are FAIR plan premiums higher than private insurance?', a: `Often, for less coverage. Plans are meant not to undercut private insurers, and their policies are narrower, so owners pay for a second policy as well. Their premiums are not in the Treasury file, which covers admitted insurers only, so this site cannot compare them by ZIP code.` },
  ],
  tool: 'citizens',
  related: ['home-insurance-non-renewal', 'hurricane-deductible', 'homeowners-insurance-by-state', 'state:florida'],
  sources: ['fio_report', 'fl_627_351', 'fio_data', 'naic_pcmi'],
});
