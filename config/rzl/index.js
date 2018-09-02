// @flow
import type { Config } from "config/flowtypes";
import * as types from "config/types";
import { hex, rainbow } from "config/colors";
import { mdi, rawMdi } from "config/icon";
import { esper, tasmota } from "./utils";

import * as onkyo from "./onkyo";
import * as olymp from "./olymp";
import * as kitchen from "./kitchen";

const config: Config = {
  space: {
    name: "RZL",
    color: "orange",
    mqtt: "ws://map.rzl.so:1884"
  },
  topics: [
    {
      ledStahltraeger: {
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
      loetarbeitsplatz4: {
        state: {
          name: "stat/sonoff4/POWER",
          type: types.option({ ON: "on", OFF: "off" })
        },
        defaultValue: "off"
      },
      loetarbeitsplatz5: {
        state: {
          name: "stat/sonoff5/POWER",
          type: types.option({ ON: "on", OFF: "off" })
        },
        defaultValue: "off"
      },
      doorStatus: {
        state: {
          name: "/service/status",
          type: types.option({ "\"open\"": "on", "\"closed\"": "off" })
        },
        defaultValue: "off"
      },
      presenceStatus: {
        state: {
          name: "service/status/presence",
          type: types.jsonArray
        },
        defaultValue: ""
      },
      devicesStatus: {
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
        defaultValue: "unavailable"
      },
      printer_3d_progress: {
        state: {
          name: "/service/ultimaker/job",
          type: (msg) => JSON.parse(msg.toString()).progress || "0"
        },
        defaultValue: "0"
      },
      printer3Dremaining: {
        state: {
          name: "/service/ultimaker/job",
          type: (msg) => {
            const json = JSON.parse(msg.toString());
            if(!json || !json["time_elapsed"] || !json["time_total"]) {
              return "unavailable";
            } else {
              const secondsLeft = json["time_total"] - json["time_elapsed"];
              return new Date(secondsLeft * 1000).toISOString().substr(11, 8);
            }
          }
        },
        defaultValue: "unavailable"
      },
      nebenraumPowerStatus: {
        state: {
          name: "/service/nebenraum-power",
          type: types.option({ ON: "on", OFF: "off" })
        },
        defaultValue: "off"
      }
    },
    //Tasmota-Dosen
    tasmota.topics("6", "snackbar"),
    tasmota.topics("7", "infoscreen"),

    esper.topics("afba40", "flyfry"),

    onkyo.topics,
    olymp.topics,
    kitchen.topics
  ],
  controls: {
    ...onkyo.controls,
    ...olymp.controls,
    ...kitchen.controls,
    led_stahltrager: {
      name: "LED Stahlträger",
      position: [340, 590],
      icon: mdi("white-balance-iridescent"),
      iconColor: ({ledStahltraeger}) =>
        (ledStahltraeger === "on" ? rainbow : hex("#000000")),
      ui: [
        {
          type: "toggle",
          text: "Stahlträger LED",
          topic: "ledStahltraeger",
          icon: mdi("power")
        }
      ]
    },
    snackbar: {
      name: "Snackbar",
      position: [510, 500],
      icon: mdi("fridge"),
      iconColor: tasmota.iconColor("snackbar", hex("#E20074")),
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
        (twinkle === "on" ? rawMdi("led-on flip-v") : rawMdi("led-off flip-v")),
      iconColor: ({twinkle}) => (twinkle === "on" ? rainbow : hex("#000000")),
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
      iconColor: ({fan}) => (fan === "on" ? hex("#00FF00") : hex("#000000")),
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
    flyfry: {
      name: "Fliegenbratgerät",
      position: [450, 570],
      icon: mdi("fire"),
      iconColor: ({flyfry}) =>
        (flyfry === "on" ? hex("#6666FF") : hex("#000000")),
      ui: esper.statistics("flyfry", [
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
          unknown: hex("#888888")
        })[projector],
      ui: [
        {
          type: "toggle",
          text: "Beamer",
          topic: "projector",
          toggled: (val) => val === "transient_on" || val === "on",
          icon: mdi("power")
        }
      ]
    },
    loetarbeitsplatz4: {
      name: "Lötarbeitsplatz",
      position: [205, 455],
      icon: mdi("eyedropper-variant"),
      iconColor: ({loetarbeitsplatz4}) =>
        (loetarbeitsplatz4 === "on" ? hex("#FF0000") : hex("#000000")),
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
      iconColor: ({loetarbeitsplatz5}) =>
        (loetarbeitsplatz5 === "on" ? hex("#FF0000") : hex("#000000")),
      ui: [
        {
          type: "text",
          text: "Status",
          topic: "loetarbeitsplatz5",
          icon: mdi("eyedropper-variant")
        }
      ]
    },
    door: {
      name: "Tür",
      position: [455, 350],
      icon: mdi("swap-vertical"),
      iconColor: ({doorStatus}) =>
        (doorStatus === "on" ? hex("#00FF00") : hex("#FF0000")),
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
          topic: "presenceStatus",
          icon: mdi("account")
        },
        {
          type: "text",
          text: "Devices",
          topic: "devicesStatus",
          icon: mdi("wifi")
        }

      ]
    },
    infoscreen: {
      name: "Infoscreen",
      position: [255, 495],
      icon: mdi("television-guide flip-v"),
      iconColor: tasmota.iconColor("infoscreen", hex("#4444FF")),
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
        },
        {
          type: "text",
          text: "Time Left",
          icon: mdi("clock"),
          topic: "printer3Dremaining"
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
    nebenraumPowerStatus: {
      name: "Strom Fablab",
      position: [613, 537],
      icon: ({nebenraumPowerStatus}) =>
        (nebenraumPowerStatus === "on" ? rawMdi("flash") : rawMdi("flash-off")),
      iconColor: ({nebenraumPowerStatus}) =>
        (nebenraumPowerStatus === "on" ? hex("#00ff00") : hex("#000000")),
      ui: [
        {
          type: "text",
          icon: mdi("power"),
          text: "Strom Fablab",
          topic: "nebenraumPowerStatus"
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
