// @flow
import React from "react";
import createComponent from "./base";
import { isDisabled, isEnabled, getValue } from "./utils";

import type { UIToggle } from "config/flowtypes";

import Switch from "@mui/material/Switch";

const isToggled = (item: UIToggle, state: State) => {
  const isChecked = item.toggled ||
      ((i, _s) => i === (item.on || "on"));
  const checked = isChecked(getValue(item, state), state);
  return checked;
};

const doToggle = (item: UIToggle, state: State, changeState) => () => {
  if (isEnabled(item, state)) {
    const toggled = isToggled(item, state);
    const on = item.on == null ? "on" : item.on;
    const off = item.off == null ? "off" : item.off;
    const next = toggled ? off : on;
    return changeState(item, next);
  }
  return false;
};

const BaseComponent = ({Icon, Label, Action}, item, state, changeState) => (
  <React.Fragment>
    <Icon item={item} state={state} />
    <Label />
    <Action>
      <Switch label={item.text}
        checked={isToggled(item, state)}
        onChange={doToggle(item, state, changeState)}
        disabled={isDisabled(item, state)}
        color="primary" />
    </Action>
  </React.Fragment>
);

export default createComponent({
  id: "toggle",
  name: "Toggle Button",
  desc: `
    The toggle button can be used to toggle between two values.
  `,
  parameters: {
    text: "A descriptive label for the toggle button",
    topic: "The topic id"
  },
  baseComponent: BaseComponent
});
