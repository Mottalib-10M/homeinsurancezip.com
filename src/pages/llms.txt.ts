/** llms.txt (RECETTE §21), generated from the page registry. */
import { GUIDES, STATE_PAGES, stateId } from '../lib/pages';
import { SITE_URL, LAST_UPDATED, SITE_NAMES } from '../data/site-config';
import { route } from '../i18n/routes';
import { GROUPS, label } from '../i18n/nav';
export function GET() {
  const lines = [
    `# ${SITE_NAMES.en}`, '',
    `> Homeowners insurance in the United States by ZIP code, county and state, from the U.S. Treasury Federal Insurance Office workbook released in January 2025: premium per policy, nonrenewal rate, cancellations, claim frequency and claim severity for 25,593 ZIP codes, 2018 to 2022 (HO-3 and HO-5 policies of reporting insurers; FAIR plans, surplus lines and flood excluded; Texas nonrenewals not reported). 2022 premiums carried to the latest month with the BLS producer price index for homeowner's insurance, labeled as estimates. Calculators for percentage hurricane deductibles, roof claims at actual cash value, the replacement cost condition, escrow increases (12 CFR 1024.17), the Florida Citizens eligibility rule, small claims, renters coverage and loss of use. Independent site published by Radif Partners, not an insurer or a broker, not endorsed by Treasury; general information, not a quote. Last updated ${LAST_UPDATED}.`, '',
    ...GROUPS.flatMap((g) => [`## ${g.label}`, ...GUIDES.filter((p) => p.group === g.id).map((p) => `- [${p.nav}](${SITE_URL}${route(p.id, 'en')}): ${p.card}`), '']),
    '## States', ...STATE_PAGES.map((s) => `- [${label(stateId(s.slug))}](${SITE_URL}${route(stateId(s.slug), 'en')}): ${s.intro}`), '',
    '## About', `- [Where the numbers come from](${SITE_URL}${route('method', 'en')})`, `- [About](${SITE_URL}${route('about', 'en')})`,
  ];
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
