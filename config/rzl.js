// @flow
import * as utils from './utils';

const config : Config = {
  space: {
    name: "RZL",
    color: "orange",
    mqtt: "ws://map.rzl:1884"
  },
  topics: {
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
      parseState: msg => JSON.parse(msg.toString()).onkyo_raw
    },
    onkyo_mute: {
      state: "/service/onkyo/status/audio-muting",
      command: "/service/onkyo/command",
      defaultValue: "AMT00",
      values: { off: "AMT00", on: "AMT01" },
      parseState: msg => JSON.parse(msg.toString()).onkyo_raw
    },
    onkyo_volume: {
      state: "/service/onkyo/status/volume",
      command: "/service/onkyo/set/volume",
      defaultValue: 0,
      values: {},
      parseState: msg => JSON.parse(msg.toString()).val
    },
    onkyo_inputs: {
      state: "/service/onkyo/status/input-selector",
      command: "/service/onkyo/command",
      defaultValue: "SLI00",
      values: { tisch: "SLI11", chromecast: "SLI01", pult: "SLI10", netzwerk: "SLI2B" },
      parseState: msg => JSON.parse(msg.toString()).onkyo_raw
    },
    onkyo_radios: {
      state: "/service/onkyo/status/latest-NPR",
      command: "/service/onkyo/command",
      defaultValue: "",
      values: { mpd: "NPR01", kohina: "NPR02", somafm_dronezone: "NPR03", somafm_thetrip: "NPR04",
                querfunk: "NPR05", somafm_defconradio: "NPR06", somafm_secretagent: "NPR07", somafm_lush: "NPR08",
                somafm_beatblender: "NPR09"}
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
    infoscreen: {
      state: "/service/openhab/out/pca301_infoscreen/state",
      command: "/service/openhab/in/pca301_infoscreen/command",
      defaultValue: "OFF",
      values: { on: "ON", off: "OFF" }
    }
  },
  controls: {
    led_stahltrager: {
      name: "LED Stahlträger",
      position: [380, 590],
      icon: "white-balance-iridescent",
      iconColor: ({led_stahltraeger}) => led_stahltraeger == "on" ? utils.rainbow : "#000000",
      ui: [
        {
          type: "toggle",
          text: "Stahlträger LED",
          topic: "led_stahltraeger",
          icon: "power"
        },
      ]
    },
    snackbar: {
      name: "Snackbar",
      position: [510, 500],
      icon: "fridge",
      iconColor: ({snackbar}) => snackbar == "on" ? "#E20074" : "#000000",
      ui: [
        {
          type: "toggle",
          text: "Snackbar",
          topic: "snackbar",
          icon: "power"
        }
      ]
    },
    twinkle: {
      name: "Twinkle",
      position: [530, 560],
      icon: ({twinkle}) => twinkle == "on" ? "led-on flip-v" : "led-off flip-v",
      iconColor: ({twinkle}) => twinkle == "on" ? utils.rainbow : "#000000",
      ui: [
        {
          type: "toggle",
          text: "Twinkle",
          topic: "twinkle",
          icon: "power"
        }
      ]
    },
    fan: {
      name: "Ventilator",
      position: [520, 450],
      icon: "fan",
      iconColor: ({fan}) => fan == "on" ? "#00FF00" : "#000000",
      ui: [
        {
          type: "toggle",
          text: "Ventilator",
          topic: "fan",
          icon: "power"
        }
      ]
    },
    cashdesk: {
      name: "Cashdesk",
      position: [500, 470],
      icon: "coin",
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
      icon: "gamepad-variant",
      iconColor: ({videogames}) => videogames == "on" ? "#00FF00" : "#000000",
      ui: [
        {
          type: "toggle",
          text: "Videospiele",
          topic: "videogames",
          icon: "power"
        }
      ]
    },
    olymp_pc: {
      name: "Rechner und Drucker",
      position: [297, 90],
      icon: "desktop-classic",
      iconColor: ({olymp_pc}) => olymp_pc == "on" ? "#00FF00" : "#000000",
      ui: [
        {
          type: "toggle",
          text: "Rechner und Drucker",
          topic: "olymp_pc",
          icon: "power"
        }
      ]
    },
    flyfry: {
      name: "Fliegenbratgerät",
      position: [450, 590],
      icon: "fire",
      iconColor: ({flyfry}) => flyfry == "on" ? "#6666FF" : "#000000",
      ui: [
        {
          type: "toggle",
          text: "Fliegenbratgerät",
          topic: "flyfry",
          icon: "power"
        }
      ]
    },
    artnet: {
      name: "Artnet",
      position: [535,480],
      icon: "spotlight",
      iconColor: ({artnet}) => 
        ({
          off: "#000000",
          yellow: "#F0DF10",
          red: "#FF0000",
          purple: "#FF00FF",
          green: "#00FF00",
          cycle: utils.rainbow
        })[artnet],
      ui: [
        {
          type: "toggle",
          text: "An/Aus",
          topic: "artnet",
          on: "cycle",
          toggled: val => val != "off",
          icon: "power"
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
          icon: "palette"
        }
      ]
    },
    onkyo: {
      name: "Onkyo",
      position: [350, 650],
      iconColor: ({onkyo_connection, onkyo_power}) =>
        onkyo_connection != "connected" ? "#888888" : (onkyo_power == "on" ? "#00FF00" : "#000000"),
      icon: "volume-high",
      ui: [
        {
          type: "toggle",
          text: "Power",
          icon: "power",
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
          icon: "volume-high",
          enableCondition: (a, b, state) => state.onkyo_connection.internal == "connected"
        },
        {
          type: "toggle",
          text: "Mute",
          topic: "onkyo_mute",
          icon: "volume-off",
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
            pult: "Pult"
          },
          icon: "usb",
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
            somafm_beatblender: "Beat Blender (Soma FM)"
          },
          icon: "radio",
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
      icon: "alarm-light",
      iconColor: ({rundumleuchte}) => rundumleuchte == "on" ? "#F0DF10" : "#000000",
      ui: [
        {
          type: "toggle",
          text: "Rundumleuchte",
          topic: "rundumleuchte",
          icon: "power"
        }
      ]
    },
    door: {
      name: "Tür",
      position: [455,350],
      icon: "swap-vertical",
      iconColor: ({door_status}) => door_status == "on" ? "#00FF00" : "#FF0000",
      ui: [
        {
          type: "link",
          link: "http://s.rzl.so",
          text: "Open Status Page"
        }
      ]
    },
    infoscreen: {
      name: "Infoscreen",
      position: [255, 495],
      icon: "television-guide",
      iconColor: ({infoscreen}) => infoscreen == "on" ? "#4444FF" : "#000000",
      ui: [
        {
          type: "toggle",
          text: "Infoscreen",
          topic: "infoscreen",
          icon: "power"
        },
        {
          type: "link",
          link: "http://cashdesk.rzl:3030/rzl",
          text: "Open Infoscreen"
        }
      ]
    },
    partkeepr: {
      name: "Partkeepr",
      position: [48, 450],
      icon: "chip",
      ui: [
        {
          type: "link",
          link: "http://partkeepr.rzl/",
          text: "Open Partkeepr"
        }
      ]
    }
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
      defaultVisibility: "visible",
      bounds: {
        topLeft: [0, 0],
        bottomRight: [1000, 700]
      }
    }
  ]
};

export default config;
