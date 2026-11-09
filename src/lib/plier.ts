/**
 * Replie chaque section <h2> d'un corps de page sous son titre (brief de mise en conformité du 2026-11-09) :
 * `<details class="pli-section"><summary><h2>…</h2></summary>…</details>`. Le texte reste entier dans le HTML
 * (référencement, check-unique) ; une section qui contient un mini-calculateur (`<!--mini:`) est ouverte d'emblée,
 * comme celle qui porte `<!--ouvert-->` : l'essentiel (que faire maintenant) ne se replie pas (brief du 2026-11-09, second passage).
 */
export function plierSections(html: string): string {
  const morceaux = html.split(/(?=<h2[\s>])/);
  return morceaux.map((m) => {
    const fin = m.indexOf('</h2>');
    if (!m.startsWith('<h2') || fin < 0) return m;
    const titre = m.slice(0, fin + 5), suite = m.slice(fin + 5);
    return `<details class="pli-section"${suite.includes('<!--mini:') || suite.includes('<!--ouvert-->') ? ' open' : ''}><summary>${titre}</summary>${suite}</details>`;
  }).join('');
}
