    interface ISkill {
        id: string;
        name: string;
        skillType: SkillTypes;
        potency: number;
        missedChainPotency: number;
        missedPositionalPotency: number;
        dotDuration: number;
        dotPotency: number;
        animationDuration: number; // In milliseconds
        buffDuration: number; // In milliseconds
        buffPotency: number;
        cooldown: number; // In milliseconds
        mpCost: number;
        tpCost: number;
        damageType: DamageTypes;
        addedBuff: boolean; // Piercing damage buff
        aoe: boolean;
        positionalRequirement: boolean;
        nextInChain: Array<string>;
        previousInChain: Array<string>;
    }
