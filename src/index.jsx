// @flow
import React from "react";
import ReactDOM from "react-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createMuiTheme from 'material-ui/styles/createMuiTheme';
import withStyles from 'material-ui/styles/withStyles';
import Drawer from 'material-ui/Drawer';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { store, Actions } from "./state";
import connectMqtt from "./mqtt";
import SpaceMapBar from "./appbar";
import Switch from "material-ui/Switch";
import * as UiItems from "./UiItems.js";
import SpaceMap from "./map.js";
import R from "ramda";
import Config from "./config";
import Toolbar from "material-ui/Toolbar";
import * as colors from 'material-ui/colors';
import Typography from 'material-ui/Typography';
import List, { ListSubheader } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import AppBar from 'material-ui/AppBar';

import '../node_modules/mdi/css/materialdesignicons.min.css';
import '../css/styles.css';

injectTapEventPlugin();

document.title = `${Config.space.name} Map`;

const UiItem = (state) => (props : ControlUI) =>
  UiItems[props.type](state, props);

const renderUi = (state: State, key: ?string) =>
  key != null && Config.controls[key] != null ?
    R.map(UiItem(state), Config.controls[key].ui) : null;

const theme = createMuiTheme({
  palette: {
    primary: colors[Config.space.color]
  }
});

const appStyles = withStyles((theme) => ({
  drawerPaper: {
    width: 320
  }
}));

class app extends React.Component<{state: State, classes: Object}> {
  render() {
    const state = this.props.state;
    const classes = this.props.classes;
    if (state == null) return (<div></div>);
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <div>
            <SpaceMapBar title={`${Config.space.name} Map`} {...state} />
            <Drawer open={state.uiOpened != null}
              anchor="right"
              onRequestClose={() => store.dispatch({type: Actions.CHANGE_UI})}
              classes={{paper: classes.drawerPaper}}
              type="persistent"
            >
              <AppBar position="static">
                <Toolbar>
                  <IconButton onClick={() => store.dispatch({type: Actions.CHANGE_UI})}>
                    <i className="mdi mdi-format-horizontal-align-right mdi-36px"></i>
                  </IconButton>
                  <Typography type="title">
                    {state.uiOpened == null ? "" : Config.controls[state.uiOpened].name}
                  </Typography>
                </Toolbar>
              </AppBar>
              <List id="drawer_uiComponents">
                  {renderUi(state, state.uiOpened)}
              </List>
            </Drawer>
          </div>
        </MuiThemeProvider>
        <SpaceMap width={1000} height={700} image="rzl.png" zoom={0} state={state} />
      </div>
    );
  }
}

const App = appStyles(app);

store.subscribe(() => ReactDOM.render(<App state={store.getState()} />, document.getElementById("content")));

store.dispatch({type:null});

connectMqtt(Config.space.mqtt, store);
