// @flow
import * as React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ReactIcon from "@mdi/react";
import { mdiClose } from "@mdi/js";

import type { Control } from "config/flowtypes";

export type SideBarProps = {
  control: ?Control,
  open: boolean,
  onCloseRequest: () => void,
  icon?: ?React.Node,
  children?: React.Node
};

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: 340
  },
  title: {
    flex: 1,
    marginLeft: theme.spacing(1)
  }
}));

const SideBar = (props: SideBarProps) => {
  const classes = useStyles();
  return (
    <Drawer open={props.open}
      anchor="right"
      onClose={props.onCloseRequest}
      classes={{paper: classes.drawerPaper}}
      variant="persistent"
    >
      <AppBar position="static">
        <Toolbar>
          <span>
            {props.icon == null || props.icon}
          </span>
          <Typography variant="subtitle1" className={classes.title}>
            {props.control == null ? "" : props.control.name}
          </Typography>
          <IconButton onClick={props.onCloseRequest}>
            <ReactIcon path={mdiClose} size={1.5} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <List id="drawer_uiComponents">
        <React.Fragment>{props.children}</React.Fragment>
      </List>
    </Drawer>
  );
};

export default SideBar;
