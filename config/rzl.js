// @flow
import type { Config } from "config/flowtypes";
import * as types from "config/types";
import { hex, rgb, rgba, rainbow } from "config/colors";
import { mdi, raw_mdi, mdi_battery } from "config/icon";
import { esper_topics, esper_statistics, floalt, tradfri_remote } from "./utils";

const config : Config = {
  space: {
    name: "RZL",
    color: "orange",
    mqtt: "ws://map.rzl.so:1884"
  },
  topics: [
    {
      led_stahltraeger: {
        state: "/service/openhab/out/pca301_ledstrips/state",
        command: "/service/openhab/in/pca301_ledstrips/command",
        defaultValue: "OFF",
        values: { on: "ON", off: "OFF" }
      },
      snackbar: {
        state: "/service/openhab/out/pca301_snackbar/state",
        command: "/service/openhab/in/pca301_snackbar/command",
        defaultValue: "OFF",
        values: { on: "ON", off: "OFF" }
      },
      twinkle: {
        state: "/service/openhab/out/pca301_twinkle/state",
        command: "/service/openhab/in/pca301_twinkle/command",
        defaultValue: "OFF",
        values: { on: "ON", off: "OFF" }
      },
      fan: {
        state: "/service/openhab/out/pca301_fan/state",
        command: "/service/openhab/in/pca301_fan/command",
        defaultValue: "OFF",
        values: { on: "ON", off: "OFF" }
      },
      videogames: {
        state: "/service/openhab/out/pca301_videogames/state",
        command: "/service/openhab/in/pca301_videogames/command",
        defaultValue: "OFF",
        values: { on: "ON", off: "OFF" }
      },
      olymp_pc: {
        state: "/service/openhab/out/pca301_olymp_pc/state",
        command: "/service/openhab/in/pca301_olymp_pc/command",
        defaultValue: "OFF",
        values: { on: "ON", off: "OFF" }
      },
      olymp_printer: {
        state: "stat/sonoff2/POWER",
        command: "cmnd/sonoff2/power",
        defaultValue: "OFF",
        values: { on: "ON", off: "OFF" }
      },
      flyfry: {
        state: "/service/openhab/out/wifi_flyfry/state",
        command: "/service/openhab/in/wifi_flyfry/command",
        defaultValue: "OFF",
        values: { on: "ON", off: "OFF" }
      },
      artnet: {
        state: "/artnet/state",
        command: "/artnet/push",
        defaultValue: "blackout",
        values: { off: "blackout", yellow: "yellow", purple: "purple",
                  blue: "blue", green: "green", red: "red", random: "random",
                  cycle: "cycle-random" }
      },
      onkyo_connection: {
        state: "/service/onkyo/connected",
        command: "",
        defaultValue: "0",
        values: { disconnected: "0", connecting: "1", connected: "2" },
      },
      onkyo_power: {
        state: "/service/onkyo/status/system-power",
        command: "/service/onkyo/command",
        defaultValue: "PWR00",
        values: { off: "PWR00", on: "PWR01" },
        type: types.json("onkyo_raw")
      },
      onkyo_mute: {
        state: "/service/onkyo/status/audio-muting",
        command: "/service/onkyo/command",
        defaultValue: "AMT00",
        values: { off: "AMT00", on: "AMT01" },
        type: types.json("onkyo_raw")
      },
      onkyo_volume: {
        state: "/service/onkyo/status/volume",
        command: "/service/onkyo/set/volume",
        defaultValue: 0,
        values: {},
        type: types.json("val")
      },
      onkyo_inputs: {
        state: "/service/onkyo/status/input-selector",
        command: "/service/onkyo/command",
        defaultValue: "SLI00",
        values: { tisch: "SLI11", chromecast: "SLI01", pult: "SLI10", netzwerk: "SLI2B", front: "SLI03" },
        type: types.json("onkyo_raw")
      },
      onkyo_radios: {
        state: "/service/onkyo/status/latest-NPR",
        command: "/service/onkyo/command",
        defaultValue: "",
        values: { mpd: "NPR01", kohina: "NPR02", somafm_dronezone: "NPR03", somafm_thetrip: "NPR04",
                  querfunk: "NPR05", somafm_defconradio: "NPR06", somafm_secretagent: "NPR07", somafm_lush: "NPR08",
                  somafm_beatblender: "NPR09", ponyville: "NPR0a"}
      },
      rundumleuchte: {
        state: "/service/openhab/out/pca301_rundumleuchte/state",
        command: "/service/openhab/in/pca301_rundumleuchte/command",
        defaultValue: "OFF",
        values: { on: "ON", off: "OFF" }
      },
      door_status: {
        state: "/service/status",
        command: "",
        defaultValue: "\"closed\"",
        values: { on: "\"open\"", off: "\"closed\"" }
      },
      presence_status: {
        state: "service/status/presence",
        command: "",
        defaultValue: "",
        values: {},
        type: msg => JSON.parse(msg.toString()).join(", ")
      },
      devices_status: {
        state: "/service/status/devices",
        command: "",
        defaultValue: "",
        values: {},
        type: types.string
      },
      infoscreen: {
        state: "/service/openhab/out/pca301_infoscreen/state",
        command: "/service/openhab/in/pca301_infoscreen/command",
        defaultValue: "OFF",
        values: { on: "ON", off: "OFF" }
      },
      printer_3d_status: {
        state: "/service/ultimaker/state",
        command: "",
        defaultValue: "unavailable",
        values: {},
        type: msg => {
          switch (msg.toString()) {
            case "unreachable":
            case "booting":
              return "unavailable"

            case "pausing":
            case "paused":
            case "resuming":
            case "wait_cleanup":
            case "maintenance":
              return "awaiting_interaction"

            case "pre_print":
            case "post_print":
            case "printing":
              return "printing"

            default:
              return msg.toString()
          }
        }
      },
      printer_3d_progress: {
        state: "/service/ultimaker/job",
        command: "",
        defaultValue: "",
        values: {},
        type: msg => JSON.parse(msg.toString()).progress || 0
      },
      kitchen_light_color: {
        state: "/service/openhab/out/kitchen_light_all_color_temperature/state",
        command: "/service/openhab/in/kitchen_light_all_color_temperature/command",
        defaultValue: "0",
        values: {}
      },
      kitchen_light_brightness: {
        state: "/service/openhab/out/kitchen_light_all_brightness/state",
        command: "/service/openhab/in/kitchen_light_all_brightness/command",
        defaultValue: "0",
        values: {}
      },
      kitchen_sink_light_brightness: {
        state: "/service/openhab/out/tradfri_0100_gwb8d7af2b448f_65545_brightness/state",
        command: "/service/openhab/in/tradfri_0100_gwb8d7af2b448f_65545_brightness/command",
        defaultValue: "0",
        values: {}
      }
    },
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
    esper_topics("afba45", "alarm")
  ],
  controls: {
    led_stahltrager: {
      name: "LED Stahlträger",
      position: [380, 590],
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
    snackbar: {
      name: "Snackbar",
      position: [510, 500],
      icon: mdi("fridge"),
      iconColor: ({snackbar}) => snackbar == "on" ? hex("#E20074") : hex("#000000"),
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
        twinkle == "on" ? raw_mdi("led-on flip-v") : raw_mdi("led-off flip-v"),
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
      position: [520, 450],
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
      position: [500, 470],
      icon: mdi("coin"),
      ui: [
        {
          type: "link",
          link: "http://cashdesk.rzl:8081/",
          text: "Open Cashdesk"
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
      iconColor: ({olymp_printer}) => olymp_printer == "on" ? hex("#00FF00") : hex("#000000"),
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
          text: "Open Annette"
        }
      ]
    },
    flyfry: {
      name: "Fliegenbratgerät",
      position: [450, 590],
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
    artnet: {
      name: "Artnet",
      position: [535,480],
      icon: mdi("spotlight"),
      iconColor: ({artnet}) => 
        ({
          off: hex("#000000"),
          yellow: hex("#F0DF10"),
          red: hex("#FF0000"),
          purple: hex("#FF00FF"),
          green: hex("#00FF00"),
          cycle: rainbow
        })[artnet],
      ui: [
        {
          type: "toggle",
          text: "An/Aus",
          topic: "artnet",
          on: "cycle",
          toggled: val => val != "off",
          icon: mdi("power")
        },
        {
          type: "dropDown",
          text: "Farbe",
          topic: "artnet",
          options: {
            yellow: "Gelb",
            red: "Rot",
            purple: "Pink",
            green: "Grün",
            cycle: "Farbwechsel"
          },
          enableCondition: val => val != "off",
          icon: mdi("palette")
        }
      ]
    },
    onkyo: {
      name: "Onkyo",
      position: [350, 650],
      iconColor: ({onkyo_connection, onkyo_power}) =>
        onkyo_connection != "connected" ? hex("#888888") : (onkyo_power == "on" ? hex("#00FF00") : hex("#000000")),
      icon: mdi("audio-video"),
      ui: [
        {
          type: "toggle",
          text: "Power",
          icon: mdi("power"),
          topic: "onkyo_power",
          enableCondition: (a, b, state) => state.onkyo_connection.internal == "connected"
        },
        {
          type: "section",
          text: "Lautstärkeregelung"
        },
        {
          type: "slider",
          text: "Volume",
          topic: "onkyo_volume",
          min: 0,
          max: 50,
          icon: mdi("volume-high"),
          enableCondition: (a, b, state) => state.onkyo_connection.internal == "connected"
        },
        {
          type: "toggle",
          text: "Mute",
          topic: "onkyo_mute",
          icon: mdi("volume-off"),
          enableCondition: (a, b, state) => state.onkyo_connection.internal == "connected"
        },
        {
          type: "section",
          text: "Eingänge"
        },
        {
          type: "dropDown",
          text: "Eingang",
          topic: "onkyo_inputs",
          options: {
            netzwerk: "Netzwerk",
            tisch: "Tisch",
            chromecast: "Chromecast",
            pult: "Pult",
            front: "Front HDMI"
          },
          icon: mdi("usb"),
          enableCondition: (a, b, state) => state.onkyo_connection.internal == "connected"
        },
        {
          type: "dropDown",
          text: "Netzwerksender",
          topic: "onkyo_radios",
          options: {
            mpd: "MPD",
            kohina: "Kohina",
            somafm_dronezone: "Drone Zone (SomaFM)",
            somafm_thetrip: "The Trip (SomaFM)",
            querfunk: "Querfunk",
            somafm_defconradio: "Defcon Radio (SomaFM)",
            somafm_secretagent: "Secret Agent (SomaFM)",
            somafm_lush: "Lush (SomaFM)",
            somafm_beatblender: "Beat Blender (Soma FM)",
            ponyville: "Ponyville FM"
          },
          icon: mdi("radio"),
          enableCondition: (a, b, state) => state.onkyo_connection.internal == "connected" && state.onkyo_inputs.internal == "netzwerk"
        },
        {
          type: "section",
          text: "External"
        },
        {
          type: "link",
          link: "http://mpd.rzl/mpd/player/index.php",
          text: "Open MPD Interface"
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
          text: "Open Status Page"
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
      iconColor: ({infoscreen}) => infoscreen == "on" ? hex("#4444FF") : hex("#000000"),
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
          text: "Open Infoscreen"
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
          text: "Open Webinterface"
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
          text: "Open Partkeepr"
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
          on: 50,
          off: 0,
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
          topic: "kitchen_light_brightness",
          delayedApply: true
        },
        {
          type: "slider",
          min: 0,
          max: 100,
          text: "Farbtemperatur",
          icon: mdi("weather-sunset-down"),
          topic: "kitchen_light_color",
          delayedApply: true
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
          topic: floalt.brightness("65537"),
          delayedApply: true
        },
        {
          type: "slider",
          min: 0,
          max: 100,
          text: "Farbtemperatur",
          icon: mdi("weather-sunset-down"),
          topic: floalt.color("65537"),
          delayedApply: true
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
          topic: floalt.brightness("65538"),
          delayedApply: true
        },
        {
          type: "slider",
          min: 0,
          max: 100,
          text: "Farbtemperatur",
          icon: mdi("weather-sunset-down"),
          topic: floalt.color("65538"),
          delayedApply: true
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
          topic: floalt.brightness("65539"),
          delayedApply: true
        },
        {
          type: "slider",
          min: 0,
          max: 100,
          text: "Farbtemperatur",
          icon: mdi("weather-sunset-down"),
          topic: floalt.color("65539"),
          delayedApply: true
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
          topic: floalt.brightness("65540"),
          delayedApply: true
        },
        {
          type: "slider",
          min: 0,
          max: 100,
          text: "Farbtemperatur",
          icon: mdi("weather-sunset-down"),
          topic: floalt.color("65540"),
          delayedApply: true
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
          on: 50,
          off: 0,
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
          topic: "kitchen_sink_light_brightness",
          delayedApply: true
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
          topic: floalt.brightness("65544"),
          delayedApply: true
        },
        {
          type: "slider",
          min: 0,
          max: 100,
          text: "Farbtemperatur",
          icon: mdi("weather-sunset-down"),
          topic: floalt.color("65544"),
          delayedApply: true
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
          topic: floalt.brightness("65543"),
          delayedApply: true
        },
        {
          type: "slider",
          min: 0,
          max: 100,
          text: "Farbtemperatur",
          icon: mdi("weather-sunset-down"),
          topic: floalt.color("65543"),
          delayedApply: true
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
          icon: mdi_battery(tradfri_remote.level("65536")),
          min: 0,
          max: 100,
          text: "Licht Tisch 1",
          topic: tradfri_remote.level("65536")
        },
        {
          type: "progress",
          icon: mdi_battery(tradfri_remote.level("65547")),
          min: 0,
          max: 100,
          text: "Licht Tisch 2",
          topic: tradfri_remote.level("65547")
        },
        {
          type: "progress",
          icon: mdi_battery(tradfri_remote.level("65542")),
          min: 0,
          max: 100,
          text: "Licht Theke 1",
          topic: tradfri_remote.level("65542")
        },
        {
          type: "progress",
          icon: mdi_battery(tradfri_remote.level("65546")),
          min: 0,
          max: 100,
          text: "Licht Theke 2",
          topic: tradfri_remote.level("65546")
        }
      ]
    },
  },
  layers: [
    {
      image: require("../img/layers/rzl/rooms.svg"),
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
      image: require("../img/layers/rzl/details.svg"),
      name: "Details",
      defaultVisibility: "visible",
      opacity: 0.4,
      bounds: {
        topLeft: [0, 0],
        bottomRight: [1000, 700]
      }
    },
    {
      image: require("../img/layers/rzl/labels.svg"),
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
