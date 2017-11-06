// @flow
import React from "react";
import AppBar from "material-ui/AppBar";
import Toolbar from 'material-ui/Toolbar';
import { CircularProgress } from "material-ui/Progress";
import IconButton from "material-ui/IconButton";
import Menu, { MenuItem } from "material-ui/Menu";
import Typography from 'material-ui/Typography';

const TopBarLayerSelector = (props: Object) => (
  <IconButton>
    <Icon>layers</Icon>
  </IconButton>
)

const TopBarIndicatorMenu = (props: Object) => (
  <IconButton>
      {props.mqtt.connected ?
        (<i style={{fontSize: 48}} className="mdi mdi-map"></i>) :
        (<i style={{fontSize: 48}} className="mdi mdi-lan-disconnect"></i>)}
  </IconButton>
);
    

const TopBarIndicator = (props: Object) => {
  if (props.mqtt == null || props.mqtt.reconnecting) {
    return (<CircularProgress size={48} style={{color: "rgba(0, 0, 0, 0.54)"}} />);
  } else {
    return (<TopBarIndicatorMenu {...props} />);
  }
};

const TopBar = (props: Object) => (
  <AppBar position="static">
    <Toolbar>
      <TopBarIndicator {...props} />
      <Typography type="title">{props.title}</Typography>
      {false && <TopBarLayerSelector {...props} />}
    </Toolbar>
  </AppBar>
);

export default TopBar;
