/// <reference path="../typings/index.d.ts" />

//import {SimEventType} from './enums/SimEventType'

export class SimEvent implements ISimEvent {
    timestamp: number;
    damage: IDamage;
    eventType: SimEventType;
    skill: ISkill;
    activeBuffs: Array<IActiveSkill>;

    constructor(timestamp: number, skill: ISkill, eventType: SimEventType, activeBuffs: Array<IActiveSkill> = null) {
        this.timestamp = timestamp;
        this.eventType = eventType;
        this.skill = skill;
        this.activeBuffs = activeBuffs;
    }
} 