// @flow
import React from "react";
import ReactIcon from "@mdi/react";
import { type Color } from "./colors";
import * as mdiIcons from "@mdi/js";

export type Icon = {
  render: (s: State) => React.Node,
  size: (n: number) => Icon,
  rotate: (n: number) => Icon,
  flip: () => Icon,
  flipV: () => Icon,
  color: (c: Color | (State) => Color) => Icon
};

type IconPropHelper = {
  size?: number,
  rotate?: number,
  horizontal?: boolean,
  vertical?: boolean,
  color?: Color
};

export const svg = (data: string, props?: IconPropHelper): Icon => {
  const propColor = ((c: Color | (State) => Color) => (state: State) => {
    if (typeof c === "function") {
      return c(state);
    }
    return c;
  })(props?.color ?? "black");
  return {
    render: (state) => (
      <ReactIcon path={data} size={props?.size ?? 1.5}
        rotate={props?.rotate ?? 0}
        horizontal={props?.horizontal ?? false}
        vertical={props?.vertical ?? false}
        color={propColor(state)}
      />
    ),
    size: (n: number) => svg(data, {...props, size: n}),
    rotate: (n: number) => svg(data, {...props, rotate: n}),
    flip: () => svg(data, {...props, horizontal: !props?.horizontal ?? true}),
    flipV: () => svg(data, {...props, vertical: !props?.vertical ?? true}),
    color: (c: Color | (State) => Color) => svg(data, {...props, color: c})
  };
};

export const withState = (f: (s: State) => Icon): Icon => {
  return {
    render: (state) => f(state).render(state),
    size: () => withState(f),
    rotate: () => withState(f),
    flip: () => withState(f),
    flipV: () => withState(f),
    color: () => withState(f)
  };
};

export const mdiBattery = (topic: string): Icon => withState((state) => {
  const rawval = state[topic];
  const val = parseInt(rawval, 10);
  if (isNaN(val)) {
    return svg(mdiIcons.mdiBatteryUnknown);
  } else if (val > 95) {
    return svg(mdiIcons.mdiBattery);
  } else if (val > 85) {
    return svg(mdiIcons.mdiBattery90);
  } else if (val > 75) {
    return svg(mdiIcons.mdiBattery80);
  } else if (val > 65) {
    return svg(mdiIcons.mdiBattery70);
  } else if (val > 55) {
    return svg(mdiIcons.mdiBattery60);
  } else if (val > 45) {
    return svg(mdiIcons.mdiBattery50);
  } else if (val > 35) {
    return svg(mdiIcons.mdiBattery40);
  } else if (val > 25) {
    return svg(mdiIcons.mdiBattery30);
  } else if (val > 15) {
    return svg(mdiIcons.mdiBattery20);
  }
  return svg(mdiIcons.mdiBattery10);
});
