import { BaseSimulator } from './BaseSimulator';
import { SimEvent } from './SimEvent';

export class DragoonSimulator extends BaseSimulator {

    determineIfBuffShouldBeRemoved(event: ISimEvent, skillName: string): boolean {

        if (skillName === "PowerSurge" && event.eventType === SimEventType.AnimationFinished && (event.skill.id === "Jump" || event.skill.id === "SpineshatterDive")) {
            return true;
        }

        if (skillName === "LifeSurge" && event.eventType === SimEventType.AnimationFinished && event.skill.skillType === SkillTypes.WeaponSkill) {
            return true;
        }

        // TODO this would be a good place to evaluate if the blood of the dragon buff should fall off

        return false;
    }

    determineIfBuffCanBeApplied(skill: ISkill, buffName: string): boolean {
        if (buffName === "LifeSurge" && (skill.skillType !== SkillTypes.WeaponSkill)) {
            return false;
        }

        if (buffName === "PowerSurge" && (skill.id !== "Jump" && skill.id !== "SpineshatterDive")) {
            return false;
        }

        if (buffName === "BloodOfTheDragon" && (skill.id !== "Jump" && skill.id !== "SpineshatterDive")) {
            return false;
        }

        return true;
    }

    classSpecificEventProcessing(event: ISimEvent): void {
        if (event.skill.id === "Geirskogul" && event.eventType === SimEventType.AnimationFinished) {
            var bloodOfTheDragonBuffEndEvent: ISimEvent; 
            this.events.forEach((value, index) => {
                if (value.skill.id === "BloodOfTheDragon" && value.eventType === SimEventType.BuffEnd) {
                    bloodOfTheDragonBuffEndEvent = value;
                }
            });

            this.removeFromSimEvents(this.dragoon.BloodOfTheDragon);
            var newEndTime: number;
            if (bloodOfTheDragonBuffEndEvent.timestamp - this.time <= 10000) {
                this.removeFromActiveBuffs("BloodOfTheDragon");
            } else {
                newEndTime = bloodOfTheDragonBuffEndEvent.timestamp - 10000;
                var newBuffEndEvent = new SimEvent(newEndTime, this.dragoon.BloodOfTheDragon, SimEventType.BuffEnd);
                this.addToSimEvents([newBuffEndEvent]);
            }
            this.updateBuffEndTime("BloodOfTheDragon", newEndTime);
        }

        if ((event.skill.id === "FangAndClaw" || event.skill.id === "WheelingThrust") && event.eventType === SimEventType.AnimationFinished) {
            var bloodOfTheDragonBuffEndEvent: ISimEvent;
            var newBuffEndEvent: ISimEvent;

            this.events.forEach((value, index) => {
                if (value.skill.id === "BloodOfTheDragon" && value.eventType === SimEventType.BuffEnd) {
                    bloodOfTheDragonBuffEndEvent = value;
                }
            });

            this.removeFromSimEvents(this.dragoon.BloodOfTheDragon);
            var newEndTime: number;
            if (bloodOfTheDragonBuffEndEvent.timestamp - this.time > 15000) {
                newEndTime = this.time + 30000;
            } else {
                newEndTime = bloodOfTheDragonBuffEndEvent.timestamp + 15000;
            }
            newBuffEndEvent = new SimEvent(newEndTime, this.dragoon.BloodOfTheDragon, SimEventType.BuffEnd);
            this.updateBuffEndTime("BloodOfTheDragon", newEndTime);
            this.addToSimEvents([newBuffEndEvent]);
        }
    }

    validateActivatedSkillModelSpecific(skill: ISkill): boolean {
        if ((skill.id === "WheelingThrust" && !this.activeBuffs.some(ab => ab.skill.id === "BloodOfTheDragon"))
            || (skill.id === "FangAndClaw" && !this.activeBuffs.some(ab => ab.skill.id === "BloodOfTheDragon"))
            || (skill.id === "Geirskogul" && !this.activeBuffs.some(ab => ab.skill.id === "BloodOfTheDragon"))
            || (skill.id === "WheelingThrust" && !this.nextInChain.some(skillId => skillId === "WheelingThrust"))
            || (skill.id === "FangAndClaw" && !this.nextInChain.some(skillId => skillId === "FangAndClaw"))) {
            return false;
        }
        return true; 
    }
} 