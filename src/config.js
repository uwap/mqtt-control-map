// @flow
const config : Config = {
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
                querfunk: "NPR05", somafm_defconradio: "NPR06", somafm_secretagent: "NPR07", somafm_lush: "NPR08"}
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
      position: [380, 300],
      icon: "wb_incandescent",
      iconColor: state => state.led_stahltraeger == "on" ? "#CCCC00" : "#000000",
      ui: [
        {
          type: "toggle",
          text: "Stahlträger LED",
          topic: "led_stahltraeger",
          icon: "power_settings_new"
        },
      ]
    },
    snackbar: {
      name: "Snackbar",
      position: [510, 500],
      icon: "kitchen",
      iconColor: state => state.snackbar == "on" ? "#E20074" : "#000000",
      ui: [
        {
          type: "toggle",
          text: "Snackbar",
          topic: "snackbar",
          icon: "power_settings_new"
        }
      ]
    },
    twinkle: {
      name: "Twinkle",
      position: [530, 560],
      icon: "wb_incandescent",
      iconColor: state => state.twinkle == "on" ? "#CCCC00" : "#000000",
      ui: [
        {
          type: "toggle",
          text: "Twinkle",
          topic: "twinkle",
          icon: "power_settings_new"
        }
      ]
    },
    fan: {
      name: "Ventilator",
      position: [510, 460],
      icon: "toys",
      iconColor: state => state.fan == "on" ? "#00FF00" : "#000000",
      ui: [
        {
          type: "toggle",
          text: "Ventilator",
          topic: "fan",
          icon: "power_settings_new"
        }
      ]
    },
    videogames: {
      name: "Videospiele",
      position: [100, 100],
      icon: "videogame_asset",
      iconColor: state => state.videogames == "on" ? "#00FF00" : "#000000",
      ui: [
        {
          type: "toggle",
          text: "Videospiele",
          topic: "videogames",
          icon: "power_settings_new"
        }
      ]
    },
    olymp_pc: {
      name: "Rechner und Drucker",
      position: [297, 90],
      icon: "desktop_windows",
      iconColor: state => state.olymp_pc == "on" ? "#00FF00" : "#000000",
      ui: [
        {
          type: "toggle",
          text: "Rechner und Drucker",
          topic: "olymp_pc",
          icon: "power_settings_new"
        }
      ]
    },
    flyfry: {
      name: "Fliegenbratgerät",
      position: [450, 590],
      icon: "whatshot",
      iconColor: state => state.flyfry == "on" ? "#6666FF" : "#000000",
      ui: [
        {
          type: "toggle",
          text: "Fliegenbratgerät",
          topic: "flyfry",
          icon: "power_settings_new"
        }
      ]
    },
    artnet: {
      name: "Artnet",
      position: [535,475],
      icon: "wb_incandescent",
      iconColor: state => 
        ({
          off: "#000000",
          yellow: "#CCCC00",
          red: "#FF0000",
          purple: "#FF00FF",
          green: "#00FF00",
          cycle: "#CCCC00"
        })[state.artnet],
      ui: [
        {
          type: "toggle",
          text: "An/Aus",
          topic: "artnet",
          on: "cycle",
          toggled: val => val != "off",
          icon: "power_settings_new"
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
          icon: "color_lens"
        }
      ]
    },
    onkyo: {
      name: "Onkyo",
      position: [350, 650],
      iconColor: state => state.onkyo_power == "on" ? "#00FF00" : "#000000",
      icon: "volume_up",
      ui: [
        {
          type: "toggle",
          text: "Power",
          icon: "power_settings_new",
          topic: "onkyo_power"
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
          icon: "volume_up"
        },
        {
          type: "toggle",
          text: "Mute",
          topic: "onkyo_mute",
          icon: "volume_off"
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
          icon: "settings_input_component"
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
            somafm_lush: "Lush (SomaFM)"
          },
          icon: "radio",
          enableCondition: (a, b, state) => state.onkyo_inputs == "netzwerk"
        }
      ]
    },
    rundumleuchte: {
      name: "Rundumleuchte",
      position: [310,275],
      icon: "wb_sunny",
      iconColor: state => state.rundumleuchte == "on" ? "#CCCC00" : "#000000",
      ui: [
        {
          type: "toggle",
          text: "Rundumleuchte",
          topic: "rundumleuchte",
          icon: "power_settings_new"
        }
      ]
    },
    door: {
      name: "Tür",
      position: [455,350],
      icon: "swap_vert",
      iconColor: state => state.door_status == "on" ? "#00FF00" : "#FF0000",
      ui: []
    },
    infoscreen: {
      name: "Infoscreen",
      position: [255, 495],
      icon: "developer_board",
      iconColor: state => state.infoscreen == "on" ? "#4444FF" : "#000000",
      ui: [
        {
          type: "toggle",
          text: "Infoscreen",
          topic: "infoscreen",
          icon: "power_settings_new"
        }
      ]
    }
  },
  layers: [
    {
      image: "img/layers/rzl/rooms.png",
      forceVisibility: "on",
      name: "RaumZeitLabor"
    },
    {
      image: "img/layers/rzl/details.png",
      forceVisibility: "on",
      name: "Details"
    },
    {
      image: "img/layers/rzl/labels.png",
      forceVisibility: "on",
      name: "Labels"
    }
  ]
};

export default config;
