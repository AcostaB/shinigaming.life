import { Dragoon } from './Dragoon';
import { DragoonArray } from './Dragoon';
import { SimEvent } from './SimEvent';
import { Damage } from './Damage';
import { PPSEntry } from './PPSEntry';
import { UserAction } from './UserAction';

export class BaseSimulator implements IBaseSimulator {

    // Properties
    private _time: number = 0;

    public time: number = 0;
    public totalPotency: number = 0;

    pps: number = 0;
    // WHAT IS DOT TIME??
    dotTime: number = 0;
    globalCooldown: number = 2500;

    // Need to remove this. I dont want the base simulator to be model dependent.
    dragoon: IDragoon = Dragoon;
    dragoonArray: Array<ISkill> = DragoonArray;

    events: Array<ISimEvent> = [];

    activeDots: Array<IActiveSkill> = [];
    activeBuffs: Array<IActiveSkill> = [];

    damageLog: Array<IDamage> = [];
    ppsLog: Array<IPPSEntry> = [];
    userActions: Array<IUserAction> = [];
    userActionsJSON: string;
    userActionsImport: string;

    skillsOnCooldown: Array<ISkillOnCooldown> = [];

    nextInChain: Array<string> = [];

    chainGracePeriod: number = 5000;

    // Methods
    activateSkill(skill: ISkill): void {
        // TODO there needs to be some sort of gate here. A user cant use ANY skill here if another skill is still in the animation
            // this might only be a problem with weaponskills and abilities in cooldown. 
                // No, this is a problem for everything because a user can click a skill multiple times, or simply click a skill on cooldown 
        // TODO this validation of blood of the dragon should be extracted
        if (!this.validateActivatedSkill(skill)) {
            return;
        }

        if (!this.validateActivatedSkillModelSpecific(skill)) {
            return;
        }
        
        this.userActions.push(new UserAction(skill.id, this.time));
        this.userActionsJSON = this.stringify(this.userActions).toString(); 

        //TODO i dont like this. this is always removing the events. and it doesnt specify what it is removing.
        this.removeFromSimEvents(skill);
        this.removeFromActiveBuffs(skill.id);
        this.removeFromActiveDots(skill.id);

        // TODO: this if statement needs to also consider that maybe the global cooltime is not active. 
        // keep processing events until global cooldown is finished.
        if (skill.skillType === SkillTypes.WeaponSkill && this.events.some(simEvent => simEvent.eventType === SimEventType.GlobalCooldown)) {
            var globalCooldown: boolean = true;
            // keep processing events until the activated skill has finished its animation
            while (globalCooldown) {
                if (this.events[0].eventType === SimEventType.GlobalCooldown) {
                    globalCooldown = false;
                }
                this.processNextSimEvent();
            } 
        }

        var buffs: Array<IActiveSkill> = this.activeBuffs.slice();

        // Create animation event
        var animationEvent: ISimEvent = new SimEvent(this.time + skill.animationDuration, skill, SimEventType.AnimationFinished, buffs);
        var eventPositionInEventCollection: number = this.determinePositionInSimEvents(animationEvent);
        if (eventPositionInEventCollection === this.events.length) {
            this.events.push(animationEvent);
        } else {
            this.events.splice(eventPositionInEventCollection, 0, animationEvent);
        } 

        var skillInAnimation: boolean = true;
        // keep processing events until the activated skill has finished its animation
        while (skillInAnimation) {
            if (this.events[0].eventType === SimEventType.AnimationFinished && this.events[0].skill.id == skill.id) {
                skillInAnimation = false;
            }
            this.processNextSimEvent();
        }

    }

    createSimEventsFromActivatedSkill(skill: ISkill): Array<ISimEvent> {
        //this.removeFromSimEvents(skill);

        var events: Array<ISimEvent> = [];

        // TODO make this prettier big = (x > 10) ? "greater 10" : (x < 5) ? "less 5" : "between 5 and 10";
        if (this.createGlobalCooldownEvent(skill)) { events.push(this.createGlobalCooldownEvent(skill)); }
        if (this.createDotEvents(skill)) { events = events.concat(this.createDotEvents(skill)); }
        if (this.createChainEndEvent(skill)) { events.push(this.createChainEndEvent(skill)); }
        if (this.createBuffEndEvent(skill)) { events.push(this.createBuffEndEvent(skill)); }
        if (this.createCooldownEvent(skill)) { events.push(this.createCooldownEvent(skill)); }

        return events;
    }

    addToSimEvents(events: Array<ISimEvent>): void {
        var vm: IBaseSimulator = this;
        events.forEach((value, index) => {
            var eventCollectionIndexPosition: number = this.determinePositionInSimEvents(value);
            if (eventCollectionIndexPosition === vm.events.length) {
                vm.events.push(value);
            } else {
                vm.events.splice(eventCollectionIndexPosition, 0, value);
            }
        });
    }

    processSimEvent(event: ISimEvent): void {
        this.processAnimationFinishedEvent(event);
        this.processDotEndEvent(event);
        this.processBuffEndEvent(event);
        this.processCooldownEvent(event);
        this.processDotTickEvent(event);
        this.processGlobalCooldownEvent(event);
        this.processChainEndEvent(event);

        this.removeOneTimeUseBuff(event);

        this.classSpecificEventProcessing(event);
    }

    processNextSimEvent(): void {
        // Advance the time
        this.time = this.events[0].timestamp;
        this.pps = Math.floor((this.totalPotency / (this._time / 1000)) * 100) / 100;
        
        // TODO this should handle the things that happen when time passes. I.E. handle updating the counter for buffs etc, handle the animation of skill cooldowns
            // on second thought this should be handled in the process event method
                // on third thought maybe not

        var event = this.events[0]; 
        this.events.splice(0, 1); 
        this.processSimEvent(event);
    }

    // COMPLETE
    determinePositionInSimEvents(event: ISimEvent): number {

        if (this.events.length === 0) {
            return 0;
        }

        var arrayIndex: number = 0;
        this.events.forEach((value, index) => {
            if (value.timestamp <= event.timestamp) {
                arrayIndex++;
            }
        });
        return arrayIndex;
    }

    calculateSimEventTimestamp(skill: ISkill): number { throw new Error("Not implemented"); }

    calculateNextDotEventTimestamp(): number {
        return this.time + (3000 - this.time % 3000);
    }

    // TODO this seems useless
    addToActiveBuffs(skill: ISkill): void {}

    // TODO this seems useless
    addToActiveDots(skill: ISkill): void { }

    removeFromActiveBuffs(skillName: string): void {
        for (var i = this.activeBuffs.length; i > 0; i--) {
            if (this.activeBuffs[i - 1].skill.id === skillName) { this.activeBuffs.splice(i - 1, 1); }
        }
    }

    removeFromActiveDots(skillName: string): void {
        for (var i = this.activeDots.length; i > 0; i--) {
            if (this.activeDots[i - 1].skill.id === skillName) { this.activeDots.splice(i - 1, 1); }
        }
    }

    removeFromSkillsOnCooldown(skillName: string): void {
        for (var i = this.skillsOnCooldown.length; i > 0; i--) {
            if (this.skillsOnCooldown[i - 1].name === skillName) { this.skillsOnCooldown.splice(i - 1, 1); }

        }
    }

    removeFromSimEvents(skill: ISkill): void {
        for (var i = this.events.length; i > 0; i--) {
            if (this.events[i - 1].skill.id === skill.id && this.events[i - 1].eventType !== SimEventType.GlobalCooldown) {
                this.events.splice(i - 1, 1);
                continue;
            }

            if (skill.buffDuration > 0 && skill.id === this.events[i - 1].skill.id && this.events[i - 1].eventType === SimEventType.BuffEnd) {
                this.events.splice(i - 1, 1);
            }
        }
        // TODO: this method should also probably handle removing from active skills
        // Be careful with this. If you add an active skill then overwrite it, this method could remove the 2nd active skill that should have stayed in the collection.
    }

    removeOneTimeUseBuff(event: ISimEvent): void {
        var self: BaseSimulator = this;
        if (event.activeBuffs) {
            event.activeBuffs.forEach((value, index) => {
                if (self.determineIfBuffShouldBeRemoved(event, value.skill.id)) {
                    // Remove the buff end event
                    for (var i = self.events.length; i > 0; i--) {
                        if (self.events[i - 1].eventType === SimEventType.BuffEnd && self.events[i - 1].skill.id === value.skill.id) {
                            self.events.splice(i - 1, 1);
                        }
                    }

                    // Remove the buff from active buffs
                    for (var i = self.activeBuffs.length; i > 0; i--) {
                        if (self.activeBuffs[i - 1].skill.id === value.skill.id) {
                            self.activeBuffs.splice(i - 1, 1);
                        }
                    }
                }
                // TODO there should maybe be some logic in here to address buff dropping logic. Alternative would be to create a buff end event.
            });
        }
    }

    addToDamageLog(damage: IDamage): void { }

    advanceTime(time: number): void {
        var continueAdvancing: boolean = true;
        while (continueAdvancing) {
            if (this.events.length === 0 || this.events[0].timestamp > time) {
                this.time = time;
                this.pps = Math.floor((this.totalPotency / (this._time / 1000)) * 100) / 100;

                continueAdvancing = false;
            } else {
                this.processNextSimEvent();
            }
        } 
    }

    createDamageEntry(time: number, skill: ISkill, buffs: Array<IActiveSkill>, dotDamage: boolean, correctPositional: boolean, followedChain: boolean): IDamage {
        var potency: number = 0;
        
        // Chaos thrust, WT, FnC have both positional and chain requirements
        if (dotDamage) {
            potency = skill.dotPotency;
        } else {
            if (!followedChain) {
                potency = skill.missedChainPotency;
            }

            if (!correctPositional) {
                potency = skill.missedPositionalPotency;
            }

            if (followedChain && correctPositional) {
                potency = skill.potency;
            }
        }

        var totalPotency: number = this.calculateTotalPotency(skill, potency, buffs);
        var buffList: Array<string> = [];
        buffs.forEach((value, index) => { buffList.push(value.skill.id)});

        return new Damage(time, skill, buffList, totalPotency);
    }

    calculateTotalPotency(skill: ISkill, potency: number, buffs: Array<IActiveSkill>): number {
        var self: IBaseSimulator = this;
        var basePotency: number = potency;
        var buffedPotency: number = 0;
        if (buffs) {
            buffs.forEach((activeBuff, index) => {
                var trimmedString: string = activeBuff.skill.id;
                if (self.determineIfBuffCanBeApplied(skill, activeBuff.skill.id) && self.dragoon[trimmedString] != null && self.dragoon[trimmedString].buffPotency) {
                    buffedPotency += self.dragoon[trimmedString].buffPotency * basePotency;
                }
            });
        }
        // the sum of base damage plus the buffed damage
        return basePotency + buffedPotency;
    }

    private removeTheChainEndEvent(): void {
        for (var i = this.events.length; i > 0; i--) {
            if (this.events[i - 1].eventType === SimEventType.ChainEnd) {
                this.events.splice(i - 1, 1);
            }
        }
    }

    private handleChainChanges(event: ISimEvent): void {
        // TODO this needs to also handle removing the chain end event. 
        // TODO removing the event or changing the string should probably happen AFTER the events are created or else they will use incorrect data in evaluation 

        // Nothing about a non weaponskill affects the chain ...
        // TODO ... EXCEPT blood of the dragon
        if (event.skill.skillType !== SkillTypes.WeaponSkill) {
            return;
        }

        // Chain is broken by using different skill
        if (event.skill.skillType === SkillTypes.WeaponSkill && !this.nextInChain.some(skill => skill === event.skill.id)) {
            this.nextInChain = [];
        }

        // Time ran out
        if (event.eventType === SimEventType.ChainEnd) {
            this.nextInChain = [];
        }

        // Starting a new chain
        // TODO this seems like a bug. What if i use something like jump in between chain skills?
        //  this should be handled by the return a few lines above. but should probably still test
        if (event.skill.previousInChain.length === 0 && event.skill.nextInChain.length !== 0) {
            this.nextInChain = event.skill.nextInChain;

        // This is the correct next skill in the chain
        } else if (this.nextInChain.some(skillId => skillId === event.skill.id)) {
            this.nextInChain = event.skill.nextInChain;

        // This is the last skill in the chain
        } else if (!event.skill.nextInChain.length) {
            this.nextInChain = [];
        }
        this.removeTheChainEndEvent();
    }

    validateActivatedSkill(skill: ISkill): boolean {
        return !this.events.some(simEvent => simEvent.eventType === SimEventType.Cooldown && simEvent.skill.id === skill.id);
    }


    //#region Event Creation Methods
    createGlobalCooldownEvent(skill: ISkill): ISimEvent {
        //var cooldownEvent: ISimEvent = null;
        if (this.determineIfValidForGlobalCooldownEvent(skill)) {
            var globalCooldowntimestamp: number = this.time + (this.globalCooldown - skill.animationDuration);
            return new SimEvent(globalCooldowntimestamp, skill, SimEventType.GlobalCooldown);
        } else { return null; }
    }

    createDotEvents(skill: ISkill): Array<ISimEvent> {
        var events: Array<ISimEvent> = [];
        if (this.determineIfValidForDotEvents(skill)) {
            // Create the DoT tick events
            var amountOfDotTicks: number = skill.dotDuration / 3000;
            // This assumes that if a skill is activating then the global time is accurate and in present time
            var nextGlobalDotTickTimestamp: number = this.calculateNextDotEventTimestamp();
            for (var i = 0; i <= amountOfDotTicks - 1; i++) {
                var timestamp: number = nextGlobalDotTickTimestamp + 3000 * i;
                // slice is to copy object. Javascript passed by reference so deleting from collection deleted the value here
                events.push(new SimEvent(timestamp, skill, SimEventType.DotTick, this.activeBuffs.slice()));
            }

            // Create the DoT end event
            events.push(new SimEvent(this.time + skill.dotDuration, skill, SimEventType.DotEnd));
            return events;
        } else { return null; }
    }

    createChainEndEvent(skill: ISkill): ISimEvent {
        // be careful with the logic. the first in the chain does not need a previous in chain property
        // take into account the exception that is fang and claw and wheeling thrust. 
        if (this.determineIfValidForChainEndEvent(skill)) {
            return new SimEvent(this.time + this.chainGracePeriod, skill, SimEventType.ChainEnd);
        } else { return null; }
    }

    createBuffEndEvent(skill: ISkill): ISimEvent {
        if (this.determineIfValidForBuffEndEvent(skill)) {
             return new SimEvent((this.time) + skill.buffDuration, skill, SimEventType.BuffEnd);
        } else { return null; }
    }

    createCooldownEvent(skill: ISkill): ISimEvent {
        if (this.determineIfValidForCooldownEvent(skill)) {
            return new SimEvent((this.time - skill.animationDuration) + skill.cooldown, skill, SimEventType.Cooldown);
        } else { return null; }
    }

    //#endregion 

    //#region Event Processing Methods
    processAnimationFinishedEvent(event: ISimEvent): void {
        if (event.eventType === SimEventType.AnimationFinished) {

            var followedChain: boolean = false;

            if (!event.skill.previousInChain.length) {
                followedChain = true;
            }

            // Modify this logic for fnc n wt
            if (event.skill.previousInChain && this.nextInChain.some(skill => skill === event.skill.id)) {
                followedChain = true;
            }

            // Avoid passing by reference by using splice
            var buffs: Array<IActiveSkill> = this.activeBuffs.slice();

            // If skill has base potency, add it to the damage log
            if (event.skill.potency) {
                // TODO: these last two bools can not be hardcoded.
                var damage: IDamage = this.createDamageEntry(this.time, event.skill, buffs, false, true, followedChain);
                this.damageLog.push(damage);
                this.totalPotency += damage.totalDamage;
                this.pps = Math.floor((this.totalPotency / (this.time / 1000)) * 100) / 100;
                this.ppsLog.push(new PPSEntry(this.pps, this.time));
            }

            // If the skill has a cooldown, then add to skillsOnCooldown 
            if (event.skill.cooldown) {
                this.skillsOnCooldown.push({ name: event.skill.id, endTime: this.time + event.skill.cooldown });
            }
            
            // Add to the active skill collection if necessary
            if (event.skill.dotDuration || event.skill.buffDuration) {
                if (!event.skill.previousInChain.length || (event.skill.previousInChain.length > 0 && this.nextInChain.some(skillId => skillId === event.skill.id))) {

                    if (event.skill.dotDuration) {
                        this.activeDots.push({ skill: event.skill, startTime: this.time, endTime: this.time + event.skill.dotDuration });
                    }

                    if (event.skill.buffDuration) {
                        this.activeBuffs.push({ skill: event.skill, startTime: this.time, endTime: this.time + event.skill.buffDuration });
                    }
                }
            }

            var events: Array<ISimEvent> = this.createSimEventsFromActivatedSkill(event.skill);
            this.handleChainChanges(event);
            this.addToSimEvents(events);
        }
    }

    processDotEndEvent(event: ISimEvent): void {
        if (event.eventType === SimEventType.DotEnd) {
            this.removeFromActiveDots(event.skill.id);
        }
    }

    processBuffEndEvent(event: ISimEvent): void {
        if (event.eventType === SimEventType.BuffEnd) {
            this.removeFromActiveBuffs(event.skill.id);
        }
    }

    processCooldownEvent(event: ISimEvent): void {
        if (event.eventType === SimEventType.Cooldown) {
            // Remove from the active buffs collection 
            this.removeFromSkillsOnCooldown(event.skill.id);
        }
    }

    processDotTickEvent(event: ISimEvent): void {
        if (event.eventType === SimEventType.DotTick) {
            // TODO: these last two bools can not be hardcoded.
            var damage: IDamage = this.createDamageEntry(this.time, event.skill, event.activeBuffs, true, true, true);
            this.damageLog.push(damage);
            this.totalPotency += damage.totalDamage;
            this.pps = Math.floor((this.totalPotency / (this.time / 1000)) * 100) / 100;
            this.ppsLog.push(new PPSEntry(this.pps, this.time));
        }
    }

    processGlobalCooldownEvent(event: ISimEvent): void {
        if (event.eventType === SimEventType.GlobalCooldown) {

        }
    }

    processChainEndEvent(event: ISimEvent): void {
        if (event.eventType === SimEventType.ChainEnd) {
            this.nextInChain = [];
        }
    }
    //#endregion 

    //#region Determine if valid for event creation methods

    determineIfValidForGlobalCooldownEvent(skill: ISkill): boolean {
        return skill.skillType === SkillTypes.WeaponSkill;
    }

    determineIfValidForDotEvents(skill: ISkill): boolean {
        return (skill.dotDuration > 0 && skill.dotPotency > 0)
            && (!skill.previousInChain.length
                || (skill.previousInChain.length && this.nextInChain.some(skillId => skillId === skill.id)));
    }

    determineIfValidForChainEndEvent(skill: ISkill): boolean {
        return ((!skill.previousInChain.length)&& skill.nextInChain.length > 0)
            || (this.nextInChain.some(skillId => skillId === skill.id) && skill.nextInChain.length > 0);
    }

    determineIfValidForBuffEndEvent(skill: ISkill): boolean {
        return skill.buffDuration > 0;
    }

    determineIfValidForCooldownEvent(skill: ISkill): boolean {
        return skill.cooldown > 0;
    }


    //#endregion 

    //#region Override Methods
    determineIfBuffCanBeApplied(skill: ISkill, buffName: string): boolean { return true; }

    determineIfBuffShouldBeRemoved(event: ISimEvent, skillName: string): boolean { return false; }

    classSpecificEventProcessing(event: ISimEvent): void { };

    validateActivatedSkillModelSpecific(skill: ISkill): boolean { return true };
    //#endregion

    // not in interface
    formatTime(time: number) : string {
        var minutes: number = Math.floor(time / 60000);
        var seconds: number = (time % 60000)/1000;
        if (minutes > 0) {
            return minutes + "m " + seconds + "s";
        }
        return seconds + "s";
    } 

    formatTimer(time: number): number {
        return Math.floor(time / 1000);
    }

    updateBuffEndTime(skillName: string, newEndTime: number): void {
        this.activeBuffs.forEach((value, index) => {
            if (value.skill.id == skillName) {
                value.endTime = newEndTime;
            }
        });
    }

    reset() {
        this.time = 0;
        this.pps = 0;
        this.events = [];
        this.damageLog = [];
        this.ppsLog.length = 0;
        this.skillsOnCooldown = [];
        this.activeDots = [];
        this.activeBuffs = [];
        this.totalPotency = 0;
        this.nextInChain = [];
        this.userActions = [];
    }

    importUserActions(): void {
        this.reset();

        JSON.parse(this.userActionsImport).forEach((value, index) => {
            if (this.time != value.time) {
               this.advanceTime(value.time - this.time);
            }

            this.activateSkill(this.dragoon[value.name]);
        });
    } 

    stringify(userActions: Array<IUserAction>): string {
        return JSON.stringify(userActions);
    }
}