// @flow
import * as React from "react";

export opaque type RawIcon: string = string;

export type Icon = (State) => RawIcon;

export const rawMdi = (name: string): RawIcon => {
  return `mdi ${name.split(" ").map((icon) => "mdi-".concat(icon)).join(" ")}`;
};

export const mdi = (icon: string) => () => rawMdi(icon);

export const mdiBattery = (topic: string) => (state: State) => {
  const rawval = state[topic];
  const val = parseInt(rawval, 10);
  if (isNaN(val)) {
    return rawMdi("battery-unknown");
  } else if (val > 95) {
    return rawMdi("battery");
  } else if (val > 85) {
    return rawMdi("battery-90");
  } else if (val > 75) {
    return rawMdi("battery-80");
  } else if (val > 65) {
    return rawMdi("battery-70");
  } else if (val > 55) {
    return rawMdi("battery-60");
  } else if (val > 45) {
    return rawMdi("battery-50");
  } else if (val > 35) {
    return rawMdi("battery-40");
  } else if (val > 25) {
    return rawMdi("battery-30");
  } else if (val > 15) {
    return rawMdi("battery-20");
  } else {
    return rawMdi("battery-10");
  }
};

export const renderIcon =
  (icon: RawIcon, extraClass?: string): React.Node => {
    return <i className={`${extraClass || ""} ${icon}`}></i>;
  };
