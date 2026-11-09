/**
 * Pure functions of the calculators. Rules come from params-2026.json (passed in), never typed here.
 * Every result is in dollars of the inputs; nothing is rounded before the display layer.
 */

/** A percentage deductible in dollars: share of the dwelling limit (Coverage A). */
export const pctDeductible = (coverageA: number, share: number) => Math.max(0, coverageA) * Math.max(0, share);

/** What a claim pays after a deductible, never below zero nor above the limit. */
export function payAfter(loss: number, deductible: number, limit = Infinity) {
  const paid = Math.min(Math.max(0, loss - Math.max(0, deductible)), limit);
  return { paid, kept: Math.max(0, loss) - paid };
}

/**
 * Hurricane or wind deductible: percentage of Coverage A against the flat deductible of other perils.
 * `usedThisYear`: hurricane losses already absorbed this calendar year by the same insurer (Fla. Stat. 627.701(5)(a)):
 * the deductible left is the larger of what remains and the all-other-perils deductible.
 */
export function hurricaneClaim(o: { coverageA: number; share: number; flat: number; damage: number; usedThisYear?: number }) {
  const full = pctDeductible(o.coverageA, o.share);
  const used = Math.max(0, o.usedThisYear ?? 0);
  const ded = Math.max(full - used, used > 0 ? o.flat : 0, used > 0 ? 0 : full);
  const pct = payAfter(o.damage, ded, o.coverageA);
  const flat = payAfter(o.damage, o.flat, o.coverageA);
  return { deductible: ded, full, paid: pct.paid, kept: pct.kept, paidFlat: flat.paid, extra: pct.kept - flat.kept };
}

/**
 * Replacement cost condition: when the dwelling limit is at least `share` of the full replacement cost, the loss is
 * paid at replacement cost up to the limit; below it, in proportion limit / (share x replacement cost). The
 * "actual cash value if greater" alternative of some forms is not modeled (it needs the depreciation of the house).
 */
export function coinsurance(o: { replacementCost: number; limit: number; loss: number; deductible: number; share: number }) {
  const required = o.replacementCost * o.share;
  const ratio = required > 0 ? Math.min(1, o.limit / required) : 1;
  const gross = Math.min(o.loss * ratio, o.limit);
  const paid = Math.max(0, gross - o.deductible);
  const full = payAfter(o.loss, o.deductible, o.limit).paid;
  return { required, ratio, paid, penalty: Math.max(0, full - paid), kept: Math.max(0, o.loss - paid), underinsured: o.limit < required };
}

/** Roof claim at replacement cost or at actual cash value (straight-line depreciation over the roof's expected life). */
export function roofClaim(o: { cost: number; age: number; life: number; deductible: number }) {
  const left = o.life > 0 ? Math.max(0, 1 - o.age / o.life) : 0;
  const acvValue = o.cost * left;
  const rcv = payAfter(o.cost, o.deductible).paid;
  const acv = payAfter(acvValue, o.deductible).paid;
  return { left, acvValue, rcv, acv, gap: rcv - acv };
}

/**
 * Escrow effect of a premium change (12 CFR 1024.17): the monthly deposit moves by the change / 12; the account,
 * funded for the old premium, runs short by about the change, which a servicer may spread over 12 months; the
 * cushion (at most 1/6 of the yearly disbursements) grows by up to change / 6.
 */
export function escrowChange(o: { oldPremium: number; newPremium: number; otherYearly: number; cushionMax: number; months: number }) {
  const diff = o.newPremium - o.oldPremium;
  const deposit = diff / 12;
  const cushion = Math.max(0, diff) * o.cushionMax;
  const shortage = Math.max(0, diff) + cushion;
  const spread = o.months > 0 ? shortage / o.months : shortage;
  return {
    diff, deposit, cushion, shortage, spread, firstYear: deposit + spread,
    newMonthly: (o.otherYearly + o.newPremium) / 12, oldMonthly: (o.otherYearly + o.oldPremium) / 12,
  };
}

/** Chance of at least one nonrenewal over `years` renewals at a constant yearly rate. */
export const nonrenewalOdds = (rate: number, years: number) => 1 - (1 - Math.min(1, Math.max(0, rate))) ** Math.max(0, years);

/** Filing a small claim: what it pays against the extra premium a surcharge would cost over the years it lasts. */
export function claimOrNot(o: { damage: number; deductible: number; premium: number; surcharge: number; years: number }) {
  const paid = payAfter(o.damage, o.deductible).paid;
  const cost = o.premium * o.surcharge * o.years;
  return { paid, cost, net: paid - cost };
}

/** Florida Citizens eligibility (Fla. Stat. 627.351(6)(c)5.a): private offer more than `margin` above Citizens. */
export function citizensTest(o: { citizens: number; privateOffer: number; margin: number }) {
  const limit = o.citizens * (1 + o.margin);
  return { limit, eligible: o.privateOffer > limit, gap: o.privateOffer - limit, over: o.citizens > 0 ? o.privateOffer / o.citizens - 1 : 0 };
}

/** Renters: personal property limit from an inventory, its depreciated value, and loss of use against a limit. */
export function rentersNeed(items: number[], depreciation: number) {
  const total = items.reduce((a, b) => a + Math.max(0, b), 0);
  return { total, acv: total * (1 - Math.min(1, Math.max(0, depreciation))) };
}
export function lossOfUse(o: { months: number; tempRent: number; rent: number; extra: number; limit: number }) {
  const need = Math.max(0, o.months) * (Math.max(0, o.tempRent - o.rent) + Math.max(0, o.extra));
  return { need, paid: Math.min(need, o.limit), kept: Math.max(0, need - o.limit) };
}

/**
 * Nonrenewal notice: was it sent early enough? `required` = minimum days of the state statute
 * (params-2026.json > nonrenewalNotice), `given` = days between the mailing of the notice and the end of the policy.
 */
export function noticeCheck({ required, given }: { required: number; given: number }) {
  const g = Math.max(0, Math.round(given));
  return { onTime: g >= required, short: Math.max(0, required - g), spare: Math.max(0, g - required) };
}
