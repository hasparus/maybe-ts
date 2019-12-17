import * as laws from "fp-ts-laws";
import * as fc from "fast-check";

import { Maybe, maybe, just, Nothing, liftEq } from "./index";

namespace arbitraries {
  /**
   * Returns an `Arbitrary` that yelds only Just
   * @since 0.0.2
   */
  export function getJust<T>(arb: fc.Arbitrary<T>): fc.Arbitrary<Maybe<T>> {
    return arb.map(just);
  }

  /**
   * Returns an `Arbitrary` that yelds only `Nothing`s
   * @since 0.0.2
   */
  export function getNothing<T>(): fc.Arbitrary<Maybe<T>> {
    return fc.constant(Nothing);
  }

  /**
   * Returns an `Arbitrary` that yelds both `Justs`s and `Nothings`s
   * @since 0.0.2
   */
  export function getMaybe<T>(arb: fc.Arbitrary<T>): fc.Arbitrary<Maybe<T>> {
    return fc.oneof(getNothing(), getJust(arb));
  }
}

describe("Maybe", () => {
  /**
   * identity
   *   F.map(x, identity) === x
   * composition
   *   F.map(x, a => bc(ab(a))) === F.map(bc, F.map(x, ab))
   *
   * @see https://github.com/gcanti/fp-ts-laws/blob/master/src/laws.ts#L123
   */
  it("obeys Functor laws", () => {
    laws.functor(maybe)(arbitraries.getMaybe, liftEq);
  });

  /**
   * @see https://github.com/gcanti/fp-ts-laws/blob/master/src/laws.ts#L147
   */
  it("obeys Applicative laws", () => {
    laws.applicative(maybe)(arbitraries.getMaybe, liftEq);
  });

  /**
   * @see https://github.com/gcanti/fp-ts-laws/blob/master/src/laws.ts#L176
   */
  it("obeys Monad laws", () => {
    laws.monad(maybe)(liftEq);
  });
});
