// @flow
import React from "react";

import withStyles from "material-ui/styles/withStyles";
import Drawer from "material-ui/Drawer";
import Typography from "material-ui/Typography";
import IconButton from "material-ui/IconButton";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import List from "material-ui/List";

export type SideBarProps = {
  control: Control,
  onCloseRequest: () => void
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
      }
    };
  }

  close() {
    this.props.onCloseRequest();
  }

  render() {
    return (
      <Drawer open={true}
        anchor="right"
        onRequestClose={this.close}
        classes={{paper: this.props.classes.drawerPaper}}
        type="persistent"
      >
        <AppBar position="static">
          <Toolbar>
            <IconButton onClick={this.close}>
              <i className="mdi mdi-format-horizontal-align-right mdi-36px"></i>
            </IconButton>
            <Typography type="title">
              {this.props.control.name}
            </Typography>
          </Toolbar>
        </AppBar>
        <List id="drawer_uiComponents">
        </List>
      </Drawer>
    );
  }
}

export default withStyles(SideBar.styles)(SideBar);
