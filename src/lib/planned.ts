/** Every page id the site is meant to have. Content tests accept links to these ids while pages are being
 *  written; the "all planned pages exist" test fails until each has its file. */
import STATES from '../data/states.json';
export const PLANNED_GUIDES = [
  'homeowners-insurance-by-state', 'why-is-home-insurance-going-up', 'home-insurance-non-renewal', 'homeowners-insurance-cost-per-month',
  'hurricane-deductible', 'roof-claim-actual-cash-value', 'how-much-dwelling-coverage', 'fair-plan-insurance', 'should-i-file-a-home-insurance-claim',
  'renters-insurance-calculator', 'renters-insurance-loss-of-use',
];
export const PLANNED_STATES = (STATES as Array<{ slug: string }>).map((s) => s.slug);
export const PLANNED_IDS = new Set<string>([...PLANNED_GUIDES, ...PLANNED_STATES.map((s) => `state:${s}`)]);
