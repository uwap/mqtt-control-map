// @flow
import React from "react";
import AppBar from "material-ui/AppBar";
import CircularProgress from "material-ui/CircularProgress";
import MapIcon from "material-ui/svg-icons/maps/map";
import PhonelinkOffIcon from "material-ui/svg-icons/hardware/phonelink-off";
import LayersIcon from "material-ui/svg-icons/maps/layers";
import IconMenu from "material-ui/IconMenu";
import IconButton from "material-ui/IconButton";
import MenuItem from "material-ui/MenuItem";
import { orange400, grey50 } from "material-ui/styles/colors";

const TopBarLayerSelector = (props: Object) => (
  <IconMenu
    iconButtonElement={
      <IconButton style={{width: 48, height: 48, padding: 0}}
          iconStyle={{width: 48, height: 48}}>
        <LayersIcon color={grey50} />
      </IconButton>}
    style={{width:48, height:48}}>
    <MenuItem primaryText="Layer1" />
  </IconMenu>
)

const TopBarIndicatorMenu = (props: Object) => (
  <IconMenu
    iconButtonElement={
      <IconButton style={{width:48, height:48, padding: 0}}
          iconStyle={{width:48, height: 48}}
          tooltip={props.mqtt.connected ? "Connected!" : "Disconnected!"}>
      {props.mqtt.connected ?
        (<MapIcon color={grey50} />) :
        (<PhonelinkOffIcon color={grey50} />)}
      </IconButton>}
    style={{width:48, height:48}}>
    <MenuItem primaryText="Reconnect (Not yet implemented)" />
  </IconMenu>
);
    

const TopBarIndicator = (props: Object) => {
  if (props.mqtt == null || props.mqtt.reconnecting) {
    return (<CircularProgress size={48} color={grey50} />);
  } else {
    return (<TopBarIndicatorMenu {...props} />);
  }
};

const TopBar = (props: Object) => (
  <AppBar title={props.title}
          style={{background:orange400}}
          iconElementLeft={<TopBarIndicator {...props} />}
          iconElementRight={<TopBarLayerSelector {...props} />}
          className="nav"
  />);

export default TopBar;
