// @flow
import * as React from "react";
import { getInternals, getActuals } from "utils/state";

export opaque type RawIcon: string = string;

export type Icon = (Map<string, Internal>, Map<string, Actual>, State) =>
  RawIcon;

export const raw_mdi = (name: string): RawIcon => {
  return `mdi ${name.split(" ").map((icon) => "mdi-".concat(icon)).join(" ")}`;
};

export const mdi = (icon: string) => () => raw_mdi(icon);

export const mdi_battery = (topic: string) =>
  (state: Map<string, Internal>) => {
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

export const toRawIcon = (icon: Icon, state: State): RawIcon => {
  const internals: Map<string, Internal> = getInternals(state);
  const actuals: Map<string, Actual> = getActuals(state);
  return icon(internals, actuals, state);
};

export const renderRawIcon =
  (icon: RawIcon, extraClass?: string): React.Node => {
    return <i className={`${extraClass || ""} ${icon}`}></i>;
  };

export const renderIcon =
  (icon: Icon, state: State, extraClass?: string): React.Node => {
    return renderRawIcon(toRawIcon(icon, state), extraClass);
  };
