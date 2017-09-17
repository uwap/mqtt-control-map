// @flow
import React from "react";
import AppBar from "material-ui/AppBar";
import CircularProgress from "material-ui/CircularProgress";
import MapIcon from "material-ui/svg-icons/maps/map";
import IconMenu from "material-ui/IconMenu";
import IconButton from "material-ui/IconButton";
import MenuItem from "material-ui/MenuItem";
import { orange400, grey50 } from "material-ui/styles/colors";

const TopBarIndicatorMenu = (props: Object) => (
  <IconMenu
    iconButtonElement={
      <IconButton style={{width:48, height:48, padding: 0}}
          iconStyle={{width:48, height: 48}}
          tooltip="Connected!">
        <MapIcon color={grey50} />
      </IconButton>}
    style={{width:48, height:48}}>
    <MenuItem primaryText="Reconnect" />
  </IconMenu>
);
    

const TopBarIndicator = (props: Object) => (
  props.mqtt == null ? <CircularProgress size={48} color={grey50} />
    : <TopBarIndicatorMenu {...props} />
);

const TopBar = (props: Object) => (
  <AppBar title={props.title}
          style={{background:orange400}}
          iconElementLeft={<TopBarIndicator {...props} />}
          className="nav"
  />);

export default TopBar;
