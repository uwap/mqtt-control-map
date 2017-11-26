// @flow
import React from "react";
import _ from "lodash";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import createMuiTheme from "material-ui/styles/createMuiTheme";
import withStyles from "material-ui/styles/withStyles";
import * as Colors from "material-ui/colors";

import SideBar from "components/SideBar";
import ControlMap from "components/ControlMap";
import TopBar from "components/TopBar";
import UiItemList from "components/UiItemList";

import keyOf from "utils/keyOf";
import { controlGetIcon } from "utils/parseIconName";

import connectMqtt from "../connectMqtt";

export type AppProps = {
  config: Config
};

export type AppState = {
  selectedControl: ?Control,
  drawerOpened: boolean,
  mqttState: State,
  mqttSend: (topic: string, value: any) => void
};

class App extends React.Component<AppProps & Classes, AppState> {
  constructor(props: AppProps & Classes) {
    super(props);
    this.state = {
      selectedControl: null,
      drawerOpened: false,
      mqttState: _.mapValues(props.config.topics, (topic) => ({
        actual: topic.defaultValue,
        internal: keyOf(topic.values, topic.defaultValue)
      })),
      mqttSend: connectMqtt(props.config.space.mqtt, {
        onMessage: this.receiveMessage.bind(this),
        subscribe: _.map(props.config.topics, (x) => x.state)
      })
    };
  }

  static styles(_theme: Object) {
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

  receiveMessage(rawTopic: string, message: Object) {
    const topic = _.findKey(
      this.props.config.topics,
      (v) => v.state === rawTopic
    );
    if (topic == null) {
      return;
    }
    const parseValue = this.props.config.topics[topic].parseState;
    const value = parseValue == null ? message.toString() : parseValue(message);
    this.setState({mqttState: _.merge(this.state.mqttState,
      { [topic]: {
        actual: value,
        internal: keyOf(this.props.config.topics[topic].values, value) || value
      }})});
  }

  changeControl(control: ?Control = null) {
    this.setState({selectedControl: control, drawerOpened: control != null});
  }

  closeDrawer() {
    this.setState({drawerOpened: false});
  }

  changeState(topic: string, value: any) {
    // this.receiveMessage(this.props.config.topics[topic].state, String(this.props.config.topics[topic].values[value] || value));
    // return;
    //
    const rawTopic = this.props.config.topics[topic].command;
    if (rawTopic == null) {
      return;
    }
    this.state.mqttSend(
      rawTopic,
      String(this.props.config.topics[topic].values[value] || value)
    );
  }

  render() {
    return (
      <div>
        <MuiThemeProvider theme={this.theme}>
          <div>
            <TopBar title={`${this.props.config.space.name} Map`}
              connected={false} />
            <SideBar open={this.state.drawerOpened}
              control={this.state.selectedControl}
              onCloseRequest={this.closeDrawer.bind(this)}
              icon={this.state.selectedControl == null ? null :
                controlGetIcon(this.state.selectedControl,
                  this.state.mqttState)}
            >
              {this.state.selectedControl == null
                || <UiItemList state={this.state.mqttState}
                  controls={this.state.selectedControl.ui}
                  onChangeState={this.changeState.bind(this)}
                />}
            </SideBar>
          </div>
        </MuiThemeProvider>
        <ControlMap width={1000} height={700} zoom={0}
          layers={this.props.config.layers}
          controls={this.props.config.controls}
          onChangeControl={this.changeControl.bind(this)}
          state={this.state.mqttState}
        />
      </div>
    );
  }
}

export default withStyles(App.styles)(App);
