/// <reference path="../typings/index.d.ts" />

export class Damage implements IDamage {
    time: number = 0;
    skill: ISkill;
    buffs: Array<string>;
    totalDamage: number;

    constructor(time: number, skill: ISkill, buffs: Array<string>, totalDamage: number) {
        this.time = time;
        this.skill = skill;
        this.buffs = buffs;
        this.totalDamage = totalDamage;
    }
} 