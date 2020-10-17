// @flow
import type { Topics, Controls } from "config/flowtypes";
import { svg, mdiBattery } from "config/icon";
import { hex } from "config/colors";
import * as types from "config/types";
import { floalt, tradfri, tasmota } from "./utils";
import * as icons from "@mdi/js";

export const topics: Topics = {
  //Kuechen-Floalts
  ...floalt.topics("65537"),
  ...floalt.topics("65538"),
  ...floalt.topics("65539"),
  ...floalt.topics("65540"),
  ...tradfri.remote.topics("65536"),
  ...tradfri.remote.topics("65547"),

  //Theken-Floalts
  ...floalt.topics("65543"),
  ...floalt.topics("65544"),
  ...tradfri.remote.topics("65542"),
  ...tradfri.remote.topics("65546"),

  ...tasmota.topics("10", "lichtDunstabzug"),

  kitchenLightColor: {
    state: {
      name: "/service/openhab/out/kitchen_light_all_color_temperature"
        + "/state",
      type: types.string
    },
    command: {
      name: "/service/openhab/in/kitchen_light_all_color_temperature"
        + "/command",
      type: types.string
    },
    defaultValue: "0"
  },
  kitchenLightBrightness: {
    state: {
      name: "/service/openhab/out/kitchen_light_all_brightness/state",
      type: types.string
    },
    command: {
      name: "/service/openhab/in/kitchen_light_all_brightness/command",
      type: types.string
    },
    defaultValue: "0"
  },
  kitchenSinkLightBrightness: {
    state: {
      name: "/service/openhab/out/tradfri_0100_"
        + "gwb8d7af2b448f_65545_brightness/state",
      type: types.string
    },
    command: {
      name: "/service/openhab/in/tradfri_0100_"
        + "gwb8d7af2b448f_65545_brightness/command",
      type: types.string
    },
    defaultValue: "0"
  }
};

export const controls: Controls = {
  kitchenLight: {
    name: "Deckenlicht Küche",
    position: [325, 407],
    icon: svg(icons.mdiCeilingLight),
    ui: [
      {
        type: "toggle",
        on: "50",
        off: "0",
        toggled: (n) => parseInt(n, 10) > 0,
        topic: "kitchenLightBrightness",
        text: "Ein/Ausschalten",
        icon: svg(icons.mdiPower)
      },
      {
        type: "slider",
        min: 0,
        max: 100,
        text: "Helligkeit",
        icon: svg(icons.mdiBrightness7),
        topic: "kitchenLightBrightness"
      },
      {
        type: "slider",
        min: 0,
        max: 100,
        text: "Farbtemperatur",
        icon: svg(icons.mdiWeatherSunsetDown),
        topic: "kitchenLightColor"
      },
      {
        type: "section",
        text: "Lampe Eingang"
      },
      {
        type: "slider",
        min: 0,
        max: 100,
        text: "Helligkeit",
        icon: svg(icons.mdiBrightness7),
        topic: floalt.brightness("65537")
      },
      {
        type: "slider",
        min: 0,
        max: 100,
        text: "Farbtemperatur",
        icon: svg(icons.mdiWeatherSunsetDown),
        topic: floalt.color("65537")
      },
      {
        type: "section",
        text: "Lampe Hauptraum"
      },
      {
        type: "slider",
        min: 0,
        max: 100,
        text: "Helligkeit",
        icon: svg(icons.mdiBrightness7),
        topic: floalt.brightness("65538")
      },
      {
        type: "slider",
        min: 0,
        max: 100,
        text: "Farbtemperatur",
        icon: svg(icons.mdiWeatherSunsetDown),
        topic: floalt.color("65538")
      },
      {
        type: "section",
        text: "Lampe Spüle"
      },
      {
        type: "slider",
        min: 0,
        max: 100,
        text: "Helligkeit",
        icon: svg(icons.mdiBrightness7),
        topic: floalt.brightness("65539")
      },
      {
        type: "slider",
        min: 0,
        max: 100,
        text: "Farbtemperatur",
        icon: svg(icons.mdiWeatherSunsetDown),
        topic: floalt.color("65539")
      },
      {
        type: "section",
        text: "Lampe Herd"
      },
      {
        type: "slider",
        min: 0,
        max: 100,
        text: "Helligkeit",
        icon: svg(icons.mdiBrightness7),
        topic: floalt.brightness("65540")
      },
      {
        type: "slider",
        min: 0,
        max: 100,
        text: "Farbtemperatur",
        icon: svg(icons.mdiWeatherSunsetDown),
        topic: floalt.color("65540")
      }
    ]
  },
  kitchenSinkLight: {
    name: "Licht Spüle",
    position: [300, 345],
    icon: svg(icons.mdiWallSconceFlat),
    ui: [
      {
        type: "toggle",
        on: "50",
        off: "0",
        toggled: (n) => parseInt(n, 10) > 0,
        topic: "kitchenSinkLightBrightness",
        text: "Ein/Ausschalten",
        icon: svg(icons.mdiPower)
      },
      {
        type: "slider",
        min: 0,
        max: 100,
        text: "Helligkeit",
        icon: svg(icons.mdiBrightness7),
        topic: "kitchenSinkLightBrightness"
      }
    ]
  },
  kitchenCounterLight: {
    name: "Deckenlicht Theke",
    position: [400, 440],
    icon: svg(icons.mdiCeilingLight),
    ui: [
      {
        type: "section",
        text: "Lampe Eingang"
      },
      {
        type: "slider",
        min: 0,
        max: 100,
        text: "Helligkeit",
        icon: svg(icons.mdiBrightness7),
        topic: floalt.brightness("65544")
      },
      {
        type: "slider",
        min: 0,
        max: 100,
        text: "Farbtemperatur",
        icon: svg(icons.mdiWeatherSunsetDown),
        topic: floalt.color("65544")
      },
      {
        type: "section",
        text: "Lampe Hauptraum"
      },
      {
        type: "slider",
        min: 0,
        max: 100,
        text: "Helligkeit",
        icon: svg(icons.mdiBrightness7),
        topic: floalt.brightness("65543")
      },
      {
        type: "slider",
        min: 0,
        max: 100,
        text: "Farbtemperatur",
        icon: svg(icons.mdiWeatherSunsetDown),
        topic: floalt.color("65543")
      }
    ]
  },
  lichtDunstabzug: {
    name: "Licht Dunstabzugshaube",
    position: [252, 405],
    icon: svg(icons.mdiCeilingLight),
    iconColor: tasmota.iconColor("lichtDunstabzug"),
    ui: [
      {
        type: "toggle",
        text: "Licht Dunstabzugshaube",
        topic: "lichtDunstabzug",
        icon: svg(icons.mdiPower)
      }
    ]
  },
  remotes: {
    name: "Fernbedinungen",
    position: [400, 344],
    icon: svg(icons.mdiLightSwitch),
    iconColor: (state) => //if any remote is low make icon red
      (["65536", "65542", "65546", "65547"]
        .some((x) => state[tradfri.remote.low(x)] === "true")
        ? hex("#ff0000") : hex("#000000")),
    ui: [
      {
        type: "progress",
        icon: mdiBattery(tradfri.remote.level("65536")),
        min: 0,
        max: 100,
        text: "Licht Tisch 1",
        topic: tradfri.remote.level("65536")
      },
      {
        type: "progress",
        icon: mdiBattery(tradfri.remote.level("65547")),
        min: 0,
        max: 100,
        text: "Licht Tisch 2",
        topic: tradfri.remote.level("65547")
      },
      {
        type: "progress",
        icon: mdiBattery(tradfri.remote.level("65542")),
        min: 0,
        max: 100,
        text: "Licht Theke 1",
        topic: tradfri.remote.level("65542")
      },
      {
        type: "progress",
        icon: mdiBattery(tradfri.remote.level("65546")),
        min: 0,
        max: 100,
        text: "Licht Theke 2",
        topic: tradfri.remote.level("65546")
      }
    ]
  }

};
