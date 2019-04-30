﻿/// <reference path="../typings/index.d.ts" />

//import {SkillTypes} from './enums/SkillTypes'
//import {DamageTypes} from './enums/DamageTypes'

export const Dragoon: IDragoon = {
    TrueThrust: {
        id: "TrueThrust",
        name: "True Thrust",
        skillType: SkillTypes.WeaponSkill,
        potency: 150,
        missedChainPotency: 0,
        missedPositionalPotency: 0,
        dotDuration: 0,
        dotPotency: 0,
        animationDuration: 1300, // In milliseconds
        buffDuration: 0,
        buffPotency: 0,
        cooldown: 0,
        mpCost: 0,
        tpCost: 70,
        damageType: DamageTypes.Piercing,
        addedBuff: false,        // Piercing damage buff
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
        animationDuration: 1300, // In milliseconds
        buffDuration: 0,
        buffPotency: 0,
        cooldown: 0,
        mpCost: 0,
        tpCost: 60,
        damageType: DamageTypes.Piercing,
        addedBuff: false,        // Piercing damage buff
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
        animationDuration: 1300, // In milliseconds
        buffDuration: 0,
        buffPotency: 0,
        cooldown: 0,
        mpCost: 0,
        tpCost: 60,
        damageType: DamageTypes.Piercing,
        addedBuff: false,        // Piercing damage buff
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
        animationDuration: 1300, // In milliseconds
        buffDuration: 0,
        buffPotency: 0,
        cooldown: 0,
        mpCost: 0,
        tpCost: 70,
        damageType: DamageTypes.Piercing,
        addedBuff: false,        // Piercing damage buff
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
        animationDuration: 1300, // In milliseconds
        buffDuration: 20000,
        buffPotency: 0.1,
        cooldown: 0,
        mpCost: 0,
        tpCost: 60,
        damageType: DamageTypes.Piercing,
        addedBuff: true,        // Piercing damage buff
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
        animationDuration: 1300, // In milliseconds
        buffDuration: 0,
        buffPotency: 0,
        cooldown: 0,
        mpCost: 0,
        tpCost: 60,
        damageType: DamageTypes.Piercing,
        addedBuff: true,        // Piercing damage buff
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
        animationDuration: 1300, // In milliseconds
        buffDuration: 0,
        buffPotency: 0,
        cooldown: 0,
        mpCost: 0,
        tpCost: 0,
        damageType: DamageTypes.Piercing,
        addedBuff: true,        // Piercing damage buff
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
        animationDuration: 1300, // In milliseconds
        buffDuration: 0,
        buffPotency: 0,
        cooldown: 0,
        mpCost: 0,
        tpCost: 0,
        damageType: DamageTypes.Piercing,
        addedBuff: true,        // Piercing damage buff
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
        animationDuration: 1300, // In milliseconds
        buffDuration: 0,
        buffPotency: 0,
        cooldown: 10000,
        mpCost: 0,
        tpCost: 0,
        damageType: DamageTypes.Piercing,
        addedBuff: true,        // Piercing damage buff
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
        animationDuration: 1300, // In milliseconds
        buffDuration: 0,
        buffPotency: 0,
        cooldown: 0,
        mpCost: 0,
        tpCost: 80,
        damageType: DamageTypes.Piercing,
        addedBuff: false,        // Piercing damage buff
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
        animationDuration: 1300, // In milliseconds
        buffDuration: 20000,
        buffPotency: 0,
        cooldown: 90000,
        mpCost: 0,
        tpCost: 0,
        damageType: DamageTypes.Piercing,
        addedBuff: false,        // Piercing damage buff
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
        animationDuration: 1300, // In milliseconds
        buffDuration: 0,
        buffPotency: 0,
        cooldown: 30000,
        mpCost: 0,
        tpCost: 0,
        damageType: DamageTypes.Piercing,
        addedBuff: false,        // Piercing damage buff
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
        animationDuration: 1300, // In milliseconds
        buffDuration: 24000,
        buffPotency: 0.15,
        cooldown: 0,
        mpCost: 0,
        tpCost: 70,
        damageType: DamageTypes.Piercing,
        addedBuff: true,        // Piercing damage buff
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
        animationDuration: 1300, // In milliseconds
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
        animationDuration: 1300, // In milliseconds
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
        animationDuration: 1300, // In milliseconds
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
        animationDuration: 1300, // In milliseconds
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
        animationDuration: 1300, // In milliseconds
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
        animationDuration: 1300, // In milliseconds
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
        animationDuration: 1300, // In milliseconds
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
        animationDuration: 1300, // In milliseconds
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
        animationDuration: 1300, // In milliseconds
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
        animationDuration: 1300, // In milliseconds
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
        animationDuration: 1300, // In milliseconds
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
        animationDuration: 1300, // In milliseconds
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
        animationDuration: 1300, // In milliseconds
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
        animationDuration: 1300, // In milliseconds
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
} 

export const DragoonArray: Array<ISkill> = [
    Dragoon.TrueThrust,
    Dragoon.VorpalThrust,
    Dragoon.FullThrust,
    Dragoon.ImpulseDrive,
    Dragoon.Disembowel,
    Dragoon.ChaosThrust,
    Dragoon.FangAndClaw,
    Dragoon.WheelingThrust,
    Dragoon.Geirskogul,
    Dragoon.KeenFlurry,
    Dragoon.LegSweep,
    Dragoon.HeavyThrust,
    Dragoon.Phlebotomize,
    Dragoon.PiercingTalon,
    Dragoon.DoomSpike,
    Dragoon.RingOfThorns,
    Dragoon.ElusiveJump,
    Dragoon.LifeSurge,
    Dragoon.BloodForBlood,
    Dragoon.PowerSurge,
    Dragoon.BattleLitany,
    Dragoon.BloodOfTheDragon,
    Dragoon.Invigorate,
    Dragoon.Jump,
    Dragoon.SpineshatterDive,
    Dragoon.DragonfireDive,
];