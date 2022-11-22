// @flow
import React from "react";
import createComponent from "./base";

import type { UISection } from "config/flowtypes";

import ListSubheader from "@mui/material/ListSubheader";

const BaseComponent = (_b, item: UISection, _state, _changeState) => (
  <ListSubheader>{item.text}</ListSubheader>
);

export default createComponent({
  id: "section",
  name: "Section",
  desc: `
    The section is a divider that can visually group components.
  `,
  parameters: {
    text: "The text that is being displayed"
  },
  baseComponent: BaseComponent
});
