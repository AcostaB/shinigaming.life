interface IBaseSimulator {

    time: number;
    dotTime: number;
    globalCooldown: number;
    // TODO: make this generic
    dragoon: IDragoon;
    events: Array<ISimEvent>;
    damageLog: Array<IDamage>;
    ppsLog: Array<{pps: number, time: number}>;
    skillsOnCooldown: Array<ISkillOnCooldown>;
    activeDots: Array<IActiveSkill>;
    activeBuffs: Array<IActiveSkill>;
    totalPotency: number;
    nextInChain: Array<string>;
    chainGracePeriod: number;
    userActions: Array<IUserAction>;
    userActionsJSON: string;

    activateSkill(skill: ISkill): void;

    // Create dot events or other events (cooldown, buff end, dot end etc.)
    createSimEventsFromActivatedSkill(skill: ISkill): Array<ISimEvent>;

    addToSimEvents(events: Array<ISimEvent>): void;  
    processSimEvent(event: ISimEvent): void;
    processNextSimEvent(): void;
    determinePositionInSimEvents(event: ISimEvent): number;
    calculateSimEventTimestamp(skill: ISkill): number;
    calculateNextDotEventTimestamp(): number;
    addToActiveBuffs(skill: ISkill): void;
    addToActiveDots(skill: ISkill): void;
    removeFromActiveBuffs(skillName: string): void;
    removeFromActiveDots(skillName: string): void;

    removeFromSimEvents(skill: ISkill): void;
    removeFromSkillsOnCooldown(skillName: string): void;

    //#region override methods
    validateActivatedSkill(skill: ISkill): boolean;
    validateActivatedSkillModelSpecific(skill: ISkill): boolean;

    processAnimationFinishedEvent(event: ISimEvent): void;
    processDotEndEvent(event: ISimEvent): void;
    processBuffEndEvent(event: ISimEvent): void;
    processCooldownEvent(event: ISimEvent): void;
    processDotTickEvent(event: ISimEvent): void;
    processGlobalCooldownEvent(event: ISimEvent): void;
    processChainEndEvent(event: ISimEvent): void;

    createGlobalCooldownEvent(skill: ISkill): ISimEvent;
    createDotEvents(skill: ISkill): Array<ISimEvent>;
    createChainEndEvent(skill: ISkill): ISimEvent;
    createBuffEndEvent(skill: ISkill): ISimEvent;
    createCooldownEvent(skill: ISkill): ISimEvent;

    determineIfValidForGlobalCooldownEvent(skill: ISkill): boolean;
    determineIfValidForDotEvents(skill: ISkill): boolean;
    determineIfValidForChainEndEvent(skill: ISkill): boolean;
    determineIfValidForBuffEndEvent(skill: ISkill): boolean;
    determineIfValidForCooldownEvent(skill: ISkill): boolean;

    classSpecificEventProcessing(event: ISimEvent): void;
    //#endregion

    updateBuffEndTime(skillId: string, newEndTime: number): void;
    removeOneTimeUseBuff(event: ISimEvent): void;
    determineIfBuffCanBeApplied(skill: ISkill, buffName: string): boolean;
    determineIfBuffShouldBeRemoved(event: ISimEvent, skillName: string): boolean;

    addToDamageLog(damage: IDamage): void;
    createDamageEntry(time: number, skill: ISkill, buffs: Array<IActiveSkill>, dotDamage: boolean, correctPositional: boolean, followedChain: boolean): IDamage;
    calculateTotalPotency(skill: ISkill, potency: number, buffs: Array<IActiveSkill>): number;

    advanceTime(time: number): void;

    formatTimer(time: number): number;

    reset(): void;
    importUserActions(userActions: Array<IUserAction>): void;
    stringify(userActions: Array<IUserAction>): string
}