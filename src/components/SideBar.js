// @flow
import * as React from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import { renderRawIcon } from "config/icon";

import type { RawIcon } from "config/icon";
import type { Control } from "config/flowtypes";

export type SideBarProps = {
  control: ?Control,
  open: boolean,
  onCloseRequest: () => void,
  icon?: ?RawIcon,
  children?: React.Node
};

type Props = SideBarProps & Classes;

const SideBar = (props: Props) => (
  <Drawer open={props.open}
    anchor="right"
    onClose={props.onCloseRequest()}
    classes={{paper: props.classes.drawerPaper}}
    variant="persistent"
  >
    <AppBar position="static">
      <Toolbar>
        <span>
          {props.icon == null || renderRawIcon(props.icon, "mdi-36px")}
        </span>
        <Typography variant="title" className={props.classes.flex}>
          {props.control == null ? "" : props.control.name}
        </Typography>
        <IconButton onClick={props.onCloseRequest}>
          <i className="mdi mdi-close mdi-36px"></i>
        </IconButton>
      </Toolbar>
    </AppBar>
    <List id="drawer_uiComponents">
      <React.Fragment>{props.children}</React.Fragment>
    </List>
  </Drawer>
);

const styles = {
  drawerPaper: {
    width: 340
  },
  flex: {
    flex: 1
  }
};

export default withStyles(styles)(SideBar);
