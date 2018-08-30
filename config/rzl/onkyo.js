// @flow
import type { Topics, Controls } from "config/flowtypes";
import { mdi } from "config/icon";
import { hex } from "config/colors";
import * as types from "config/types";

export const topics: Topics = {
  onkyoConnection: {
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
  onkyoPower: {
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
  onkyoMute: {
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
  onkyoVolume: {
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
  onkyoInputs: {
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
  onkyoRadios: {
    state: {
      name: "/service/onkyo/status/latest-NPR",
      type: types.option({
        NPR01: "mpd",
        NPR02: "kohina",
        NPR03: "somafmDronezone",
        NPR04: "somafmThetrip",
        NPR05: "querfunk",
        NPR06: "somafmDefconradio",
        NPR07: "somafmSecretagent",
        NPR08: "somafmLush",
        NPR09: "somafmBeatblender",
        NPR0a: "ponyville",
        otherwise: "unknown"
      })
    },
    command: {
      name: "/service/onkyo/command",
      type: types.option({
        mpd: "NPR01",
        kohina: "NPR02",
        somafmDronezone: "NPR03",
        somafmThetrip: "NPR04",
        querfunk: "NPR05",
        somafmDefconradio: "NPR06",
        somafmSecretagent: "NPR07",
        somafmLush: "NPR08",
        somafmBeatblender: "NPR09",
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
    iconColor: ({onkyoConnection, onkyoPower}) =>
      (onkyoConnection !== "connected" ? hex("#888888") :
        (onkyoPower === "on" ? hex("#00FF00") : hex("#000000"))),
    icon: mdi("audio-video"),
    ui: [
      {
        type: "toggle",
        text: "Power",
        icon: mdi("power"),
        topic: "onkyoPower",
        enableCondition: (state) => state.onkyoConnection === "connected"
      },
      {
        type: "section",
        text: "Lautstärkeregelung"
      },
      {
        type: "slider",
        text: "Volume",
        topic: "onkyoVolume",
        min: 0,
        max: 50,
        icon: mdi("volume-high"),
        enableCondition: (state) => state.onkyoConnection === "connected"
      },
      {
        type: "toggle",
        text: "Mute",
        topic: "onkyoMute",
        icon: mdi("volume-off"),
        enableCondition: (state) => state.onkyoConnection === "connected"
      },
      {
        type: "section",
        text: "Eingänge"
      },
      {
        type: "dropDown",
        text: "Eingang",
        topic: "onkyoInputs",
        options: {
          netzwerk: "Netzwerk",
          tisch: "Tisch",
          chromecast: "Chromecast",
          pult: "Pult",
          front: "Front HDMI"
        },
        icon: mdi("usb"),
        enableCondition: (state) => state.onkyoConnection === "connected"
      },
      {
        type: "dropDown",
        text: "Netzwerksender",
        topic: "onkyoRadios",
        options: {
          mpd: "MPD",
          kohina: "Kohina",
          somafmDronezone: "Drone Zone (SomaFM)",
          somafmThetrip: "The Trip (SomaFM)",
          querfunk: "Querfunk",
          somafmDefconradio: "Defcon Radio (SomaFM)",
          somafmSecretagent: "Secret Agent (SomaFM)",
          somafmLush: "Lush (SomaFM)",
          somafmBeatblender: "Beat Blender (Soma FM)",
          ponyville: "Ponyville FM"
        },
        icon: mdi("radio"),
        enableCondition: (state) => state.onkyoConnection === "connected"
          && state.onkyoInputs === "netzwerk"
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
