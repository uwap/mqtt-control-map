// @flow
import Toggle from "./Toggle";
import DropDown from "./DropDown";
import Section from "./Section";
import Link from "./Link";
import Slider from "./Slider";
import Text from "./Text";
import Progress from "./Progress";

import type { ControlUI } from "config/flowtypes";

const Control = ({item}: {item: ControlUI}) => {
  switch (item.type) {
  case "toggle": {
    return Toggle.component(item);
  }
  case "dropDown": {
    return DropDown.component(item);
  }
  case "section": {
    return Section.component(item);
  }
  case "link": {
    return Link.component(item);
  }
  case "slider": {
    return Slider.component(item);
  }
  case "text": {
    return Text.component(item);
  }
  case "progress": {
    return Progress.component(item);
  }
  default: {
    throw new Error(
      `Unknown UI type "${item.type}" for "${item.text}" component`
    );
  }
  }
};

export default Control;
