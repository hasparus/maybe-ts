import { Monad1 } from "fp-ts/lib/Monad";
import { Chain1 } from "fp-ts/lib/Chain";
import { Functor1 } from "fp-ts/lib/Functor";
import { Apply1 } from "fp-ts/lib/Apply";
import { Applicative1, Applicative } from "fp-ts/lib/Applicative";
import { Foldable1 } from "fp-ts/lib/Foldable";
import { Traversable1 } from "fp-ts/lib/Traversable";
import { Alternative1 } from "fp-ts/lib/Alternative";
import { Alt1 } from "fp-ts/lib/Alt";
import { Extend1 } from "fp-ts/lib/Extend";
import { identity, Predicate } from "fp-ts/lib/function";
import { HKT } from "fp-ts/lib/HKT";
import { pipeable as makePipeable } from "fp-ts/lib/pipeable";
import { Compactable1, Separated } from "fp-ts/lib/Compactable";
import { toNullable } from "fp-ts/lib/Option";
import { Filterable1 } from "fp-ts/lib/Filterable";
import { isRight } from "fp-ts/lib/Either";
import { Eq } from "fp-ts/lib/Eq";

declare module "fp-ts/lib/HKT" {
  export interface URItoKind<A> {
    Maybe: Maybe<A>;
  }
}

const URI = "Maybe";
type URI = "Maybe";

// This is useless without strictNullChecks
export type Nothing = null | undefined;
export const Nothing = null as Nothing;
export const just = identity;
export type Maybe<T> = T | Nothing;

export const isNothing = (x: Maybe<unknown>): x is Nothing => x == null;
export const isDefined = <T>(x: Maybe<T>): x is T => x != null;

export const map: Functor1<URI>["map"] = (fa, f) => (fa == null ? null : f(fa));

export const chain: Chain1<URI>["chain"] = map;

export const ap: Apply1<URI>["ap"] = (fab, fa) =>
  fa == null ? null : fab?.(fa);

export const of: Applicative1<URI>["of"] = identity;

export const foldMap: Foldable1<URI>["foldMap"] = monoid => (fa, f) =>
  fa == null ? monoid.empty : f(fa);

export const reduce: Foldable1<URI>["reduce"] = (fa, b, f) =>
  fa == null ? b : f(b, fa);

export const reduceRight: Foldable1<URI>["reduceRight"] = (fa, b, f) =>
  fa == null ? b : f(fa, b);

export const traverse = <F>(applicative: Applicative<F>) => <A, B>(
  ta: Maybe<A>,
  f: (a: A) => HKT<F, B>
): HKT<F, Maybe<B>> => {
  return isNothing(ta) ? applicative.of(null) : applicative.map(f(ta), of);
};

export const sequence = <F>(applicative: Applicative<F>) => <A>(
  ta: Maybe<HKT<F, A>>
): HKT<F, Maybe<A>> => {
  return isNothing(ta) ? applicative.of(null) : applicative.map(ta, of);
};

export const zero: Alternative1<URI>["zero"] = () => Nothing;

export const alt: Alt1<URI>["alt"] = (ma, f) => ma ?? f();

export const extend: Extend1<URI>["extend"] = (wa, f) =>
  wa == null ? null : f(wa);

export const compact: Compactable1<URI>["compact"] = maybeOption =>
  chain(maybeOption, toNullable);

export const filter: Filterable1<URI>["filter"] = <A>(
  fa: Maybe<A>,
  predicate: Predicate<A>
) => {
  return !isNothing(fa) && predicate(fa) ? fa : Nothing;
};

export const filterMap: Filterable1<URI>["filterMap"] = (ma, f) =>
  isNothing(ma) ? Nothing : toNullable(f(ma));

export const partition: Filterable1<URI>["partition"] = <A>(
  fa: Maybe<A>,
  predicate: Predicate<A>
): Separated<Maybe<A>, Maybe<A>> => {
  return {
    left: filter(fa, a => !predicate(a)),
    right: filter(fa, predicate)
  };
};

export const partitionMap: Filterable1<URI>["partitionMap"] = (fa, f) =>
  separate(map(fa, f));

const defaultSeparated = {
  left: Nothing,
  right: Nothing
};
export const separate: Compactable1<URI>["separate"] = fa =>
  map(fa, e => ({
    left: isRight(e) ? null : e.left,
    right: isRight(e) ? e.right : null
  })) ?? defaultSeparated;

export const maybe: Monad1<URI> &
  Foldable1<URI> &
  Traversable1<URI> &
  Alternative1<URI> &
  Extend1<URI> &
  Compactable1<URI> &
  Filterable1<URI> = {
  URI,
  chain,
  map,
  ap,
  of,
  foldMap,
  reduce,
  reduceRight,
  sequence,
  traverse,
  zero,
  alt,
  extend,
  compact,
  separate,
  filter,
  filterMap,
  partition,
  partitionMap
};

export const pipeable = makePipeable(maybe);

export function liftEq<T>(E: Eq<T>): Eq<Maybe<T>> {
  return {
    equals: (x, y) =>
      x === y ||
      (isNothing(x) ? isNothing(y) : isNothing(y) ? false : E.equals(x, y))
  };
}
