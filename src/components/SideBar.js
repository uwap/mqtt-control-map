// @flow
import * as React from "react";

import { makeStyles } from "@mui/styles";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
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
