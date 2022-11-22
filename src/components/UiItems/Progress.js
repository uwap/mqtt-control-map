// @flow
import React from "react";
import createComponent from "./base";
import { getValue } from "./utils";

import type { UIProgress } from "config/flowtypes";

import LinearProgress from "@mui/material/LinearProgress";

const progressVal = (item, state) => {
  const min = item.min || 0;
  const max = item.max || 100;
  const val = parseFloat(getValue(item, state));
  return val * 100 / max - min;
};

const BaseComponent = ({Icon, Label}, item: UIProgress, state, _c) => (
  <React.Fragment>
    <Icon item={item} state={state} />
    <Label />
    <div style={{ flex: "10 1 auto" }} key="progressbar">
      <LinearProgress variant="determinate" value={progressVal(item, state)} />
    </div>
  </React.Fragment>
);

export default createComponent({
  id: "progress",
  name: "Progress Bar",
  desc: `
    The progress bar is used to display a progress value from MQTT
  `,
  parameters: {
    text: "A descriptive label for the progress bar",
    topic: "The topic id"
  },
  baseComponent: BaseComponent
});
