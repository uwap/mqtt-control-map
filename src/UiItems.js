// @flow
import React from "react";
import Switch from "material-ui/Switch";
import Select from "material-ui/Select";
import { MenuItem } from "material-ui/Menu";
import Slider from "material-ui-old/Slider";
import MuiThemeProvider from "material-ui-old/styles/MuiThemeProvider";
import Config from "./config";
import Input, { InputLabel } from "material-ui/Input";
import { FormControl } from "material-ui/Form";
import R from "ramda";
import {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader
} from "material-ui/List";
import Button from "material-ui/Button";

const enabled = (props: ControlUI, state: State) => {
  if (props.enableCondition == null) {
    return true;
  } else {
    const val = state.values[props.topic];
    return props.enableCondition(
      val.internal == null ? val.actual : val.internal, val.actual,
      R.map((x) => (x.internal == null ? x.actual
        : x.internal), state.values == null ? {} : state.values));
  }
};

const getValue = (topic: string, val: string) =>
  Config.topics[topic].values[val];

const renderIcon = (icon: string) => {
  if (icon != null) {
    return (
      <ListItemIcon>
        <i className={`mdi mdi-${icon} mdi-24px`}></i>
      </ListItemIcon>
    );
  }
  return null;
};

export const onSwitch = (topic: string, props: ControlUI, state: State) =>
  (x, toggled: boolean) => {
    if (state.mqtt != null) {
      state.mqtt.publish(Config.topics[topic].command,
        toggled ? getValue(topic, R.propOr("on", "on", props))
          : getValue(topic, R.propOr("off", "off", props)));
    }
  };

export const isToggled = (state: State, props: ControlUI) => {
  const val = state.values[props.topic];
  if (props.toggled != null) {
    return props.toggled(val.internal == null ? val.actual : val.internal,
      val.actual);
  } else {
    return val.internal === R.propOr("on", "on", props);
  }
};

export const toggle = (state: State, props: ControlUI) => {
  return (
    <ListItem>
      {renderIcon(props.icon)}
      <ListItemText primary={props.text} />
      <ListItemSecondaryAction>
        <Switch label={props.text}
          checked={isToggled(state, props)}
          onChange={onSwitch(props.topic, props, state)}
          disabled={!(enabled(props, state))} />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

const onDropDownChange = (topic: string, props: ControlUI, state: State) =>
  (event) => {
    if (state.mqtt != null) {
      state.mqtt.publish(Config.topics[topic].command, event.target.value);
    }
  };

const dropDownItem = (topic: string) => (text: string, key: string) => (
  <MenuItem value={Config.topics[topic].values[key]} key={key}>{text}</MenuItem>
);

export const dropDown = (state: State, props: ControlUI) => {
  const id = `${props.topic}.${Object.keys(props.options)
    .reduce((v, r) => v + "." + r)}`;
  return (
    <ListItem>
      {renderIcon(props.icon)}
      <FormControl>
        <InputLabel htmlFor={id}>{props.text}</InputLabel>
        <Select value={state.values[props.topic].actual}
          onChange={onDropDownChange(props.topic, props, state)}
          disabled={!(enabled(props, state))}
          input={<Input id={id} />}
        >
          {R.values(R.mapObjIndexed(dropDownItem(props.topic), props.options))}
        </Select>
      </FormControl>
    </ListItem>
  );
};

const onSliderChange = (state: State, props: ControlUI) =>
  (event, value) => {
    if (state.mqtt != null) {
      state.mqtt.publish(Config.topics[props.topic].command, value.toString());
    }
  };

export const slider = (state: State, props: ControlUI) => (
  <ListItem>
    {renderIcon(props.icon)}
    <ListItemText primary={props.text} />
    <ListItemSecondaryAction>
      <MuiThemeProvider>
        <Slider value={state.values[props.topic].actual}
          min={props.min == null ? 0 : props.min}
          max={props.max == null ? 1 : props.max}
          step={props.step == null ? 1 : props.step}
          onChange={onSliderChange(state, props)}
          style={{width: 100}}
        /></MuiThemeProvider>
    </ListItemSecondaryAction>
  </ListItem>
);

export const section = (state: State, props: ControlUI) => (
  <ListSubheader>{props.text}</ListSubheader>
);

export const link = (state: State, props: ControlUI) => (
  <ListItem>
    <Button raised
      onClick={() => window.open(props.link, "_blank")}
      color="primary"
    >
      {props.text}
    </Button>
  </ListItem>
);
