/**
 * Every trade word explained where it is read (brief des cinq règles, 2026-11-10, règle 4 ; testeur de 61 ans :
 * « escrow », « reinsurance », « Coverage A », « BLS »… la faisaient décrocher). `gloss()` returns a function that,
 * page by page and in reading order (intro, summary, body, questions), adds a short explanation in parentheses
 * after the FIRST appearance of each term on the page. Text inside links, headings, table headers, captions and
 * folded titles is left alone (the next plain appearance gets the explanation). A term already explained in place
 * ("(the servicer)", "the servicer, the company…") is counted as explained.
 */
const TERMS: Array<[RegExp, string]> = [
  [/\bCoverage A\b/, 'the most the policy pays to rebuild the house'],
  [/\bdwelling limits?\b/, 'the most the policy pays to rebuild the house'],
  [/\bescrow\b/, 'the account your mortgage company uses to pay the insurance and tax bills'],
  [/\breinsurance\b/, 'insurance that insurers buy for themselves'],
  [/\bactual cash value\b/, 'the value after wear, not the price new'],
  [/\bnonrenewals?\b/, 'an insurer declining to renew a policy'],
  [/\b(?:paid )?loss ratios?\b/, 'the share of premiums paid back as claims'],
  [/\bFAIR [Pp]lans?\b/, 'state-backed insurers of last resort'],
  [/\b(?:Louisiana )?Citizens(?: Property Insurance(?: Corporation)?)?\b/, 'the state-run insurer of last resort'],
  [/\bBLS\b/, 'Bureau of Labor Statistics, the government office for price data'],
  [/\bproducer price index\b/, 'the government measure of what insurers charge'],
  [/\bconsumer price index\b/, 'the government measure of everyday prices'],
  [/\btypical (?:U\.S\. |American )?ZIP code\b/, 'the middle one: half paid more, half less'],
  [/\bservicer\b/, 'the company that collects your mortgage payment'],
  [/\bdeclarations page\b/, 'the summary page at the front of your policy'],
  [/\bsurplus lines\b/, 'insurers outside the usual state rules'],
  [/\bHO-4\b/, 'the standard renters policy'],
  [/\bHO-6\b/, 'the condo owner\'s policy'],
  [/\bHO-5\b/, 'the broadest standard homeowners policy'],
  [/\bHO-3\b/, 'the standard homeowners policy'],
  [/\bHO-8\b/, 'a policy form for older homes, paid at value after wear'],
  [/\bsublimits?\b/, 'smaller caps inside the policy limit'],
  [/\bendorsements?\b/, 'an added page that changes the policy'],
  [/\binflation guard\b/, 'a clause that raises the insured amount each year'],
  [/\bpremium per policy\b/, 'what insurers charged in a year divided by the policies they had'],
  [/\bdata call\b/, 'the survey regulators sent to insurers'],
  [/\badmitted insurers?\b/, 'insurers licensed by the state'],
  [/\bresidual (?:market )?plans?\b/, 'state-backed insurers of last resort'],
  [/\bforce-placed\b/, 'bought by the lender for you, at your cost'],
  [/\bCoverage D\b/, 'loss of use'],
  [/\bCoverage B\b/, 'garages, fences and sheds'],
  [/\bCoverage C\b/, 'your belongings'],
  [/\bperils\b/, 'causes of damage'],
  [/\bwind pools?\b/, 'state plans that insure wind damage only'],
  [/\bdifference in conditions\b/, 'a second policy that fills the gaps'],
  [/\bdepreciation\b/, 'the value lost with age'],
  [/\bliability\b/, 'what you owe others you injure or whose things you damage'],
  [/\bsurcharges?\b/, 'a price increase added after a claim'],
  [/\bcoinsurance\b/, 'the rule that cuts a claim when the house is insured for too little'],
  [/\bNAIC\b/, 'the association of state insurance regulators'],
  [/\bFIO\b/, "the Treasury's Federal Insurance Office"],
];
/** « the servicer, the company that collects… » is an explanation; « reinsurance, the insured value… » is the next item of a list. */
function appos(def: string, next: string): boolean {
  const low = next.toLowerCase();
  return def.toLowerCase().split(/[^a-z]+/).filter((w) => w.length > 4).some((w) => low.includes(w));
}
const SKIP = /^(a|h[1-6]|th|caption|summary|label|button|option)$/i;

export function gloss() {
  const seen = new Set<number>();
  return (html: string): string => {
    const parts = html.split(/(<[^>]+>)/);
    let skip = 0;
    for (let i = 0; i < parts.length; i++) {
      const p = parts[i];
      if (p.startsWith('<')) {
        const m = /^<(\/)?([a-zA-Z0-9]+)/.exec(p);
        if (m && SKIP.test(m[2])) skip += m[1] ? -1 : p.endsWith('/>') ? 0 : 1;
        if (skip < 0) skip = 0;
        continue;
      }
      if (!p) continue;
      let text = p;
      TERMS.forEach(([re, def], k) => {
        if (seen.has(k)) return;
        const m = re.exec(text);
        if (!m) return;
        // In a heading or a link: wait for the next plain appearance.
        if (skip > 0) return;
        seen.add(k);
        let end = m.index + m[0].length;
        // A term used as an adjective (« nonrenewal rate », « escrow account ») gets its explanation after the noun.
        const noun = /^\s+(?:rates?|ratios?|premiums?|notices?|accounts?|payments?|polic(?:y|ies)|deductibles?|limits?)\b/.exec(text.slice(end));
        if (noun) end += noun[0].length;
        const before = text.slice(Math.max(0, m.index - 12), m.index), after = text.slice(end, end + 14);
        // Already explained in place: « (the servicer) », « escrow (the account… », « the servicer, the company… ».
        const key = def.split(' ').slice(-2).join(' ');
        if (text.slice(Math.max(0, m.index - 160), m.index).includes(key)) return;
        if (/\(\s*(?:called |the |an? )?$/.test(before) || /^\s*\(/.test(after) || /^,\s*(?:called|or|which)\b/.test(after) || (/^,\s*(?:the|a|an)\b/.test(after) && appos(def, text.slice(end, end + 60))) || /^\)/.test(after) || /^\s+(?:is|means|are)\b/.test(after)) return;
        text = `${text.slice(0, end)} (${def})${text.slice(end)}`;
      });
      parts[i] = text;
    }
    return parts.join('');
  };
}
