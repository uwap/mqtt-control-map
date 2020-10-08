// @flow
import type { Config } from "config/flowtypes";
import { hex } from "config/colors";
import * as types from "config/types";
import * as icons from "@mdi/js";
import { svg } from "config/icon";

const config: Config = {
  space: {
    name: "Entropia",
    color: "orange",
    mqtt: "ws://vielseitigkeit.club.entropia.de:1884"
  },
  topics: [
    {
      hauptraumTableLight: {
        command: {
          name: "/public/sensoren/TPH/leinwand/control",
          type: types.option({ "A1 ON": "on", "A1 OFF": "off" })
        },
        defaultValue: "off"
      },
      hauptraumTableLightOnHack: {
        command: {
          name: "/public/sensoren/TPH/leinwand/control",
          type: types.option({ "A1 ON": "on", "A1 OFF": "off" })
        },
        defaultValue: "on"
      }
    }
  ],
  controls: {
    hauptraumTableLight: {
      name: "Hauptraum Tisch",
      position: [450, 450],
      icon: svg(icons.mdiWhiteBalanceIridescent),
      ui: [
        {
          type: "toggle",
          text: "Licht",
          topic: "hauptraumTableLight",
          icon: svg(icons.mdiPower)
        },
        {
          type: "toggle",
          text: "Licht",
          topic: "hauptraumTableLightOnHack",
          icon: svg(icons.mdiPower)
        }
      ]
    }
  },
  layers: [
    {
      image: require("./assets/layers/rooms.svg"),
      baseLayer: true,
      name: "Entropia",
      defaultVisibility: "visible",
      opacity: 0.7,
      bounds: {
        topLeft: [0, 0],
        bottomRight: [720, 680]
      }
    }
  ]
};

window.config = config;
