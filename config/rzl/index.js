// @flow
import type { Config } from "config/flowtypes";
import * as types from "config/types";
import { hex, rgb, rgba, rainbow } from "config/colors";
import { mdi, rawMdi, mdiBattery } from "config/icon";
import { esper_topics, esper_statistics, floalt, tradfri_remote, tasmota } from "./utils";

import * as onkyo from "./onkyo";

const config: Config = {
  space: {
    name: "RZL",
    color: "orange",
    mqtt: "ws://map.rzl.so:1884"
  },
  topics: [
    {
      led_stahltraeger: {
        state: {
          name: "/service/openhab/out/pca301_ledstrips/state",
          type: types.option({ ON: "on", OFF: "off" })
        },
        command: {
          name: "/service/openhab/in/pca301_ledstrips/command",
          type: types.option({ on: "ON", off: "OFF" })
        },
        defaultValue: "off"
      },
      twinkle: {
        state: {
          name: "/service/openhab/out/pca301_twinkle/state",
          type: types.option({ ON: "on", OFF: "off" })
        },
        command: {
          name: "/service/openhab/in/pca301_twinkle/command",
          type: types.option({ on: "ON", off: "OFF" })
        },
        defaultValue: "off"
      },
      fan: {
        state: {
          name: "/service/openhab/out/pca301_fan/state",
          type: types.option({ ON: "on", OFF: "off" })
        },
        command: {
          name: "/service/openhab/in/pca301_fan/command",
          type: types.option({ on: "ON", off: "OFF" })
        },
        defaultValue: "off"
      },
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
      olymp_pc: {
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
      flyfry: {
        state: {
          name: "/service/openhab/out/wifi_flyfry/state",
          type: types.option({ ON: "on", OFF: "off" })
        },
        command: {
          name: "/service/openhab/in/wifi_flyfry/command",
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
      loetarbeitsplatz4: {
        state: {
          name: "stat/sonoff4/POWER",
          type: types.option({ ON: "on", OFF: "off" })
        },
        defaultValue: "off",
      },
      loetarbeitsplatz5: {
        state: {
          name: "stat/sonoff5/POWER",
          type: types.option({ ON: "on", OFF: "off" })
        },
        defaultValue: "off",
      },
      door_status: {
        state: {
          name: "/service/status",
          type: types.option({ "\"open\"": "on", "\"closed\"": "off" })
        },
        defaultValue: "off"
      },
      presence_status: {
        state: {
          name: "service/status/presence",
          type: types.jsonArray
        },
        defaultValue: ""
      },
      devices_status: {
        state: {
          name: "/service/status/devices",
          type: types.string
        },
        defaultValue: ""
      },
      projector: {
        state: {
          name: "/service/beamer/state",
          type: types.option({
            START_UP: "transient_on",
            START_UP_LAMP: "transient_on",
            COOLING: "transient_off",
            COOLING2: "transient_off",
            POWER_ON: "on",
            STANDBY: "off",
            unknown: "unknown",
            offline: "unknown"
          })
        },
        command: {
          name: "/service/beamer/command",
          type: types.option({
            on: "ON",
            off: "OFF",
            transient_off: "OFF",
            transient_on: "ON",
            unknown: "OFF"
          })
        },
        defaultValue: "unknown"
      },
      printer_3d_status: {
        state: {
          name: "/service/ultimaker/state",
          type: types.option({
            unreachable: "unavailable",
            booting: "unavailable",
            pre_print: "printing",
            post_print: "printing",
            printing: "printing",
            idle: "idle",
            error: "error",
            otherwise: "awaiting_interaction"
          })
        },
        defaultValue: "unavailable",
      },
      printer_3d_progress: {
        state: {
          name: "/service/ultimaker/job",
          type: msg => JSON.parse(msg.toString()).progress || "0"
        },
        defaultValue: "0"
      },
      kitchen_light_color: {
        state: {
          name: "/service/openhab/out/kitchen_light_all_color_temperature/state",
          type: types.string
        },
        command: {
          name: "/service/openhab/in/kitchen_light_all_color_temperature/command",
          type: types.string
        },
        defaultValue: "0"
      },
      kitchen_light_brightness: {
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
      kitchen_sink_light_brightness: {
        state: {
          name: "/service/openhab/out/tradfri_0100_gwb8d7af2b448f_65545_brightness/state",
          type: types.string
        },
        command: {
          name: "/service/openhab/in/tradfri_0100_gwb8d7af2b448f_65545_brightness/command",
          type: types.string
        },
        defaultValue: "0"
      }
    },
    //Tasmota-Dosen
    tasmota.topics("2", "olymp_printer"),
    tasmota.topics("6", "snackbar"),
    tasmota.topics("7", "infoscreen"),
    tasmota.topics("8", "led_olymp"),

    //Kuechen-Floalts
    floalt.topics("65537"),
    floalt.topics("65538"),
    floalt.topics("65539"),
    floalt.topics("65540"),
    tradfri_remote.topics("65536"),
    tradfri_remote.topics("65547"),

    //Theken-Floalts
    floalt.topics("65543"),
    floalt.topics("65544"),
    tradfri_remote.topics("65542"),
    tradfri_remote.topics("65546"),

    esper_topics("afba40", "flyfry"),
    esper_topics("afba45", "alarm"),

    onkyo.topics
  ],
  controls: {
    ...onkyo.controls,
    led_stahltrager: {
      name: "LED Stahlträger",
      position: [340, 590],
      icon: mdi("white-balance-iridescent"),
      iconColor: ({led_stahltraeger}) => led_stahltraeger == "on" ? rainbow : hex("#000000"),
      ui: [
        {
          type: "toggle",
          text: "Stahlträger LED",
          topic: "led_stahltraeger",
          icon: mdi("power")
        },
      ]
    },
    led_olymp: {
      name: "LED Olymp",
      position: [196, 154],
      icon: mdi("white-balance-iridescent"),
      iconColor: tasmota.icon_color("led_olymp", rainbow),
      ui: [
        {
          type: "toggle",
          text: "LED Olymp",
          topic: "led_olymp",
          icon: mdi("power")
        }
      ]
    },
    snackbar: {
      name: "Snackbar",
      position: [510, 500],
      icon: mdi("fridge"),
      iconColor: tasmota.icon_color("snackbar", hex("#E20074")),
      ui: [
        {
          type: "toggle",
          text: "Snackbar",
          topic: "snackbar",
          icon: mdi("power")
        }
      ]
    },
    twinkle: {
      name: "Twinkle",
      position: [530, 560],
      icon: ({twinkle}) =>
        twinkle == "on" ? rawMdi("led-on flip-v") : rawMdi("led-off flip-v"),
      iconColor: ({twinkle}) => twinkle == "on" ? rainbow : hex("#000000"),
      ui: [
        {
          type: "toggle",
          text: "Twinkle",
          topic: "twinkle",
          icon: mdi("power")
        }
      ]
    },
    fan: {
      name: "Ventilator",
      position: [530, 440],
      icon: mdi("fan"),
      iconColor: ({fan}) => fan == "on" ? hex("#00FF00") : hex("#000000"),
      ui: [
        {
          type: "toggle",
          text: "Ventilator",
          topic: "fan",
          icon: mdi("power")
        }
      ]
    },
    cashdesk: {
      name: "Cashdesk",
      position: [510, 467],
      icon: mdi("coin"),
      ui: [
        {
          type: "link",
          link: "http://cashdesk.rzl:8081/",
          text: "Open Cashdesk",
          icon: mdi("open-in-new")
        }
      ]
    },
    videogames: {
      name: "Videospiele",
      position: [100, 100],
      icon: mdi("gamepad-variant"),
      iconColor: ({videogames}) => videogames == "on" ? hex("#00FF00") : hex("#000000"),
      ui: [
        {
          type: "toggle",
          text: "Videospiele",
          topic: "videogames",
          icon: mdi("power")
        }
      ]
    },
    olymp_pc: {
      name: "Rechner",
      position: [297, 90],
      icon: mdi("desktop-classic"),
      iconColor: ({olymp_pc}) => olymp_pc == "on" ? hex("#00FF00") : hex("#000000"),
      ui: [
        {
          type: "toggle",
          text: "Rechner",
          topic: "olymp_pc",
          icon: mdi("power")
        }
      ]
    },
    olymp_printer: {
      name: "Drucker",
      position: [335, 90],
      icon: mdi("printer"),
      iconColor: tasmota.icon_color("olymp_printer"),
      ui: [
        {
          type: "toggle",
          text: "Drucker",
          topic: "olymp_printer",
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
    flyfry: {
      name: "Fliegenbratgerät",
      position: [450, 570],
      icon: mdi("fire"),
      iconColor: ({flyfry}) => flyfry == "on" ? hex("#6666FF") : hex("#000000"),
      ui: esper_statistics("flyfry", [
        {
          type: "toggle",
          text: "Fliegenbratgerät",
          topic: "flyfry",
          icon: mdi("power")
        }
      ])
    },
    projector: {
      name: "Beamer",
      position: [380, 590],
      icon: mdi("projector flip-v"),
      iconColor: ({projector}) =>
        ({
          transient_on: hex("#b3b300"),
          transient_off: hex("#b3b300"),
          on: hex("#00ff00"),
          off: hex("#000000"),
          unknown: hex("#888888"),
        })[projector],
      ui: [
        {
          type: "toggle",
          text: "Beamer",
          topic: "projector",
          toggled: val => val == "transient_on" || val == "on",
          icon: mdi("power")
        }
      ]
    },
    rundumleuchte: {
      name: "Rundumleuchte",
      position: [310,275],
      icon: mdi("alarm-light"),
      iconColor: ({rundumleuchte}) => rundumleuchte == "on" ? hex("#F0DF10") : hex("#000000"),
      ui: [
        {
          type: "toggle",
          text: "Rundumleuchte",
          topic: "rundumleuchte",
          icon: mdi("power")
        }
      ]
    },
    loetarbeitsplatz4: {
      name: "Lötarbeitsplatz",
      position: [205, 455],
      icon: mdi("eyedropper-variant"),
      iconColor: ({loetarbeitsplatz4}) => loetarbeitsplatz4 == "on" ? hex("#FF0000") : hex("#000000"),
      ui: [
        {
          type: "text",
          text: "Status",
          topic: "loetarbeitsplatz4",
          icon: mdi("eyedropper-variant")
        }
      ]
    },
    loetarbeitsplatz5: {
      name: "Lötarbeitsplatz",
      position: [205, 405],
      icon: mdi("eyedropper-variant"),
      iconColor: ({loetarbeitsplatz5}) => loetarbeitsplatz5 == "on" ? hex("#FF0000") : hex("#000000"),
      ui: [
        {
          type: "text",
          text: "Status",
          topic: "loetarbeitsplatz5",
          icon: mdi("eyedropper-variant")
        }
      ]
    },
    alarm: {
      name: "Alarm",
      position: [340, 250],
      icon: mdi("alarm-bell"),
      iconColor: () => hex("#000000"),
      ui: esper_statistics("alarm")
    },
    door: {
      name: "Tür",
      position: [455,350],
      icon: mdi("swap-vertical"),
      iconColor: ({door_status}) => door_status == "on" ? hex("#00FF00") : hex("#FF0000"),
      ui: [
        {
          type: "link",
          link: "http://s.rzl.so",
          text: "Open Status Page",
          icon: mdi("open-in-new")
        },
        {
          type: "text",
          text: "Anwesend",
          topic: "presence_status",
          icon: mdi("account")
        },
        {
          type: "text",
          text: "Devices",
          topic: "devices_status",
          icon: mdi("wifi")
        }

      ]
    },
    infoscreen: {
      name: "Infoscreen",
      position: [255, 495],
      icon: mdi("television-guide flip-v"),
      iconColor: tasmota.icon_color("infoscreen", hex("#4444FF")),
      ui: [
        {
          type: "toggle",
          text: "Infoscreen",
          topic: "infoscreen",
          icon: mdi("power")
        },
        {
          type: "link",
          link: "http://cashdesk.rzl:3030/rzl",
          text: "Open Infoscreen",
          icon: mdi("open-in-new")
        }
      ]
    },
    printer_3d: {
      name: "Ultimaker 3",
      position: [754, 560],
      icon: mdi("printer-3d"),
      iconColor: ({printer_3d_status}) => 
        ({
          awaiting_interaction: hex("#b3b300"),
          printing: hex("#00ff00"),
          idle: hex("#000000"),
          unavailable: hex("#888888"),
          error: hex("#ff0000")
        })[printer_3d_status],
      ui: [
        {
          type: "link",
          link: "http://ultimaker.rzl/",
          text: "Open Webinterface",
          icon: mdi("open-in-new")
        },
        {
          type: "section",
          text: "Current Job"
        },
        {
          type: "progress",
          icon: mdi("rotate-right"),
          min: 0,
          max: 1,
          text: "Printing Progress",
          topic: "printer_3d_progress"
        }
      ]
    },
    partkeepr: {
      name: "Partkeepr",
      position: [48, 450],
      icon: mdi("chip"),
      ui: [
        {
          type: "link",
          link: "http://partkeepr.rzl/",
          text: "Open Partkeepr",
          icon: mdi("open-in-new")
        }
      ]
    },
    kitchen_light: {
      name: "Deckenlicht Küche",
      position: [325, 407],
      icon: mdi("ceiling-light"),
      ui: [
        {
          type: "toggle",
          on: "50",
          off: "0",
          toggled: n => parseInt(n) > 0,
          topic: "kitchen_light_brightness",
          text: "Ein/Ausschalten",
          icon: mdi("power")
        },
        {
          type: "slider",
          min: 0,
          max: 100,
          text: "Helligkeit",
          icon: mdi("brightness-7"),
          topic: "kitchen_light_brightness"
        },
        {
          type: "slider",
          min: 0,
          max: 100,
          text: "Farbtemperatur",
          icon: mdi("weather-sunset-down"),
          topic: "kitchen_light_color"
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
          icon: mdi("brightness-7"),
          topic: floalt.brightness("65537")
        },
        {
          type: "slider",
          min: 0,
          max: 100,
          text: "Farbtemperatur",
          icon: mdi("weather-sunset-down"),
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
          icon: mdi("brightness-7"),
          topic: floalt.brightness("65538")
        },
        {
          type: "slider",
          min: 0,
          max: 100,
          text: "Farbtemperatur",
          icon: mdi("weather-sunset-down"),
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
          icon: mdi("brightness-7"),
          topic: floalt.brightness("65539")
        },
        {
          type: "slider",
          min: 0,
          max: 100,
          text: "Farbtemperatur",
          icon: mdi("weather-sunset-down"),
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
          icon: mdi("brightness-7"),
          topic: floalt.brightness("65540")
        },
        {
          type: "slider",
          min: 0,
          max: 100,
          text: "Farbtemperatur",
          icon: mdi("weather-sunset-down"),
          topic: floalt.color("65540")
        }
      ]
    },
    kitchen_sink_light: {
      name: "Licht Spüle",
      position: [300, 345],
      icon: mdi("wall-sconce-flat"),
      ui: [
        {
          type: "toggle",
          on: "50",
          off: "0",
          toggled: n => parseInt(n) > 0,
          topic: "kitchen_sink_light_brightness",
          text: "Ein/Ausschalten",
          icon: mdi("power")
        },
        {
          type: "slider",
          min: 0,
          max: 100,
          text: "Helligkeit",
          icon: mdi("brightness-7"),
          topic: "kitchen_sink_light_brightness"
        }
      ]
    },
    kitchen_counter_light: {
      name: "Deckenlicht Theke",
      position: [400, 440],
      icon: mdi("ceiling-light"),
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
          icon: mdi("brightness-7"),
          topic: floalt.brightness("65544")
        },
        {
          type: "slider",
          min: 0,
          max: 100,
          text: "Farbtemperatur",
          icon: mdi("weather-sunset-down"),
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
          icon: mdi("brightness-7"),
          topic: floalt.brightness("65543")
        },
        {
          type: "slider",
          min: 0,
          max: 100,
          text: "Farbtemperatur",
          icon: mdi("weather-sunset-down"),
          topic: floalt.color("65543")
        }
      ]
    },
    remotes: {
      name: "Fernbedinungen",
      position: [400, 344],
      icon: mdi("light-switch"),
      iconColor: (state) => //if any remote is low make icon red
        ["65536", "65542", "65546", "65547"].some(
          x => state[tradfri_remote.low(x)] == "true") ? hex("#ff0000") : hex("#000000"),
      ui: [
        {
          type: "progress",
          icon: mdiBattery(tradfri_remote.level("65536")),
          min: 0,
          max: 100,
          text: "Licht Tisch 1",
          topic: tradfri_remote.level("65536")
        },
        {
          type: "progress",
          icon: mdiBattery(tradfri_remote.level("65547")),
          min: 0,
          max: 100,
          text: "Licht Tisch 2",
          topic: tradfri_remote.level("65547")
        },
        {
          type: "progress",
          icon: mdiBattery(tradfri_remote.level("65542")),
          min: 0,
          max: 100,
          text: "Licht Theke 1",
          topic: tradfri_remote.level("65542")
        },
        {
          type: "progress",
          icon: mdiBattery(tradfri_remote.level("65546")),
          min: 0,
          max: 100,
          text: "Licht Theke 2",
          topic: tradfri_remote.level("65546")
        }
      ]
    }
  },
  layers: [
    {
      image: require("./assets/layers/rooms.svg"),
      baseLayer: true,
      name: "RaumZeitLabor",
      defaultVisibility: "visible",
      opacity: 0.7,
      bounds: {
        topLeft: [0, 0],
        bottomRight: [1000, 700]
      }
    },
    {
      image: require("./assets/layers/details.svg"),
      name: "Details",
      defaultVisibility: "visible",
      opacity: 0.4,
      bounds: {
        topLeft: [0, 0],
        bottomRight: [1000, 700]
      }
    },
    {
      image: require("./assets/layers/labels.svg"),
      name: "Labels",
      defaultVisibility: "hidden",
      opacity: 0.8,
      bounds: {
        topLeft: [0, 0],
        bottomRight: [1000, 700]
      }
    }
  ]
};

window.config = config;
