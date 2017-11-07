// @flow
import React from "react";
import ReactDOM from "react-dom";
import injectTapEventPlugin from "react-tap-event-plugin";

import App from "components/App";

import Config from "./config";

import "../node_modules/mdi/css/materialdesignicons.min.css";
import "../css/styles.css";

injectTapEventPlugin();

document.title = `${Config.space.name} Map`;

ReactDOM.render(<App config={Config} />, document.getElementById("content"));
