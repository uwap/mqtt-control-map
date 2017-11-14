// @flow
import React from "react";
import _ from "lodash";

export default function parseIconName(name: string): string {
  return `mdi ${name.split(" ").map((icon) => "mdi-".concat(icon)).join(" ")}`;
}

export const renderIcon = (name: string, extraClass?: string) => {
  return <i className={`${extraClass || ""} ${parseIconName(name)}`}></i>;
};

export const controlGetIcon = (control: Control, state: State): string => {
  return typeof control.icon !== "function" ? control.icon
    : control.icon(
      _.mapValues(state, (x) => x.internal || x.actual),
      _.mapValues(state, (x) => x.actual),
      state
    );
};

export const renderControlIcon = (control: Control,
  state: State, extraClass?: string) => {
  return renderIcon(controlGetIcon(control, state), extraClass);
};
