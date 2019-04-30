import { Dragoon } from './Dragoon';

export class DragoonTests {
    constructor() {
        QUnit.test("QUnit added to project", function (assert) {
            var expected = "result";
            assert.equal(expected, "result");
        });

        QUnit.test("All skills should have a name", function (assert) {
            var allAbilitiesHaveAName = true;
            for (var dragoonSkill in Dragoon) {
                var skill: ISkill = Dragoon[dragoonSkill];
                if (skill.name.length <= 0) {
                    allAbilitiesHaveAName = false;
                    console.log("Skill:  " + skill.name + " - Name:  " + skill.name);
                }
            }
            assert.equal(allAbilitiesHaveAName, true);
        });

        QUnit.test("All abilities should have a cooldown", function (assert) {
            var allAbilitiesHaveCooldowns = true;
            for (var dragoonSkill in Dragoon) {
                var skill: ISkill = Dragoon[dragoonSkill];
                if (skill.skillType == SkillTypes.Ability && skill.cooldown <= 0) {
                    allAbilitiesHaveCooldowns = false;
                    console.log("Skill:  " + skill.name + " - Cooldown:  " + skill.cooldown);
                }
            }
            assert.equal(allAbilitiesHaveCooldowns, true);
        });

        QUnit.test("All weapon skills should have potency", function (assert) {
            var allAbilitiesHavePotency = true;
            for (var dragoonSkill in Dragoon) {
                var skill: ISkill = Dragoon[dragoonSkill];
                if (skill.skillType == SkillTypes.WeaponSkill && skill.potency <= 0) {
                    allAbilitiesHavePotency = false;
                    console.log("Skill:  " + skill.name + " - Potency:  " + skill.potency);
                }
            }
            assert.equal(allAbilitiesHavePotency, true);
        });

        QUnit.test("All weapon skills should have tpCost (except wheel thrust and Fang and Claw)", function (assert) {
            var allAbilitiesHaveTpCost = true;
            for (var dragoonSkill in Dragoon) {
                var skill: ISkill = Dragoon[dragoonSkill];
                if (skill.skillType == SkillTypes.WeaponSkill && skill.tpCost <= 0) {
                    if (skill.name != "Wheeling Thrust" && skill.name != "Fang And Claw") {
                        allAbilitiesHaveTpCost = false;
                        console.log("Skill:  " + skill.name + " - TP Cost:  " + skill.tpCost);
                    }
                }
            }
            assert.equal(allAbilitiesHaveTpCost, true);
        });

        QUnit.test("All skills should have an animation duration", function (assert) {
            var allAbilitiesHaveAnimationDuration = true;
            for (var dragoonSkill in Dragoon) {
                var skill: ISkill = Dragoon[dragoonSkill];
                if (skill.animationDuration <= 0) {
                    allAbilitiesHaveAnimationDuration = false;
                    console.log("Skill:  " + skill.name + " - Animation Duration:  " + skill.animationDuration);
                }
            }
            assert.equal(allAbilitiesHaveAnimationDuration, true);
        });

        QUnit.test("If a skill has dot potency, it should also have dot duration", function (assert) {
            var abilitiesHaveBothDotDurationAndPotency = true;
            for (var dragoonSkill in Dragoon) {
                var skill: ISkill = Dragoon[dragoonSkill];
                if (skill.dotDuration > 0 || skill.dotPotency > 0) {
                    if (skill.dotDuration <= 0 || skill.dotPotency <= 0) {
                        abilitiesHaveBothDotDurationAndPotency = false;
                        console.log("Skill:  " + skill.name + " - Dot Duration:  " + skill.dotDuration + " - Dot Potency:  " + skill.dotPotency);
                    }
                }
            }
            assert.equal(abilitiesHaveBothDotDurationAndPotency, true);
        });

        QUnit.test("If a skill has buff potency, it should also have buff duration", function (assert) {
            var abilitiesHaveBothBuffDurationAndPotency = true;
            for (var dragoonSkill in Dragoon) {
                var skill: ISkill = Dragoon[dragoonSkill];
                if (skill.dotDuration > 0 || skill.dotPotency > 0) {
                    if (skill.dotDuration <= 0 || skill.dotPotency <= 0) {
                        abilitiesHaveBothBuffDurationAndPotency = false;
                        console.log("Skill:  " + skill.name + " - Buff Duration:  " + skill.buffDuration + " - Dot Potency:  " + skill.buffPotency);
                    }
                }
            }
            assert.equal(abilitiesHaveBothBuffDurationAndPotency, true);
        });
    } 
}