export class Passive {
  id: number;
  level: number;
  name: string;
  description: string;
  isRacial: boolean;
}

export const passives: Passive[] = [
  {
    id: 1,
    level: 2,
    name: "Great Weapon Fighting",
    description: "Once per attack, you may reroll any 1s or 2s.",
    isRacial: true
  },
  {
    id: 2,
    level: 2,
    name: "Dark Vision",
    description: "Desctiption for passive 1",
    isRacial: true
  },
  {
    id: 3,
    level: 1,
    name: "Hellish Resistance",
    description: "Resistance to fire.",
    isRacial: true
  },
  {
    id: 4,
    level: 15,
    name: "Grasp of darkness",
    description: "Proficiency on wisdom saving throws.",
    isRacial: true
  }
];
