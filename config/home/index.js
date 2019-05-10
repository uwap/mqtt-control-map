// @flow
import type { Config } from "config/flowtypes";
import * as types from "config/types";
import { mdi } from "config/icon";

const topic_bulb = (bulb: string, argument: string) => ({
  [`${bulb}${argument}`]: {
    state: {
      name: `home-rust/bulb/${bulb}/${argument}`,
      type: types.string
    },
    command: {
      name: `home-rust/bulb/${bulb}/${argument}/set`,
      type: types.string
    },
    defaultValue: "0"
  }
});

const slider_rgb = (bulb: string, argument: string) => (
  [{
    type: "slider",
    min: 0,
    max: 255,
    text: argument,
    icon: mdi("brightness-7"),
    topic: `${bulb}${argument}`
  }]
);
const slider_h = (bulb: string, argument: string) => (
  [{
    type: "slider",
    min: 0,
    max: 360,
    text: argument,
    icon: mdi("brightness-7"),
    topic: `${bulb}${argument}`
  }]
);
const slider_svxy = (bulb: string, argument: string) => (
  [{
    type: "slider",
    min: 0,
    max: 1,
    step: 0.01,
    text: argument,
    icon: mdi("brightness-7"),
    topic: `${bulb}${argument}`
  }]
);

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

      ...topic_bulb("livingroom", "r"),
      ...topic_bulb("livingroom", "g"),
      ...topic_bulb("livingroom", "b"),
      ...topic_bulb("livingroom", "h"),
      ...topic_bulb("livingroom", "s"),
      ...topic_bulb("livingroom", "v"),
      ...topic_bulb("livingroom", "x"),
      ...topic_bulb("livingroom", "y"),
      ...topic_bulb("livingroom", "animation-speed"),
      ...topic_bulb("livingroom", "mode"),
      livingroomBrightness: {
        state: {
          name: "home-rust/bulb/livingroom/brightness",
          type: types.string
        },
        command: {
          name: "zigbee2mqtt/bulb_livingroom/set",
          type: (value) => JSON.stringify({ brightness: value.toString() })
        },
        defaultValue: "0"
      },
      livingroomState: {
        state: {
          name: "home-rust/bulb/livingroom/state",
          type: types.option({
            OFF: "off",
            ON: "on"
          })
        },
        command: {
          name: "zigbee2mqtt/bulb_livingroom/set",
          type: (value) => JSON.stringify({ state: value.toString() })
        },
        defaultValue: "OFF"
      },
      bedroomWakeup: {
        state: {
          name: "home-rust/wakeup",
          type: types.option({ true: "on", false: "off" })
        },
        command: {
          name: "home-rust/wakeup/set",
          type: types.option({ on: "true", off: "false" })
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
        },
        {
          type: "toggle",
          topic: "bedroomWakeup",
          text: "Lichtwecker",
          icon: mdi("power")
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
      ui: ([
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
          max: 1,
          min: 300,
          step: -1,
          text: "Speed",
          icon: mdi("speedometer"),
          topic: "livingroomanimation-speed"
        },
        {
          type: "dropDown",
          text: "Modus",
          topic: "livingroommode",
          options: {
            "-1": "Cancel Animation",
            "0": "Pink",
            "1": "Kodi",
            "2": "Sleep",
            "3": "RGB Fade",
            "4": "Work"
          },
          icon: mdi("settings")
        },
        {
          type: "section",
          text: "RGB"
        }
      ]).concat(slider_rgb("livingroom", "r"))
        .concat(slider_rgb("livingroom", "g"))
        .concat(slider_rgb("livingroom", "b"))
        .concat([
          {
            type: "section",
            text: "HSV"
          }
        ]).concat(slider_h("livingroom", "h"))
        .concat(slider_svxy("livingroom", "s"))
        .concat(slider_svxy("livingroom", "v"))
        .concat([
          {
            type: "section",
            text: "XY"
          }
        ]).concat(slider_svxy("livingroom", "x"))
        .concat(slider_svxy("livingroom", "y"))
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
