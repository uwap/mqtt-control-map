// @flow
import React from "react";
import ReactDOM from "react-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { store } from "./state";
import connectMqtt from "./mqtt";
import AppBar from "./appbar";
import Toggle from "material-ui/Toggle";
import * as UiItems from "./UiItems.js";
import SpaceMap from "./map.js";
import R from "ramda";
import Config from "./config";
import { Toolbar, ToolbarGroup, ToolbarTitle } from "material-ui/Toolbar";

injectTapEventPlugin();

const UiItem = (state) => (props : ControlUI) =>
  UiItems[props.type](state, props);

const renderUi = (state: State, key: ?string) =>
  key != null && Config.controls[key] != null ?
    R.map(UiItem(state), Config.controls[key].ui) : null;

const App = (state: State) => (
  <div>
    <MuiThemeProvider>
      <div>
        <AppBar title="RZL Map" {...state} />
        <Drawer open={state.uiOpened != null}
          openSecondary={true} disableSwipeToOpen={true}>
          <Toolbar>
            <ToolbarGroup firstChild={true}>
              <ToolbarTitle text={
                state.uiOpened == null ? "" : Config.controls[state.uiOpened].name}
                style={{"marginLeft": 10}} />
            </ToolbarGroup>
          </Toolbar>
          <div id="drawer_uiComponents">
            {renderUi(state, state.uiOpened)}
          </div>
        </Drawer>
      </div>
    </MuiThemeProvider>
    <SpaceMap width={640} height={400} image="rzl.svg" zoom={0.1}
        store={store} state={state} />
  </div>
);

store.dispatch({type: null});

store.subscribe(() => ReactDOM.render(<App {...store.getState()} />, document.getElementById("content")));

// 192.168.178.6
connectMqtt("ws:192.168.178.6:1884", store); // "ws://172.22.36.207:1884", store); // wss://mqtt.starletp9.de/mqtt", store); 
