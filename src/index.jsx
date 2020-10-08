// @flow
import React from "react";
import ReactDOM from "react-dom";

import App from "components/App";

import "../css/styles.css";

import type { Config } from "config/flowtypes";

const config: Config = window.config;

document.title = `${config.space.name} Map`;

// $FlowFixMe
const contentElement: Element = document.getElementById("content");
ReactDOM.render(<App config={config} />, contentElement);
