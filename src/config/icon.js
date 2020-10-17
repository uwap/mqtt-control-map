// @flow
import React from "react";
import ReactIcon from "@mdi/react";
import { type Color } from "./colors";
import * as mdiIcons from "@mdi/js";

type IconPropHelper = {
  size?: number,
  rotate?: number,
  horizontal?: boolean,
  vertical?: boolean,
  color?: Color
};

export type Icon = {
  render: (s: State) => React.Node,
  size: (n: number) => Icon,
  rotate: (n: number) => Icon,
  flip: () => Icon,
  flipV: () => Icon,
  color: (c: Color | (State) => Color) => Icon,
  applyProps: (props: IconPropHelper) => Icon
};

const iconChainUtils = <T> (cb: (x: T, p?: IconPropHelper) => Icon,
  p1: T, p?: IconPropHelper) => ({
    size: (n: number) => cb(p1, {...p, size: n}),
    rotate: (n: number) => cb(p1, {...p, rotate: n}),
    flip: () => cb(p1, {...p, horizontal: !p?.horizontal ?? true}),
    flipV: () => cb(p1, {...p, vertical: !p?.vertical ?? true}),
    color: (c: Color | (State) => Color) => cb(p1, {...p, color: c}),
    applyProps: (props: IconPropHelper) => cb(p1, {...p, ...props})
  }
  );

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
    ...iconChainUtils(svg, data, props)
  };
};

export const withState = (f: (s: State) => Icon,
  props?: IconPropHelper): Icon => ({
  render: (state) => f(state).applyProps(props).render(state),
  ...iconChainUtils(withState, f, props)
}
);

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
