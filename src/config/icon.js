// @flow
import * as React from "react";

export opaque type RawIcon: string = string;

export type Icon = (State) => RawIcon;

export const raw_mdi = (name: string): RawIcon => {
  return `mdi ${name.split(" ").map((icon) => "mdi-".concat(icon)).join(" ")}`;
};

export const mdi = (icon: string) => () => raw_mdi(icon);

export const mdi_battery = (topic: string) => (state: State) => {
  const rawval = state[topic];
  const val = parseInt(rawval);
  if (isNaN(val)) {
    return raw_mdi("battery-unknown");
  } else if (val > 95) {
    return raw_mdi("battery");
  } else if (val > 85) {
    return raw_mdi("battery-90");
  } else if (val > 75) {
    return raw_mdi("battery-80");
  } else if (val > 65) {
    return raw_mdi("battery-70");
  } else if (val > 55) {
    return raw_mdi("battery-60");
  } else if (val > 45) {
    return raw_mdi("battery-50");
  } else if (val > 35) {
    return raw_mdi("battery-40");
  } else if (val > 25) {
    return raw_mdi("battery-30");
  } else if (val > 15) {
    return raw_mdi("battery-20");
  } else {
    return raw_mdi("battery-10");
  }
};

export const renderIcon =
  (icon: RawIcon, extraClass?: string): React.Node => {
    return <i className={`${extraClass || ""} ${icon}`}></i>;
  };
