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

// TODO Improve on this.
const initialState: IAppStore = {
  // Header component
  character: characterModel,
  remainingHealth: characterModel.maximumHealth,
  // Abilities Panel
  abilities: keyBy(abilities, "id"),
  // Attacks Panel
  attacks: keyBy(attacks, "id"),
  // Passives panel
  passives: keyBy(passives, "id"),
  // Limited Uses Panel
  limitedUses: keyBy(limitedUses, "id"),
  remainingLimitedUses: reduce(
    limitedUses,
    (accumulator, currentValue) => {
      accumulator[currentValue.id] = currentValue.maxUses;
      return accumulator;
    },
    {}
  ),
  // Skills panel
  leftColumnSkills: keyBy(leftColumnSkills, "id"),
  rightColumnSkills: keyBy(rightColumnSkills, "id"),
  // Inventory Panel
  inventory: keyBy(items, "_id"),
  remainingItems: {},
  currency,
  currencyTabActive: true,
  addNewItemExpanded: false
};

export default initialState;
