export class Ability {
  id: number;
  exp: string;
  name: string;
  mod: number;
  save: number;
  isProficient: boolean;
}

export const abilities: Ability[] = [
  { id: 1, exp: "15", name: "Strength", mod: 2, save: 2, isProficient: false },
  { id: 2, exp: "12", name: "Dexterity", mod: 1, save: 1, isProficient: false },
  {
    id: 3,
    exp: "13",
    name: "Constitution",
    mod: 1,
    save: 1,
    isProficient: false
  },
  {
    id: 4,
    exp: "9",
    name: "Intelligence",
    mod: -1,
    save: -1,
    isProficient: false
  },
  { id: 5, exp: "10", name: "Wisdom", mod: 0, save: 3, isProficient: true },
  { id: 6, exp: "16", name: "Charisma", mod: 3, save: 6, isProficient: true }
];
