// @flow
import React from "react";
import Toggle from "material-ui/Toggle";
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Slider from 'material-ui/Slider';
import Config from "./config";
import { keyOf } from "./util";
import R from "ramda";

const enabled = (props: ControlUI, state: State) => {
  if (props.enableCondition == null) return true;
  else {
    const val = state.values[props.topic];
    return props.enableCondition(
      val.internal == null ? val.actual : val.internal, val.actual);
  }
};

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

export const toggle = (state: State, props: ControlUI) => {
  const toggled = (() => {
    const val = state.values[props.topic];
    if (props.toggled != null) {
      return props.toggled(val.internal == null ? val.actual : val.internal,
            val.actual);
    } else {
      return val.internal === R.propOr("on", "on", props);
    }
  })();
  return (<Toggle label={props.text}
          toggled={toggled}
          onToggle={onToggle(props.topic, props, state)}
          disabled={!(enabled(props, state))} />
  );
}

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
  <SelectField value={state.values[props.topic].actual}
               onChange={onDropDownChange(props.topic, props, state)}
               disabled={!(enabled(props, state))}>
    {R.values(R.mapObjIndexed(dropDownItem(props.topic), props.options))}
  </SelectField>
);

const onSliderChange = (state: State, props: ControlUI) =>
  (event, value) => {
    if (state.mqtt != null) {
      state.mqtt.publish(Config.topics[props.topic].command, value.toString());
    }
  };

export const slider = (state: State, props: ControlUI) => (
  <div>
  <span>{props.text}</span>
  <Slider value={state.values[props.topic].actual}
          min={props.min == null ? 0 : props.min}
          max={props.max == null ? 1 : props.max}
          step={props.step == null ? 1 : props.step}
          onChange={onSliderChange(state, props)}
  />
  </div>
);
