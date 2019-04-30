define('app',["require", "exports"], function (require, exports) {
    "use strict";
    var App = (function () {
        function App() {
        }
        App.prototype.configureRouter = function (config, router) {
            config.title = 'Dragoon';
            config.map([
                { route: ['', "dragoon"], moduleId: 'Simulator', name: 'Dragoon' },
                { route: ['tests'], moduleId: 'Tests', name: 'Tests' }
            ]);
            this.router = router;
        };
        return App;
    }());
    exports.App = App;
});

define('Dragoon',["require", "exports"], function (require, exports) {
    "use strict";
    exports.Dragoon = {
        TrueThrust: {
            id: "TrueThrust",
            name: "True Thrust",
            skillType: SkillTypes.WeaponSkill,
            potency: 150,
            missedChainPotency: 0,
            missedPositionalPotency: 0,
            dotDuration: 0,
            dotPotency: 0,
            animationDuration: 1300,
            buffDuration: 0,
            buffPotency: 0,
            cooldown: 0,
            mpCost: 0,
            tpCost: 70,
            damageType: DamageTypes.Piercing,
            addedBuff: false,
            aoe: false,
            positionalRequirement: false,
            nextInChain: ["VorpalThrust"],
            previousInChain: []
        },
        VorpalThrust: {
            id: "VorpalThrust",
            name: "Vorpal Thrust",
            skillType: SkillTypes.WeaponSkill,
            potency: 200,
            missedChainPotency: 150,
            missedPositionalPotency: 0,
            dotDuration: 0,
            dotPotency: 0,
            animationDuration: 1300,
            buffDuration: 0,
            buffPotency: 0,
            cooldown: 0,
            mpCost: 0,
            tpCost: 60,
            damageType: DamageTypes.Piercing,
            addedBuff: false,
            aoe: false,
            positionalRequirement: false,
            nextInChain: ["FullThrust"],
            previousInChain: ["TrueThrust"]
        },
        FullThrust: {
            id: "FullThrust",
            name: "Full Thrust",
            skillType: SkillTypes.WeaponSkill,
            potency: 360,
            missedChainPotency: 100,
            missedPositionalPotency: 0,
            dotDuration: 0,
            dotPotency: 0,
            animationDuration: 1300,
            buffDuration: 0,
            buffPotency: 0,
            cooldown: 0,
            mpCost: 0,
            tpCost: 60,
            damageType: DamageTypes.Piercing,
            addedBuff: false,
            aoe: false,
            positionalRequirement: false,
            nextInChain: ["WheelingThrust", "FangAndClaw"],
            previousInChain: ["VorpalThrust"]
        },
        ImpulseDrive: {
            id: "ImpulseDrive",
            name: "Impulse Drive",
            skillType: SkillTypes.WeaponSkill,
            potency: 180,
            missedChainPotency: 0,
            missedPositionalPotency: 0,
            dotDuration: 0,
            dotPotency: 0,
            animationDuration: 1300,
            buffDuration: 0,
            buffPotency: 0,
            cooldown: 0,
            mpCost: 0,
            tpCost: 70,
            damageType: DamageTypes.Piercing,
            addedBuff: false,
            aoe: false,
            positionalRequirement: false,
            nextInChain: ["Disembowel"],
            previousInChain: []
        },
        Disembowel: {
            id: "Disembowel",
            name: "Disembowel",
            skillType: SkillTypes.WeaponSkill,
            potency: 220,
            missedChainPotency: 100,
            missedPositionalPotency: 0,
            dotDuration: 0,
            dotPotency: 0,
            animationDuration: 1300,
            buffDuration: 20000,
            buffPotency: 0.1,
            cooldown: 0,
            mpCost: 0,
            tpCost: 60,
            damageType: DamageTypes.Piercing,
            addedBuff: true,
            aoe: false,
            positionalRequirement: false,
            nextInChain: ["ChaosThrust"],
            previousInChain: ["ImpulseDrive"]
        },
        ChaosThrust: {
            id: "ChaosThrust",
            name: "Chaos Thrust",
            skillType: SkillTypes.WeaponSkill,
            potency: 250,
            missedChainPotency: 150,
            missedPositionalPotency: 200,
            dotDuration: 30000,
            dotPotency: 35,
            animationDuration: 1300,
            buffDuration: 0,
            buffPotency: 0,
            cooldown: 0,
            mpCost: 0,
            tpCost: 60,
            damageType: DamageTypes.Piercing,
            addedBuff: true,
            aoe: false,
            positionalRequirement: true,
            nextInChain: ["WheelingThrust", "FangAndClaw"],
            previousInChain: ["Disembowel"]
        },
        FangAndClaw: {
            id: "FangAndClaw",
            name: "Fang And Claw",
            skillType: SkillTypes.WeaponSkill,
            potency: 290,
            missedChainPotency: 0,
            missedPositionalPotency: 180,
            dotDuration: 0,
            dotPotency: 0,
            animationDuration: 1300,
            buffDuration: 0,
            buffPotency: 0,
            cooldown: 0,
            mpCost: 0,
            tpCost: 0,
            damageType: DamageTypes.Piercing,
            addedBuff: true,
            aoe: false,
            positionalRequirement: true,
            nextInChain: [],
            previousInChain: ["Fang And Claw", "Wheeling Thrust"]
        },
        WheelingThrust: {
            id: "WheelingThrust",
            name: "Wheeling Thrust",
            skillType: SkillTypes.WeaponSkill,
            potency: 290,
            missedChainPotency: 0,
            missedPositionalPotency: 180,
            dotDuration: 0,
            dotPotency: 0,
            animationDuration: 1300,
            buffDuration: 0,
            buffPotency: 0,
            cooldown: 0,
            mpCost: 0,
            tpCost: 0,
            damageType: DamageTypes.Piercing,
            addedBuff: true,
            aoe: false,
            positionalRequirement: true,
            nextInChain: [],
            previousInChain: ["Fang And Claw", "Wheeling Thrust"]
        },
        Geirskogul: {
            id: "Geirskogul",
            name: "Geirskogul",
            skillType: SkillTypes.Ability,
            potency: 200,
            missedChainPotency: 0,
            missedPositionalPotency: 180,
            dotDuration: 0,
            dotPotency: 0,
            animationDuration: 1300,
            buffDuration: 0,
            buffPotency: 0,
            cooldown: 10000,
            mpCost: 0,
            tpCost: 0,
            damageType: DamageTypes.Piercing,
            addedBuff: true,
            aoe: true,
            positionalRequirement: true,
            nextInChain: [],
            previousInChain: []
        },
        Feint: {
            id: "Feint",
            name: "Feint",
            skillType: SkillTypes.WeaponSkill,
            potency: 120,
            missedChainPotency: 0,
            missedPositionalPotency: 0,
            dotDuration: 0,
            dotPotency: 0,
            animationDuration: 1300,
            buffDuration: 0,
            buffPotency: 0,
            cooldown: 0,
            mpCost: 0,
            tpCost: 80,
            damageType: DamageTypes.Piercing,
            addedBuff: false,
            aoe: false,
            positionalRequirement: false,
            nextInChain: [],
            previousInChain: []
        },
        KeenFlurry: {
            id: "KeenFlurry",
            name: "Keen Flurry",
            skillType: SkillTypes.Ability,
            potency: 0,
            missedChainPotency: 0,
            missedPositionalPotency: 0,
            dotDuration: 0,
            dotPotency: 0,
            animationDuration: 1300,
            buffDuration: 20000,
            buffPotency: 0,
            cooldown: 90000,
            mpCost: 0,
            tpCost: 0,
            damageType: DamageTypes.Piercing,
            addedBuff: false,
            aoe: false,
            positionalRequirement: false,
            nextInChain: [],
            previousInChain: []
        },
        LegSweep: {
            id: "LegSweep",
            name: "Leg Sweep",
            skillType: SkillTypes.Ability,
            potency: 130,
            missedChainPotency: 0,
            missedPositionalPotency: 0,
            dotDuration: 0,
            dotPotency: 0,
            animationDuration: 1300,
            buffDuration: 0,
            buffPotency: 0,
            cooldown: 30000,
            mpCost: 0,
            tpCost: 0,
            damageType: DamageTypes.Piercing,
            addedBuff: false,
            aoe: false,
            positionalRequirement: false,
            nextInChain: [],
            previousInChain: []
        },
        HeavyThrust: {
            id: "HeavyThrust",
            name: "Heavy Thrust",
            skillType: SkillTypes.WeaponSkill,
            potency: 170,
            missedChainPotency: 0,
            missedPositionalPotency: 0,
            dotDuration: 0,
            dotPotency: 0,
            animationDuration: 1300,
            buffDuration: 24000,
            buffPotency: 0.15,
            cooldown: 0,
            mpCost: 0,
            tpCost: 70,
            damageType: DamageTypes.Piercing,
            addedBuff: true,
            aoe: false,
            positionalRequirement: false,
            nextInChain: ["RingOfThorns"],
            previousInChain: []
        },
        Phlebotomize: {
            id: "Phlebotomize",
            name: "Phlebotomize",
            skillType: SkillTypes.WeaponSkill,
            potency: 170,
            missedChainPotency: 0,
            missedPositionalPotency: 0,
            dotDuration: 24000,
            dotPotency: 30,
            animationDuration: 1300,
            buffDuration: 0,
            buffPotency: 0,
            cooldown: 0,
            mpCost: 0,
            tpCost: 90,
            damageType: DamageTypes.Piercing,
            addedBuff: true,
            aoe: false,
            positionalRequirement: false,
            nextInChain: [],
            previousInChain: []
        },
        PiercingTalon: {
            id: "PiercingTalon",
            name: "Piercing Talon",
            skillType: SkillTypes.WeaponSkill,
            potency: 120,
            missedChainPotency: 0,
            missedPositionalPotency: 0,
            dotDuration: 0,
            dotPotency: 0,
            animationDuration: 1300,
            buffDuration: 0,
            buffPotency: 0,
            cooldown: 0,
            mpCost: 0,
            tpCost: 130,
            damageType: DamageTypes.Piercing,
            addedBuff: false,
            aoe: false,
            positionalRequirement: false,
            nextInChain: [],
            previousInChain: []
        },
        DoomSpike: {
            id: "DoomSpike",
            name: "Doom Spike",
            skillType: SkillTypes.WeaponSkill,
            potency: 160,
            missedChainPotency: 0,
            missedPositionalPotency: 0,
            dotDuration: 0,
            dotPotency: 0,
            animationDuration: 1300,
            buffDuration: 0,
            buffPotency: 0,
            cooldown: 0,
            mpCost: 0,
            tpCost: 160,
            damageType: DamageTypes.Piercing,
            addedBuff: false,
            aoe: true,
            positionalRequirement: false,
            nextInChain: [],
            previousInChain: []
        },
        RingOfThorns: {
            id: "RingOfThorns",
            name: "Ring Of Thorns",
            skillType: SkillTypes.WeaponSkill,
            potency: 150,
            missedChainPotency: 100,
            missedPositionalPotency: 0,
            dotDuration: 0,
            dotPotency: 0,
            animationDuration: 1300,
            buffDuration: 0,
            buffPotency: 0,
            cooldown: 0,
            mpCost: 0,
            tpCost: 120,
            damageType: DamageTypes.Piercing,
            addedBuff: false,
            aoe: true,
            positionalRequirement: false,
            nextInChain: [],
            previousInChain: ["HeavyThrust"]
        },
        ElusiveJump: {
            id: "ElusiveJump",
            name: "Elusive Jump",
            skillType: SkillTypes.Ability,
            potency: 0,
            missedChainPotency: 0,
            missedPositionalPotency: 0,
            dotDuration: 0,
            dotPotency: 0,
            animationDuration: 1300,
            buffDuration: 0,
            buffPotency: 0,
            cooldown: 180000,
            mpCost: 0,
            tpCost: 0,
            damageType: DamageTypes.Piercing,
            addedBuff: false,
            aoe: false,
            positionalRequirement: false,
            nextInChain: [],
            previousInChain: []
        },
        LifeSurge: {
            id: "LifeSurge",
            name: "Life Surge",
            skillType: SkillTypes.Ability,
            potency: 0,
            missedChainPotency: 0,
            missedPositionalPotency: 0,
            dotDuration: 0,
            dotPotency: 0,
            animationDuration: 1300,
            buffDuration: 10000,
            buffPotency: 0.5,
            cooldown: 60000,
            mpCost: 0,
            tpCost: 0,
            damageType: DamageTypes.Piercing,
            addedBuff: false,
            aoe: false,
            positionalRequirement: false,
            nextInChain: [],
            previousInChain: []
        },
        BloodForBlood: {
            id: "BloodForBlood",
            name: "Blood For Blood",
            skillType: SkillTypes.Ability,
            potency: 0,
            missedChainPotency: 0,
            missedPositionalPotency: 0,
            dotDuration: 0,
            dotPotency: 0,
            animationDuration: 1300,
            buffDuration: 20000,
            buffPotency: 0.3,
            cooldown: 80000,
            mpCost: 0,
            tpCost: 0,
            damageType: DamageTypes.Piercing,
            addedBuff: false,
            aoe: false,
            positionalRequirement: false,
            nextInChain: [],
            previousInChain: []
        },
        PowerSurge: {
            id: "PowerSurge",
            name: "Power Surge",
            skillType: SkillTypes.Ability,
            potency: 0,
            missedChainPotency: 0,
            missedPositionalPotency: 0,
            dotDuration: 0,
            dotPotency: 0,
            animationDuration: 1300,
            buffDuration: 10000,
            buffPotency: 0.5,
            cooldown: 60000,
            mpCost: 0,
            tpCost: 0,
            damageType: DamageTypes.Piercing,
            addedBuff: false,
            aoe: false,
            positionalRequirement: false,
            nextInChain: [],
            previousInChain: []
        },
        BattleLitany: {
            id: "BattleLitany",
            name: "Battle Litany",
            skillType: SkillTypes.Ability,
            potency: 0,
            missedChainPotency: 0,
            missedPositionalPotency: 0,
            dotDuration: 0,
            dotPotency: 0,
            animationDuration: 1300,
            buffDuration: 20000,
            buffPotency: 0,
            cooldown: 180000,
            mpCost: 0,
            tpCost: 0,
            damageType: DamageTypes.Piercing,
            addedBuff: false,
            aoe: false,
            positionalRequirement: false,
            nextInChain: [],
            previousInChain: []
        },
        BloodOfTheDragon: {
            id: "BloodOfTheDragon",
            name: "Blood Of The Dragon",
            skillType: SkillTypes.Ability,
            potency: 0,
            missedChainPotency: 0,
            missedPositionalPotency: 0,
            dotDuration: 0,
            dotPotency: 0,
            animationDuration: 1300,
            buffDuration: 15000,
            buffPotency: 0.3,
            cooldown: 60000,
            mpCost: 0,
            tpCost: 0,
            damageType: DamageTypes.Piercing,
            addedBuff: false,
            aoe: false,
            positionalRequirement: false,
            nextInChain: [],
            previousInChain: []
        },
        Invigorate: {
            id: "Invigorate",
            name: "Invigorate",
            skillType: SkillTypes.Ability,
            potency: 0,
            missedChainPotency: 0,
            missedPositionalPotency: 0,
            dotDuration: 0,
            dotPotency: 0,
            animationDuration: 1300,
            buffDuration: 0,
            buffPotency: 0,
            cooldown: 180000,
            mpCost: 0,
            tpCost: 0,
            damageType: DamageTypes.Piercing,
            addedBuff: false,
            aoe: false,
            positionalRequirement: false,
            nextInChain: [],
            previousInChain: []
        },
        Jump: {
            id: "Jump",
            name: "Jump",
            skillType: SkillTypes.Ability,
            potency: 200,
            missedChainPotency: 0,
            missedPositionalPotency: 0,
            dotDuration: 0,
            dotPotency: 0,
            animationDuration: 1300,
            buffDuration: 0,
            buffPotency: 0,
            cooldown: 30000,
            mpCost: 0,
            tpCost: 0,
            damageType: DamageTypes.Piercing,
            addedBuff: false,
            aoe: false,
            positionalRequirement: false,
            nextInChain: [],
            previousInChain: []
        },
        SpineshatterDive: {
            id: "SpineshatterDive",
            name: "Spineshatter Dive",
            skillType: SkillTypes.Ability,
            potency: 170,
            missedChainPotency: 0,
            missedPositionalPotency: 0,
            dotDuration: 0,
            dotPotency: 0,
            animationDuration: 1300,
            buffDuration: 0,
            buffPotency: 0,
            cooldown: 60000,
            mpCost: 0,
            tpCost: 0,
            damageType: DamageTypes.Piercing,
            addedBuff: false,
            aoe: false,
            positionalRequirement: false,
            nextInChain: [],
            previousInChain: []
        },
        DragonfireDive: {
            id: "DragonfireDive",
            name: "Dragonfire Dive",
            skillType: SkillTypes.Ability,
            potency: 250,
            missedChainPotency: 0,
            missedPositionalPotency: 0,
            dotDuration: 0,
            dotPotency: 0,
            animationDuration: 1300,
            buffDuration: 0,
            buffPotency: 0,
            cooldown: 120000,
            mpCost: 0,
            tpCost: 0,
            damageType: DamageTypes.Piercing,
            addedBuff: false,
            aoe: true,
            positionalRequirement: false,
            nextInChain: [],
            previousInChain: []
        },
    };
    exports.DragoonArray = [
        exports.Dragoon.TrueThrust,
        exports.Dragoon.VorpalThrust,
        exports.Dragoon.FullThrust,
        exports.Dragoon.ImpulseDrive,
        exports.Dragoon.Disembowel,
        exports.Dragoon.ChaosThrust,
        exports.Dragoon.FangAndClaw,
        exports.Dragoon.WheelingThrust,
        exports.Dragoon.Geirskogul,
        exports.Dragoon.KeenFlurry,
        exports.Dragoon.LegSweep,
        exports.Dragoon.HeavyThrust,
        exports.Dragoon.Phlebotomize,
        exports.Dragoon.PiercingTalon,
        exports.Dragoon.DoomSpike,
        exports.Dragoon.RingOfThorns,
        exports.Dragoon.ElusiveJump,
        exports.Dragoon.LifeSurge,
        exports.Dragoon.BloodForBlood,
        exports.Dragoon.PowerSurge,
        exports.Dragoon.BattleLitany,
        exports.Dragoon.BloodOfTheDragon,
        exports.Dragoon.Invigorate,
        exports.Dragoon.Jump,
        exports.Dragoon.SpineshatterDive,
        exports.Dragoon.DragonfireDive,
    ];
});

define('SimEvent',["require", "exports"], function (require, exports) {
    "use strict";
    var SimEvent = (function () {
        function SimEvent(timestamp, skill, eventType, activeBuffs) {
            if (activeBuffs === void 0) { activeBuffs = null; }
            this.timestamp = timestamp;
            this.eventType = eventType;
            this.skill = skill;
            this.activeBuffs = activeBuffs;
        }
        return SimEvent;
    }());
    exports.SimEvent = SimEvent;
});

define('Damage',["require", "exports"], function (require, exports) {
    "use strict";
    var Damage = (function () {
        function Damage(time, skill, buffs, totalDamage) {
            this.time = 0;
            this.time = time;
            this.skill = skill;
            this.buffs = buffs;
            this.totalDamage = totalDamage;
        }
        return Damage;
    }());
    exports.Damage = Damage;
});

define('PPSEntry',["require", "exports"], function (require, exports) {
    "use strict";
    var PPSEntry = (function () {
        function PPSEntry(pps, time) {
            this.pps = pps;
            this.time = time;
        }
        return PPSEntry;
    }());
    exports.PPSEntry = PPSEntry;
});

define('UserAction',["require", "exports"], function (require, exports) {
    "use strict";
    var UserAction = (function () {
        function UserAction(name, time) {
            this.name = name;
            this.time = time;
        }
        return UserAction;
    }());
    exports.UserAction = UserAction;
});

define('BaseSimulator',["require", "exports", "./Dragoon", "./Dragoon", "./SimEvent", "./Damage", "./PPSEntry", "./UserAction"], function (require, exports, Dragoon_1, Dragoon_2, SimEvent_1, Damage_1, PPSEntry_1, UserAction_1) {
    "use strict";
    var BaseSimulator = (function () {
        function BaseSimulator() {
            this._time = 0;
            this.time = 0;
            this.totalPotency = 0;
            this.pps = 0;
            this.dotTime = 0;
            this.globalCooldown = 2500;
            this.dragoon = Dragoon_1.Dragoon;
            this.dragoonArray = Dragoon_2.DragoonArray;
            this.events = [];
            this.activeDots = [];
            this.activeBuffs = [];
            this.damageLog = [];
            this.ppsLog = [];
            this.userActions = [];
            this.skillsOnCooldown = [];
            this.nextInChain = [];
            this.chainGracePeriod = 5000;
        }
        BaseSimulator.prototype.activateSkill = function (skill) {
            if (!this.validateActivatedSkill(skill)) {
                return;
            }
            if (!this.validateActivatedSkillModelSpecific(skill)) {
                return;
            }
            this.userActions.push(new UserAction_1.UserAction(skill.id, this.time));
            this.userActionsJSON = this.stringify(this.userActions).toString();
            this.removeFromSimEvents(skill);
            this.removeFromActiveBuffs(skill.id);
            this.removeFromActiveDots(skill.id);
            if (skill.skillType === SkillTypes.WeaponSkill && this.events.some(function (simEvent) { return simEvent.eventType === SimEventType.GlobalCooldown; })) {
                var globalCooldown = true;
                while (globalCooldown) {
                    if (this.events[0].eventType === SimEventType.GlobalCooldown) {
                        globalCooldown = false;
                    }
                    this.processNextSimEvent();
                }
            }
            var buffs = this.activeBuffs.slice();
            var animationEvent = new SimEvent_1.SimEvent(this.time + skill.animationDuration, skill, SimEventType.AnimationFinished, buffs);
            var eventPositionInEventCollection = this.determinePositionInSimEvents(animationEvent);
            if (eventPositionInEventCollection === this.events.length) {
                this.events.push(animationEvent);
            }
            else {
                this.events.splice(eventPositionInEventCollection, 0, animationEvent);
            }
            var skillInAnimation = true;
            while (skillInAnimation) {
                if (this.events[0].eventType === SimEventType.AnimationFinished && this.events[0].skill.id == skill.id) {
                    skillInAnimation = false;
                }
                this.processNextSimEvent();
            }
        };
        BaseSimulator.prototype.createSimEventsFromActivatedSkill = function (skill) {
            var events = [];
            if (this.createGlobalCooldownEvent(skill)) {
                events.push(this.createGlobalCooldownEvent(skill));
            }
            if (this.createDotEvents(skill)) {
                events = events.concat(this.createDotEvents(skill));
            }
            if (this.createChainEndEvent(skill)) {
                events.push(this.createChainEndEvent(skill));
            }
            if (this.createBuffEndEvent(skill)) {
                events.push(this.createBuffEndEvent(skill));
            }
            if (this.createCooldownEvent(skill)) {
                events.push(this.createCooldownEvent(skill));
            }
            return events;
        };
        BaseSimulator.prototype.addToSimEvents = function (events) {
            var _this = this;
            var vm = this;
            events.forEach(function (value, index) {
                var eventCollectionIndexPosition = _this.determinePositionInSimEvents(value);
                if (eventCollectionIndexPosition === vm.events.length) {
                    vm.events.push(value);
                }
                else {
                    vm.events.splice(eventCollectionIndexPosition, 0, value);
                }
            });
        };
        BaseSimulator.prototype.processSimEvent = function (event) {
            this.processAnimationFinishedEvent(event);
            this.processDotEndEvent(event);
            this.processBuffEndEvent(event);
            this.processCooldownEvent(event);
            this.processDotTickEvent(event);
            this.processGlobalCooldownEvent(event);
            this.processChainEndEvent(event);
            this.removeOneTimeUseBuff(event);
            this.classSpecificEventProcessing(event);
        };
        BaseSimulator.prototype.processNextSimEvent = function () {
            this.time = this.events[0].timestamp;
            this.pps = Math.floor((this.totalPotency / (this._time / 1000)) * 100) / 100;
            var event = this.events[0];
            this.events.splice(0, 1);
            this.processSimEvent(event);
        };
        BaseSimulator.prototype.determinePositionInSimEvents = function (event) {
            if (this.events.length === 0) {
                return 0;
            }
            var arrayIndex = 0;
            this.events.forEach(function (value, index) {
                if (value.timestamp <= event.timestamp) {
                    arrayIndex++;
                }
            });
            return arrayIndex;
        };
        BaseSimulator.prototype.calculateSimEventTimestamp = function (skill) { throw new Error("Not implemented"); };
        BaseSimulator.prototype.calculateNextDotEventTimestamp = function () {
            return this.time + (3000 - this.time % 3000);
        };
        BaseSimulator.prototype.addToActiveBuffs = function (skill) { };
        BaseSimulator.prototype.addToActiveDots = function (skill) { };
        BaseSimulator.prototype.removeFromActiveBuffs = function (skillName) {
            for (var i = this.activeBuffs.length; i > 0; i--) {
                if (this.activeBuffs[i - 1].skill.id === skillName) {
                    this.activeBuffs.splice(i - 1, 1);
                }
            }
        };
        BaseSimulator.prototype.removeFromActiveDots = function (skillName) {
            for (var i = this.activeDots.length; i > 0; i--) {
                if (this.activeDots[i - 1].skill.id === skillName) {
                    this.activeDots.splice(i - 1, 1);
                }
            }
        };
        BaseSimulator.prototype.removeFromSkillsOnCooldown = function (skillName) {
            for (var i = this.skillsOnCooldown.length; i > 0; i--) {
                if (this.skillsOnCooldown[i - 1].name === skillName) {
                    this.skillsOnCooldown.splice(i - 1, 1);
                }
            }
        };
        BaseSimulator.prototype.removeFromSimEvents = function (skill) {
            for (var i = this.events.length; i > 0; i--) {
                if (this.events[i - 1].skill.id === skill.id && this.events[i - 1].eventType !== SimEventType.GlobalCooldown) {
                    this.events.splice(i - 1, 1);
                    continue;
                }
                if (skill.buffDuration > 0 && skill.id === this.events[i - 1].skill.id && this.events[i - 1].eventType === SimEventType.BuffEnd) {
                    this.events.splice(i - 1, 1);
                }
            }
        };
        BaseSimulator.prototype.removeOneTimeUseBuff = function (event) {
            var self = this;
            if (event.activeBuffs) {
                event.activeBuffs.forEach(function (value, index) {
                    if (self.determineIfBuffShouldBeRemoved(event, value.skill.id)) {
                        for (var i = self.events.length; i > 0; i--) {
                            if (self.events[i - 1].eventType === SimEventType.BuffEnd && self.events[i - 1].skill.id === value.skill.id) {
                                self.events.splice(i - 1, 1);
                            }
                        }
                        for (var i = self.activeBuffs.length; i > 0; i--) {
                            if (self.activeBuffs[i - 1].skill.id === value.skill.id) {
                                self.activeBuffs.splice(i - 1, 1);
                            }
                        }
                    }
                });
            }
        };
        BaseSimulator.prototype.addToDamageLog = function (damage) { };
        BaseSimulator.prototype.advanceTime = function (time) {
            var continueAdvancing = true;
            while (continueAdvancing) {
                if (this.events.length === 0 || this.events[0].timestamp > time) {
                    this.time = time;
                    this.pps = Math.floor((this.totalPotency / (this._time / 1000)) * 100) / 100;
                    continueAdvancing = false;
                }
                else {
                    this.processNextSimEvent();
                }
            }
        };
        BaseSimulator.prototype.createDamageEntry = function (time, skill, buffs, dotDamage, correctPositional, followedChain) {
            var potency = 0;
            if (dotDamage) {
                potency = skill.dotPotency;
            }
            else {
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
            var totalPotency = this.calculateTotalPotency(skill, potency, buffs);
            var buffList = [];
            buffs.forEach(function (value, index) { buffList.push(value.skill.id); });
            return new Damage_1.Damage(time, skill, buffList, totalPotency);
        };
        BaseSimulator.prototype.calculateTotalPotency = function (skill, potency, buffs) {
            var self = this;
            var basePotency = potency;
            var buffedPotency = 0;
            if (buffs) {
                buffs.forEach(function (activeBuff, index) {
                    var trimmedString = activeBuff.skill.id;
                    if (self.determineIfBuffCanBeApplied(skill, activeBuff.skill.id) && self.dragoon[trimmedString] != null && self.dragoon[trimmedString].buffPotency) {
                        buffedPotency += self.dragoon[trimmedString].buffPotency * basePotency;
                    }
                });
            }
            return basePotency + buffedPotency;
        };
        BaseSimulator.prototype.removeTheChainEndEvent = function () {
            for (var i = this.events.length; i > 0; i--) {
                if (this.events[i - 1].eventType === SimEventType.ChainEnd) {
                    this.events.splice(i - 1, 1);
                }
            }
        };
        BaseSimulator.prototype.handleChainChanges = function (event) {
            if (event.skill.skillType !== SkillTypes.WeaponSkill) {
                return;
            }
            if (event.skill.skillType === SkillTypes.WeaponSkill && !this.nextInChain.some(function (skill) { return skill === event.skill.id; })) {
                this.nextInChain = [];
            }
            if (event.eventType === SimEventType.ChainEnd) {
                this.nextInChain = [];
            }
            if (event.skill.previousInChain.length === 0 && event.skill.nextInChain.length !== 0) {
                this.nextInChain = event.skill.nextInChain;
            }
            else if (this.nextInChain.some(function (skillId) { return skillId === event.skill.id; })) {
                this.nextInChain = event.skill.nextInChain;
            }
            else if (!event.skill.nextInChain.length) {
                this.nextInChain = [];
            }
            this.removeTheChainEndEvent();
        };
        BaseSimulator.prototype.validateActivatedSkill = function (skill) {
            return !this.events.some(function (simEvent) { return simEvent.eventType === SimEventType.Cooldown && simEvent.skill.id === skill.id; });
        };
        BaseSimulator.prototype.createGlobalCooldownEvent = function (skill) {
            if (this.determineIfValidForGlobalCooldownEvent(skill)) {
                var globalCooldowntimestamp = this.time + (this.globalCooldown - skill.animationDuration);
                return new SimEvent_1.SimEvent(globalCooldowntimestamp, skill, SimEventType.GlobalCooldown);
            }
            else {
                return null;
            }
        };
        BaseSimulator.prototype.createDotEvents = function (skill) {
            var events = [];
            if (this.determineIfValidForDotEvents(skill)) {
                var amountOfDotTicks = skill.dotDuration / 3000;
                var nextGlobalDotTickTimestamp = this.calculateNextDotEventTimestamp();
                for (var i = 0; i <= amountOfDotTicks - 1; i++) {
                    var timestamp = nextGlobalDotTickTimestamp + 3000 * i;
                    events.push(new SimEvent_1.SimEvent(timestamp, skill, SimEventType.DotTick, this.activeBuffs.slice()));
                }
                events.push(new SimEvent_1.SimEvent(this.time + skill.dotDuration, skill, SimEventType.DotEnd));
                return events;
            }
            else {
                return null;
            }
        };
        BaseSimulator.prototype.createChainEndEvent = function (skill) {
            if (this.determineIfValidForChainEndEvent(skill)) {
                return new SimEvent_1.SimEvent(this.time + this.chainGracePeriod, skill, SimEventType.ChainEnd);
            }
            else {
                return null;
            }
        };
        BaseSimulator.prototype.createBuffEndEvent = function (skill) {
            if (this.determineIfValidForBuffEndEvent(skill)) {
                return new SimEvent_1.SimEvent((this.time) + skill.buffDuration, skill, SimEventType.BuffEnd);
            }
            else {
                return null;
            }
        };
        BaseSimulator.prototype.createCooldownEvent = function (skill) {
            if (this.determineIfValidForCooldownEvent(skill)) {
                return new SimEvent_1.SimEvent((this.time - skill.animationDuration) + skill.cooldown, skill, SimEventType.Cooldown);
            }
            else {
                return null;
            }
        };
        BaseSimulator.prototype.processAnimationFinishedEvent = function (event) {
            if (event.eventType === SimEventType.AnimationFinished) {
                var followedChain = false;
                if (!event.skill.previousInChain.length) {
                    followedChain = true;
                }
                if (event.skill.previousInChain && this.nextInChain.some(function (skill) { return skill === event.skill.id; })) {
                    followedChain = true;
                }
                var buffs = this.activeBuffs.slice();
                if (event.skill.potency) {
                    var damage = this.createDamageEntry(this.time, event.skill, buffs, false, true, followedChain);
                    this.damageLog.push(damage);
                    this.totalPotency += damage.totalDamage;
                    this.pps = Math.floor((this.totalPotency / (this.time / 1000)) * 100) / 100;
                    this.ppsLog.push(new PPSEntry_1.PPSEntry(this.pps, this.time));
                }
                if (event.skill.cooldown) {
                    this.skillsOnCooldown.push({ name: event.skill.id, endTime: this.time + event.skill.cooldown });
                }
                if (event.skill.dotDuration || event.skill.buffDuration) {
                    if (!event.skill.previousInChain.length || (event.skill.previousInChain.length > 0 && this.nextInChain.some(function (skillId) { return skillId === event.skill.id; }))) {
                        if (event.skill.dotDuration) {
                            this.activeDots.push({ skill: event.skill, startTime: this.time, endTime: this.time + event.skill.dotDuration });
                        }
                        if (event.skill.buffDuration) {
                            this.activeBuffs.push({ skill: event.skill, startTime: this.time, endTime: this.time + event.skill.buffDuration });
                        }
                    }
                }
                var events = this.createSimEventsFromActivatedSkill(event.skill);
                this.handleChainChanges(event);
                this.addToSimEvents(events);
            }
        };
        BaseSimulator.prototype.processDotEndEvent = function (event) {
            if (event.eventType === SimEventType.DotEnd) {
                this.removeFromActiveDots(event.skill.id);
            }
        };
        BaseSimulator.prototype.processBuffEndEvent = function (event) {
            if (event.eventType === SimEventType.BuffEnd) {
                this.removeFromActiveBuffs(event.skill.id);
            }
        };
        BaseSimulator.prototype.processCooldownEvent = function (event) {
            if (event.eventType === SimEventType.Cooldown) {
                this.removeFromSkillsOnCooldown(event.skill.id);
            }
        };
        BaseSimulator.prototype.processDotTickEvent = function (event) {
            if (event.eventType === SimEventType.DotTick) {
                var damage = this.createDamageEntry(this.time, event.skill, event.activeBuffs, true, true, true);
                this.damageLog.push(damage);
                this.totalPotency += damage.totalDamage;
                this.pps = Math.floor((this.totalPotency / (this.time / 1000)) * 100) / 100;
                this.ppsLog.push(new PPSEntry_1.PPSEntry(this.pps, this.time));
            }
        };
        BaseSimulator.prototype.processGlobalCooldownEvent = function (event) {
            if (event.eventType === SimEventType.GlobalCooldown) {
            }
        };
        BaseSimulator.prototype.processChainEndEvent = function (event) {
            if (event.eventType === SimEventType.ChainEnd) {
                this.nextInChain = [];
            }
        };
        BaseSimulator.prototype.determineIfValidForGlobalCooldownEvent = function (skill) {
            return skill.skillType === SkillTypes.WeaponSkill;
        };
        BaseSimulator.prototype.determineIfValidForDotEvents = function (skill) {
            return (skill.dotDuration > 0 && skill.dotPotency > 0)
                && (!skill.previousInChain.length
                    || (skill.previousInChain.length && this.nextInChain.some(function (skillId) { return skillId === skill.id; })));
        };
        BaseSimulator.prototype.determineIfValidForChainEndEvent = function (skill) {
            return ((!skill.previousInChain.length) && skill.nextInChain.length > 0)
                || (this.nextInChain.some(function (skillId) { return skillId === skill.id; }) && skill.nextInChain.length > 0);
        };
        BaseSimulator.prototype.determineIfValidForBuffEndEvent = function (skill) {
            return skill.buffDuration > 0;
        };
        BaseSimulator.prototype.determineIfValidForCooldownEvent = function (skill) {
            return skill.cooldown > 0;
        };
        BaseSimulator.prototype.determineIfBuffCanBeApplied = function (skill, buffName) { return true; };
        BaseSimulator.prototype.determineIfBuffShouldBeRemoved = function (event, skillName) { return false; };
        BaseSimulator.prototype.classSpecificEventProcessing = function (event) { };
        ;
        BaseSimulator.prototype.validateActivatedSkillModelSpecific = function (skill) { return true; };
        ;
        BaseSimulator.prototype.formatTime = function (time) {
            var minutes = Math.floor(time / 60000);
            var seconds = (time % 60000) / 1000;
            if (minutes > 0) {
                return minutes + "m " + seconds + "s";
            }
            return seconds + "s";
        };
        BaseSimulator.prototype.formatTimer = function (time) {
            return Math.floor(time / 1000);
        };
        BaseSimulator.prototype.updateBuffEndTime = function (skillName, newEndTime) {
            this.activeBuffs.forEach(function (value, index) {
                if (value.skill.id == skillName) {
                    value.endTime = newEndTime;
                }
            });
        };
        BaseSimulator.prototype.reset = function () {
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
        };
        BaseSimulator.prototype.importUserActions = function () {
            var _this = this;
            this.reset();
            JSON.parse(this.userActionsImport).forEach(function (value, index) {
                if (_this.time != value.time) {
                    _this.advanceTime(value.time - _this.time);
                }
                _this.activateSkill(_this.dragoon[value.name]);
            });
        };
        BaseSimulator.prototype.stringify = function (userActions) {
            return JSON.stringify(userActions);
        };
        return BaseSimulator;
    }());
    exports.BaseSimulator = BaseSimulator;
});

define('BaseSimulatorTests',["require", "exports", "./BaseSimulator", "./SimEvent"], function (require, exports, BaseSimulator_1, SimEvent_1) {
    "use strict";
    var BaseSimulatorTests = (function () {
        function BaseSimulatorTests() {
            QUnit.test("PPS: true thrust", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                var skill = simulatorViewModel.dragoon.TrueThrust;
                simulatorViewModel.activateSkill(skill);
                assert.equal(simulatorViewModel.time, 1300);
                assert.equal(simulatorViewModel.totalPotency, 150);
                assert.equal(simulatorViewModel.pps, 115.38);
            });
            QUnit.test("PPS: true thrust x3", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                var skill = simulatorViewModel.dragoon.TrueThrust;
                simulatorViewModel.activateSkill(skill);
                simulatorViewModel.activateSkill(skill);
                simulatorViewModel.activateSkill(skill);
                assert.equal(simulatorViewModel.time, 1300 + 2500 + 2500);
                assert.equal(simulatorViewModel.totalPotency, 450);
                assert.equal(simulatorViewModel.pps, 71.42);
            });
            QUnit.test("PPS: true thrust, vorpal thrust. full thrust", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.VorpalThrust);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.FullThrust);
                assert.equal(simulatorViewModel.time, 1300 + 2500 + 2500);
                assert.equal(simulatorViewModel.totalPotency, 150 + 200 + 360);
                assert.equal(simulatorViewModel.pps, 112.69);
            });
            QUnit.test("Opening with: true thrust ", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                var skill = simulatorViewModel.dragoon.TrueThrust;
                simulatorViewModel.events.push(new SimEvent_1.SimEvent(simulatorViewModel.time + skill.animationDuration, skill, SimEventType.AnimationFinished));
                var expectedTimestamp = simulatorViewModel.dragoon.TrueThrust.animationDuration;
                var expectedSimEventType = SimEventType.AnimationFinished;
                assert.equal(simulatorViewModel.events[0].timestamp, expectedTimestamp);
                assert.equal(simulatorViewModel.events[0].eventType, expectedSimEventType);
                assert.equal(simulatorViewModel.events.length, 1);
            });
            QUnit.test("determinePositionInSimEvents - 0 events in the list ", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                var skill = simulatorViewModel.dragoon.TrueThrust;
                var actual = simulatorViewModel.determinePositionInSimEvents(new SimEvent_1.SimEvent(simulatorViewModel.time + skill.animationDuration, skill, SimEventType.AnimationFinished));
                assert.equal(actual, 0);
            });
            QUnit.test("determinePositionInSimEvents - 4 DoT tick events in the list - add animation event at index = 1 ", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                var skill = simulatorViewModel.dragoon.TrueThrust;
                simulatorViewModel.events.push(new SimEvent_1.SimEvent(500, simulatorViewModel.dragoon.Phlebotomize, SimEventType.DotTick));
                simulatorViewModel.events.push(new SimEvent_1.SimEvent(3500, simulatorViewModel.dragoon.Phlebotomize, SimEventType.DotTick));
                simulatorViewModel.events.push(new SimEvent_1.SimEvent(6500, simulatorViewModel.dragoon.Phlebotomize, SimEventType.DotTick));
                simulatorViewModel.events.push(new SimEvent_1.SimEvent(9500, simulatorViewModel.dragoon.Phlebotomize, SimEventType.DotTick));
                var actual = simulatorViewModel.determinePositionInSimEvents(new SimEvent_1.SimEvent(1300, skill, SimEventType.AnimationFinished));
                assert.equal(actual, 1);
            });
            QUnit.test("determinePositionInSimEvents - 8 DoT tick events in the list - add animation event at index = 7 ", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                var skill = simulatorViewModel.dragoon.TrueThrust;
                simulatorViewModel.events.push(new SimEvent_1.SimEvent(500, simulatorViewModel.dragoon.Phlebotomize, SimEventType.DotTick));
                simulatorViewModel.events.push(new SimEvent_1.SimEvent(3500, simulatorViewModel.dragoon.Phlebotomize, SimEventType.DotTick));
                simulatorViewModel.events.push(new SimEvent_1.SimEvent(6500, simulatorViewModel.dragoon.Phlebotomize, SimEventType.DotTick));
                simulatorViewModel.events.push(new SimEvent_1.SimEvent(9500, simulatorViewModel.dragoon.Phlebotomize, SimEventType.DotTick));
                simulatorViewModel.events.push(new SimEvent_1.SimEvent(12500, simulatorViewModel.dragoon.Phlebotomize, SimEventType.DotTick));
                simulatorViewModel.events.push(new SimEvent_1.SimEvent(15500, simulatorViewModel.dragoon.Phlebotomize, SimEventType.DotTick));
                simulatorViewModel.events.push(new SimEvent_1.SimEvent(18500, simulatorViewModel.dragoon.Phlebotomize, SimEventType.DotTick));
                simulatorViewModel.events.push(new SimEvent_1.SimEvent(21500, simulatorViewModel.dragoon.Phlebotomize, SimEventType.DotTick));
                var actual = simulatorViewModel.determinePositionInSimEvents(new SimEvent_1.SimEvent(19300, skill, SimEventType.AnimationFinished));
                assert.equal(actual, 7);
            });
            QUnit.test("determinePositionInSimEvents - testing the splice method ", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                var skill = simulatorViewModel.dragoon.TrueThrust;
                simulatorViewModel.events.push(new SimEvent_1.SimEvent(500, simulatorViewModel.dragoon.Phlebotomize, SimEventType.DotTick));
                simulatorViewModel.events.push(new SimEvent_1.SimEvent(1500, simulatorViewModel.dragoon.TrueThrust, SimEventType.AnimationFinished));
                simulatorViewModel.events.push(new SimEvent_1.SimEvent(7500, simulatorViewModel.dragoon.Phlebotomize, SimEventType.DotTick));
                var mockEvent = new SimEvent_1.SimEvent(4500, skill, SimEventType.AnimationFinished);
                simulatorViewModel.events.splice(2, 0, mockEvent);
                var actual = 0;
                simulatorViewModel.events.forEach(function (value, index) {
                    if (value.timestamp === 4500) {
                        actual = index;
                    }
                });
                assert.equal(actual, 2);
            });
            QUnit.test("determinePositionInSimEvents - Call the method 3 times with 1 animation event and 3 dot tick events preexisting in collection ", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                var skill = simulatorViewModel.dragoon.TrueThrust;
                simulatorViewModel.events.push(new SimEvent_1.SimEvent(500, simulatorViewModel.dragoon.Phlebotomize, SimEventType.DotTick));
                simulatorViewModel.events.push(new SimEvent_1.SimEvent(1500, simulatorViewModel.dragoon.TrueThrust, SimEventType.AnimationFinished));
                simulatorViewModel.events.push(new SimEvent_1.SimEvent(3500, simulatorViewModel.dragoon.Phlebotomize, SimEventType.DotTick));
                simulatorViewModel.events.push(new SimEvent_1.SimEvent(9500, simulatorViewModel.dragoon.Phlebotomize, SimEventType.DotTick));
                var mockEvent5 = new SimEvent_1.SimEvent(6500, skill, SimEventType.AnimationFinished);
                var mockEvent6 = new SimEvent_1.SimEvent(12500, skill, SimEventType.AnimationFinished);
                var mockEvent7 = new SimEvent_1.SimEvent(15500, skill, SimEventType.AnimationFinished);
                var actual1 = simulatorViewModel.determinePositionInSimEvents(mockEvent5);
                simulatorViewModel.events.splice(3, 0, mockEvent5);
                var actual2 = simulatorViewModel.determinePositionInSimEvents(mockEvent6);
                simulatorViewModel.events.push(mockEvent6);
                var actual3 = simulatorViewModel.determinePositionInSimEvents(mockEvent7);
                simulatorViewModel.events.push(mockEvent7);
                assert.equal(actual1, 3);
                assert.equal(actual2, 5);
                assert.equal(actual3, 6);
            });
            QUnit.test("determinePositionInSimEvents - 4 DoT tick events in the list - add animation event at many different indexes ", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                var skill = simulatorViewModel.dragoon.TrueThrust;
                simulatorViewModel.events.push(new SimEvent_1.SimEvent(500, simulatorViewModel.dragoon.Phlebotomize, SimEventType.DotTick));
                simulatorViewModel.events.push(new SimEvent_1.SimEvent(3500, simulatorViewModel.dragoon.Phlebotomize, SimEventType.DotTick));
                simulatorViewModel.events.push(new SimEvent_1.SimEvent(6500, simulatorViewModel.dragoon.Phlebotomize, SimEventType.DotTick));
                simulatorViewModel.events.push(new SimEvent_1.SimEvent(9500, simulatorViewModel.dragoon.Phlebotomize, SimEventType.DotTick));
                var actual1 = simulatorViewModel.determinePositionInSimEvents(new SimEvent_1.SimEvent(0, skill, SimEventType.AnimationFinished));
                var actual2 = simulatorViewModel.determinePositionInSimEvents(new SimEvent_1.SimEvent(200, skill, SimEventType.AnimationFinished));
                var actual3 = simulatorViewModel.determinePositionInSimEvents(new SimEvent_1.SimEvent(1300, skill, SimEventType.AnimationFinished));
                var actual4 = simulatorViewModel.determinePositionInSimEvents(new SimEvent_1.SimEvent(3500, skill, SimEventType.AnimationFinished));
                var actual5 = simulatorViewModel.determinePositionInSimEvents(new SimEvent_1.SimEvent(6000, skill, SimEventType.AnimationFinished));
                var actual6 = simulatorViewModel.determinePositionInSimEvents(new SimEvent_1.SimEvent(10000, skill, SimEventType.AnimationFinished));
                assert.equal(actual1, 0);
                assert.equal(actual2, 0);
                assert.equal(actual3, 1);
                assert.equal(actual4, 2);
                assert.equal(actual5, 2);
                assert.equal(actual6, 4);
            });
            QUnit.test("Opening with: phlebotomoze ", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                var skill = simulatorViewModel.dragoon.Phlebotomize;
                simulatorViewModel.events.push(new SimEvent_1.SimEvent(simulatorViewModel.time + skill.animationDuration, skill, SimEventType.AnimationFinished));
                var expectedSimEventType = SimEventType.AnimationFinished;
                assert.equal(simulatorViewModel.events[0].timestamp, 1300);
                assert.equal(simulatorViewModel.events[0].eventType, expectedSimEventType);
                assert.equal(simulatorViewModel.events.length, 1);
            });
            QUnit.test("Activate phlebotomize and true thrust", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                var phlebotomize = simulatorViewModel.dragoon.Phlebotomize;
                var vorpalThrust = simulatorViewModel.dragoon.VorpalThrust;
                simulatorViewModel.activateSkill(phlebotomize);
                simulatorViewModel.activateSkill(vorpalThrust);
                assert.equal(simulatorViewModel.time, 3800);
                assert.equal(simulatorViewModel.events[0].timestamp, 5000);
                assert.equal(simulatorViewModel.events[1].timestamp, 6000);
                assert.equal(simulatorViewModel.events[2].timestamp, 9000);
                assert.equal(simulatorViewModel.events[3].timestamp, 12000);
                assert.equal(simulatorViewModel.events[4].timestamp, 15000);
                assert.equal(simulatorViewModel.events[5].timestamp, 18000);
                assert.equal(simulatorViewModel.events[6].timestamp, 21000);
                assert.equal(simulatorViewModel.events[7].timestamp, 24000);
                assert.equal(simulatorViewModel.events[8].timestamp, 25300);
                assert.equal(simulatorViewModel.events[0].eventType, SimEventType.GlobalCooldown);
                assert.equal(simulatorViewModel.events[1].eventType, SimEventType.DotTick);
                assert.equal(simulatorViewModel.events[2].eventType, SimEventType.DotTick);
                assert.equal(simulatorViewModel.events[3].eventType, SimEventType.DotTick);
                assert.equal(simulatorViewModel.events[4].eventType, SimEventType.DotTick);
                assert.equal(simulatorViewModel.events[5].eventType, SimEventType.DotTick);
                assert.equal(simulatorViewModel.events[6].eventType, SimEventType.DotTick);
                assert.equal(simulatorViewModel.events[7].eventType, SimEventType.DotTick);
                assert.equal(simulatorViewModel.events[8].eventType, SimEventType.DotEnd);
            });
            QUnit.test("Activate True Thrust, phlebotomize, and true thrust again ", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                var phlebotomize = simulatorViewModel.dragoon.Phlebotomize;
                var vorpalThrust = simulatorViewModel.dragoon.VorpalThrust;
                simulatorViewModel.activateSkill(vorpalThrust);
                simulatorViewModel.activateSkill(phlebotomize);
                simulatorViewModel.activateSkill(vorpalThrust);
                assert.equal(simulatorViewModel.time, 6300);
                assert.equal(simulatorViewModel.events[0].timestamp, 7500);
                assert.equal(simulatorViewModel.events[1].timestamp, 9000);
                assert.equal(simulatorViewModel.events[2].timestamp, 12000);
                assert.equal(simulatorViewModel.events[3].timestamp, 15000);
                assert.equal(simulatorViewModel.events[4].timestamp, 18000);
                assert.equal(simulatorViewModel.events[5].timestamp, 21000);
                assert.equal(simulatorViewModel.events[6].timestamp, 24000);
                assert.equal(simulatorViewModel.events[7].timestamp, 27000);
                assert.equal(simulatorViewModel.events[8].timestamp, 27800);
                assert.equal(simulatorViewModel.events[0].eventType, SimEventType.GlobalCooldown);
                assert.equal(simulatorViewModel.events[1].eventType, SimEventType.DotTick);
                assert.equal(simulatorViewModel.events[2].eventType, SimEventType.DotTick);
                assert.equal(simulatorViewModel.events[3].eventType, SimEventType.DotTick);
                assert.equal(simulatorViewModel.events[4].eventType, SimEventType.DotTick);
                assert.equal(simulatorViewModel.events[5].eventType, SimEventType.DotTick);
                assert.equal(simulatorViewModel.events[6].eventType, SimEventType.DotTick);
                assert.equal(simulatorViewModel.events[7].eventType, SimEventType.DotTick);
                assert.equal(simulatorViewModel.events[8].eventType, SimEventType.DotEnd);
            });
            QUnit.test("Activate True Thrust, Vorpal Thrust, and Full Thrust", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                var vorpalThrust = simulatorViewModel.dragoon.VorpalThrust;
                var fullThrust = simulatorViewModel.dragoon.FullThrust;
                simulatorViewModel.activateSkill(vorpalThrust);
                simulatorViewModel.activateSkill(vorpalThrust);
                simulatorViewModel.activateSkill(fullThrust);
                assert.equal(simulatorViewModel.time, 6300);
                assert.equal(simulatorViewModel.events[0].timestamp, 7500);
                assert.equal(simulatorViewModel.events[0].eventType, SimEventType.GlobalCooldown);
            });
            QUnit.test("Activate phlebotomize twice in a row", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                var phlebotomize = simulatorViewModel.dragoon.Phlebotomize;
                simulatorViewModel.activateSkill(phlebotomize);
                assert.equal(simulatorViewModel.time, 1300);
                assert.equal(simulatorViewModel.events[0].timestamp, 2500);
                assert.equal(simulatorViewModel.events[1].timestamp, 3000);
                assert.equal(simulatorViewModel.events[2].timestamp, 6000);
                assert.equal(simulatorViewModel.events[3].timestamp, 9000);
                assert.equal(simulatorViewModel.events[4].timestamp, 12000);
                assert.equal(simulatorViewModel.events[5].timestamp, 15000);
                assert.equal(simulatorViewModel.events[6].timestamp, 18000);
                assert.equal(simulatorViewModel.events[7].timestamp, 21000);
                assert.equal(simulatorViewModel.events[8].timestamp, 24000);
                assert.equal(simulatorViewModel.events[9].timestamp, 25300);
                assert.equal(simulatorViewModel.events[0].eventType, SimEventType.GlobalCooldown);
                assert.equal(simulatorViewModel.events[1].eventType, SimEventType.DotTick);
                assert.equal(simulatorViewModel.events[2].eventType, SimEventType.DotTick);
                assert.equal(simulatorViewModel.events[3].eventType, SimEventType.DotTick);
                assert.equal(simulatorViewModel.events[4].eventType, SimEventType.DotTick);
                assert.equal(simulatorViewModel.events[5].eventType, SimEventType.DotTick);
                assert.equal(simulatorViewModel.events[6].eventType, SimEventType.DotTick);
                assert.equal(simulatorViewModel.events[7].eventType, SimEventType.DotTick);
                assert.equal(simulatorViewModel.events[8].eventType, SimEventType.DotTick);
                assert.equal(simulatorViewModel.events[9].eventType, SimEventType.DotEnd);
                simulatorViewModel.activateSkill(phlebotomize);
                assert.equal(simulatorViewModel.time, 3800);
                assert.equal(simulatorViewModel.events[0].timestamp, 5000);
                assert.equal(simulatorViewModel.events[1].timestamp, 6000);
                assert.equal(simulatorViewModel.events[2].timestamp, 9000);
                assert.equal(simulatorViewModel.events[3].timestamp, 12000);
                assert.equal(simulatorViewModel.events[4].timestamp, 15000);
                assert.equal(simulatorViewModel.events[5].timestamp, 18000);
                assert.equal(simulatorViewModel.events[6].timestamp, 21000);
                assert.equal(simulatorViewModel.events[7].timestamp, 24000);
                assert.equal(simulatorViewModel.events[8].timestamp, 27000);
                assert.equal(simulatorViewModel.events[9].timestamp, 27800);
                assert.equal(simulatorViewModel.events[0].eventType, SimEventType.GlobalCooldown);
                assert.equal(simulatorViewModel.events[1].eventType, SimEventType.DotTick);
                assert.equal(simulatorViewModel.events[2].eventType, SimEventType.DotTick);
                assert.equal(simulatorViewModel.events[3].eventType, SimEventType.DotTick);
                assert.equal(simulatorViewModel.events[4].eventType, SimEventType.DotTick);
                assert.equal(simulatorViewModel.events[5].eventType, SimEventType.DotTick);
                assert.equal(simulatorViewModel.events[6].eventType, SimEventType.DotTick);
                assert.equal(simulatorViewModel.events[7].eventType, SimEventType.DotTick);
                assert.equal(simulatorViewModel.events[8].eventType, SimEventType.DotTick);
                assert.equal(simulatorViewModel.events[9].eventType, SimEventType.DotEnd);
            });
            QUnit.test("Creating all necessary events - phlebotomoze - 8 DoT ticks, 1 DoT end, 1 global cooldown", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                var skill = simulatorViewModel.dragoon.Phlebotomize;
                var phlebotomizeAnimationEndEvent = new SimEvent_1.SimEvent(skill.animationDuration, skill, SimEventType.AnimationFinished);
                simulatorViewModel.time = simulatorViewModel.dragoon.Phlebotomize.animationDuration;
                simulatorViewModel.events.push(phlebotomizeAnimationEndEvent);
                simulatorViewModel.processNextSimEvent();
                assert.equal(simulatorViewModel.events[0].timestamp, 2500);
                assert.equal(simulatorViewModel.events[0].eventType, SimEventType.GlobalCooldown);
                assert.equal(simulatorViewModel.events[1].timestamp, 3000);
                assert.equal(simulatorViewModel.events[1].eventType, SimEventType.DotTick);
                assert.equal(simulatorViewModel.events[2].timestamp, 6000);
                assert.equal(simulatorViewModel.events[2].eventType, SimEventType.DotTick);
                assert.equal(simulatorViewModel.events[3].timestamp, 9000);
                assert.equal(simulatorViewModel.events[3].eventType, SimEventType.DotTick);
                assert.equal(simulatorViewModel.events[4].timestamp, 12000);
                assert.equal(simulatorViewModel.events[4].eventType, SimEventType.DotTick);
                assert.equal(simulatorViewModel.events[5].timestamp, 15000);
                assert.equal(simulatorViewModel.events[5].eventType, SimEventType.DotTick);
                assert.equal(simulatorViewModel.events[6].timestamp, 18000);
                assert.equal(simulatorViewModel.events[6].eventType, SimEventType.DotTick);
                assert.equal(simulatorViewModel.events[7].timestamp, 21000);
                assert.equal(simulatorViewModel.events[7].eventType, SimEventType.DotTick);
                assert.equal(simulatorViewModel.events[8].timestamp, 24000);
                assert.equal(simulatorViewModel.events[8].eventType, SimEventType.DotTick);
                assert.equal(simulatorViewModel.events[9].timestamp, 25300);
                assert.equal(simulatorViewModel.events[9].eventType, SimEventType.DotEnd);
                assert.equal(simulatorViewModel.events.length, 10);
            });
            QUnit.test("Calculating the next dot timestamp for multiple values", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                var actual = 0;
                simulatorViewModel.time = 1200;
                actual = simulatorViewModel.calculateNextDotEventTimestamp();
                assert.equal(actual, 3000);
                simulatorViewModel.time = 2400;
                actual = simulatorViewModel.calculateNextDotEventTimestamp();
                assert.equal(actual, 3000);
                simulatorViewModel.time = 11000;
                actual = simulatorViewModel.calculateNextDotEventTimestamp();
                assert.equal(actual, 12000);
                simulatorViewModel.time = 31000;
                actual = simulatorViewModel.calculateNextDotEventTimestamp();
                assert.equal(actual, 33000);
                simulatorViewModel.time = 40000;
                actual = simulatorViewModel.calculateNextDotEventTimestamp();
                assert.equal(actual, 42000);
                simulatorViewModel.time = 44000;
                actual = simulatorViewModel.calculateNextDotEventTimestamp();
                assert.equal(actual, 45000);
            });
            QUnit.test("Opening with: Jump ", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                var skill = simulatorViewModel.dragoon.Jump;
                simulatorViewModel.activateSkill(skill);
                assert.equal(simulatorViewModel.events[0].timestamp, 30000);
                assert.equal(simulatorViewModel.events[0].eventType, SimEventType.Cooldown);
                assert.equal(simulatorViewModel.events.length, 1);
            });
            QUnit.test("Cant activate Jump twice in a row ", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                var skill = simulatorViewModel.dragoon.Jump;
                simulatorViewModel.activateSkill(skill);
                simulatorViewModel.activateSkill(skill);
                assert.equal(simulatorViewModel.events[0].timestamp, 30000);
                assert.equal(simulatorViewModel.events[0].eventType, SimEventType.Cooldown);
                assert.equal(simulatorViewModel.events.length, 1);
            });
            QUnit.test("Cant activate Jump twice in a row - advancing time 29 seconds", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                var skill = simulatorViewModel.dragoon.Jump;
                simulatorViewModel.activateSkill(skill);
                simulatorViewModel.time = 29000;
                simulatorViewModel.activateSkill(skill);
                assert.equal(simulatorViewModel.events[0].timestamp, 30000);
                assert.equal(simulatorViewModel.events[0].eventType, SimEventType.Cooldown);
                assert.equal(simulatorViewModel.events.length, 1);
            });
            QUnit.test("Activate Jump, True Thrust", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                var jump = simulatorViewModel.dragoon.Jump;
                var vorpalThrust = simulatorViewModel.dragoon.VorpalThrust;
                simulatorViewModel.activateSkill(jump);
                simulatorViewModel.activateSkill(vorpalThrust);
                assert.equal(simulatorViewModel.events[0].timestamp, 3800);
                assert.equal(simulatorViewModel.events[0].eventType, SimEventType.GlobalCooldown);
                assert.equal(simulatorViewModel.events[1].timestamp, 30000);
                assert.equal(simulatorViewModel.events[1].eventType, SimEventType.Cooldown);
                assert.equal(simulatorViewModel.events.length, 2);
            });
            QUnit.test("Activate Jump, True Thrust, then Jump again", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                var jump = simulatorViewModel.dragoon.Jump;
                var vorpalThrust = simulatorViewModel.dragoon.VorpalThrust;
                simulatorViewModel.activateSkill(jump);
                simulatorViewModel.activateSkill(vorpalThrust);
                assert.equal(simulatorViewModel.events[0].timestamp, 3800);
                assert.equal(simulatorViewModel.events[0].eventType, SimEventType.GlobalCooldown);
                assert.equal(simulatorViewModel.events[1].timestamp, 30000);
                assert.equal(simulatorViewModel.events[1].eventType, SimEventType.Cooldown);
                assert.equal(simulatorViewModel.events.length, 2);
            });
            QUnit.test("Activate Jump, Phlebotomize", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                var jump = simulatorViewModel.dragoon.Jump;
                var phlebotomize = simulatorViewModel.dragoon.Phlebotomize;
                simulatorViewModel.activateSkill(jump);
                simulatorViewModel.activateSkill(phlebotomize);
                assert.equal(simulatorViewModel.events[0].timestamp, 3000);
                assert.equal(simulatorViewModel.events[1].timestamp, 3800);
                assert.equal(simulatorViewModel.events[2].timestamp, 6000);
                assert.equal(simulatorViewModel.events[3].timestamp, 9000);
                assert.equal(simulatorViewModel.events[4].timestamp, 12000);
                assert.equal(simulatorViewModel.events[5].timestamp, 15000);
                assert.equal(simulatorViewModel.events[6].timestamp, 18000);
                assert.equal(simulatorViewModel.events[7].timestamp, 21000);
                assert.equal(simulatorViewModel.events[8].timestamp, 24000);
                assert.equal(simulatorViewModel.events[9].timestamp, 26600);
                assert.equal(simulatorViewModel.events[10].timestamp, 30000);
                assert.equal(simulatorViewModel.events[0].eventType, SimEventType.DotTick);
                assert.equal(simulatorViewModel.events[1].eventType, SimEventType.GlobalCooldown);
                assert.equal(simulatorViewModel.events[2].eventType, SimEventType.DotTick);
                assert.equal(simulatorViewModel.events[3].eventType, SimEventType.DotTick);
                assert.equal(simulatorViewModel.events[4].eventType, SimEventType.DotTick);
                assert.equal(simulatorViewModel.events[5].eventType, SimEventType.DotTick);
                assert.equal(simulatorViewModel.events[6].eventType, SimEventType.DotTick);
                assert.equal(simulatorViewModel.events[7].eventType, SimEventType.DotTick);
                assert.equal(simulatorViewModel.events[8].eventType, SimEventType.DotTick);
                assert.equal(simulatorViewModel.events[9].eventType, SimEventType.DotEnd);
                assert.equal(simulatorViewModel.events[10].eventType, SimEventType.Cooldown);
                assert.equal(simulatorViewModel.time, 2600);
                assert.equal(simulatorViewModel.events.length, 11);
            });
            QUnit.test("Test timing of GCD, ability, CGD - Activate True Thrust, Jump, True Thrust", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.VorpalThrust);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.Jump);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.VorpalThrust);
                assert.equal(simulatorViewModel.events[0].timestamp, 5100);
                assert.equal(simulatorViewModel.events[0].eventType, SimEventType.GlobalCooldown);
                assert.equal(simulatorViewModel.events[1].timestamp, 31300);
                assert.equal(simulatorViewModel.events[1].eventType, SimEventType.Cooldown);
                assert.equal(simulatorViewModel.time, 3900);
                assert.equal(simulatorViewModel.events.length, 2);
            });
            QUnit.test("skillsOnCooldown contains jump after activating skill", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                var jump = simulatorViewModel.dragoon.Jump;
                simulatorViewModel.activateSkill(jump);
                assert.equal(simulatorViewModel.skillsOnCooldown[0].name, "Jump");
                assert.equal(simulatorViewModel.skillsOnCooldown[0].endTime, 31300);
            });
            QUnit.test("skillsOnCooldown contains DragonFireDive after activating skill", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                var dfd = simulatorViewModel.dragoon.DragonfireDive;
                simulatorViewModel.activateSkill(dfd);
                assert.equal(simulatorViewModel.skillsOnCooldown[0].name, "DragonfireDive");
                assert.equal(simulatorViewModel.skillsOnCooldown[0].endTime, 121300);
            });
            QUnit.test("skillsOnCooldown contains jump only once after activating skill twice", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                var jump = simulatorViewModel.dragoon.Jump;
                simulatorViewModel.activateSkill(jump);
                simulatorViewModel.activateSkill(jump);
                assert.equal(simulatorViewModel.skillsOnCooldown[0].name, "Jump");
                assert.equal(simulatorViewModel.skillsOnCooldown[0].endTime, 31300);
                assert.equal(simulatorViewModel.skillsOnCooldown.length, 1);
            });
            QUnit.test("activeDots contains phlebotomize after activating skill", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                var phlebotomize = simulatorViewModel.dragoon.Phlebotomize;
                simulatorViewModel.activateSkill(phlebotomize);
                assert.equal(simulatorViewModel.activeDots[0].skill.id, "Phlebotomize");
                assert.equal(simulatorViewModel.activeDots.length, 1);
            });
            QUnit.test("activeBuffs contains life surge after activating skill", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                var lifeSurge = simulatorViewModel.dragoon.LifeSurge;
                simulatorViewModel.activateSkill(lifeSurge);
                assert.equal(simulatorViewModel.activeBuffs[0].skill.id, "LifeSurge");
                assert.equal(simulatorViewModel.activeBuffs.length, 1);
            });
            QUnit.test("skillsOnCooldown is empty after advancing time", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                var jump = simulatorViewModel.dragoon.Jump;
                simulatorViewModel.activateSkill(jump);
                simulatorViewModel.advanceTime(500000);
                assert.equal(simulatorViewModel.skillsOnCooldown.length, 0);
            });
            QUnit.test("activeDots is empty after advancing time", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                var phlebotomize = simulatorViewModel.dragoon.Phlebotomize;
                simulatorViewModel.activateSkill(phlebotomize);
                simulatorViewModel.advanceTime(500000);
                assert.equal(simulatorViewModel.activeDots.length, 0);
            });
            QUnit.test("activeBuffs is empty after advancing time", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                var lifeSurge = simulatorViewModel.dragoon.LifeSurge;
                simulatorViewModel.activateSkill(lifeSurge);
                simulatorViewModel.advanceTime(500000);
                assert.equal(simulatorViewModel.activeBuffs.length, 0);
            });
            QUnit.test("Testing damage: True Thrust", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
                assert.equal(simulatorViewModel.damageLog.length, 1);
                assert.equal(simulatorViewModel.damageLog[0].totalDamage, 150);
            });
            QUnit.test("Testing damage: True Thrust x5", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
                assert.equal(simulatorViewModel.damageLog.length, 5);
                assert.equal(simulatorViewModel.damageLog[0].totalDamage, 150);
                assert.equal(simulatorViewModel.damageLog[1].totalDamage, 150);
                assert.equal(simulatorViewModel.damageLog[2].totalDamage, 150);
                assert.equal(simulatorViewModel.damageLog[3].totalDamage, 150);
                assert.equal(simulatorViewModel.damageLog[4].totalDamage, 150);
                assert.equal(simulatorViewModel.totalPotency, 750);
            });
            QUnit.test("Testing damage: Phlebotomize", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.Phlebotomize);
                simulatorViewModel.advanceTime(50000);
                assert.equal(simulatorViewModel.damageLog.length, 9);
                assert.equal(simulatorViewModel.damageLog[0].totalDamage, 170);
                assert.equal(simulatorViewModel.damageLog[1].totalDamage, 30);
                assert.equal(simulatorViewModel.damageLog[2].totalDamage, 30);
                assert.equal(simulatorViewModel.damageLog[3].totalDamage, 30);
                assert.equal(simulatorViewModel.damageLog[4].totalDamage, 30);
                assert.equal(simulatorViewModel.damageLog[5].totalDamage, 30);
                assert.equal(simulatorViewModel.damageLog[6].totalDamage, 30);
                assert.equal(simulatorViewModel.damageLog[7].totalDamage, 30);
                assert.equal(simulatorViewModel.damageLog[8].totalDamage, 30);
                assert.equal(simulatorViewModel.totalPotency, 410);
            });
            QUnit.test("Testing damage: Phlebotomize, true thrust", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.Phlebotomize);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
                simulatorViewModel.advanceTime(50000);
                assert.equal(simulatorViewModel.damageLog.length, 10);
                assert.equal(simulatorViewModel.damageLog[0].totalDamage, 170);
                assert.equal(simulatorViewModel.damageLog[1].totalDamage, 30);
                assert.equal(simulatorViewModel.damageLog[2].totalDamage, 150);
                assert.equal(simulatorViewModel.damageLog[3].totalDamage, 30);
                assert.equal(simulatorViewModel.damageLog[4].totalDamage, 30);
                assert.equal(simulatorViewModel.damageLog[5].totalDamage, 30);
                assert.equal(simulatorViewModel.damageLog[6].totalDamage, 30);
                assert.equal(simulatorViewModel.damageLog[7].totalDamage, 30);
                assert.equal(simulatorViewModel.damageLog[8].totalDamage, 30);
                assert.equal(simulatorViewModel.damageLog[9].totalDamage, 30);
                assert.equal(simulatorViewModel.totalPotency, 560);
            });
            QUnit.test("Testing damage: true thrust, Phlebotomize", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.Phlebotomize);
                simulatorViewModel.advanceTime(50000);
                assert.equal(simulatorViewModel.damageLog.length, 10);
                assert.equal(simulatorViewModel.damageLog[0].totalDamage, 150);
                assert.equal(simulatorViewModel.damageLog[1].totalDamage, 170);
                assert.equal(simulatorViewModel.damageLog[2].totalDamage, 30);
                assert.equal(simulatorViewModel.damageLog[3].totalDamage, 30);
                assert.equal(simulatorViewModel.damageLog[4].totalDamage, 30);
                assert.equal(simulatorViewModel.damageLog[5].totalDamage, 30);
                assert.equal(simulatorViewModel.damageLog[6].totalDamage, 30);
                assert.equal(simulatorViewModel.damageLog[7].totalDamage, 30);
                assert.equal(simulatorViewModel.damageLog[8].totalDamage, 30);
                assert.equal(simulatorViewModel.damageLog[9].totalDamage, 30);
                assert.equal(simulatorViewModel.totalPotency, 560);
            });
            QUnit.test("Testing damage: Phlebotomize, true thrust, jump", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.Phlebotomize);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.Jump);
                simulatorViewModel.advanceTime(50000);
                assert.equal(simulatorViewModel.damageLog.length, 11);
                assert.equal(simulatorViewModel.damageLog[0].totalDamage, 170);
                assert.equal(simulatorViewModel.damageLog[1].totalDamage, 30);
                assert.equal(simulatorViewModel.damageLog[2].totalDamage, 150);
                assert.equal(simulatorViewModel.damageLog[3].totalDamage, 200);
                assert.equal(simulatorViewModel.damageLog[4].totalDamage, 30);
                assert.equal(simulatorViewModel.damageLog[5].totalDamage, 30);
                assert.equal(simulatorViewModel.damageLog[6].totalDamage, 30);
                assert.equal(simulatorViewModel.damageLog[7].totalDamage, 30);
                assert.equal(simulatorViewModel.damageLog[8].totalDamage, 30);
                assert.equal(simulatorViewModel.damageLog[9].totalDamage, 30);
                assert.equal(simulatorViewModel.damageLog[10].totalDamage, 30);
                assert.equal(simulatorViewModel.totalPotency, 760);
            });
            QUnit.test("Testing buffed damage: blood for blood, true thrust", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.BloodForBlood);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
                simulatorViewModel.advanceTime(50000);
                assert.equal(simulatorViewModel.damageLog.length, 1);
                assert.equal(simulatorViewModel.damageLog[0].totalDamage, 195);
                assert.equal(simulatorViewModel.totalPotency, 195);
            });
            QUnit.test("Testing buffed damage: blood for blood, phlebotomize", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.BloodForBlood);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.Phlebotomize);
                simulatorViewModel.advanceTime(50000);
                assert.equal(simulatorViewModel.damageLog.length, 9);
                assert.equal(simulatorViewModel.damageLog[0].totalDamage, 221);
                assert.equal(simulatorViewModel.damageLog[1].totalDamage, 39);
                assert.equal(simulatorViewModel.damageLog[2].totalDamage, 39);
                assert.equal(simulatorViewModel.damageLog[3].totalDamage, 39);
                assert.equal(simulatorViewModel.damageLog[4].totalDamage, 39);
                assert.equal(simulatorViewModel.damageLog[5].totalDamage, 39);
                assert.equal(simulatorViewModel.damageLog[6].totalDamage, 39);
                assert.equal(simulatorViewModel.damageLog[7].totalDamage, 39);
                assert.equal(simulatorViewModel.damageLog[8].totalDamage, 39);
                assert.equal(simulatorViewModel.totalPotency, 533);
            });
            QUnit.test("Testing buffed damage (total only): blood for blood, phlebotomize, true thrust, jump, spineshatter dive, true thrust", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.BloodForBlood);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.Phlebotomize);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.Jump);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.SpineshatterDive);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
                simulatorViewModel.advanceTime(50000);
                assert.equal(simulatorViewModel.damageLog.length, 13);
                assert.equal(simulatorViewModel.totalPotency, 1404);
            });
            QUnit.test("Testing buffed damage (total only): blood for blood, heavy thrust, true thrust, jump", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.BloodForBlood);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.HeavyThrust);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.Jump);
                simulatorViewModel.advanceTime(50000);
                assert.equal(simulatorViewModel.damageLog.length, 3);
                assert.equal(simulatorViewModel.totalPotency, 728.5);
            });
            QUnit.test("Testing damage after buff runs out: blood for blood, true thrust, (buff end) true thrust", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.BloodForBlood);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
                simulatorViewModel.advanceTime(50000);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
                assert.equal(simulatorViewModel.damageLog.length, 2);
                assert.equal(simulatorViewModel.totalPotency, 345);
            });
            QUnit.test("Testing damage after buff runs out, and buff activates again: blood for blood, true thrust, (buff end), (cooldown end), blood for blood true thrust", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.BloodForBlood);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
                simulatorViewModel.advanceTime(500000);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.BloodForBlood);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
                assert.equal(simulatorViewModel.damageLog.length, 2);
                assert.equal(simulatorViewModel.totalPotency, 390);
            });
            QUnit.test("Testing chain end event creation: True Thrust", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
                assert.equal(simulatorViewModel.events.length, 2);
                assert.equal(simulatorViewModel.events[0].eventType, SimEventType.GlobalCooldown);
                assert.equal(simulatorViewModel.events[1].eventType, SimEventType.ChainEnd);
                assert.equal(simulatorViewModel.events[1].timestamp, 6300);
            });
            QUnit.test("Testing chain end event creation: True Thrust, Vorpal Thrust", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.VorpalThrust);
                assert.equal(simulatorViewModel.events.length, 2);
                assert.equal(simulatorViewModel.events[0].eventType, SimEventType.GlobalCooldown);
                assert.equal(simulatorViewModel.events[1].eventType, SimEventType.ChainEnd);
                assert.equal(simulatorViewModel.events[1].timestamp, 8800);
            });
            QUnit.test("Testing chain end event creation: True Thrust, Vorpal Thrust, Full Thrust", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.VorpalThrust);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.FullThrust);
                assert.equal(simulatorViewModel.events.length, 2);
                assert.equal(simulatorViewModel.events[0].eventType, SimEventType.GlobalCooldown);
                assert.equal(simulatorViewModel.events[1].eventType, SimEventType.ChainEnd);
                assert.equal(simulatorViewModel.events[1].timestamp, 11300);
            });
            QUnit.test("Testing breaking a chain does not continue chain: True Thrust, Full Thrust, Vorpal Thrust", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.FullThrust);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.VorpalThrust);
                assert.equal(simulatorViewModel.events.length, 1);
                assert.equal(simulatorViewModel.events[0].eventType, SimEventType.GlobalCooldown);
                assert.equal(simulatorViewModel.events[0].timestamp, 7500);
            });
            QUnit.test("Testing breaking and restarting a chain : True Thrust, Full Thrust, True Thrust, Vorpal Thrust", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.FullThrust);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.VorpalThrust);
                assert.equal(simulatorViewModel.events.length, 2);
                assert.equal(simulatorViewModel.events[0].eventType, SimEventType.GlobalCooldown);
                assert.equal(simulatorViewModel.events[1].eventType, SimEventType.ChainEnd);
                assert.equal(simulatorViewModel.events[1].timestamp, 13800);
            });
            QUnit.test("Testing starting a chain twice: True Thrust, True Thrust", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
                assert.equal(simulatorViewModel.events.length, 2);
                assert.equal(simulatorViewModel.events[0].eventType, SimEventType.GlobalCooldown);
                assert.equal(simulatorViewModel.events[1].eventType, SimEventType.ChainEnd);
                assert.equal(simulatorViewModel.events[1].timestamp, 8800);
            });
            QUnit.test("Testing chain: True Thrust, Vorpal Thrust, Vorpal Thurst", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.VorpalThrust);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.VorpalThrust);
                assert.equal(simulatorViewModel.events.length, 1);
                assert.equal(simulatorViewModel.events[0].eventType, SimEventType.GlobalCooldown);
                assert.equal(simulatorViewModel.events[0].timestamp, 7500);
            });
            QUnit.test("Testing chain damage: True Thrust, Vorpal Thrust", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.VorpalThrust);
                assert.equal(simulatorViewModel.damageLog.length, 2);
                assert.equal(simulatorViewModel.damageLog[1].totalDamage, 200);
                assert.equal(simulatorViewModel.totalPotency, 350);
            });
            QUnit.test("Testing chain damage: True Thrust, Vorpal Thrust, Full Thrust", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.VorpalThrust);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.FullThrust);
                assert.equal(simulatorViewModel.damageLog.length, 3);
                assert.equal(simulatorViewModel.damageLog[2].totalDamage, 360);
                assert.equal(simulatorViewModel.totalPotency, 710);
            });
            QUnit.test("Testing chain damage (WITHOUT DOTS): Impulse Drive, Disembowel, Chaos Thrust", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.ImpulseDrive);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.Disembowel);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.ChaosThrust);
                assert.equal(simulatorViewModel.damageLog.length, 3);
                assert.equal(simulatorViewModel.damageLog[2].totalDamage, 275);
                assert.equal(simulatorViewModel.totalPotency, 180 + 220 + 275);
            });
            QUnit.test("Testing chain damage (WITH DOTS): Impulse Drive, Disembowel, Chaos Thrust", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.ImpulseDrive);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.Disembowel);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.ChaosThrust);
                simulatorViewModel.advanceTime(50000);
                assert.equal(simulatorViewModel.damageLog.length, 13);
                assert.equal(simulatorViewModel.totalPotency, 180 + 220 + 275 + 385);
            });
            QUnit.test("Testing buffed chain damage (WITH DOTS): Impulse Drive, Disembowel, Blood for Blood, Chaos Thrust", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.ImpulseDrive);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.Disembowel);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.BloodForBlood);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.ChaosThrust);
                simulatorViewModel.advanceTime(50000);
                assert.equal(simulatorViewModel.damageLog.length, 13);
                assert.equal(simulatorViewModel.totalPotency, 180 + 220 + 250 + 25 + 75 + 350 + 35 + 105);
            });
            QUnit.test("Testing buffed chain damage (WITH DOTS):  Blood for Blood, Impulse Drive, Disembowel, Chaos Thrust", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.BloodForBlood);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.ImpulseDrive);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.Disembowel);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.ChaosThrust);
                simulatorViewModel.advanceTime(50000);
                assert.equal(simulatorViewModel.damageLog.length, 13);
                assert.equal(simulatorViewModel.totalPotency, 180 + 54 + 220 + 66 + 250 + 25 + 75 + 350 + 35 + 105);
            });
            QUnit.test("Testing multiple buffs on chain damage: Blood for blood, Heavy Thrust, True Thrust, Vorpal Thrust, Full Thrust", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.BloodForBlood);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.HeavyThrust);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.VorpalThrust);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.FullThrust);
                assert.equal(simulatorViewModel.damageLog.length, 4);
                assert.equal(simulatorViewModel.totalPotency, 170 + 51 + 150 + 67.5 + 200 + 90 + 360 + 162);
            });
            QUnit.test("Chaos Thrust should have no dots unless it followed chain", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.ChaosThrust);
                simulatorViewModel.advanceTime(50000);
                assert.equal(simulatorViewModel.damageLog.length, 1);
                assert.equal(simulatorViewModel.totalPotency, 150);
            });
            QUnit.test("Dots should not be created: Disembowel, Chaos Thrust", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.Disembowel);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.ChaosThrust);
                simulatorViewModel.advanceTime(50000);
                assert.equal(simulatorViewModel.damageLog.length, 2);
                assert.equal(simulatorViewModel.totalPotency, 100 + 150);
            });
            QUnit.test("PPSLog: True Thrust x3", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
                assert.equal(simulatorViewModel.ppsLog.length, 3);
                assert.equal(simulatorViewModel.ppsLog[0].pps, 115.38);
                assert.equal(simulatorViewModel.ppsLog[0].time, 1300);
                assert.equal(simulatorViewModel.ppsLog[1].pps, 78.94);
                assert.equal(simulatorViewModel.ppsLog[1].time, 3800);
                assert.equal(simulatorViewModel.ppsLog[2].pps, 71.42);
                assert.equal(simulatorViewModel.ppsLog[2].time, 6300);
            });
            QUnit.test("PPSLog: True Thrust Combo", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.VorpalThrust);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.FullThrust);
                assert.equal(simulatorViewModel.ppsLog.length, 3);
                assert.equal(simulatorViewModel.ppsLog[0].pps, 115.38);
                assert.equal(simulatorViewModel.ppsLog[0].time, 1300);
                assert.equal(simulatorViewModel.ppsLog[1].pps, 92.10);
                assert.equal(simulatorViewModel.ppsLog[1].time, 3800);
                assert.equal(simulatorViewModel.ppsLog[2].pps, 112.69);
                assert.equal(simulatorViewModel.ppsLog[2].time, 6300);
            });
            QUnit.test("PPSLog: Phlebotomize full dot", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.Phlebotomize);
                simulatorViewModel.advanceTime(25300);
                assert.equal(simulatorViewModel.ppsLog.length, 9);
                assert.equal(simulatorViewModel.ppsLog[0].pps, 130.76);
                assert.equal(simulatorViewModel.ppsLog[0].time, 1300);
                assert.equal(simulatorViewModel.ppsLog[8].pps, 17.08);
                assert.equal(simulatorViewModel.ppsLog[8].time, 24000);
            });
            QUnit.test("PPSLog: Phlebotomize, True Thrust x2", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.Phlebotomize);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
                assert.equal(simulatorViewModel.ppsLog.length, 5);
                assert.equal(simulatorViewModel.ppsLog[0].pps, 130.76);
                assert.equal(simulatorViewModel.ppsLog[0].time, 1300);
                assert.equal(simulatorViewModel.ppsLog[2].pps, 92.10);
                assert.equal(simulatorViewModel.ppsLog[2].time, 3800);
                assert.equal(simulatorViewModel.ppsLog[4].pps, 84.12);
                assert.equal(simulatorViewModel.ppsLog[4].time, 6300);
            });
            QUnit.test("Reset - PPSLog: True Thrust x3", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.VorpalThrust);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.FullThrust);
                simulatorViewModel.reset();
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
                assert.equal(simulatorViewModel.ppsLog.length, 3);
                assert.equal(simulatorViewModel.ppsLog[0].pps, 115.38);
                assert.equal(simulatorViewModel.ppsLog[0].time, 1300);
                assert.equal(simulatorViewModel.ppsLog[1].pps, 78.94);
                assert.equal(simulatorViewModel.ppsLog[1].time, 3800);
                assert.equal(simulatorViewModel.ppsLog[2].pps, 71.42);
                assert.equal(simulatorViewModel.ppsLog[2].time, 6300);
            });
            QUnit.test("Bug where CT dot damage happens WAY in the future", function (assert) {
                var simulatorViewModel = new BaseSimulator_1.BaseSimulator();
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.VorpalThrust);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.FullThrust);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.ImpulseDrive);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.Disembowel);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.ChaosThrust);
                simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
                assert.equal(simulatorViewModel.ppsLog[0].pps, 115.38);
                assert.equal(simulatorViewModel.ppsLog[0].time, 1300);
                assert.equal(simulatorViewModel.ppsLog[1].pps, 92.10);
                assert.equal(simulatorViewModel.ppsLog[1].time, 3800);
                assert.equal(simulatorViewModel.ppsLog[2].pps, 112.69);
                assert.equal(simulatorViewModel.ppsLog[2].time, 6300);
                assert.equal(simulatorViewModel.ppsLog[3].pps, 101.13);
                assert.equal(simulatorViewModel.ppsLog[3].time, 8800);
                assert.equal(simulatorViewModel.ppsLog[4].pps, 98.23);
                assert.equal(simulatorViewModel.ppsLog[4].time, 11300);
                assert.equal(simulatorViewModel.ppsLog[5].pps, 100.36);
                assert.equal(simulatorViewModel.ppsLog[5].time, 13800);
                assert.equal(simulatorViewModel.ppsLog[6].pps, 94.9);
                assert.equal(simulatorViewModel.ppsLog[6].time, 15000);
                assert.equal(simulatorViewModel.ppsLog[7].pps, 97.45);
                assert.equal(simulatorViewModel.ppsLog[7].time, 16300);
            });
        }
        return BaseSimulatorTests;
    }());
    exports.BaseSimulatorTests = BaseSimulatorTests;
});

var DamageTypes;
(function (DamageTypes) {
    DamageTypes[DamageTypes["Slashing"] = 0] = "Slashing";
    DamageTypes[DamageTypes["Piercing"] = 1] = "Piercing";
    DamageTypes[DamageTypes["Magical"] = 2] = "Magical";
})(DamageTypes || (DamageTypes = {}));

define("DamageTypes", [],function(){});

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define('DragoonSimulator',["require", "exports", "./BaseSimulator", "./SimEvent"], function (require, exports, BaseSimulator_1, SimEvent_1) {
    "use strict";
    var DragoonSimulator = (function (_super) {
        __extends(DragoonSimulator, _super);
        function DragoonSimulator() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DragoonSimulator.prototype.determineIfBuffShouldBeRemoved = function (event, skillName) {
            if (skillName === "PowerSurge" && event.eventType === SimEventType.AnimationFinished && (event.skill.id === "Jump" || event.skill.id === "SpineshatterDive")) {
                return true;
            }
            if (skillName === "LifeSurge" && event.eventType === SimEventType.AnimationFinished && event.skill.skillType === SkillTypes.WeaponSkill) {
                return true;
            }
            return false;
        };
        DragoonSimulator.prototype.determineIfBuffCanBeApplied = function (skill, buffName) {
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
        };
        DragoonSimulator.prototype.classSpecificEventProcessing = function (event) {
            if (event.skill.id === "Geirskogul" && event.eventType === SimEventType.AnimationFinished) {
                var bloodOfTheDragonBuffEndEvent;
                this.events.forEach(function (value, index) {
                    if (value.skill.id === "BloodOfTheDragon" && value.eventType === SimEventType.BuffEnd) {
                        bloodOfTheDragonBuffEndEvent = value;
                    }
                });
                this.removeFromSimEvents(this.dragoon.BloodOfTheDragon);
                var newEndTime;
                if (bloodOfTheDragonBuffEndEvent.timestamp - this.time <= 10000) {
                    this.removeFromActiveBuffs("BloodOfTheDragon");
                }
                else {
                    newEndTime = bloodOfTheDragonBuffEndEvent.timestamp - 10000;
                    var newBuffEndEvent = new SimEvent_1.SimEvent(newEndTime, this.dragoon.BloodOfTheDragon, SimEventType.BuffEnd);
                    this.addToSimEvents([newBuffEndEvent]);
                }
                this.updateBuffEndTime("BloodOfTheDragon", newEndTime);
            }
            if ((event.skill.id === "FangAndClaw" || event.skill.id === "WheelingThrust") && event.eventType === SimEventType.AnimationFinished) {
                var bloodOfTheDragonBuffEndEvent;
                var newBuffEndEvent;
                this.events.forEach(function (value, index) {
                    if (value.skill.id === "BloodOfTheDragon" && value.eventType === SimEventType.BuffEnd) {
                        bloodOfTheDragonBuffEndEvent = value;
                    }
                });
                this.removeFromSimEvents(this.dragoon.BloodOfTheDragon);
                var newEndTime;
                if (bloodOfTheDragonBuffEndEvent.timestamp - this.time > 15000) {
                    newEndTime = this.time + 30000;
                }
                else {
                    newEndTime = bloodOfTheDragonBuffEndEvent.timestamp + 15000;
                }
                newBuffEndEvent = new SimEvent_1.SimEvent(newEndTime, this.dragoon.BloodOfTheDragon, SimEventType.BuffEnd);
                this.updateBuffEndTime("BloodOfTheDragon", newEndTime);
                this.addToSimEvents([newBuffEndEvent]);
            }
        };
        DragoonSimulator.prototype.validateActivatedSkillModelSpecific = function (skill) {
            if ((skill.id === "WheelingThrust" && !this.activeBuffs.some(function (ab) { return ab.skill.id === "BloodOfTheDragon"; }))
                || (skill.id === "FangAndClaw" && !this.activeBuffs.some(function (ab) { return ab.skill.id === "BloodOfTheDragon"; }))
                || (skill.id === "Geirskogul" && !this.activeBuffs.some(function (ab) { return ab.skill.id === "BloodOfTheDragon"; }))
                || (skill.id === "WheelingThrust" && !this.nextInChain.some(function (skillId) { return skillId === "WheelingThrust"; }))
                || (skill.id === "FangAndClaw" && !this.nextInChain.some(function (skillId) { return skillId === "FangAndClaw"; }))) {
                return false;
            }
            return true;
        };
        return DragoonSimulator;
    }(BaseSimulator_1.BaseSimulator));
    exports.DragoonSimulator = DragoonSimulator;
});

define('DragoonSimulatorTests',["require", "exports", "./DragoonSimulator"], function (require, exports, DragoonSimulator_1) {
    "use strict";
    var DragoonSimulatorTests = (function () {
        function DragoonSimulatorTests() {
            QUnit.test("Buff drops after single use: Life Surge", function (assert) {
                var dragoonSimulator = new DragoonSimulator_1.DragoonSimulator();
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.LifeSurge);
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.TrueThrust);
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.TrueThrust);
                assert.equal(dragoonSimulator.damageLog.length, 2);
                assert.equal(dragoonSimulator.totalPotency, 150 + 75 + 150);
            });
            QUnit.test("Life Surge only works on weaponskills: Jump", function (assert) {
                var dragoonSimulator = new DragoonSimulator_1.DragoonSimulator();
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.LifeSurge);
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.Jump);
                assert.equal(dragoonSimulator.damageLog.length, 1);
                assert.equal(dragoonSimulator.totalPotency, 200);
            });
            QUnit.test("Life Surge only works on weaponskills: Leg Sweep, True Thrust", function (assert) {
                var dragoonSimulator = new DragoonSimulator_1.DragoonSimulator();
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.LifeSurge);
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.LegSweep);
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.TrueThrust);
                assert.equal(dragoonSimulator.damageLog.length, 2);
                assert.equal(dragoonSimulator.totalPotency, 130 + 150 + 75);
            });
            QUnit.test("Life Surge doesnt drop from activeBuffs array when using abilities", function (assert) {
                var dragoonSimulator = new DragoonSimulator_1.DragoonSimulator();
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.LifeSurge);
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.Jump);
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.SpineshatterDive);
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.DragonfireDive);
                assert.equal(dragoonSimulator.activeBuffs[0].skill.id, "LifeSurge");
            });
            QUnit.test("Power Surge works on: Jump", function (assert) {
                var dragoonSimulator = new DragoonSimulator_1.DragoonSimulator();
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.PowerSurge);
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.Jump);
                assert.equal(dragoonSimulator.damageLog.length, 1);
                assert.equal(dragoonSimulator.totalPotency, 200 + 100);
            });
            QUnit.test("Power Surge works on: Spineshatter Dive", function (assert) {
                var dragoonSimulator = new DragoonSimulator_1.DragoonSimulator();
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.PowerSurge);
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.SpineshatterDive);
                assert.equal(dragoonSimulator.damageLog.length, 1);
                assert.equal(dragoonSimulator.totalPotency, 170 + 85);
            });
            QUnit.test("Buff drops after single use: Power Surge", function (assert) {
                var dragoonSimulator = new DragoonSimulator_1.DragoonSimulator();
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.PowerSurge);
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.Jump);
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.SpineshatterDive);
                assert.equal(dragoonSimulator.damageLog.length, 2);
                assert.equal(dragoonSimulator.totalPotency, 200 + 100 + 170);
            });
            QUnit.test("Power Surge doesnt work on anything other than jump/spineshatter dive", function (assert) {
                var dragoonSimulator = new DragoonSimulator_1.DragoonSimulator();
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.PowerSurge);
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.TrueThrust);
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.VorpalThrust);
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.FullThrust);
                assert.equal(dragoonSimulator.damageLog.length, 3);
                assert.equal(dragoonSimulator.totalPotency, 150 + 200 + 360);
            });
            QUnit.test("Power Surge doesnt drop from activeBuffs array when using weaponskills", function (assert) {
                var dragoonSimulator = new DragoonSimulator_1.DragoonSimulator();
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.PowerSurge);
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.TrueThrust);
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.VorpalThrust);
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.FullThrust);
                assert.equal(dragoonSimulator.activeBuffs[0].skill.id, "PowerSurge");
            });
            QUnit.test("Fang and claw doesnt activate without the blood of dragon buff", function (assert) {
                var dragoonSimulator = new DragoonSimulator_1.DragoonSimulator();
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.FangAndClaw);
                assert.equal(dragoonSimulator.activeBuffs.length, 0);
                assert.equal(dragoonSimulator.time, 0);
                assert.equal(dragoonSimulator.damageLog.length, 0);
            });
            QUnit.test("Wheeling Thrust doesnt activate without the blood of dragon buff", function (assert) {
                var dragoonSimulator = new DragoonSimulator_1.DragoonSimulator();
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.WheelingThrust);
                assert.equal(dragoonSimulator.activeBuffs.length, 0);
                assert.equal(dragoonSimulator.time, 0);
                assert.equal(dragoonSimulator.damageLog.length, 0);
            });
            QUnit.test("Fang and claw doesnt activate without the correct chain", function (assert) {
                var dragoonSimulator = new DragoonSimulator_1.DragoonSimulator();
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.FangAndClaw);
                assert.equal(dragoonSimulator.activeBuffs.length, 0);
                assert.equal(dragoonSimulator.time, 0);
                assert.equal(dragoonSimulator.damageLog.length, 0);
            });
            QUnit.test("Wheeling Thrust doesnt activate without the correct chain", function (assert) {
                var dragoonSimulator = new DragoonSimulator_1.DragoonSimulator();
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.WheelingThrust);
                assert.equal(dragoonSimulator.activeBuffs.length, 0);
                assert.equal(dragoonSimulator.time, 0);
                assert.equal(dragoonSimulator.damageLog.length, 0);
            });
            QUnit.test("Fang and claw doesnt activates on proper chain without buff", function (assert) {
                var dragoonSimulator = new DragoonSimulator_1.DragoonSimulator();
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.TrueThrust);
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.VorpalThrust);
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.FullThrust);
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.FangAndClaw);
                assert.equal(dragoonSimulator.activeBuffs.length, 0);
                assert.equal(dragoonSimulator.time, 6300);
                assert.equal(dragoonSimulator.damageLog.length, 3);
            });
            QUnit.test("Wheeling Thrust doesnt activates on proper chain without buff", function (assert) {
                var dragoonSimulator = new DragoonSimulator_1.DragoonSimulator();
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.TrueThrust);
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.VorpalThrust);
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.FullThrust);
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.WheelingThrust);
                assert.equal(dragoonSimulator.activeBuffs.length, 0);
                assert.equal(dragoonSimulator.time, 6300);
                assert.equal(dragoonSimulator.damageLog.length, 3);
            });
            QUnit.test("Fang and claw doesnt activate without proper chain with buff", function (assert) {
                var dragoonSimulator = new DragoonSimulator_1.DragoonSimulator();
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.BloodOfTheDragon);
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.FangAndClaw);
                assert.equal(dragoonSimulator.activeBuffs.length, 1);
                assert.equal(dragoonSimulator.time, 1300);
                assert.equal(dragoonSimulator.damageLog.length, 0);
            });
            QUnit.test("wheeling thrust doesnt activate without proper chain with buff", function (assert) {
                var dragoonSimulator = new DragoonSimulator_1.DragoonSimulator();
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.BloodOfTheDragon);
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.WheelingThrust);
                assert.equal(dragoonSimulator.activeBuffs.length, 1);
                assert.equal(dragoonSimulator.time, 1300);
                assert.equal(dragoonSimulator.damageLog.length, 0);
            });
            QUnit.test("Fang and claw activates on proper chain and buff", function (assert) {
                var dragoonSimulator = new DragoonSimulator_1.DragoonSimulator();
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.TrueThrust);
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.VorpalThrust);
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.FullThrust);
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.BloodOfTheDragon);
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.FangAndClaw);
                assert.equal(dragoonSimulator.activeBuffs.length, 1);
                assert.equal(dragoonSimulator.time, 8900);
                assert.equal(dragoonSimulator.damageLog.length, 4);
            });
            QUnit.test("Wheeling Thrust activates on proper chain and buff", function (assert) {
                var dragoonSimulator = new DragoonSimulator_1.DragoonSimulator();
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.TrueThrust);
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.VorpalThrust);
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.FullThrust);
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.BloodOfTheDragon);
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.WheelingThrust);
                assert.equal(dragoonSimulator.activeBuffs.length, 1);
                assert.equal(dragoonSimulator.time, 8900);
                assert.equal(dragoonSimulator.damageLog.length, 4);
            });
            QUnit.test("Damage calculation: fang and claw", function (assert) {
                var dragoonSimulator = new DragoonSimulator_1.DragoonSimulator();
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.TrueThrust);
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.VorpalThrust);
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.FullThrust);
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.BloodOfTheDragon);
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.FangAndClaw);
                assert.equal(dragoonSimulator.damageLog[3].totalDamage, 290);
            });
            QUnit.test("Damage calculation: wheeling thrust", function (assert) {
                var dragoonSimulator = new DragoonSimulator_1.DragoonSimulator();
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.TrueThrust);
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.VorpalThrust);
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.FullThrust);
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.BloodOfTheDragon);
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.WheelingThrust);
                assert.equal(dragoonSimulator.damageLog[3].totalDamage, 290);
            });
            QUnit.test("Damage calculation: fang and claw chain with buff at beginning", function (assert) {
                var dragoonSimulator = new DragoonSimulator_1.DragoonSimulator();
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.BloodOfTheDragon);
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.TrueThrust);
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.VorpalThrust);
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.FullThrust);
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.FangAndClaw);
                assert.equal(dragoonSimulator.totalPotency, 150 + 200 + 360 + 290);
            });
            QUnit.test("Damage calculation: wheeling thrust chain with buff at beginning", function (assert) {
                var dragoonSimulator = new DragoonSimulator_1.DragoonSimulator();
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.BloodOfTheDragon);
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.TrueThrust);
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.VorpalThrust);
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.FullThrust);
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.WheelingThrust);
                assert.equal(dragoonSimulator.totalPotency, 150 + 200 + 360 + 290);
            });
            QUnit.test("Damage calculation: blood of the dragon + jump", function (assert) {
                var dragoonSimulator = new DragoonSimulator_1.DragoonSimulator();
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.BloodOfTheDragon);
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.Jump);
                assert.equal(dragoonSimulator.totalPotency, 200 + 60);
            });
            QUnit.test("Damage calculation: blood of the dragon + spineshatter", function (assert) {
                var dragoonSimulator = new DragoonSimulator_1.DragoonSimulator();
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.BloodOfTheDragon);
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.SpineshatterDive);
                assert.equal(dragoonSimulator.totalPotency, 170 + 51);
            });
            QUnit.test("BotD time increase when less then 15 seconds - Wheeling Thrust", function (assert) {
                var dragoonSimulator = new DragoonSimulator_1.DragoonSimulator();
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.TrueThrust);
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.VorpalThrust);
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.BloodOfTheDragon);
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.FullThrust);
                dragoonSimulator.activateSkill(dragoonSimulator.dragoon.WheelingThrust);
                var actual = dragoonSimulator.activeBuffs[0].skill.id;
                var actual2 = dragoonSimulator.time;
                var actual3 = dragoonSimulator.activeBuffs[0].endTime;
                assert.equal(actual, "BloodOfTheDragon");
                assert.equal(actual2, 8900);
                assert.equal(actual3, 33900);
            });
        }
        return DragoonSimulatorTests;
    }());
    exports.DragoonSimulatorTests = DragoonSimulatorTests;
});

define('DragoonTests',["require", "exports", "./Dragoon"], function (require, exports, Dragoon_1) {
    "use strict";
    var DragoonTests = (function () {
        function DragoonTests() {
            QUnit.test("QUnit added to project", function (assert) {
                var expected = "result";
                assert.equal(expected, "result");
            });
            QUnit.test("All skills should have a name", function (assert) {
                var allAbilitiesHaveAName = true;
                for (var dragoonSkill in Dragoon_1.Dragoon) {
                    var skill = Dragoon_1.Dragoon[dragoonSkill];
                    if (skill.name.length <= 0) {
                        allAbilitiesHaveAName = false;
                        console.log("Skill:  " + skill.name + " - Name:  " + skill.name);
                    }
                }
                assert.equal(allAbilitiesHaveAName, true);
            });
            QUnit.test("All abilities should have a cooldown", function (assert) {
                var allAbilitiesHaveCooldowns = true;
                for (var dragoonSkill in Dragoon_1.Dragoon) {
                    var skill = Dragoon_1.Dragoon[dragoonSkill];
                    if (skill.skillType == SkillTypes.Ability && skill.cooldown <= 0) {
                        allAbilitiesHaveCooldowns = false;
                        console.log("Skill:  " + skill.name + " - Cooldown:  " + skill.cooldown);
                    }
                }
                assert.equal(allAbilitiesHaveCooldowns, true);
            });
            QUnit.test("All weapon skills should have potency", function (assert) {
                var allAbilitiesHavePotency = true;
                for (var dragoonSkill in Dragoon_1.Dragoon) {
                    var skill = Dragoon_1.Dragoon[dragoonSkill];
                    if (skill.skillType == SkillTypes.WeaponSkill && skill.potency <= 0) {
                        allAbilitiesHavePotency = false;
                        console.log("Skill:  " + skill.name + " - Potency:  " + skill.potency);
                    }
                }
                assert.equal(allAbilitiesHavePotency, true);
            });
            QUnit.test("All weapon skills should have tpCost (except wheel thrust and Fang and Claw)", function (assert) {
                var allAbilitiesHaveTpCost = true;
                for (var dragoonSkill in Dragoon_1.Dragoon) {
                    var skill = Dragoon_1.Dragoon[dragoonSkill];
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
                for (var dragoonSkill in Dragoon_1.Dragoon) {
                    var skill = Dragoon_1.Dragoon[dragoonSkill];
                    if (skill.animationDuration <= 0) {
                        allAbilitiesHaveAnimationDuration = false;
                        console.log("Skill:  " + skill.name + " - Animation Duration:  " + skill.animationDuration);
                    }
                }
                assert.equal(allAbilitiesHaveAnimationDuration, true);
            });
            QUnit.test("If a skill has dot potency, it should also have dot duration", function (assert) {
                var abilitiesHaveBothDotDurationAndPotency = true;
                for (var dragoonSkill in Dragoon_1.Dragoon) {
                    var skill = Dragoon_1.Dragoon[dragoonSkill];
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
                for (var dragoonSkill in Dragoon_1.Dragoon) {
                    var skill = Dragoon_1.Dragoon[dragoonSkill];
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
        return DragoonTests;
    }());
    exports.DragoonTests = DragoonTests;
});

define('environment',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        debug: true,
        testing: true
    };
});

define('main',["require", "exports", "./environment"], function (require, exports, environment_1) {
    "use strict";
    Promise.config({
        warnings: {
            wForgottenReturn: false
        }
    });
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration()
            .feature('resources')
            .plugin('aurelia-chartist');
        if (environment_1.default.debug) {
            aurelia.use.developmentLogging();
        }
        if (environment_1.default.testing) {
            aurelia.use.plugin('aurelia-testing');
        }
        aurelia.start().then(function () { return aurelia.setRoot(); });
    }
    exports.configure = configure;
});

define('PPSChart',["require", "exports"], function (require, exports) {
    "use strict";
    var PPSChart = (function () {
        function PPSChart() {
            this.data = {
                labels: [1, 2, 3],
                series: [[4, 5, 6]]
            };
            this.loadGraph();
        }
        PPSChart.prototype.loadGraph = function () {
            var _this = this;
            var element = $(".ct-chart");
            setTimeout(function () {
                if (element.length > 0) {
                    _this.chart = new Chartist.Line('.ct-chart', {
                        series: [
                            {
                                name: 'series-1',
                                data: [
                                    { x: 1000, y: 100 }
                                ]
                            }
                        ]
                    }, {
                        axisX: {
                            type: Chartist.FixedScaleAxis,
                            divisor: 5,
                            labelInterpolationFnc: function (value) {
                                var minutes = Math.floor(value / 60000);
                                var seconds = (value % 60000) / 1000;
                                if (minutes > 0) {
                                    return minutes + "m " + seconds + "s";
                                }
                                return seconds + "s";
                            }
                        }
                    });
                }
                else {
                    _this.loadGraph();
                }
            }, 1000);
        };
        PPSChart.prototype.updateData = function (seriesData) {
            this.chart.update({ series: seriesData });
        };
        ;
        return PPSChart;
    }());
    exports.PPSChart = PPSChart;
});

var SimEventType;
(function (SimEventType) {
    SimEventType[SimEventType["Cooldown"] = 0] = "Cooldown";
    SimEventType[SimEventType["DotTick"] = 1] = "DotTick";
    SimEventType[SimEventType["DotEnd"] = 2] = "DotEnd";
    SimEventType[SimEventType["BuffEnd"] = 3] = "BuffEnd";
    SimEventType[SimEventType["GlobalCooldown"] = 4] = "GlobalCooldown";
    SimEventType[SimEventType["AnimationFinished"] = 5] = "AnimationFinished";
    SimEventType[SimEventType["ChainEnd"] = 6] = "ChainEnd";
})(SimEventType || (SimEventType = {}));

define("SimEventType", [],function(){});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('Simulator',["require", "exports", "./PPSChart", "./DragoonSimulator", "aurelia-framework"], function (require, exports, PPSChart_1, DragoonSimulator_1, aurelia_framework_1) {
    "use strict";
    var Simulator = (function () {
        function Simulator(bindingEngine) {
            this.ppsChart = window['ppsChart'] = new PPSChart_1.PPSChart();
            this.dragoonSimulator = window['dragoonSimulator'] = new DragoonSimulator_1.DragoonSimulator();
            this.currentRotationIndex = -1;
            this.chartData = [];
            window['simulator'] = this;
            this.startNewRotation();
            this.bindingEngine = bindingEngine;
            var subscription = this.bindingEngine
                .collectionObserver(this.dragoonSimulator.ppsLog)
                .subscribe(this.ppsLogSubscriptionCallback);
        }
        Simulator.prototype.startNewRotation = function () {
            if (this.currentRotationIndex == -1 || this.dragoonSimulator.ppsLog.length > 0) {
                this.currentRotationIndex++;
                this.dragoonSimulator.reset();
                console.log("new rotation");
            }
        };
        Simulator.prototype.ppsLogSubscriptionCallback = function (splices) {
            var vm = window['simulator'];
            vm.chartData[vm.currentRotationIndex] = vm.updateRotationSeries(vm.dragoonSimulator.ppsLog);
            vm.updateChart();
        };
        ;
        Simulator.prototype.updateChart = function () {
            this.ppsChart.updateData(this.chartData);
        };
        ;
        Simulator.prototype.updateRotationSeries = function (ppsLog) {
            var seriesObject = { name: 'series-' + this.currentRotationIndex, data: [] };
            ppsLog.forEach(function (item, index) {
                seriesObject.data.push({ x: item.time, y: item.pps });
            });
            return seriesObject;
        };
        return Simulator;
    }());
    Simulator = __decorate([
        aurelia_framework_1.inject(aurelia_framework_1.BindingEngine),
        __metadata("design:paramtypes", [Object])
    ], Simulator);
    exports.Simulator = Simulator;
});

var SkillTypes;
(function (SkillTypes) {
    SkillTypes[SkillTypes["Ability"] = 0] = "Ability";
    SkillTypes[SkillTypes["Buff"] = 1] = "Buff";
    SkillTypes[SkillTypes["DOT"] = 2] = "DOT";
    SkillTypes[SkillTypes["WeaponSkill"] = 3] = "WeaponSkill";
})(SkillTypes || (SkillTypes = {}));

define("SkillTypes", [],function(){});

define('Tests',["require", "exports", "./DragoonSimulator", "./BaseSimulatorTests", "./DragoonTests", "./DragoonSimulatorTests"], function (require, exports, DragoonSimulator_1, BaseSimulatorTests_1, DragoonTests_1, DragoonSimulatorTests_1) {
    "use strict";
    var Tests = (function () {
        function Tests() {
            var vm = new DragoonSimulator_1.DragoonSimulator();
            var dragoonModelTests = new DragoonTests_1.DragoonTests();
            var baseSimulatorTests = new BaseSimulatorTests_1.BaseSimulatorTests();
            var dragoonSimulatorTests = new DragoonSimulatorTests_1.DragoonSimulatorTests();
            QUnit.start();
        }
        return Tests;
    }());
    exports.Tests = Tests;
});

define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    function configure(config) {
    }
    exports.configure = configure;
});

define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"bootstrap/css/bootstrap.css\"></require><div><router-view></router-view></div></template>"; });
define('text!Simulator.html', ['module'], function(module) { module.exports = "<template><link rel=\"stylesheet\" href=\"../styles/Simulator.css\"><div class=\"title\">Dragoon</div><div class=\"container-fluid\"><div class=\"row\"><div class=\"col-sm-2\"><div class=\"row\"></div><div class=\"row\"><div class=\"col-sm-1\">Skill:</div><div class=\"col-sm-3\">Damage:</div><div class=\"col-sm-3\">Time:</div><div class=\"col-sm-4\">Buffed:</div></div><div class=\"row damagePanel\"><div repeat.for=\"damage of dragoonSimulator.damageLog\" class=\"row damageRow\"><div class=\"col-sm-2\"><div class=\"icon small ${damage.skill.id}\"></div></div><div class=\"col-sm-2\">${damage.totalDamage}</div><div class=\"col-sm-4\">${dragoonSimulator.formatTime(damage.time)}</div><div class=\"col-sm-4\"><div class=\"icon small ${buff}\" repeat.for=\"buff of damage.buffs\"></div></div></div></div></div><div class=\"col-sm-8\"><div class=\"ct-chart ct-perfect-fifth\"></div></div><div class=\"col-sm-2\"><div class=\"row\"><div class=\"col-sm-7\">Total Potency:</div><div class=\"col-sm-5\">${dragoonSimulator.totalPotency}</div></div><div class=\"row\"><div class=\"col-sm-7\">Current Time:</div><div class=\"col-sm-5\">${dragoonSimulator.formatTime(dragoonSimulator.time)}</div></div><div class=\"row ppsRow\"><div class=\"col-sm-7\">PPS:</div><div class=\"col-sm-5\">${dragoonSimulator.pps}</div></div><br><br><br><div class=\"row\"><div class=\"col-sm-12\">Active Buffs:</div></div><div class=\"row\"><div class=\"buffTimer\" repeat.for=\"activeBuff of dragoonSimulator.activeBuffs\"><div class=\"icon small ${activeBuff.skill.id}\"></div><div class=\"iconTimer\">${dragoonSimulator.formatTimer(activeBuff.endTime - dragoonSimulator.time)}</div></div></div><br><br><br><div class=\"row\"><div class=\"col-sm-12\">Active DoTs:</div></div><div class=\"row\"><div class=\"dotTimer\" repeat.for=\"activeDot of dragoonSimulator.activeDots\"><div class=\"icon small ${activeDot.skill.id}\"></div><div class=\"iconTimer\">${dragoonSimulator.formatTimer(activeDot.endTime - dragoonSimulator.time)}</div></div></div><br><br><br><div class=\"row\"><div class=\"col-sm-12\">Skills on cooldown:</div></div><div class=\"row\"><div class=\"cooldownTimer\" repeat.for=\"skillOnCooldown of dragoonSimulator.skillsOnCooldown\"><div class=\"icon small ${skillOnCooldown.name}\"></div><div class=\"iconTimer\">${dragoonSimulator.formatTimer(skillOnCooldown.endTime - dragoonSimulator.time)}</div></div><div repeat.for=\"skillOnCooldown of skillsOnCooldown\" class=\"icon small ${dragoonSimulator.skillOnCooldown}\"></div></div><div class=\"row\"><button click.trigger=\"startNewRotation()\" class=\"btn btn-primary\">New Rotation</button></div><div class=\"row\"><button type=\"button\" class=\"btn btn-primary\" data-toggle=\"modal\" data-target=\"#exportUserActions\">Export Rotation</button></div><div class=\"row\"><button type=\"button\" class=\"btn btn-primary\" data-toggle=\"modal\" data-target=\"#importUserActions\">Import Rotation</button></div></div></div><div class=\"row\"></div><div class=\"row\"><div class=\"skillsPanel col-sm-offset-2 col-sm-8\"><div repeat.for=\"skill of dragoonSimulator.dragoonArray\" class=\"skill\"><div click.trigger=\"dragoonSimulator.activateSkill(skill)\" class=\"icon ${skill.id}\"></div></div></div></div></div><div id=\"exportUserActions\" class=\"modal fade\" role=\"dialog\"><div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button><h4 class=\"modal-title\">Export Rotation</h4></div><div class=\"modal-body\"><div>Copy the text below and paste into the import popup:</div><br><div>${dragoonSimulator.userActionsJSON}</div></div><div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button></div></div></div></div><div id=\"importUserActions\" class=\"modal fade\" role=\"dialog\"><div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button><h4 class=\"modal-title\">Import Rotation</h4></div><div class=\"modal-body\"><div>Paste below the text you copied from the export popup.</div><br><div>**Please note this will reset any progress you have on your current rotation. If you do not want to lose your current rotation, click on \"New Rotation\".</div><br><input value.bind=\"dragoonSimulator.userActionsImport\"></div><div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" click.trigger=\"dragoonSimulator.importUserActions()\">Import</button> <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button></div></div></div></div></template>"; });
define('text!Tests.html', ['module'], function(module) { module.exports = "<template><script src=\"../Scripts/jQuery/jquery-2.1.4.min.js\"></script><script src=\"../Scripts/QUnit/qunit-2.1.1.js\"></script><link rel=\"stylesheet\" href=\"../Styles/QUnit/qunit-1.18.0.css\"><div id=\"qunit\"></div></template>"; });
//# sourceMappingURL=app-bundle.js.map