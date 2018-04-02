// @flow
import * as React from "react";
import { getInternals, getActuals } from "utils/state";

import type { Control } from "config/flowtypes";

export default function parseIconName(name: string): string {
  return `mdi ${name.split(" ").map((icon) => "mdi-".concat(icon)).join(" ")}`;
}

export const renderIcon = (name: string, extraClass?: string): React.Node => {
  return <i className={`${extraClass || ""} ${parseIconName(name)}`}></i>;
};

export const controlGetIcon = (control: Control, state: State): string => {
  const internals: Map<string, Internal> = getInternals(state);
  const actuals: Map<string, Actual> = getActuals(state);
  return typeof control.icon !== "function" ? control.icon
    : control.icon(internals, actuals, state);
};

export const renderControlIcon = (control: Control,
  state: State, extraClass?: string): React.Node => {
  return renderIcon(controlGetIcon(control, state), extraClass);
};
