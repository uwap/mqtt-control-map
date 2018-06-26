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

export type SideBarState = {
};

type Props = SideBarProps & Classes;

class SideBar extends React.PureComponent<Props, SideBarState> {
  constructor(props: Props) {
    super(props);
  }

  static styles(_theme: Object): Object {
    return {
      drawerPaper: {
        width: 340
      },
      flex: {
        flex: 1
      }
    };
  }

  close() {
    this.props.onCloseRequest();
  }

  render() {
    return (
      <Drawer open={this.props.open}
        anchor="right"
        onRequestClose={this.close}
        classes={{paper: this.props.classes.drawerPaper}}
        variant="persistent"
      >
        <AppBar position="static">
          <Toolbar>
            {this.props.icon == null
              || renderRawIcon(this.props.icon, "mdi-36px")}
            <Typography variant="title" className={this.props.classes.flex}>
              {this.props.control == null || this.props.control.name}
            </Typography>
            <IconButton onClick={this.close.bind(this)}>
              <i className="mdi mdi-close mdi-36px"></i>
            </IconButton>
          </Toolbar>
        </AppBar>
        <List id="drawer_uiComponents">
          {this.props.children}
        </List>
      </Drawer>
    );
  }
}

export default withStyles(SideBar.styles)(SideBar);
