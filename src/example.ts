import { flow } from "fp-ts/lib/function";
import { monoidAny } from "fp-ts/lib/Monoid";

import { pipeable as maybe, Nothing } from "./index";

type Actor = string;
type VotesNumber = number;

const jokerScores = new Map<Actor, VotesNumber>([
  ["Heath Ledger", 4408],
  ["Joaquin Phoenix", 1293],
  ["Mark Hamill", 767],
  ["Jack Nicholson", 537],
  ["Cesar Romero", 121],
  ["Jared Leto", 106]
]);

const foughtBatman = (actor: string) => {
  return [
    "Heath Ledger",
    "Mark Hamill",
    "Jack Nicholson",
    "Cesar Romero"
  ].includes(actor);
};

const isGoodJoker = flow(
  (actor: string) => {
    const score = jokerScores.get(actor);
    return score ? ([actor, score] as const) : Nothing;
  },
  maybe.filter(([actor]) => foughtBatman(actor)),
  maybe.map(([_, score]) => score ** 3 / 10),
  maybe.filter(x => String(x)[0] !== "3"),
  maybe.foldMap(monoidAny)(x => x > Math.sqrt(Number.MAX_SAFE_INTEGER))
);

const actors = [
  "Heath Ledger",
  "Joaquin Phoenix",
  "Mark Hamill",
  "Jared Leto",
  "Scarlett Johansson",
  "Chris Hemsworth"
];

actors.map(isGoodJoker); //?
