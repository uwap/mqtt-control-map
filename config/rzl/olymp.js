// @flow
import type { Topics, Controls } from "config/flowtypes";
import { svg } from "config/icon";
import { hex, rainbow } from "config/colors";
import * as types from "config/types";
import { tasmota, esper } from "./utils";
import * as icons from "@mdi/js";

export const topics: Topics = {
  ...tasmota.topics("8", "ledOlymp"),
  ...esper.topics("afba45", "alarm"),
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
  }
};

export const controls: Controls = {
  ledOlymp: {
    name: "LED Olymp",
    position: [196, 154],
    icon: svg(icons.mdiWhiteBalanceIridescent).rotate(45).color(
      tasmota.iconColor("ledOlymp", rainbow)),
    ui: [
      {
        type: "toggle",
        text: "LED Olymp",
        topic: "ledOlymp",
        icon: svg(icons.mdiPower)
      }
    ]
  },
  videogames: {
    name: "Videospiele",
    position: [100, 100],
    icon: svg(icons.mdiGamepadVariant).color(({videogames}) =>
      (videogames === "on" ? hex("#00FF00") : hex("#000000"))),
    ui: [
      {
        type: "toggle",
        text: "Videospiele",
        topic: "videogames",
        icon: svg(icons.mdiPower)
      }
    ]
  },
  olympPC: {
    name: "Rechner",
    position: [297, 90],
    icon: svg(icons.mdiDesktopClassic).color(({olympPC}) =>
      (olympPC === "on" ? hex("#00FF00") : hex("#000000"))),
    ui: [
      {
        type: "toggle",
        text: "Rechner",
        topic: "olympPC",
        icon: svg(icons.mdiPower)
      }
    ]
  },
  rundumleuchte: {
    name: "Rundumleuchte",
    position: [310, 275],
    icon: svg(icons.mdiAlarmLight).color(({rundumleuchte}) =>
      (rundumleuchte === "on" ? hex("#F0DF10") : hex("#000000"))),
    ui: [
      {
        type: "toggle",
        text: "Rundumleuchte",
        topic: "rundumleuchte",
        icon: svg(icons.mdiPower)
      }
    ]
  },
  alarm: {
    name: "Alarm",
    position: [340, 250],
    icon: svg(icons.mdiAlarmBell),
    iconColor: () => hex("#000000"),
    ui: esper.statistics("alarm")
  }
};
