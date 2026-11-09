# Écrire ou étoffer une page de Home Insurance ZIP (homeinsurancezip.com)

Notice pour qui écrit les pages. À lire en entier avant d'écrire, avec `~/Documents/GitHub/RECETTE-SITE.md`.

**Le site** : ce que les propriétaires américains ont réellement payé pour leur assurance habitation (HO-3, HO-5) par
État, comté et code ZIP de 2018 à 2022, les non-renouvellements, les sinistres, les franchises vent et ouragan, la valeur
de reconstruction, les plans FAIR et Citizens, l'assurance locataire. **Anglais américain seul**, sous `/en/`. Éditeur :
la société **Radif Partners** (jamais un nom de personne). Site indépendant, ni assureur ni courtier : la phrase figure
sous chaque H1.

**La phrase de valeur ajoutée** : `VALUE` dans `src/content/home.ts`. Contrôle avant construction :
`~/Documents/GitHub/reports/homeinsurancezip.com-controle-2026-11-07.md`.

## Interdits

- On ne vise ni « best » ni « cheapest », ni l'assurance auto, ni l'assurance inondation (aucune page inondation ou
  NFIP : on renvoie à FEMA).
- Aucun lien vers un assureur, un agent, un site de devis ; aucun conseil personnalisé ; aucune promesse. Ne jamais
  lier ni copier un site du portefeuille (`~/Documents/GitHub/_trame/domaines-ovh.txt`), pas de « nos autres sites ».
- **Un chiffre incertain ne se publie pas.** Tout chiffre vient du kit (`K.…`). Les données s'arrêtent en 2022 : toute
  page le dit. La valeur « aux prix d'aujourd'hui » est une estimation (indice BLS), jamais un devis.
- Données privées (NAIC, Quadrant, S&P, enquêtes d'assureurs) : lien seulement, jamais reproduites.
- Un fait propre à un État (loi, plan FAIR, régulateur) se vérifie sur la page officielle et se lie avec
  `h.ext(url, texte)` ; les adresses sont dans `src/data/regulators.json`.
- Ni tiret cadratin ni demi-cadratin, ni les tournures listées dans `tests/pages.test.ts` (BANNED).

## D'où viennent les chiffres

| Donnée | Source | Fichier |
|---|---|---|
| Prime par police, non-renouvellement, résiliation, fréquence et coût moyen des sinistres, ratio sinistres/primes, 2018-2022, par ZIP | U.S. Treasury, Federal Insurance Office, *Supporting Underlying Metrics and Disclaimer for Analyses of US Homeowners Insurance Markets 2018-2022* (janvier 2025) ; œuvre fédérale, réutilisée avec son avertissement (Méthode) | `src/data/national.json`, `states.json`, `state-lite.json`, `public/data/*.json` |
| Rattachement ZIP → comté | Census Bureau, fichier de relation ZCTA 2020 → comté (plus grande surface) | idem |
| Évolution des prix depuis 2022 | BLS PPI PCU5241265241262 (homeowner's insurance), CPI-U et « tenants' and household insurance » | `national.json > index` |
| Régulateurs et plans FAIR / Citizens par État | sites officiels des États | `src/data/regulators.json` |

Toutes les statistiques sont des médianes entre codes ZIP (le fichier ne donne pas le nombre de polices). Le Texas ne
déclare pas les non-renouvellements : valeur nulle, affichée « not reported ».

## Reconstruire les données

Entrées dans `data-raw/` (jamais versionné), téléchargées avec `curl` depuis les adresses de
`src/data/params-2026.json > sources`, puis :

    python3 -I scripts/build-data.py

## Les fichiers d'une page (une page = un fichier)

| Page | Fichier | Route |
|---|---|---|
| Sujet + calculateur | `src/content/guides/<id>.ts` (`defineGuide`) | `/en/<slug>/` |
| État | `src/content/states/<slug>.ts` (`defineState`, contexte `ctx(slug)` de `_ctx.ts`) | `/en/homeowners-insurance/<slug>/` |
| Accueil | `src/content/home.ts` | `/en/` |

Modèles (copier la structure, jamais les phrases) : `src/content/guides/homeowners-insurance-by-state.ts` et
`src/content/states/florida.ts`.

### Champs

| Champ | Règle |
|---|---|
| `title` | 50 à 60 caractères rendus, terme-clé en tête, « 2026 », unique ; jamais en tête une question |
| `description` | 150 à 160 caractères rendus, « 2026 », unique |
| `resume` | un seul paragraphe de 120 mots ou plus : la réponse directe, chiffrée |
| `body` | guides 650 mots de prose au moins, États 300 ; au moins un `h.mini(kind, { t, p, d })` |
| `faqs` | 3 à 8 questions, réponses de 40 à 90 mots, question unique sur tout le site |
| `related` | 3 ou 4 identifiants de pages |
| `sources` | clés de `params-2026.json > sources` |

Outils : `TOOL_KINDS` dans `src/lib/tool-specs.ts`, plus `lookup` (recherche ZIP / comté, `ZipLookup.tsx`).

## Contrôler

    PAGE_FILES=<id>,state:<slug> npx vitest run tests/pages.test.ts
    npx vitest run tests/pages.test.ts >/dev/null; python3 scripts/sim-pages.py --only <id>    # 26 % au plus

Puis, une seule fois et jamais en parallèle (verrou `~/Documents/GitHub/.playwright.lock`) : `npm run check`.
