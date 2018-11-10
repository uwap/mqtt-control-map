// @flow
import type { Enableable, UIControl } from "config/flowtypes";

export const getValue = <T: UIControl> (item: T, state: State) => {
  const value = state[item.topic];
  if (value == null) {
    if (item.topic === "") {
      throw new Error(
        `Missing topic in ${item.type} "${item.text}"`
      );
    }
    throw new Error(
      `Unknown topic "${item.topic}" in ${item.type} "${item.text}"`
    );
  }
  return value;
};

export const isEnabled = <T: Enableable> (item: T, state: State) => {
  if (item.enableCondition != null) {
    return item.enableCondition(state);
  }
  return true;
};

export const isDisabled = <T: Enableable> (item: T, state: State) =>
  !isEnabled(item, state);
