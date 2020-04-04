# maybe-ts

A lightweight Maybe type for fp-ts

```ts
export type Nothing = null | undefined;
export const Nothing = null as Nothing;

export type Maybe<T> = T | Nothing;
```

### 🤹‍♂️ Instance of your favorite type classes

**Edit: Not really.** This is not a functor over nullables. I wrote about it at [haspar.us/speaking/maybe-ts](https://haspar.us/speaking/maybe-ts).

counterexample to composition law of the functor:

![](https://i.imgur.com/kdS3zVL.png)

Credits to [OliverJAsh](https://github.com/OliverJAsh) for spoiling the fun ;)

---

- [x] ~~[Monad1](https://dev.to/gcanti/getting-started-with-fp-ts-monad-6k)~~
- [x] [Foldable1](https://github.com/gcanti/fp-ts/blob/master/src/Foldable.ts)
- [x] [Traversable1](https://github.com/gcanti/fp-ts/blob/master/src/Traversable.ts)
- [x] [Alternative1](https://github.com/gcanti/fp-ts/blob/master/src/Alternative.ts)
- [x] [Extend1](https://github.com/gcanti/fp-ts/blob/master/src/Extend.ts)
- [x] [Compactable1](https://github.com/gcanti/fp-ts/blob/master/src/Compactable.ts)
- [x] [Filterable1](https://github.com/gcanti/fp-ts/blob/master/src/Filterable.ts)

## Installation

```
npm install @hasparus/maybe-ts

yarn add @hasparus/maybe-ts
```

## Requirements

```
fp-ts ^2.3
TypeScript >= 3.7
```

## Contributing

Found a bug? Have an idea for improvements?
Feel free to shoot a PR!

---

Slides: https://maybe-ts.now.sh/
