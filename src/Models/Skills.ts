export class Skill {
  id: number;
  abilityName: string;
  skillName: string;
  isProficient: boolean;
  mod: number;
}

export const leftColumnSkills: Skill[] = [
  {
    id: 1,
    abilityName: "DEX",
    skillName: "Acrobatics",
    isProficient: false,
    mod: 1
  },
  {
    id: 2,
    abilityName: "WIS",
    skillName: "Animal Handling",
    isProficient: false,
    mod: 0
  },
  {
    id: 3,
    abilityName: "INT",
    skillName: "Arcana",
    isProficient: false,
    mod: -1
  },
  {
    id: 4,
    abilityName: "STR",
    skillName: "Athletics",
    isProficient: true,
    mod: 5
  },
  {
    id: 5,
    abilityName: "CHA",
    skillName: "Deception",
    isProficient: false,
    mod: 3
  },
  {
    id: 6,
    abilityName: "INT",
    skillName: "History",
    isProficient: false,
    mod: -1
  },
  {
    id: 7,
    abilityName: "WIS",
    skillName: "Insight",
    isProficient: true,
    mod: 3
  },
  {
    id: 8,
    abilityName: "CHA",
    skillName: "Intimidation",
    isProficient: true,
    mod: 6
  },
  {
    id: 9,
    abilityName: "INT",
    skillName: "Investigation",
    isProficient: false,
    mod: -1
  }
];

export const rightColumnSkills: Skill[] = [
  {
    id: 10,
    abilityName: "WIS",
    skillName: "Medicine",
    isProficient: false,
    mod: 0
  },
  {
    id: 11,
    abilityName: "INT",
    skillName: "Nature",
    isProficient: false,
    mod: -1
  },
  {
    id: 12,
    abilityName: "WIS",
    skillName: "Perception",
    isProficient: false,
    mod: 0
  },
  {
    id: 13,
    abilityName: "CHA",
    skillName: "Performance",
    isProficient: false,
    mod: 3
  },
  {
    id: 14,
    abilityName: "CHA",
    skillName: "Persuasion",
    isProficient: true,
    mod: 6
  },
  {
    id: 15,
    abilityName: "INT",
    skillName: "Religion",
    isProficient: false,
    mod: -1
  },
  {
    id: 16,
    abilityName: "DEX",
    skillName: "Sleight of Hand",
    isProficient: false,
    mod: 1
  },
  {
    id: 17,
    abilityName: "DEX",
    skillName: "Stealth",
    isProficient: false,
    mod: 1
  },
  {
    id: 18,
    abilityName: "WIS",
    skillName: "Survival",
    isProficient: false,
    mod: 0
  }
];
