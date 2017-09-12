// @flow
import React from "react";
import ReactDOM from "react-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { createStore } from "redux";
import { MQTT_CONNECT } from "./stateActions";
import connectMqtt from "./mqtt";
import AppBar from "./appbar";
import Toggle from "material-ui/Toggle";
import * as UiItems from "./UiItems.js";
import SpaceMap from "./map.js";
import R from "ramda";
import Config from "./config";
import { Toolbar, ToolbarGroup, ToolbarTitle } from "material-ui/Toolbar";

injectTapEventPlugin();

const appState : State = {
  mqtt: null,
  ui: null,
  values: R.map(R.prop("value"), Config.topics)
};

console.log(appState.values);

const handleEvent = (state = appState, action) => {
  switch (action.type) {
    case "CONNECT":
      return R.merge(state, { mqtt: action.mqtt });
    case "uiopen":
      return R.merge(state, { ui: action.ui });
    case "uiclose":
      return R.merge(state, { ui: null });
    case "mqtt_message":
      console.log(action.topic + ": " + action.message.toString());
      const val = (topic: string) =>
        Config.topics[topic].parseState == null ?
          action.message.toString() :
          Config.topics[topic].parseState(action.message);
      const keysToUpdate = R.keys(R.pickBy(val => val.state == action.topic,
                                  Config.topics));
      return R.mergeDeepRight(state, R.objOf("values", R.mergeAll(R.map(
        k => R.objOf(k, val(k)), keysToUpdate))));
      /*
      return R.merge(state, R.objOf("topics", R.merge(state.topics,
        R.map(R.merge(R.__, { value: val }),
          R.pickBy(val => val.state == action.topic, Config.topics)))));
          */
  }
  return state;
};

const store = createStore(handleEvent);

const UiItem = (state) => (props) =>
  UiItems[props.type](R.merge(props, {state:state}));

const renderUi = (state, key) => key != null && Config.controls[key] != null ?
    R.map(UiItem(state), Config.controls[key].ui) : null;

const App = (state: State) => (
  <div>
    <MuiThemeProvider>
      <div>
        <AppBar title="RZL Map" {...state} />
        <Drawer open={state.ui != null} openSecondary={true} disableSwipeToOpen={true}>
          <Toolbar>
            <ToolbarGroup firstChild={true}>
              <ToolbarTitle text={
                state.ui == null ? "" : Config.controls[state.ui].name}
                style={{"marginLeft": 10}} />
            </ToolbarGroup>
          </Toolbar>
          <div id="drawer_uiComponents">
            {renderUi(state, state.ui)}
          </div>
        </Drawer>
      </div>
    </MuiThemeProvider>
    <SpaceMap width={640} height={400} image="rzl.svg" zoom={0.1}
        store={store} state={state} />
  </div>
);

store.subscribe(() => ReactDOM.render(<App {...store.getState()} />, document.getElementById("content")));

store.dispatch({type: null});
store.dispatch({type: "mqtt_message", topic: "/service/openhab/out/pca301_ledstrips/state", message: "ON"});

connectMqtt("ws://172.22.36.207:1884", store); // wss://mqtt.starletp9.de/mqtt", store); 
