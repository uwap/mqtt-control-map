// @flow
import type { Config } from "config/flowtypes";
import { hex, rgb, rgba, rainbow } from "config/colors";
import * as types from "config/types";
import { mdi } from "config/icon";
import { esper_topics, esper_statistics } from "../utils";

const config : Config = {
  space: {
    name: "Entropia",
    color: "orange",
    mqtt: "ws://vielseitigkeit.club.entropia.de:1884"
  },
  topics: [
    {
      hauptraum_table_light: {
        command: {
          name: "/public/sensoren/TPH/leinwand/control",
          type: types.option({ "A1 ON": "on", "A1 OFF": "off" })
        },
        defaultValue: "off"
      }, 
      hauptraum_table_light_on_hack: {
        command: {
          name: "/public/sensoren/TPH/leinwand/control",
          type: types.option({ "A1 ON": "on", "A1 OFF": "off" })
        },
        defaultValue: "on"
      }
    }
  ],
  controls: {
    hauptraum_table_light: {
      name: "Hauptraum Tisch",
      position: [450, 450],
      icon: mdi("white-balance-iridescent"),
      iconColor: () => hex("#000000"),
      ui: [
        {
          type: "toggle",
          text: "Licht",
          topic: "hauptraum_table_light",
          icon: mdi("power")
        },
        {
          type: "toggle",
          text: "Licht",
          topic: "hauptraum_table_light_on_hack",
          icon: mdi("power")
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
