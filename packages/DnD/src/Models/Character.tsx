export class Stat {
    category: string;
    mod: string;
    value: number;
    valuePostText: string;
    description: string;
}

export class Character {
    name: string;
    race: string;
    class: string;
    level: string;
    stats: Stat[];
    maximumHealth: number;
}

export const character: Character = {
    name: "Bruce Wayne",
    race: "Tiefling",
    class: "Dark Knight",
    level: "4",
    stats: [
        {category: "", mod: "+", value: 3, valuePostText: "", description: "PROFICIENCY BONUS"},
        {category: "DEFENSES", mod: "", value: 16, valuePostText: "", description: "ARMOR CLASS"},
        {category: "SPEED", mod: "", value: 30, valuePostText: "ft", description: "WALKING"},
        {category: "SENSES", mod: "", value: 10, valuePostText: "", description: "PASSIVE PERCEPTION"},
        {category: "", mod: "+", value: 1, valuePostText: "", description: "INITIATIVE"}
    ],
    maximumHealth: 47
};