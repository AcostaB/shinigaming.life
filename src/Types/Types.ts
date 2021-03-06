import { IAppStore } from './Types';
import {Ability} from "../Models/Abilities";
import {Attack} from "../Models/Attacks";
// import {Item} from "../Models/Items";
import {LimitedUse} from "../Models/LimitedUses";
import {Passive} from "../Models/Passives";
import {Item} from "../Models/Items";
import {Skill} from "../Models/Skills";
import {Currency} from "../Models/Currency";
import {Character} from "../Models/Character";

export type FunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T];

// FunctionProperties
export type MappedDispatch<T> = Pick<T, FunctionPropertyNames<T>>;

export type NonFunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T];

// NonFunctionProperties
export type MappedState<T> = Pick<T, NonFunctionPropertyNames<T>>;

// -----

type FunctionType = (...args: any[]) => any;

type ActionCreatorsMapObject = { [actionCreater: string]: FunctionType};

export type ActionsUnion<A extends ActionCreatorsMapObject> = ReturnType<A[keyof A]>;

// ------

// TODO: figure out how to structure this data. Normalize? Object with IDs as keys?
export interface IAppStore {
    // Header component
        character: Character,
        remainingHealth: number,
    // Abilities Panel
        abilities?:  Keyed<Ability>,
    // Attacks Panel
        attacks?: Keyed<Attack>,
    // Passives panel
        passives?: Keyed<Passive>,
    // Limited Uses Panel
        limitedUses: Keyed<LimitedUse>,
        remainingLimitedUses: Keyed<number>,
    // Skills panel
        leftColumnSkills?: Keyed<Skill>,
        rightColumnSkills?: Keyed< Skill>,
    // Inventory Panel
        inventory: Keyed<Item>,
        remainingItems: Keyed<number>,
        currency: Currency,
        currencyTabActive: boolean,
        addNewItemExpanded: boolean
}

export type Keyed<T> = {[id: number]: T};

// TODO improve on reducer type. Make it more specific to my actions. 
// export type Reducer<T> = (state: T) => T; 
// export type Reducer<S = any, A = {} extends Action<any> = AnyAction> = (state: S | undefined, action: A) => S
// import {Reducer} from "redux";