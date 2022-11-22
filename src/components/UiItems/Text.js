// @flow
import React from "react";
import createComponent from "./base";
import { getValue } from "./utils";

import type { UIText } from "config/flowtypes";

import ListItemText from "@mui/material/ListItemText";

const BaseComponent = ({Icon}, item: UIText, state, _changeState) => (
  <React.Fragment>
    <Icon item={item} state={state} />
    <ListItemText key="label" secondary={item.text} />
    <ListItemText key="vr" primary={getValue(item, state)} align="right" />
  </React.Fragment>
);

export default createComponent({
  id: "text",
  name: "Text",
  desc: `
    The Text is used to display an MQTT value.
  `,
  parameters: {
    text: "A descriptive label",
    topic: "The topic id"
  },
  baseComponent: BaseComponent
});
