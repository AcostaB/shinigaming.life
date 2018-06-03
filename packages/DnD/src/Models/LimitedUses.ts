// import Spell from "./Spell";

export class LimitedUseAbility {
    id: number;
    level: number;
    name: string;
    maxUses: number;
    type: string;
    description: string;
    shortRestRecover: boolean; 
}

export const limitedUses = [
    {   
        id: 1,
        level: 1,
        name: "Darkside",
        maxUses: 5,
        type: "ability",
        description: "Deal an additional 1d6 of damage per attack.",
        shortRestRecover: false 
    },
    {   
        id: 2,
        level: 3,
        name: "Hellish Rebuke",
        maxUses: 1,
        type: "spell",
        spellLevel: 1,
        description: "(3d10 of damage) You point your finger, and the creature that damaged you is momentarily surrounded by hellish flames. The creature must make a Dexterity saving throw. It takes 2d10 fire damage on a failed save, or half as much damage on a successful one. At Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d10 for each slot level above 1st.",
        shortRestRecover: false,
        castingTime: "1 Reaction", 
        rangeAndArea: "60ft", 
        duration: "Instantaneous", 
        school: "Evocation", 
        attackAndSave: "DEX Save", 
        damageAndEffect: "Fire"
    },
    {   
        id: 3,
        level: 5,
        name: "Darkness",
        maxUses: 1,
        type: "spell",
        spellLevel: 2,
        description: "Magical darkness spreads from a point you choose within range to fill a 15-foot-radius sphere for the duration. The darkness spreads around corners. A creature with darkvision can't see through this darkness, and nonmagical light can't illuminate it. If the point you choose is on an object you are holding or one that isn't being worn or carried, the darkness emanates from the object and moves with it. Completely covering the source of the darkness with an opaque object, such as a bowl or a helm, blocks the darkness. If any of this spell's area overlaps with an area of light created by a spell of 2nd level or lower, the spell that created the light is dispelled.",
        shortRestRecover: false,
        castingTime: "1 Action", 
        rangeAndArea: "60ft (15ft sphere)", 
        duration: "10 minute", 
        school: "Evocation", 
        attackAndSave: "None", 
        damageAndEffect: "Control"
    },
    {   
        id: 4,
        level: 6,
        name: "Dark Nebula",
        maxUses: 0,
        type: "ability",
        description: "Sacrifice a hit die to cast dark nebula on a 30ft cone. All creatures hit make a dexterity saving throw, taking half the damage of a successful save. Damage to self is 2d4, enemies take 4d6 necrotic damage.",
        shortRestRecover: false 
    },
    {   
        id: 5,
        level: 9,
        name: "Detect Evil and Good",
        maxUses: 0,
        type: "spell",
        spellLevel: 1,
        description: "For the duration, you know if there is an aberration, celestial, elemental, fey, fiend, or undead within 30 feet of you, as well as where the creature is located. Similarly, you know if there is a place or object within 30 feet of you that has been magically consecrated or desecrated. The spell can penetrate most barriers, but it is blocked by 1 foot of stone, 1 inch of common metal, a thin sheet of lead, or 3 feet of wood or dirt.",
        shortRestRecover: false,
        castingTime: "1 Action", 
        rangeAndArea: "Self (30ft sphere)", 
        duration: "10 minute", 
        school: "Divination", 
        attackAndSave: "None", 
        damageAndEffect: "Detection"
    },
    {   
        id: 6,
        level: 10,
        name: "Soul Survivor",
        maxUses: 1,
        type: "ability",
        description: "As a bonus action, choose a target to cast soul survivor on. If target before your next turn, recover one hit die.",
        shortRestRecover: true 
    },
    {   
        id: 7,
        level: 11,
        name: "Speak with Death",
        maxUses: 2,
        type: "spell",
        spellLevel: 3,
        description: "You grant the semblance of life and intelligence to a corpse of your choice within range, allowing it to answer the questions you pose. The corpse must still have a mouth and can't be undead. The spell fails if the corpse was the target of this spell within the last 10 days. Until the spell ends, you can ask the corpse up to five questions. The corpse knows only what it knew in life, including the languages it knew. Answers are usually brief, cryptic, or repetitive, and the corpse is under no compulsion to offer a truthful answer if you are hostile to it or it recognizes you as an enemy. This spell doesn't return the creature's soul to its body, only its animating spirit. Thus, the corpse can't learn new information, doesn't comprehend anything that has happened since it died, and can't speculate about future events.",
        shortRestRecover: false,
        castingTime: "1 Action", 
        rangeAndArea: "10ft", 
        duration: "10 minute", 
        school: "Necromancy", 
        attackAndSave: "None", 
        damageAndEffect: "Communication"
    },
    {   
        id: 8,
        level: 11,
        name: "Tongues",
        maxUses: 2,
        type: "spell",
        spellLevel: 3,
        description: "This spell grants the creature you touch the ability to understand any spoken language it hears. Moreover, when the target speaks, any creature that knows at least one language and can hear the target understands what it says.",
        shortRestRecover: false,
        castingTime: "1 Action", 
        rangeAndArea: "Touch", 
        duration: "1 hour", 
        school: "Divination", 
        attackAndSave: "None", 
        damageAndEffect: "Communication"
    },
    {   
        id: 9,
        level: 13,
        name: "Mired Empathy",
        maxUses: 5,
        type: "ability",
        description: "...",
        shortRestRecover: false 
    },
    {   
        id: 10,
        level: 14,
        name: "Dirty Fighter",
        maxUses: 0,
        type: "ability",
        description: "During an attack of opportunity, use a hit die to stun target. They make CON saving throw. Target must be small or medium humanoid.",
        shortRestRecover: false 
    },
    {   
        id: 11,
        level: 18,
        name: "Circle of Death",
        maxUses: 1,
        type: "spell",
        spellLevel: 6,
        description: "(Expend a hit die to cast circle of death. 8d6 necrotic damage) A sphere of negative energy ripples out in a 60-foot- radius sphere from a point within range. Each creature in that area must make a Constitution saving throw. A target takes 8d6 necrotic damage on a failed save, or half as much damage on a successful one. At Higher Levels. When you cast this spell using a spell slot of 7th level or higher, the damage increases by 2d6 for each slot level above 6th.",
        shortRestRecover: false,
        castingTime: "1 Action", 
        rangeAndArea: "150ft (60ft)", 
        duration: "Instantaneous", 
        school: "Necromancy", 
        attackAndSave: "CON Save", 
        damageAndEffect: "Necrotic"
    },
    {   
        id: 12,
        level: 20,
        name: "Living Dead",
        maxUses: 5,
        type: "ability",
        description: "...",
        shortRestRecover: false 
    }
];