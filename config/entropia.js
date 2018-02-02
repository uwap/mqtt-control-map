// @flow
import { hex, rgb, rgba, rainbow, esper_topics, esper_statistics } from "./utils";

const config : Config = {
  space: {
    name: "Entropia",
    color: "orange",
    mqtt: "ws://vielseitigkeit.club.entropia.de:1884"
  },
  topics: [
    {
      hauptraum_table_light: {
        command: "/public/sensoren/TPH/leinwand/control",
        state: "test",
        defaultValue: "A1 ON",
        values: { on: "A1 ON", off: "A1 OFF" }
      }, 
      hauptraum_table_light_on_hack: {
        command: "/public/sensoren/TPH/leinwand/control",
        state: "test",
        defaultValue: "A1 OFF",
        values: { on: "A1 ON", off: "A1 OFF" }
      }
    }
  ],
  controls: {
    hauptraum_table_light: {
      name: "Hauptraum Tisch",
      position: [450, 450],
      icon: "white-balance-iridescent",
      iconColor: () => hex("#000000"),
      ui: [
        {
          type: "toggle",
          text: "Licht",
          topic: "hauptraum_table_light",
          icon: "power"
        },
        {
          type: "toggle",
          text: "Licht",
          topic: "hauptraum_table_light_on_hack",
          icon: "power"
        }
      ]
    }
  },
  layers: [
    {
      image: require("../img/layers/entropia/rooms.svg"),
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
