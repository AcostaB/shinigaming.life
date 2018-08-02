import { IAppStore } from "../Types/Types";
import { abilities } from "./Abilities";
import { attacks } from "./Attacks";
import { currency } from "./Currency";
import { items } from "./Items";
import { leftColumnSkills, rightColumnSkills } from "./Skills";
import { limitedUses } from "./LimitedUses";
import { passives } from "./Passives";
import { keyBy, reduce } from "lodash";
import { character as characterModel } from "./Character";

// TODO Apply proper initial state
const initialState: IAppStore = {
  character: characterModel,
  remainingHealth: characterModel.maximumHealth,
  abilities: keyBy(abilities, "id"),
  attacks: keyBy(attacks, "id"),
  passives: keyBy(passives, "id"),
  limitedUses: keyBy(limitedUses, "id"),
  remainingLimitedUses: reduce(
    limitedUses,
    (accumulator, currentValue) => {
      accumulator[currentValue.id] = currentValue.maxUses;
      return accumulator;
    },
    {}
  ),
  leftColumnSkills: keyBy(leftColumnSkills, "id"),
  rightColumnSkills: keyBy(rightColumnSkills, "id"),
  inventory: keyBy(items, "_id"),
  remainingItems: {},
  currency,
  currencyTabActive: true,
  addNewItemExpanded: false
};

export default initialState;
