// @flow
import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

export type TopBarProps = {
  title: string,
  connected: boolean
};

const renderConnectionIndicator = (connected: boolean) => {
  if (connected) {
    return (<i style={{fontSize: 48}} className="mdi mdi-map"></i>);
  }
  return (
    <CircularProgress size={48} style={{color: "rgba(0, 0, 0, 0.54)"}} />
  );
};

const TopBar = (props: TopBarProps) => (
  <AppBar position="static">
    <Toolbar>
      {renderConnectionIndicator(props.connected)}
      <Typography variant="title">{props.title}</Typography>
    </Toolbar>
  </AppBar>
);

export default TopBar;
