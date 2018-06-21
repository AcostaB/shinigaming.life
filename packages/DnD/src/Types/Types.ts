import {Ability} from "../Models/Abilities";
import {Attack} from "../Models/Attacks";
import {Item} from "../Models/Items";
import {LimitedUse} from "../Models/LimitedUses";
import {Passive} from "../Models/Passives";
import {Skill} from "../Models/Skills";
import {Currency} from "../Models/Currency";


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
    abilities?:  {[id: string]: Ability},
    attacks?: {[id: string]: Attack},
    inventory?:  {[id: string]: Item},
    limitedUses: {[id: string]: LimitedUse},
    passives?: {[id: string]: Passive},
    leftColumnSkills?: {[id: string]: Skill},
    rightColumnSkills?: {[id: string]: Skill},
    addNewItemExpanded: boolean,
    currencyTabActive: boolean,
    currency: Currency,
    remainingLimitedUses: {
        [key: number]: number
    },
    remainingItems: {
        [key: number]: number
    }
}