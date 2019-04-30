interface ISimEvent {
    timestamp: number;
    eventType: SimEventType;
    damage: IDamage;
    skill: ISkill;
    activeBuffs: Array<IActiveSkill>;
} 