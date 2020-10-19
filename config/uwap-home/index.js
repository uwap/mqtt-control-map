// @flow
import type { Config } from "config/flowtypes";
import * as types from "config/types";
import { svg, withState } from "config/icon";
import { hex } from "config/colors";
import * as icons from "@mdi/js";

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
    icon: svg(icons.mdiBrightness7),
    topic: `${bulb}${argument}`
  }]
);
const sliderH = (bulb: string, argument: string) => (
  [{
    type: "slider",
    min: 0,
    max: 360,
    text: argument,
    icon: svg(icons.mdiBrightness7),
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
    icon: svg(icons.mdiBrightness7),
    topic: `${bulb}${argument}`
  }]
);

const config: Config = {
  space: {
    name: "Home",
    color: "teal",
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
            "4": "100M (Half Duplex)",
            "3": "10M",
            "2": "10M (Half Duplex)"
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
      ...topicTasmota("speakerOffice", "sonoff-office-speaker"),
      ...topicHomeBoolean("officeSwitchPollingActive", "switch/office/polling")
    }
  ],
  controls: {
    bedroomLight: {
      name: "Schlafzimmer",
      position: [180, 130],
      icon: svg(icons.mdiCeilingLight).color(({bedroomState}) =>
        (bedroomState === "on" ? hex("#00FF00") : hex("#000000"))),
      ui: [
        {
          type: "toggle",
          topic: "bedroomState",
          text: "Ein/Ausschalten",
          icon: svg(icons.mdiPower)
        },
        {
          type: "slider",
          min: 0,
          max: 255,
          text: "Helligkeit",
          icon: svg(icons.mdiBrightness7),
          topic: "bedroombrightness"
        },
        {
          type: "toggle",
          topic: "bedroomWakeup",
          text: "Lichtwecker",
          icon: svg(icons.mdiWeatherSunsetUp)
        },
        {
          type: "slider",
          min: 250,
          max: 454,
          text: "Farbtemperatur",
          icon: svg(icons.mdiWeatherSunsetDown),
          topic: "bedroomcolor_temp"
        }
      ]
    },
    bedroomFan: {
      name: "Lüftung Schlafzimmer",
      position: [140, 25],
      icon: svg(icons.mdiFan).color(({fanBedroomState}) =>
        (fanBedroomState === "on" ? hex("#00FF00") : hex("#000000"))),
      ui: [
        {
          type: "toggle",
          topic: "fanBedroomState",
          text: "Ein/Ausschalten",
          icon: svg(icons.mdiPower)
        },
        {
          type: "toggle",
          topic: "fanBedroomAuto",
          text: "Automatik",
          icon: svg(icons.mdiAirConditioner)
        },
        {
          type: "text",
          text: "Zieltemperatur",
          icon: svg(icons.mdiTemperatureCelsius),
          topic: "fanBedroomTarget"
        },
        {
          type: "slider",
          min: 15,
          max: 25,
          step: 0.1,
          text: "Zieltemperatur",
          icon: svg(icons.mdiOilTemperature),
          topic: "fanBedroomTarget"
        }
      ]
    },
    officeSpeaker: {
      name: "Lautsprecher",
      position: [245, 658],
      icon: withState(({speakerOfficeState}) =>
        (speakerOfficeState !== "on" ? svg(icons.mdiVolumeOff)
          : svg(icons.mdiVolumeHigh).color(hex("#00FF00")))
      ),
      ui: [
        {
          type: "toggle",
          topic: "speakerOfficeState",
          text: "Ein/Ausschalten",
          icon: svg(icons.mdiPower)
        }
      ]
    },
    officeFan: {
      name: "Lüftung Büro",
      position: [140, 658],
      icon: svg(icons.mdiFan),
      iconColor: ({fanOfficeState}) =>
        (fanOfficeState === "on" ? hex("#00FF00") : hex("#000000")),
      ui: [
        {
          type: "toggle",
          topic: "fanOfficeState",
          text: "Ein/Ausschalten",
          icon: svg(icons.mdiPower)
        },
        {
          type: "toggle",
          topic: "fanOfficeAuto",
          text: "Automatik",
          icon: svg(icons.mdiAirConditioner)
        },
        {
          type: "text",
          text: "Zieltemperatur",
          icon: svg(icons.mdiTemperatureCelsius),
          topic: "fanOfficeTarget"
        },
        {
          type: "slider",
          min: 15,
          max: 25,
          step: 0.1,
          text: "Zieltemperatur",
          icon: svg(icons.mdiOilTemperature),
          topic: "fanOfficeTarget"
        }
      ]
    },
    tucana: {
      name: "tucana",
      position: [110, 658],
      icon: svg(icons.mdiDesktopTower).color(({tucanaPower}) =>
        ({
          "Link Down": hex("#888888"),
          "1000M": hex("#00ff00"),
          "10M": hex("#000000")
        })[tucanaPower] || hex("#ff0000")),
      ui: [
        {
          type: "toggle",
          topic: "tucanaPower",
          text: "Einschalten",
          icon: svg(icons.mdiPower),
          on: "1000M"
        },
        {
          type: "text",
          text: "Link Speed",
          icon: svg(icons.mdiEthernet),
          topic: "tucanaPower"
        }
      ]
    },
    officeSwitch: {
      name: "Switch Büro",
      position: [200, 540],
      icon: svg(icons.mdiLan),
      ui: [
        {
          type: "toggle",
          topic: "officeSwitchPollingActive",
          text: "Poll switch status",
          icon: svg(icons.mdiPower)
        },
        {
          type: "link",
          link: "http://192.168.0.189/",
          text: "Open Webinterface",
          icon: svg(icons.mdiOpenInNew)
        }

      ]
    },
    officeLight: {
      name: "Büro",
      position: [210, 570],
      icon: svg(icons.mdiCeilingLight).color(({officeState}) =>
        (officeState === "on" ? hex("#00FF00") : hex("#000000"))),
      ui: [
        {
          type: "toggle",
          topic: "officeState",
          text: "Ein/Ausschalten",
          icon: svg(icons.mdiPower)
        },
        {
          type: "slider",
          min: 0,
          max: 255,
          text: "Helligkeit",
          icon: svg(icons.mdiBrightness7),
          topic: "officebrightness"
        }
      ]
    },
    hallwayLight: {
      name: "Flur",
      position: [520, 370],
      icon: svg(icons.mdiCeilingLight).color(({hallwayState}) =>
        (hallwayState === "on" ? hex("#00FF00") : hex("#000000"))),
      ui: [
        {
          type: "toggle",
          topic: "hallwayState",
          text: "Ein/Ausschalten",
          icon: svg(icons.mdiPower)
        },
        {
          type: "slider",
          min: 0,
          max: 255,
          text: "Helligkeit",
          icon: svg(icons.mdiBrightness7),
          topic: "hallwaybrightness"
        }
      ]
    },
    hallway2Light: {
      name: "Flur",
      position: [250, 370],
      icon: svg(icons.mdiCeilingLight).color(({hallway2State}) =>
        (hallway2State === "on" ? hex("#00FF00") : hex("#000000"))),
      ui: [
        {
          type: "toggle",
          topic: "hallway2State",
          text: "Ein/Ausschalten",
          icon: svg(icons.mdiPower)
        },
        {
          type: "slider",
          min: 0,
          max: 255,
          text: "Helligkeit",
          icon: svg(icons.mdiBrightness7),
          topic: "hallway2brightness"
        }
      ]
    },
    pi: {
      name: "Pi",
      position: [550, 75],
      icon: svg(icons.mdiRaspberryPi),
      ui: [
        {
          type: "toggle",
          topic: "lueftenHint",
          text: "Lüften Erinnerung",
          icon: svg(icons.mdiFan)
        },
        {
          type: "link",
          link: "http://192.168.0.12:3000/",
          text: "Grafana",
          icon: svg(icons.mdiOpenInNew)
        }
      ]
    },
    nas: {
      name: "NAS",
      position: [550, 100],
      icon: svg(icons.mdiNas).color(({nasPower}) =>
        (nasPower === "on" ? hex("#00FF00") : hex("#000000"))),
      ui: [
        {
          type: "toggle",
          topic: "nasPower",
          text: "Einschalten",
          icon: svg(icons.mdiPower)
        }
      ]
    },
    livingroomLight: {
      name: "Wohnzimmer",
      position: [450, 200],
      icon: svg(icons.mdiCeilingLight).color(({livingroomState}) =>
        (livingroomState === "on" ? hex("#00FF00") : hex("#000000"))),
      ui: ([
        {
          type: "toggle",
          topic: "livingroomState",
          text: "Ein/Ausschalten",
          icon: svg(icons.mdiPower)
        },
        {
          type: "toggle",
          topic: "livingroomKodiControlled",
          text: "Kodi Einbindung",
          icon: svg(icons.mdiBrightnessAuto)
        },
        {
          type: "slider",
          min: 0,
          max: 255,
          text: "Helligkeit",
          icon: svg(icons.mdiBrightness7),
          topic: "livingroombrightness"
        },
        {
          type: "slider",
          max: 1,
          min: 300,
          step: -1,
          text: "Speed",
          icon: svg(icons.mdiSpeedometer),
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
          icon: svg(icons.mdiCog)
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
      name: "Rooms",
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
