// @flow
import React from "react";
import createComponent from "./base";
import { isDisabled, getValue } from "./utils";

import type { UISlider } from "config/flowtypes";

import SliderComponent from "@mui/material/Slider";

const changeSliderValue = (item: UISlider, changeState) => (_e, v) =>
  changeState(item, v.toString());

const BaseComponent = ({Icon, Label}, item, state, changeState) => (
  <React.Fragment>
    <Icon item={item} state={state} />
    <Label />
    <SliderComponent
      value={parseFloat(getValue(item, state))}
      min={item.min ?? 0} max={item.max ?? 100}
      step={item.step}
      marks={item.marks ?? false}
      onChange={changeSliderValue(item, changeState)}
      disabled={isDisabled(item, state)}
      valueLabelDisplay="auto"
      style={{marginLeft: 40}} />
  </React.Fragment>
);

export default createComponent({
  id: "slider",
  name: "Slider",
  desc: `
    The Slider can be used to choose a number between two a min and a max value.
  `,
  parameters: {
    text: "A descriptive label for the slider",
    topic: "The topic id"
  },
  baseComponent: BaseComponent
});
