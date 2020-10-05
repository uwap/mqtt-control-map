// @flow
import React from "react";

export type MqttContextValue = {
  state: State,
  changeState: (topic: string, value: string) => State
};

export default React.createContext({
  state: {},
  changeState: (_topic, _val) => ({})
});
