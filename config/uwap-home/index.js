// @flow
import type { Config } from "config/flowtypes";
import * as types from "config/types";
import { mdi, rawMdi } from "config/icon";
import { hex } from "config/colors";

const topicBulbHomeRust = (bulb: string, argument: string) => ({
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

const topicBulbState = (bulb: string) => ({
  [`${bulb}State`]: {
    state: {
      name: `zigbee2mqtt/bulb_${bulb}/state`,
      type: types.option({
        OFF: "off",
        ON: "on"
      })
    },
    command: {
      name: `zigbee2mqtt/bulb_${bulb}/set/state`,
      type: types.string
    },
    defaultValue: "OFF"
  }
});

const topicBulbNumber = (bulb: string, parameter: string) => ({
  [`${bulb}${parameter}`]: {
    state: {
      name: `zigbee2mqtt/bulb_${bulb}/${parameter}`,
      type: types.string
    },
    command: {
      name: `zigbee2mqtt/bulb_${bulb}/set/${parameter}`,
      type: types.string
    },
    defaultValue: "0"
  }
});

const topicHomeBoolean = (name: string, topic: string) => ({
  [`${name}`]: {
    state: {
      name: `home-rust/${topic}`,
      type: types.option({ true: "on", false: "off" })
    },
    command: {
      name: `home-rust/${topic}/set`,
      type: types.option({ on: "true", off: "false" })
    },
    defaultValue: "OFF"
  }
});

const topicHomeNumber = (name: string, topic: string) => ({
  [`${name}`]: {
    state: {
      name: `home-rust/${topic}`,
      type: types.string
    },
    command: {
      name: `home-rust/${topic}/set`,
      type: types.string
    },
    defaultValue: 0
  }
});

const topicTasmota = (name: string, topic: string) => ({
  [`${name}State`]: {
    state: {
      name: `stat/${topic}/POWER`,
      type: types.option({
        OFF: "off",
        ON: "on"
      })
    },
    command: {
      name: `cmnd/${topic}/POWER`,
      type: types.string
    },
    defaultValue: "OFF"
  }
});

const sliderRGB = (bulb: string, argument: string) => (
  [{
    type: "slider",
    min: 0,
    max: 255,
    text: argument,
    icon: mdi("brightness-7"),
    topic: `${bulb}${argument}`
  }]
);
const sliderH = (bulb: string, argument: string) => (
  [{
    type: "slider",
    min: 0,
    max: 360,
    text: argument,
    icon: mdi("brightness-7"),
    topic: `${bulb}${argument}`
  }]
);
const sliderSVXY = (bulb: string, argument: string) => (
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
      ...topicBulbHomeRust("livingroom", "r"),
      ...topicBulbHomeRust("livingroom", "g"),
      ...topicBulbHomeRust("livingroom", "b"),
      ...topicBulbHomeRust("livingroom", "h"),
      ...topicBulbHomeRust("livingroom", "s"),
      ...topicBulbHomeRust("livingroom", "v"),
      ...topicBulbHomeRust("livingroom", "x"),
      ...topicBulbHomeRust("livingroom", "y"),
      ...topicBulbHomeRust("livingroom", "animation-speed"),
      ...topicBulbHomeRust("livingroom", "mode"),
      ...topicBulbNumber("livingroom", "brightness"),
      ...topicBulbState("livingroom"),
      nasPower: {
        state: {
          name: "nas/online",
          type: types.string
        },
        command: {
          name: "home-rust/wake/nas",
          type: types.string
        },
        defaultValue: "OFF"
      },
      tucanaPower: {
        state: {
          name: "home-rust/switch/office/8",
          type: types.option({
            "0": "Link Down",
            "6": "1000M",
            "5": "100M",
            "3": "10M"
          })
        },
        command: {
          name: "home-rust/wake/tucana",
          type: types.string
        },
        defaultValue: "0"
      },
      ...topicHomeBoolean("livingroomKodiControlled",
        "bulb/livingroom/kodi-controlled"),
      ...topicHomeBoolean("bedroomWakeup", "wakeup"),
      ...topicBulbNumber("bedroom", "brightness"),
      ...topicBulbNumber("bedroom", "color_temp"),
      ...topicBulbNumber("hallway", "brightness"),
      ...topicBulbState("bedroom"),
      ...topicTasmota("fanBedroom", "sonoff-bedroom-fan"),
      ...topicHomeBoolean("fanBedroomAuto", "temperature-control/bedroom"),
      ...topicHomeNumber("fanBedroomTarget",
        "temperature-control/bedroom/target"),
      ...topicTasmota("fanOffice", "sonoff-office-fan"),
      ...topicHomeBoolean("fanOfficeAuto", "temperature-control/office"),
      ...topicHomeBoolean("lueftenHint", "lueften"),
      ...topicHomeNumber("fanOfficeTarget",
        "temperature-control/office/target"),
      ...topicBulbNumber("hallway", "brightness"),
      ...topicBulbState("hallway"),
      ...topicBulbNumber("hallway2", "brightness"),
      ...topicBulbState("hallway2"),
      ...topicBulbState("office"),
      ...topicBulbNumber("office", "brightness"),
      ...topicTasmota("speakerOffice", "sonoff-office-speaker")
    }
  ],
  controls: {
    bedroomLight: {
      name: "Schlafzimmer",
      position: [180, 130],
      icon: mdi("ceiling-light"),
      iconColor: ({bedroomState}) =>
        (bedroomState === "on" ? hex("#00FF00") : hex("#000000")),
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
          topic: "bedroombrightness"
        },
        {
          type: "toggle",
          topic: "bedroomWakeup",
          text: "Lichtwecker",
          icon: mdi("weather-sunset-up")
        },
        {
          type: "slider",
          min: 250,
          max: 454,
          text: "Farbtemperatur",
          icon: mdi("weather-sunset-down"),
          topic: "bedroomcolor_temp"
        }
      ]
    },
    bedroomFan: {
      name: "Lüftung Schlafzimmer",
      position: [140, 25],
      icon: mdi("fan"),
      iconColor: ({fanBedroomState}) =>
        (fanBedroomState === "on" ? hex("#00FF00") : hex("#000000")),
      ui: [
        {
          type: "toggle",
          topic: "fanBedroomState",
          text: "Ein/Ausschalten",
          icon: mdi("power")
        },
        {
          type: "toggle",
          topic: "fanBedroomAuto",
          text: "Automatik",
          icon: mdi("air-conditioner")
        },
        {
          type: "text",
          text: "Zieltemperatur",
          icon: mdi("temperature-celsius"),
          topic: "fanBedroomTarget"
        },
        {
          type: "slider",
          min: 10,
          max: 21.5,
          step: 0.1,
          text: "Zieltemperatur",
          icon: mdi("oil-temperature"),
          topic: "fanBedroomTarget"
        }
      ]
    },
    officeSpeaker: {
      name: "Lautsprecher",
      position: [245, 658],
      icon: ({speakerOfficeState}) =>
        (speakerOfficeState === "on" ? rawMdi("volume-high")
          : rawMdi("volume-off")),
      iconColor: ({speakerOfficeState}) =>
        (speakerOfficeState === "on" ? hex("#00FF00") : hex("#000000")),
      ui: [
        {
          type: "toggle",
          topic: "speakerOfficeState",
          text: "Ein/Ausschalten",
          icon: mdi("power")
        }
      ]
    },
    officeFan: {
      name: "Lüftung Büro",
      position: [140, 658],
      icon: mdi("fan"),
      iconColor: ({fanOfficeState}) =>
        (fanOfficeState === "on" ? hex("#00FF00") : hex("#000000")),
      ui: [
        {
          type: "toggle",
          topic: "fanOfficeState",
          text: "Ein/Ausschalten",
          icon: mdi("power")
        },
        {
          type: "toggle",
          topic: "fanOfficeAuto",
          text: "Automatik",
          icon: mdi("air-conditioner")
        },
        {
          type: "text",
          text: "Zieltemperatur",
          icon: mdi("temperature-celsius"),
          topic: "fanOfficeTarget"
        },
        {
          type: "slider",
          min: 10,
          max: 21.5,
          step: 0.1,
          text: "Zieltemperatur",
          icon: mdi("oil-temperature"),
          topic: "fanOfficeTarget"
        }
      ]
    },
    tucana: {
      name: "tucana",
      position: [110, 658],
      icon: mdi("desktop-tower"),
      iconColor: ({tucanaPower}) =>
        ({
          "Link Down": hex("#888888"),
          "1000M": hex("#00ff00"),
          "100M": hex("#ff0000"),
          "10M": hex("#000000")
        })[tucanaPower],
      ui: [
        {
          type: "toggle",
          topic: "tucanaPower",
          text: "Einschalten",
          icon: mdi("power"),
          on: "1000M"
        },
        {
          type: "text",
          text: "Link Speed",
          icon: mdi("ethernet"),
          topic: "tucanaPower"
        }
      ]
    },
    officeLight: {
      name: "Büro",
      position: [210, 570],
      icon: mdi("ceiling-light"),
      iconColor: ({officeState}) =>
        (officeState === "on" ? hex("#00FF00") : hex("#000000")),
      ui: [
        {
          type: "toggle",
          topic: "officeState",
          text: "Ein/Ausschalten",
          icon: mdi("power")
        },
        {
          type: "slider",
          min: 0,
          max: 255,
          text: "Helligkeit",
          icon: mdi("brightness-7"),
          topic: "officebrightness"
        }
      ]
    },
    hallwayLight: {
      name: "Flur",
      position: [520, 370],
      icon: mdi("ceiling-light"),
      iconColor: ({hallwayState}) =>
        (hallwayState === "on" ? hex("#00FF00") : hex("#000000")),
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
          topic: "hallwaybrightness"
        }
      ]
    },
    hallway2Light: {
      name: "Flur",
      position: [250, 370],
      icon: mdi("ceiling-light"),
      iconColor: ({hallway2State}) =>
        (hallway2State === "on" ? hex("#00FF00") : hex("#000000")),
      ui: [
        {
          type: "toggle",
          topic: "hallway2State",
          text: "Ein/Ausschalten",
          icon: mdi("power")
        },
        {
          type: "slider",
          min: 0,
          max: 255,
          text: "Helligkeit",
          icon: mdi("brightness-7"),
          topic: "hallway2brightness"
        }
      ]
    },
    pi: {
      name: "Pi",
      position: [550, 75],
      icon: mdi("raspberrypi"),
      ui: [
        {
          type: "toggle",
          topic: "lueftenHint",
          text: "Lüften Erinnerung",
          icon: mdi("fan")
        }
      ]
    },
    nas: {
      name: "NAS",
      position: [550, 100],
      icon: mdi("nas"),
      iconColor: ({nasPower}) =>
        (nasPower === "on" ? hex("#00FF00") : hex("#000000")),
      ui: [
        {
          type: "toggle",
          topic: "nasPower",
          text: "Einschalten",
          icon: mdi("power")
        }
      ]
    },
    livingroomLight: {
      name: "Wohnzimmer",
      position: [450, 200],
      icon: mdi("ceiling-light"),
      iconColor: ({livingroomState}) =>
        (livingroomState === "on" ? hex("#00FF00") : hex("#000000")),
      ui: ([
        {
          type: "toggle",
          topic: "livingroomState",
          text: "Ein/Ausschalten",
          icon: mdi("power")
        },
        {
          type: "toggle",
          topic: "livingroomKodiControlled",
          text: "Kodi Einbindung",
          icon: mdi("brightness-auto")
        },
        {
          type: "slider",
          min: 0,
          max: 255,
          text: "Helligkeit",
          icon: mdi("brightness-7"),
          topic: "livingroombrightness"
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
      ]).concat(sliderRGB("livingroom", "r"))
        .concat(sliderRGB("livingroom", "g"))
        .concat(sliderRGB("livingroom", "b"))
        .concat([
          {
            type: "section",
            text: "HSV"
          }
        ]).concat(sliderH("livingroom", "h"))
        .concat(sliderSVXY("livingroom", "s"))
        .concat(sliderSVXY("livingroom", "v"))
        .concat([
          {
            type: "section",
            text: "XY"
          }
        ]).concat(sliderSVXY("livingroom", "x"))
        .concat(sliderSVXY("livingroom", "y"))
    }
  },
  layers: [
    {
      image: require("./assets/layers/rooms.svg"),
      baseLayer: true,
      name: "Uwap Home",
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
