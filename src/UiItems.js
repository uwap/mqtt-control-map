// @flow
import React from "react";
import Toggle from "material-ui/Toggle";
import Config from "./config";
import R from "ramda";

const onToggle = (topic, props, state) => (x, toggled) =>
  state.mqtt.publish(Config.topics[topic].command,
    toggled ? Config.topics[topic].values[R.propOr("on", "on", props)]
      : Config.topics[topic].values[R.propOr("off", "off", props)]);

export const toggle = (props: Object) => (
  <Toggle label={props.text}
          toggled={
            props.state.values[props.topic] ===
              Config.topics[props.topic].values[R.propOr("on", "on", props)]
          }
          onToggle={onToggle(props.topic, props, props.state)}
  />
);
