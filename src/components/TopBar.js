// @flow
import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import ReactIcon from "@mdi/react";
import { mdiMap, mdiGithub, mdiMagnify } from "@mdi/js";

export type TopBarProps = {
  connected: boolean,
  onSearch: string => void
};

export type SearchBarProps = {
  onSearch: string => void
};

const renderConnectionIndicator = (connected: boolean) => {
  if (connected) {
    return (<ReactIcon path={mdiMap} size={2} />);
  }
  return (
    <CircularProgress size={32} style={{color: "rgba(0, 0, 0, 0.54)"}} />
  );
};

const useSearchStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(6),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(6),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  }
}));

const Search = (props: SearchBarProps) => {
  const classes = useSearchStyles();
  return (
    <div className={classes.search}>
      <span className={classes.searchIcon}>
        <ReactIcon path={mdiMagnify} size={1} />
      </span>
      <InputBase placeholder="Search…" type="search"
        onChange={(e) => props.onSearch(e.target.value)}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput
        }} />
    </div>
  );
};

const openOnGithub = () => window.open(
  "https://github.com/uwap/mqtt-control-map", "_blank");

const TopBar = (props: TopBarProps) => (
  <AppBar position="static">
    <Toolbar>
      {renderConnectionIndicator(props.connected)}
      <Search onSearch={props.onSearch} />
      <span style={{flex: 1}}></span>
      <Tooltip title="View on Github">
        <IconButton onClick={openOnGithub}>
          <ReactIcon path={mdiGithub} size={1.5} />
        </IconButton>
      </Tooltip>
    </Toolbar>
  </AppBar>
);

export default TopBar;
