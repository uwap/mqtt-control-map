// @flow
import React from "react";
import Toggle from "material-ui/Toggle";
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Config from "./config";
import R from "ramda";

const getValue = (topic: string, val: string) =>
  Config.topics[topic].values[val];

const onToggle = (topic: string, props: ControlUI, state: State) =>
  (x, toggled: boolean) => {
    if (state.mqtt != null) {
      state.mqtt.publish(Config.topics[topic].command,
        toggled ? getValue(topic, R.propOr("on", "on", props))
          : getValue(topic, R.propOr("off", "off", props)));
    }
  };

export const toggle = (state: State, props: ControlUI) => (
  <Toggle label={props.text}
          toggled={
            state.values[props.topic] ===
              getValue(props.topic, R.propOr("on", "on", props))
          }
          onToggle={onToggle(props.topic, props, state)}
  />
);

const onDropDownChange = (topic: string, props: ControlUI, state: State) =>
  (event, index, value) => {
    if (state.mqtt != null) {
      state.mqtt.publish(Config.topics[topic].command, value);
    }
  };

const dropDownItem = (topic: string) => (text: string, key: string) => (
  <MenuItem value={Config.topics[topic].values[key]} primaryText={text} />
);

export const dropDown = (state: State, props: ControlUI) => (
  <SelectField value={state.values[props.topic]}
                onChange={onDropDownChange(props.topic, props, state)}>
    {R.values(R.mapObjIndexed(dropDownItem(props.topic), props.options))}
  </SelectField>
);
