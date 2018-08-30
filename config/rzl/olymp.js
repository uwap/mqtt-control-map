// @flow
import type { Topics, Controls } from "config/flowtypes";
import { mdi } from "config/icon";
import { hex, rainbow } from "config/colors";
import * as types from "config/types";
import { tasmota, esper } from "./utils";

export const topics: Topics = {
  videogames: {
    state: {
      name: "/service/openhab/out/pca301_videogames/state",
      type: types.option({ ON: "on", OFF: "off" })
    },
    command: {
      name: "/service/openhab/in/pca301_videogames/command",
      type: types.option({ on: "ON", off: "OFF" })
    },
    defaultValue: "off"
  },
  olympPC: {
    state: {
      name: "/service/openhab/out/pca301_olymp_pc/state",
      type: types.option({ ON: "on", OFF: "off" })
    },
    command: {
      name: "/service/openhab/in/pca301_olymp_pc/command",
      type: types.option({ on: "ON", off: "OFF" })
    },
    defaultValue: "off"
  },
  rundumleuchte: {
    state: {
      name: "/service/openhab/out/pca301_rundumleuchte/state",
      type: types.option({ ON: "on", OFF: "off" })
    },
    command: {
      name: "/service/openhab/in/pca301_rundumleuchte/command",
      type: types.option({ on: "ON", off: "OFF" })
    },
    defaultValue: "off"
  },
  ...tasmota.topics("2", "printerOlymp"),
  ...tasmota.topics("8", "ledOlymp"),
  ...esper.topics("afba45", "alarm")
};

export const controls: Controls = {
  ledOlymp: {
    name: "LED Olymp",
    position: [196, 154],
    icon: mdi("white-balance-iridescent rotate-45"),
    iconColor: tasmota.icon_color("ledOlymp", rainbow),
    ui: [
      {
        type: "toggle",
        text: "LED Olymp",
        topic: "ledOlymp",
        icon: mdi("power")
      }
    ]
  },
  videogames: {
    name: "Videospiele",
    position: [100, 100],
    icon: mdi("gamepad-variant"),
    iconColor: ({videogames}) =>
      (videogames === "on" ? hex("#00FF00") : hex("#000000")),
    ui: [
      {
        type: "toggle",
        text: "Videospiele",
        topic: "videogames",
        icon: mdi("power")
      }
    ]
  },
  olympPC: {
    name: "Rechner",
    position: [297, 90],
    icon: mdi("desktop-classic"),
    iconColor: ({olympPC}) =>
      (olympPC === "on" ? hex("#00FF00") : hex("#000000")),
    ui: [
      {
        type: "toggle",
        text: "Rechner",
        topic: "olympPC",
        icon: mdi("power")
      }
    ]
  },
  printerOlymp: {
    name: "Drucker",
    position: [335, 90],
    icon: mdi("printer"),
    iconColor: tasmota.icon_color("printerOlymp"),
    ui: [
      {
        type: "toggle",
        text: "Drucker",
        topic: "printerOlymp",
        icon: mdi("power")
      },
      {
        type: "link",
        link: "http://annette.rzl/",
        text: "Open Annette",
        icon: mdi("open-in-new")
      }
    ]
  },
  rundumleuchte: {
    name: "Rundumleuchte",
    position: [310, 275],
    icon: mdi("alarm-light"),
    iconColor: ({rundumleuchte}) =>
      (rundumleuchte === "on" ? hex("#F0DF10") : hex("#000000")),
    ui: [
      {
        type: "toggle",
        text: "Rundumleuchte",
        topic: "rundumleuchte",
        icon: mdi("power")
      }
    ]
  },
  alarm: {
    name: "Alarm",
    position: [340, 250],
    icon: mdi("alarm-bell"),
    iconColor: () => hex("#000000"),
    ui: esper.statistics("alarm")
  }
};
