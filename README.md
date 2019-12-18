# maybe-ts

A lightweight Maybe type for fp-ts

```ts
export type Nothing = null | undefined;
export const Nothing = null as Nothing;

export type Maybe<T> = T | Nothing;
```

### 🤹‍♂️ Instance of your favorite type classes

- [x] [Monad1](https://dev.to/gcanti/getting-started-with-fp-ts-monad-6k)
- [x] [Foldable1](https://github.com/gcanti/fp-ts/blob/master/src/Foldable.ts)
- [x] [Traversable1](https://github.com/gcanti/fp-ts/blob/master/src/Traversable.ts)
- [x] [Alternative1](https://github.com/gcanti/fp-ts/blob/master/src/Alternative.ts)
- [x] [Extend1](https://github.com/gcanti/fp-ts/blob/master/src/Extend.ts)
- [x] [Compactable1](https://github.com/gcanti/fp-ts/blob/master/src/Compactable.ts)
- [x] [Filterable1](https://github.com/gcanti/fp-ts/blob/master/src/Filterable.ts)

## Requirements

```
fp-ts ^2.3
TypeScript >= 3.7
```

## Contributing

Found a bug? Have an idea for improvements?
Feel free to shoot a PR!

There's only one convention you should stick to. Use [gitmoji](https://github.com/carloscuesta/gitmoji-cli). I'm dead serious.

---

Slides: https://maybe-ts.now.sh/
