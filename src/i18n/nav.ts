import { route, type Locale } from './routes';
import { GUIDES, guideById, statePageById, STATE_PAGES, stateId } from '../lib/pages';
import { STATES } from '../lib/data';
import type { Group } from '../lib/page-types';
export interface NavLink { href: string; label: string } export interface NavCategory { label: string; links: NavLink[] }
const CORE: Record<string, string> = { home: 'Look up a ZIP code', method: 'Where the numbers come from', about: 'About', widget: 'Embed the ZIP lookup', contact: 'Contact', editorial: 'Editorial policy', privacy: 'Privacy', terms: 'Legal notice', cookies: 'Cookies' };
export const GROUPS: Array<{ id: Group; label: string }> = [
  { id: 'cost', label: 'Premiums and renewals' },
  { id: 'policy', label: 'Deductibles and claims' },
  { id: 'renters', label: 'Renters insurance' },
];
const stName = (slug: string) => STATES.find((s) => s.slug === slug)?.name ?? slug;
export const label = (id: string, _lang?: Locale) => {
  if (CORE[id]) return CORE[id];
  const g = guideById(id); if (g) return g.nav;
  const s = statePageById(id); if (s) return `Homeowners insurance in ${stName(s.slug)}`;
  return id;
};
const link = (id: string, lang: Locale): NavLink => ({ href: route(id, lang), label: label(id) });
export const inGroup = (g: Group, lang: Locale): NavLink[] => GUIDES.filter((p) => p.group === g).map((p) => link(p.id, lang));
// « Start here » en tête du menu (testeurs naïfs du 2026-11-09 : ni l'outil ZIP ni la page des sources dans le menu).
const startHere = (lang: Locale): NavCategory => ({ label: 'Start here', links: [link('home', lang), { href: `${route('home', lang)}#start`, label: 'Not sure where to start?' }, link('method', lang)] });
export function navCategories(lang: Locale): NavCategory[] {
  return [startHere(lang), ...GROUPS.map((g) => ({ label: g.label, links: inGroup(g.id, lang) })).filter((c) => c.links.length)];
}
// Methode : liee en bas de page, hors du menu du haut pour qu'il tienne sur une ligne.
export const navDirect = (_lang: Locale): NavLink[] => [];
export const footerColumns = (lang: Locale): NavCategory[] => [
  ...GROUPS.map((g) => ({ label: g.label, links: inGroup(g.id, lang) })).filter((c) => c.links.length),
  { label: 'This site', links: ['home', 'method', 'about', 'contact', 'editorial', 'widget', 'terms', 'privacy', 'cookies'].map((i) => link(i, lang)) },
];
/** Every state page from the footer: one click from any page (RECETTE §18.2). */
export const popularLinks = (lang: Locale): NavLink[] => STATE_PAGES.map((s) => ({ href: route(stateId(s.slug), lang), label: stName(s.slug) }));
