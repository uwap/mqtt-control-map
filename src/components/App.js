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

export type AppProps = {
  config: Config
};

export type AppState = {
  selectedControl: ?Control,
  drawerOpened: boolean,
  mqttState: State
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
      }))
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

  changeControl(control: ?Control = null) {
    this.setState({selectedControl: control, drawerOpened: control != null});
  }

  closeDrawer() {
    this.setState({drawerOpened: false});
  }

  changeState(topic: string, value: any) {
    this.setState({mqttState: _.merge(this.state.mqttState,
      { [topic]: {
        actual: this.props.config.topics[topic].values[value],
        internal: value
      }})});
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
            >
              {this.state.selectedControl == null
                || <UiItemList state={this.state.mqttState}
                  controls={this.state.selectedControl.ui}
                  onChangeState={this.changeState.bind(this)} />}
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
