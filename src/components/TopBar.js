// @flow
import React from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CircularProgress from "@mui/material/CircularProgress";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/styles";
import { alpha } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
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

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const openOnGithub = () => window.open(
  "https://github.com/uwap/mqtt-control-map", "_blank");

const TopBar = (props: TopBarProps) => (
  <AppBar position="static" color="primary">
    <Toolbar>
      {renderConnectionIndicator(props.connected)}
      <Search>
        <SearchIconWrapper>
          <ReactIcon path={mdiMagnify} size={1} />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
          onChange={(e) => props.onSearch(e.target.value)}
        />
      </Search>
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
