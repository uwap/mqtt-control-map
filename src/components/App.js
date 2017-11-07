// @flow
import React from "react";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import createMuiTheme from "material-ui/styles/createMuiTheme";
import withStyles from "material-ui/styles/withStyles";
import * as Colors from "material-ui/colors";

import SideBar from "components/SideBar";
import ControlMap from "components/ControlMap";

export type AppProps = {
  config: Config
};

export type AppState = {
  selectedControl: string
};

class App extends React.Component<AppProps & Classes> {
  constructor(props: AppProps & Classes) {
    super(props);
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

  get selectedControl(): Control {
    return this.props.config.controls[this.state.selectedControl];
  }

  // <SpaceMapBar title={`${this.props.config.space.name} Map`} />
  render() {
    return (
      <div>
        <MuiThemeProvider theme={this.theme}>
          <div>
            {false && <SideBar />}
          </div>
        </MuiThemeProvider>
        <ControlMap width={1000} height={700} zoom={0}
          layers={this.props.config.layers}
          controls={this.props.config.controls}
        />
      </div>
    );
  }
}

export default withStyles(App.styles)(App);
