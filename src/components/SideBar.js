// @flow
import React from "react";

import withStyles from "material-ui/styles/withStyles";
import Drawer from "material-ui/Drawer";
import Typography from "material-ui/Typography";
import IconButton from "material-ui/IconButton";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import List from "material-ui/List";
import { renderIcon } from "utils/parseIconName";

export type SideBarProps = {
  control: ?Control,
  open: boolean,
  onCloseRequest: () => void,
  icon?: ?string
};

export type SideBarState = {
};

class SideBar extends React.Component<SideBarProps & Classes, SideBarState> {
  constructor(props: SideBarProps & Classes) {
    super(props);
  }

  static styles(_theme: Object): Object {
    return {
      drawerPaper: {
        width: 320
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
        type="persistent"
      >
        <AppBar position="static">
          <Toolbar>
            {this.props.icon == null
              || renderIcon(this.props.icon, "mdi-36px")}
            <Typography type="title" className={this.props.classes.flex}>
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
