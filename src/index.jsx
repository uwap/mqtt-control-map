// @flow
import "core-js/stable";
import "regenerator-runtime/runtime";
import "../node_modules/leaflet/dist/leaflet.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React from "react";
import ReactDOM from "react-dom";

import App from "components/App";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/styles";
import * as Colors from "@mui/material/colors";

import "../css/styles.css";

import type { Config } from "config/flowtypes";

const config: Config = window.config;

document.title = `${config.space.name} Map`;

const theme = createTheme({
  palette: {
    primary: {
      main: Colors[config.space.color][500]
    },
    secondary: {
      main: Colors.orange[500]
    }
  }
});

// $FlowFixMe
const contentElement: Element = document.getElementById("content");
ReactDOM.render((
  <ThemeProvider theme={theme}>
    <App config={config} />
  </ThemeProvider>
), contentElement);
