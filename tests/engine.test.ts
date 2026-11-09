/** Engine tests: each calculator on hand-checked cases, and the data asset's invariants. */
import { describe, expect, it } from 'vitest';
import { hurricaneClaim, coinsurance, roofClaim, escrowChange, nonrenewalOdds, claimOrNot, citizensTest, rentersNeed, lossOfUse, payAfter, pctDeductible } from '../src/lib/engine/home';
import { getTool, TOOL_KINDS, toToday } from '../src/lib/tool-specs';
import { N, STATES } from '../src/lib/data';
import P from '../src/data/params-2026.json';

describe('deductibles', () => {
  it('percentage of Coverage A', () => expect(pctDeductible(350000, 0.02)).toBe(7000));
  it('pays nothing under the deductible, never above the limit', () => {
    expect(payAfter(800, 1000).paid).toBe(0);
    expect(payAfter(500000, 1000, 300000).paid).toBe(300000);
  });
  it('hurricane: 2% of 350,000 on 18,000 of damage', () => {
    const r = hurricaneClaim({ coverageA: 350000, share: 0.02, flat: 1000, damage: 18000 });
    expect(r.deductible).toBe(7000); expect(r.paid).toBe(11000); expect(r.paidFlat).toBe(17000); expect(r.extra).toBe(6000);
  });
  it('hurricane: once per calendar year, the flat deductible once it is used up', () => {
    expect(hurricaneClaim({ coverageA: 350000, share: 0.02, flat: 1000, damage: 18000, usedThisYear: 5000 }).deductible).toBe(2000);
    expect(hurricaneClaim({ coverageA: 350000, share: 0.02, flat: 1000, damage: 18000, usedThisYear: 9000 }).deductible).toBe(1000);
  });
});

describe('dwelling and roof', () => {
  it('replacement cost condition met: no reduction', () => {
    const r = coinsurance({ replacementCost: 400000, limit: 320000, loss: 50000, deductible: 1000, share: 0.8 });
    expect(r.underinsured).toBe(false); expect(r.paid).toBe(49000); expect(r.penalty).toBe(0);
  });
  it('limit at 300,000 of 420,000: claim reduced in proportion', () => {
    const r = coinsurance({ replacementCost: 420000, limit: 300000, loss: 60000, deductible: 1000, share: 0.8 });
    expect(r.required).toBe(336000); expect(r.paid).toBeCloseTo(60000 * (300000 / 336000) - 1000, 6); expect(r.underinsured).toBe(true);
  });
  it('roof at 12 of 25 years: actual cash value', () => {
    const r = roofClaim({ cost: 16000, age: 12, life: 25, deductible: 2500 });
    expect(r.acvValue).toBeCloseTo(8320, 6); expect(r.acv).toBeCloseTo(5820, 6); expect(r.rcv).toBe(13500);
  });
  it('a roof past its life is worth nothing at actual cash value', () => expect(roofClaim({ cost: 10000, age: 30, life: 20, deductible: 1000 }).acv).toBe(0));
});

describe('money and renewals', () => {
  it('escrow: 600 more a year', () => {
    const e = escrowChange({ oldPremium: 1800, newPremium: 2400, otherYearly: 4200, cushionMax: P.escrow.cushionMax, months: 12 });
    expect(e.deposit).toBe(50); expect(e.shortage).toBeCloseTo(700, 3); expect(e.firstYear).toBeCloseTo(50 + 700 / 12, 3);
  });
  it('nonrenewal odds compound', () => { expect(nonrenewalOdds(0.01, 5)).toBeCloseTo(1 - 0.99 ** 5, 10); expect(nonrenewalOdds(0, 10)).toBe(0); });
  it('small claim against a surcharge', () => expect(claimOrNot({ damage: 4500, deductible: 1500, premium: 2000, surcharge: 0.2, years: 3 }).net).toBe(1800));
  it('Citizens: more than 20 percent above', () => {
    expect(citizensTest({ citizens: 3000, privateOffer: 3600, margin: 0.2 }).eligible).toBe(false);
    expect(citizensTest({ citizens: 3000, privateOffer: 3601, margin: 0.2 }).eligible).toBe(true);
  });
  it('renters inventory and loss of use', () => {
    expect(rentersNeed([1000, 2000, -5], 0.4)).toEqual({ total: 3000, acv: 1800 });
    expect(lossOfUse({ months: 4, tempRent: 2600, rent: 1500, extra: 300, limit: 5000 })).toEqual({ need: 5600, paid: 5000, kept: 600 });
  });
});

describe('tools and data', () => {
  it('every tool runs on its defaults', () => {
    for (const k of TOOL_KINDS) {
      const s = getTool(k);
      const r = s.run(Object.fromEntries(s.inputs.map((i) => [i.id, i.def])));
      expect(r.value, k).not.toMatch(/NaN|undefined/);
    }
  });
  it('51 states, national medians in range, Texas nonrenewals not reported', () => {
    expect(STATES).toHaveLength(51);
    expect(N.zips).toBeGreaterThan(20000);
    expect(N.prem[4]).toBeGreaterThan(1000); expect(N.prem[4]).toBeLessThan(3000);
    expect(STATES.find((s) => s.code === 'TX')!.nonren[4]).toBeNull();
    expect(toToday(1000)).toBeCloseTo(1000 * N.ppiFactor, 6);
  });
});
