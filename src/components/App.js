// @flow
import React from "react";
import map from "lodash/map";
import mapValues from "lodash/mapValues";
import filter from "lodash/filter";
import keys from "lodash/keys";
import merge from "lodash/merge";
import throttle from "lodash/throttle";

import type { Config, Control, Topics } from "config/flowtypes";

import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import withStyles from "@material-ui/core/styles/withStyles";
import * as Colors from "@material-ui/core/colors";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import SideBar from "components/SideBar";
import ControlMap from "components/ControlMap";
import TopBar from "components/TopBar";
import UiItemList from "components/UiItemList";

import MqttContext from "mqtt/context";
import connectMqtt from "../connectMqtt";

export type AppProps = {
  config: Config
};

export type AppState = {
  selectedControl: ?Control,
  drawerOpened: boolean,
  mqttState: State,
  mqttSend: (topic: string, value: Buffer) => void,
  mqttConnected: boolean,
  error: ?string
};

class App extends React.PureComponent<AppProps & Classes, AppState> {
  constructor(props: AppProps & Classes) {
    super(props);
    this.state = {
      selectedControl: null,
      drawerOpened: false,
      mqttState: mapValues(this.topics, (topic) => topic.defaultValue),
      mqttSend: connectMqtt(props.config.space.mqtt, {
        onMessage: this.receiveMessage.bind(this),
        onConnect: () => this.setState({ mqttConnected: true }),
        onReconnect: () => this.setState({ mqttConnected: false }),
        onDisconnect: () => this.setState({ mqttConnected: false }),
        subscribe: map(
          filter(keys(this.topics), (x) => this.topics[x].state != null),
          (x) => this.topics[x].state.name)
      }),
      mqttConnected: false,
      error: null
    };
  }

  get topics(): Topics {
    return Array.isArray(this.props.config.topics) ?
      Object.assign({}, ...this.props.config.topics) : this.props.config.topics;
  }

  static styles() {
    return {
      drawerPaper: {
        width: 320
      }
    };
  }

  get theme() {
    return createMuiTheme({
      palette: {
        primary: Colors[this.props.config.space.color]
      }
    });
  }

  receiveMessage(rawTopic: string, message: Buffer) {
    try {
      const topics = filter(
        keys(this.topics),
        (k) => this.topics[k].state != null &&
          this.topics[k].state.name === rawTopic
      );
      if (topics.length === 0) {
        return;
      }
      for (let i in topics) {
        const topic = topics[i];
        const stateTopic = this.topics[topic].state;
        const parseVal = stateTopic ? stateTopic.type : null;
        const val = parseVal == null ? message.toString() : parseVal(message);
        this.setMqttStateDebounced(
          {mqttState: Object.assign({},
            merge(this.state.mqttState, { [topic]: val}))});
      }
    } catch (err) {
      this.setState({ error: err.toString() });
    }
  }

  setMqttStateDebounced = throttle(this.setState, 32);

  changeControl(control: ?Control = null) {
    this.setState({selectedControl: control, drawerOpened: control != null});
  }

  closeDrawer() {
    this.setState({drawerOpened: false});
  }

  changeState(topic: string, value: string) {
    try {
      if (this.topics[topic].command == null) {
        return;
      }
      const rawTopic = this.topics[topic].command.name;
      const transformValue = this.topics[topic].command.type;
      const val =
        transformValue == null ? value : transformValue(Buffer.from(value));
      this.state.mqttSend(rawTopic, Buffer.from(val));
    } catch (err) {
      this.setState({ error: err.toString() });
    }
  }

  render() {
    return (
      <MqttContext.Provider value={{
        state: this.state.mqttState,
        changeState: this.changeState.bind(this)
      }}>
        <MuiThemeProvider theme={this.theme}>
          <React.Fragment>
            <TopBar title={`${this.props.config.space.name} Map`}
              connected={this.state.mqttConnected} />
            <SideBar open={this.state.drawerOpened}
              control={this.state.selectedControl}
              onCloseRequest={this.closeDrawer.bind(this)}
              icon={this.state.selectedControl == null ? null :
                this.state.selectedControl.icon(this.state.mqttState)}
            >
              {this.state.selectedControl == null
                || <UiItemList controls={this.state.selectedControl.ui} />}
            </SideBar>
          </React.Fragment>
        </MuiThemeProvider>
        <ControlMap width={1000} height={700} zoom={0}
          layers={this.props.config.layers}
          controls={this.props.config.controls}
          onChangeControl={this.changeControl.bind(this)}
        />
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          open={this.state.error != null}
          autoHideDuration={6000}
          onClose={() => this.setState({ error: null })}
          ContentProps={{
            "aria-describedby": "errormsg"
          }}
          message={
            <Typography color="error" id="errormsg">
              {this.state.error}
            </Typography>}
          action={
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={() => this.setState({ error: null })}>
              <i className="mdi mdi-close" />
            </IconButton>
          } />
      </MqttContext.Provider>
    );
  }
}

export default withStyles(App.styles)(App);
