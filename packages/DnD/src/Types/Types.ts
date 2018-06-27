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
        abilities?:  {[id: string]: Ability},
    // Attacks Panel
        attacks?: {[id: string]: Attack},
    // Passives panel
        passives?: {[id: string]: Passive},
    // Limited Uses Panel
        limitedUses: {[id: string]: LimitedUse},
        remainingLimitedUses: {
            [key: number]: number
        },
    // Skills panel
        leftColumnSkills?: {[id: string]: Skill},
        rightColumnSkills?: {[id: string]: Skill},
    // Inventory Panel
        inventory: {[id: number]: Item},
        remainingItems: {[id: number]: number},
        currency: Currency,
        currencyTabActive: boolean,
        addNewItemExpanded: boolean
}