# Audit réglementaire de homeinsurancezip.com — 2026-11-09 (RECETTE §17.4)

Chaque règle appliquée par un calculateur, confrontée au texte officiel relu ce jour avec `curl` sur le site de
l'administration ou de la législature. Les paramètres vivent dans `src/data/params-2026.json` (`_basis` de chaque bloc) ;
aucune valeur n'est écrite en dur dans une page (§17.4, point 7 : les pages lisent `K.P`).

## 1. Règles des calculateurs

| Règle | Valeur du moteur | Texte relu le 2026-11-09 | Verdict |
|---|---|---|---|
| Options de franchise ouragan offertes en Floride | 500 $, 2 %, 5 %, 10 % du plafond d'habitation | Fla. Stat. 627.701(3)(a), leg.state.fl.us : « alternative deductible amounts applicable to hurricane losses equal to $500, 2 percent, 5 percent, and 10 percent of the policy dwelling limits » | conforme |
| Franchise ouragan une fois par année civile | `usedThisYear` déduit de la franchise, plancher = franchise ordinaire | Fla. Stat. 627.701(5)(a)1 : « shall apply on an annual basis to all covered hurricane losses that occur during the calendar year … same insurer or an insurer in the same insurer group » | conforme |
| Préavis de non-renouvellement, Floride | 120 jours ; prime de renouvellement 45 jours ; non-paiement 10 jours | Fla. Stat. 627.4133(2)(a)-(b) : « at least 45 days' advance written notice of the renewal premium », « written notice of nonrenewal … at least 120 days » | conforme |
| Préavis de non-renouvellement, Minnesota (ajout du jour) | 60 jours, motif obligatoire | Minn. Stat. 65A.29 subd. 7, revisor.mn.gov : « at least 60 days' advance notice of its intention. The notice must contain the specific underwriting or other reason » | conforme |
| Préavis, Caroline du Sud (ajout du jour) | 60 jours, motif obligatoire | S.C. Code 38-75-740(b) (« not less than sixty days prior to the expiration date ») et 38-75-1160(A)(1)(b)-(c) (« not less than sixty days », « the specific reason »), scstatehouse.gov ; 38-75-790 ajoute seulement une interdiction de motif (sinistre « act of God ») | conforme |
| Préavis, Washington (ajout du jour) | 60 jours, motif obligatoire | RCW 48.18.2901(1)(a)(i)-(B), app.leg.wa.gov, pour les polices de 48.18.290(1)(a) (« all insurance policies other than medical malpractice ») | conforme |
| Règle Citizens des 20 % (Floride) | éligible si l'offre privée dépasse Citizens de plus de 20 % | Fla. Stat. 627.351(6)(c)5.a : « not eligible … unless the premium for coverage from the authorized insurer is more than 20 percent greater » | conforme |
| Coussin d'escrow | au plus 1/6 des décaissements annuels | 12 CFR 1024.17(c)(1)(i), ecfr.gov : « a cushion that shall be no greater than one-sixth (1/6) of the estimated total annual payments » | conforme |
| Étalement d'un manque d'escrow | sur 12 mois | 12 CFR 1024.17(f)(3)(ii) : manque ≥ 1 mois de versement, « equal monthly payments over at least a 12-month period » | conforme ; **note corrigée** : l'outil disait « may also ask for the shortage within 30 days », ce qui n'est permis que pour un manque < 1 mois (f)(3)(i). Nouvelle note : « may also leave the shortage unpaid, or ask for it within 30 days when it is under one month's payment ». |
| Règle des 80 % (valeur à neuf) | 80 % par défaut, modifiable | Clause usuelle des formulaires, pas une loi : dite comme telle dans `coinsurance._basis` et sous l'outil | sans objet (pas de texte officiel) |

## 2. Tentatives sans lecture possible (non publiées)

- **Arizona** A.R.S. 20-1676 (45 jours) : lu, mais 20-1671 limite l'article aux polices **commerciales**. Non retenu pour
  l'habitation : exemple du point 2 de §17.4 (un texte voisin n'est pas le bon texte).
- **Californie** Ins. Code 678, **New York** Ins. Law 3425, **Texas** Ins. Code 551 : sites officiels illisibles par
  script (403 Cloudflare, application JavaScript). Non publiés ; à relire dans un navigateur (orchestrateur).
- **Oregon, Illinois, Michigan** : délai d'attente dépassé. Non publiés.
- **Virginie** 38.2-2114 : texte lu, deux versions (avant et après le 1er janvier 2027) ; le délai de préavis n'y est
  pas dans la partie lue. Non publié.

La page le dit : « The table lists the states whose statute this site has read … a state missing from it has its own rule ».
La phrase « Other states use shorter periods, often 30 to 60 days » (sans source) est retirée, ainsi que « many states
require 30 to 60 days » de la FAQ.

## 3. Données (rappel de l'audit du jour)

Classeur Treasury FIO (25 593 ZIP, 2018-2022), relu par `scripts/build-data.py` depuis `data-raw/` (hors git), sans
nouveau téléchargement. **Changement de calcul** (un chiffre par notion, §15.8) :

- variation 2018-2022 publiée = variation des médianes affichées (1 445 $ → 1 551 $ = **+7,3 %**), le calcul même de
  l'outil ; l'ancienne « médiane des variations par ZIP » (+5,7 %) n'est plus publiée ;
- sinistres pour 100 polices et ratio sinistres/primes « en moyenne » = moyenne des cinq lignes annuelles du tableau
  (4,1 et 35 %), au lieu de la médiane des moyennes par ZIP (4,5 et 43 %), qui dépassait chaque ligne annuelle.

Les phrases des pages d'État dont le sens dépendait de ces chiffres ont été relues une à une (243 phrases changées,
diff automatique) ; 11 corrigées (signe ou superlatif devenu faux : Mobile County, Fayette County, Rio Arriba County,
DeSoto, Douglas County NV, Newport County, Cache County, Davidson County, Dane County, Yavapai County, OK/NE « among
the highest »). Tests : `tests/coherence.test.ts` (variation = variation des médianes, moyennes = lignes annuelles,
toute phrase « from $A … to $B …, ±Z% » juste à 0,15 point près).

## 4. Prochaine relecture

À la publication d'un nouveau classeur Treasury, à chaque nouvel indice BLS chargé, et au 1er janvier 2027 (version de
Virginie, éventuelles réformes de préavis). Mise à jour manuelle : aucun workflow planifié n'est promis par le site.
