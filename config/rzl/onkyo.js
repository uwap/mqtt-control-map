// @flow
import type { Topics, Controls } from "config/flowtypes";
import { mdi } from "config/icon";
import { hex } from "config/colors";
import * as types from "config/types";

export const topics: Topics = {
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
    defaultValue: "unknown"
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
  }
};

export const controls: Controls = {
  onkyo: {
    name: "Onkyo",
    position: [350, 650],
    iconColor: ({onkyo_connection, onkyo_power}) =>
      (onkyo_connection !== "connected" ? hex("#888888") :
        (onkyo_power === "on" ? hex("#00FF00") : hex("#000000"))),
    icon: mdi("audio-video"),
    ui: [
      {
        type: "toggle",
        text: "Power",
        icon: mdi("power"),
        topic: "onkyo_power",
        enableCondition: (state) => state.onkyo_connection === "connected"
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
        enableCondition: (state) => state.onkyo_connection === "connected"
      },
      {
        type: "toggle",
        text: "Mute",
        topic: "onkyo_mute",
        icon: mdi("volume-off"),
        enableCondition: (state) => state.onkyo_connection === "connected"
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
        enableCondition: (state) => state.onkyo_connection === "connected"
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
        enableCondition: (state) => state.onkyo_connection === "connected"
          && state.onkyo_inputs === "netzwerk"
      },
      {
        type: "section",
        text: "External"
      },
      {
        type: "link",
        link: "http://mpd.rzl/mpd/player/index.php",
        text: "Open MPD Interface",
        icon: mdi("open-in-new")
      }
    ]
  }
};
