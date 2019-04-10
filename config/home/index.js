// @flow
import type { Config } from "config/flowtypes";
import * as types from "config/types";
import { mdi } from "config/icon";

const config: Config = {
  space: {
    name: "Home",
    color: "orange",
    mqtt: "ws://192.168.0.12:1884"
  },
  topics: [
    {

      /*
       *zigbee2mqtt/bulb_livingroom
       *zigbee2mqtt/bulb_hallway
       *zigbee2mqtt/bulb_bedroom
       */

      livingroomBrightness: {
        state: {
          name: "zigbee2mqtt/bulb_livingroom",
          type: types.json("brightness")
        },
        command: {
          name: "zigbee2mqtt/bulb_livingroom/set",
          type: (value) => JSON.stringify({ brightness: value.toString() })
        },
        defaultValue: "0"
      },
      livingroomColorTemperature: {
        state: {
          name: "zigbee2mqtt/bulb_livingroom",
          type: types.json("color_temp")
        },
        command: {
          name: "zigbee2mqtt/bulb_livingroom/set",
          type: (value) => JSON.stringify({ "color_temp": value.toString() })
        },
        defaultValue: "250"
      },
      livingroomState: {
        state: {
          name: "zigbee2mqtt/bulb_livingroom",
          type: types.json("state", types.option({
            OFF: "off",
            ON: "on"
          }))
        },
        command: {
          name: "zigbee2mqtt/bulb_livingroom/set",
          type: (value) => JSON.stringify({ state: value.toString() })
        },
        defaultValue: "OFF"
      },
      bedroomBrightness: {
        state: {
          name: "zigbee2mqtt/bulb_bedroom",
          type: types.json("brightness")
        },
        command: {
          name: "zigbee2mqtt/bulb_bedroom/set",
          type: (value) => JSON.stringify({ brightness: value.toString() })
        },
        defaultValue: "0"
      },
      bedroomState: {
        state: {
          name: "zigbee2mqtt/bulb_bedroom",
          type: types.json("state", types.option({
            OFF: "off",
            ON: "on"
          }))
        },
        command: {
          name: "zigbee2mqtt/bulb_bedroom/set",
          type: (value) => JSON.stringify({ state: value.toString() })
        },
        defaultValue: "OFF"
      },
      hallwayBrightness: {
        state: {
          name: "zigbee2mqtt/bulb_hallway",
          type: types.json("brightness")
        },
        command: {
          name: "zigbee2mqtt/bulb_hallway/set",
          type: (value) => JSON.stringify({ brightness: value.toString() })
        },
        defaultValue: "0"
      },
      hallwayState: {
        state: {
          name: "zigbee2mqtt/bulb_hallway",
          type: types.json("state", types.option({
            OFF: "off",
            ON: "on"
          }))
        },
        command: {
          name: "zigbee2mqtt/bulb_hallway/set",
          type: (value) => JSON.stringify({ state: value.toString() })
        },
        defaultValue: "OFF"
      }
    }
  ],
  controls: {
    bedroomLight: {
      name: "Schlafzimmer",
      position: [300, 400],
      icon: mdi("ceiling-light"),
      ui: [
        {
          type: "toggle",
          topic: "bedroomState",
          text: "Ein/Ausschalten",
          icon: mdi("power")
        },
        {
          type: "slider",
          min: 0,
          max: 255,
          text: "Helligkeit",
          icon: mdi("brightness-7"),
          topic: "bedroomBrightness"
        }
      ]
    },
    hallwayLight: {
      name: "Flur",
      position: [500, 200],
      icon: mdi("ceiling-light"),
      ui: [
        {
          type: "toggle",
          topic: "hallwayState",
          text: "Ein/Ausschalten",
          icon: mdi("power")
        },
        {
          type: "slider",
          min: 0,
          max: 255,
          text: "Helligkeit",
          icon: mdi("brightness-7"),
          topic: "hallwayBrightness"
        }
      ]
    },
    livingroomLight: {
      name: "Wohnzimmer",
      position: [300, 200],
      icon: mdi("ceiling-light"),
      ui: [
        {
          type: "toggle",
          topic: "livingroomState",
          text: "Ein/Ausschalten",
          icon: mdi("power")
        },
        {
          type: "slider",
          min: 0,
          max: 255,
          text: "Helligkeit",
          icon: mdi("brightness-7"),
          topic: "livingroomBrightness"
        },
        {
          type: "slider",
          min: 250,
          max: 454,
          text: "Farbtemperatur",
          icon: mdi("weather-sunset-down"),
          topic: "livingroomColorTemperature"
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
