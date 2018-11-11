// @flow
import React from "react";
import map from "lodash/map";
import createComponent from "./base";
import { isDisabled, getValue } from "./utils";

import type { UIDropDown } from "config/flowtypes";

import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";

const componentId = (item: UIDropDown) => `dropdown-${item.topic}`;

const DropDownOptions = (options) =>
  map(options, (v, k) => <MenuItem value={k} key={k}>{v}</MenuItem>);

const onChangeEvent = (item: UIDropDown, changeState) =>
  (event) => changeState(item, event.target.value);

const BaseComponent = ({Icon}, item, state, changeState) => (
  <React.Fragment>
    <Icon item={item} state={state} />
    <FormControl>
      <InputLabel htmlFor={componentId(item)}>{item.text}</InputLabel>
      <Select value={getValue(item, state)}
        onChange={onChangeEvent(item, changeState)}
        disabled={isDisabled(item, state)}
        input={<Input id={componentId(item)} />}
      >
        {DropDownOptions(item.options)}
      </Select>
    </FormControl>
  </React.Fragment>
);

export default createComponent({
  id: "dropDown",
  name: "Drop Down",
  desc: `
    The Drop Down can be used to select from a small range of different options.
  `,
  parameters: {
    text: "A descriptive label for the drop down",
    topic: "The topic id"
  },
  baseComponent: BaseComponent
});
