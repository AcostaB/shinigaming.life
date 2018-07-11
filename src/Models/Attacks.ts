export class Attack {
    name: string;
    type: string;
    isProficient: boolean;
    toHitMod: number;
    damage: string;
    damageMod: number;
    melee: boolean;
    magicItem: boolean;
}

export const attacks: Attack[] = [
    {  name: "Greatsword +1", type: "Melee Weapon", isProficient: true, toHitMod: 6, damage: "2d6", damageMod: 3, melee: true, magicItem: true},
    {  name: "Greatsword", type: "Melee Weapon", isProficient: true, toHitMod: 5, damage: "2d6", damageMod: 2, melee: true, magicItem: false},
    {  name: "Longbow", type: "Ranged Weapon", isProficient: true, toHitMod: 4, damage: "1d8", damageMod: 2, melee: false, magicItem: false},
    {  name: "Longsword", type: "Melee Weapon", isProficient: true, toHitMod: 4, damage: "1d8", damageMod: 2, melee: true, magicItem: false}
];