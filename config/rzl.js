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
      snackbar: {
        state: {
          name: "/service/openhab/out/pca301_snackbar/state",
          type: types.option({ ON: "on", OFF: "off" })
        },
        command: {
          name: "/service/openhab/in/pca301_snackbar/command",
          type: types.option({ on: "ON", off: "OFF" })
        },
        defaultValue: "off",
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
      olymp_printer: {
        state: {
          name: "stat/sonoff2/POWER",
          type: types.option({ ON: "on", OFF: "off" })
        },
        command: {
          name: "cmnd/sonoff2/power",
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
      onkyo_connection: {
        state: {
          name: "/service/onkyo/connected",
          type: types.option({
            "0": "disconnected",
            "1": "connecting",
            "2": "connected"
          })
        },
        defaultValue: "disconnected"
      },
      onkyo_power: {
        state: {
          name: "/service/onkyo/status/system-power",
          type: types.json("onkyo_raw", types.option({
            PWR00: "off",
            PWR01: "on"
          }))
        },
        command: {
          name: "/service/onkyo/command",
          type: types.option({ off: "PWR00", on: "PWR01" })
        },
        defaultValue: "off"
      },
      onkyo_mute: {
        state: {
          name: "/service/onkyo/status/audio-muting",
          type: types.json("onkyo_raw", types.option({
            AMT00: "off",
            AMT01: "on"
          }))
        },
        command: {
          name: "/service/onkyo/command",
          type: types.option({ off: "AMT00", on: "AMT01" })
        },
        defaultValue: "off"
      },
      onkyo_volume: {
        state: {
          name: "/service/onkyo/status/volume",
          type: types.json("val")
        },
        command: {
          name: "/service/onkyo/set/volume",
          type: types.string
        },
        defaultValue: "0"
      },
      onkyo_inputs: {
        state: {
          name: "/service/onkyo/status/input-selector",
          type: types.json("onkyo_raw", types.option({
            SLI11: "tisch",
            SLI01: "chromecast",
            SLI10: "pult",
            SLI2B: "netzwerk",
            SLI03: "front",
            otherwise: "unknown"
          }))
        },
        command: {
          name: "/service/onkyo/command",
          type: types.option({
            tisch: "SLI11",
            chromecast: "SLI01",
            pult: "SLI10",
            netzwerk: "SLI2B",
            front: "SLI03",
            unknown: "SLI00"
          })
        },
        defaultValue: "unknown",
      },
      onkyo_radios: {
        state: {
          name: "/service/onkyo/status/latest-NPR",
          type: types.option({
            NPR01: "mpd",
            NPR02: "kohina",
            NPR03: "somafm_dronezone",
            NPR04: "somafm_thetrip",
            NPR05: "querfunk",
            NPR06: "somafm_defconradio",
            NPR07: "somafm_secretagent",
            NPR08: "somafm_lush",
            NPR09: "somafm_beatblender",
            NPR0a: "ponyville",
            otherwise: "unknown"
          })
        },
        command: {
          name: "/service/onkyo/command",
          type: types.option({
            mpd: "NPR01",
            kohina: "NPR02",
            somafm_dronezone: "NPR03",
            somafm_thetrip: "NPR04",
            querfunk: "NPR05",
            somafm_defconradio: "NPR06",
            somafm_secretagent: "NPR07",
            somafm_lush: "NPR08",
            somafm_beatblender: "NPR09",
            ponyville: "NPR0a",
            otherwise: "NPR00"
          })
        },
        defaultValue: "unknown"
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
      infoscreen: {
        state: {
          name: "/service/openhab/out/pca301_infoscreen/state",
          type: types.option({ ON: "on", OFF: "off" })
        },
        command: {
          name: "/service/openhab/in/pca301_infoscreen/command",
          type: types.option({ on: "ON", off: "OFF" })
        },
        defaultValue: "off"
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
    projector: {
      name: "Beamer",
      position: [415, 590],
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
          enableCondition: ({ onkyo_connection }) => onkyo_connection == "connected"
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
          enableCondition: ({ onkyo_connection }) => onkyo_connection == "connected"
        },
        {
          type: "toggle",
          text: "Mute",
          topic: "onkyo_mute",
          icon: mdi("volume-off"),
          enableCondition: ({ onkyo_connection }) => onkyo_connection == "connected"
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
          enableCondition: ({ onkyo_connection }) => onkyo_connection == "connected"
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
          enableCondition: (state) => state.onkyo_connection == "connected" && state.onkyo_inputs == "netzwerk"
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
    loetarbeitsplatz4: {
      name: "Lötarbeitsplatz",
      position: [205, 455],
      icon: "eyedropper-variant",
      iconColor: ({loetarbeitsplatz4}) => loetarbeitsplatz4 == "on" ? hex("#FF0000") : hex("#000000"),
      ui: [
        {
          type: "text",
          text: "Status",
          topic: "loetarbeitsplatz4",
          icon: "eyedropper-variant"
        }
      ]
    },
    loetarbeitsplatz5: {
      name: "Lötarbeitsplatz",
      position: [205, 405],
      icon: "eyedropper-variant",
      iconColor: ({loetarbeitsplatz5}) => loetarbeitsplatz5 == "on" ? hex("#FF0000") : hex("#000000"),
      ui: [
        {
          type: "text",
          text: "Status",
          topic: "loetarbeitsplatz5",
          icon: "eyedropper-variant"
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
