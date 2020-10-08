// @flow
import type { Config } from "config/flowtypes";
import * as types from "config/types";
import { hex, rainbow } from "config/colors";
import { svg, withState } from "config/icon";
import { esper, tasmota } from "./utils";
import * as icons from "@mdi/js";

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
      snackbarDimmmer: {
        state: {
          name: "/service/snackbar/Dimmer",
          type: types.string
        },
        command: {
          name: "cmnd/tasmota-snackbar/dimmer",
          type: types.string
        },
        defaultValue: "0"
      },
      snackbarScheme: {
        state: {
          name: "/service/snackbar/Scheme",
          type: types.string
        },
        command: {
          name: "cmnd/tasmota-snackbar/scheme",
          type: types.string
        },
        defaultValue: "0"
      },
      snackbarSpeed: {
        state: {
          name: "/service/snackbar/Speed",
          type: types.string
        },
        command: {
          name: "cmnd/tasmota-snackbar/speed",
          type: types.string
        },
        defaultValue: "0"
      },
      snackbarLedOnline: {
        state: {
          name: "tele/tasmota-snackbar/LWT",
          type: types.option({ Online: "on", online: "on",
            Offline: "off", offline: "off" })
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
      powerConsumption: {
        state: {
          name: "/service/power/hauptraum/power",
          type: (msg) =>
            (Number.parseFloat(msg.toString()) / 1000).toFixed(2) + " kW"
        },
        defaultValue: ""
      },
      projector: {
        state: {
          name: "/service/beamer/state",
          type: types.option({
            START_UP: "transientOn",
            START_UP_LAMP: "transientOn",
            COOLING: "transientOff",
            COOLING2: "transientOff",
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
            transientOff: "OFF",
            transientOn: "ON",
            unknown: "OFF"
          })
        },
        defaultValue: "unknown"
      },
      printer3DStatus: {
        state: {
          name: "/service/ultimaker/state",
          type: types.option({
            unreachable: "unavailable",
            booting: "unavailable",
            "pre_print": "printing",
            "post_print": "printing",
            printing: "printing",
            idle: "idle",
            error: "error",
            otherwise: "awaitingInteraction"
          })
        },
        defaultValue: "unavailable"
      },
      printer3DProgresss: {
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
            if (!json || !json["time_elapsed"] || !json["time_total"]) {
              return "unavailable";
            }
            const secondsLeft = json["time_total"] - json["time_elapsed"];
            return new Date(secondsLeft * 1000).toISOString().substr(11, 8);
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
      },
      deko: {
        state: {
          name: "/service/deko",
          type: types.option({ ON: "on", OFF: "off" })
        },
        command: {
          name: "/service/deko/set",
          type: types.option({ on: "ON", off: "OFF" })
        },
        defaultValue: "off"
      },
      whirlpoolTemperatureSetpoint: {
        state: {
          name: "/service/whirlpool/state",
          type: types.json("temperatureSetpointC")
        },
        command: {
          name: "/service/whirlpool/set/temperature",
          type: types.string
        },
        defaultValue: "0"
      },
      whirlpoolBubbles: {
        state: {
          name: "/service/whirlpool/state",
          type: types.json("bubbles")
        },
        command: {
          name: "/service/whirlpool/set/bubbles",
          type: types.string
        },
        defaultValue: "0"
      },
      whirlpoolTemperature: {
        state: {
          name: "/service/whirlpool/state",
          type: types.json("waterTemperatureC")
        },
        defaultValue: "0"
      }
    },
    //Tasmota-Dosen
    tasmota.topics("2", "printerAnnette"),
    tasmota.topics("6", "snackbar"),
    tasmota.topics("7", "infoscreen"),
    tasmota.topics("9", "pilze"),

    esper.topics("afba40", "flyfry"),

    onkyo.topics,
    olymp.topics,
    kitchen.topics
  ],
  controls: {
    ...onkyo.controls,
    ...olymp.controls,
    ...kitchen.controls,
    ledStahltrager: {
      name: "LED Stahlträger",
      position: [340, 590],
      icon: svg(icons.mdiWhiteBalanceIridescent).color(({ledStahltraeger}) =>
        (ledStahltraeger === "on" ? rainbow : hex("#000000"))),
      ui: [
        {
          type: "toggle",
          text: "Stahlträger LED",
          topic: "ledStahltraeger",
          icon: svg(icons.mdiPower)
        }
      ]
    },
    snackbar: {
      name: "Snackbar",
      position: [510, 500],
      icon: svg(icons.mdiFridge).color(
        tasmota.iconColor("snackbar", hex("#E20074"))),
      ui: [
        {
          type: "toggle",
          text: "Snackbar",
          topic: "snackbar",
          icon: svg(icons.mdiPower)
        },
        {
          type: "section",
          text: "LED-Streifen"
        },
        {
          type: "text",
          text: "LED-Streifen",
          topic: "snackbarLedOnline",
          icon: svg(icons.mdiWhiteBalanceIridescent)
        },
        {
          type: "dropDown",
          text: "Modus",
          topic: "snackbarScheme",
          options: {
            "0": "Single Color",
            "2": "Cycle RGB",
            "3": "Cycle RBG",
            "4": "Random cycle Random",
            "6": "Incandescent Pattern",
            "7": "RGB Pattern",
            "8": "Christmas Pattern",
            "9": "Hanukkah Pattern",
            "10": "Kwanzaa Pattern",
            "11": "Rainbow Pattern",
            "12": "Fire Pattern"
          },
          icon: svg(icons.mdiCog),
          enableCondition: ({ snackbarLedOnline }) => snackbarLedOnline === "on"
        },
        {
          type: "slider",
          text: "Helligkeit",
          topic: "snackbarDimmmer",
          min: 0,
          max: 100,
          icon: svg(icons.mdiBrightness7),
          enableCondition: ({ snackbarLedOnline }) => snackbarLedOnline === "on"
        },
        {
          type: "slider",
          text: "Animations-Geschwindigkeit",
          topic: "snackbarSpeed",
          min: 0,
          max: 20,
          icon: svg(icons.mdiSpeedometer),
          enableCondition: ({ snackbarLedOnline }) => snackbarLedOnline === "on"
        }
      ]
    },
    twinkle: {
      name: "Twinkle",
      position: [530, 560],
      icon: withState(({twinkle}) =>
        (twinkle === "on" ? svg(icons.mdiLedOn).flipV().color(rainbow)
          : svg(icons.mdiLedOff).flipV())
      ),
      ui: [
        {
          type: "toggle",
          text: "Twinkle",
          topic: "twinkle",
          icon: svg(icons.mdiPower)
        }
      ]
    },
    fan: {
      name: "Ventilator",
      position: [530, 440],
      icon: svg(icons.mdiFan).color(({fan}) =>
        (fan === "on" ? hex("#00FF00") : hex("#000000"))),
      ui: [
        {
          type: "toggle",
          text: "Ventilator",
          topic: "fan",
          icon: svg(icons.mdiPower)
        }
      ]
    },
    cashdesk: {
      name: "Cashdesk",
      position: [510, 467],
      icon: svg(icons.mdiCurrencyUsdCircle),
      ui: [
        {
          type: "link",
          link: "http://cashdesk.rzl:8000/",
          text: "Open Cashdesk",
          icon: svg(icons.mdiOpenInNew)
        }
      ]
    },
    flyfry: {
      name: "Fliegenbratgerät",
      position: [450, 570],
      icon: svg(icons.mdiFire).color(({flyfry}) =>
        (flyfry === "on" ? hex("#6666FF") : hex("#000000"))),
      ui: esper.statistics("flyfry", [
        {
          type: "toggle",
          text: "Fliegenbratgerät",
          topic: "flyfry",
          icon: svg(icons.mdiPower)
        }
      ])
    },
    projector: {
      name: "Beamer",
      position: [380, 590],
      icon: svg(icons.mdiProjector).flipV().color(({projector}) =>
        ({
          transientOn: hex("#b3b300"),
          transientOff: hex("#b3b300"),
          on: hex("#00ff00"),
          off: hex("#000000"),
          unknown: hex("#888888")
        })[projector]),
      ui: [
        {
          type: "toggle",
          text: "Beamer",
          topic: "projector",
          toggled: (val) => val === "transientOn" || val === "on",
          icon: svg(icons.mdiPower)
        }
      ]
    },
    loetarbeitsplatz4: {
      name: "Lötarbeitsplatz",
      position: [205, 455],
      icon: svg(icons.mdiEyedropperVariant).color(({loetarbeitsplatz4}) =>
        (loetarbeitsplatz4 === "on" ? hex("#FF0000") : hex("#000000"))),
      ui: [
        {
          type: "text",
          text: "Status",
          topic: "loetarbeitsplatz4",
          icon: svg(icons.mdiEyedropperVariant)
        }
      ]
    },
    loetarbeitsplatz5: {
      name: "Lötarbeitsplatz",
      position: [205, 405],
      icon: svg(icons.mdiEyedropperVariant).color(({loetarbeitsplatz4}) =>
        (loetarbeitsplatz4 === "on" ? hex("#FF0000") : hex("#000000"))),
      ui: [
        {
          type: "text",
          text: "Status",
          topic: "loetarbeitsplatz5",
          icon: svg(icons.mdiEyedropperVariant)
        }
      ]
    },
    door: {
      name: "Tür",
      position: [455, 350],
      icon: svg(icons.mdiSwapVertical).color(({doorStatus}) =>
        (doorStatus === "on" ? hex("#00FF00") : hex("#FF0000"))),
      ui: [
        {
          type: "link",
          link: "http://s.rzl.so",
          text: "Open Status Page",
          icon: svg(icons.mdiOpenInNew)
        },
        {
          type: "link",
          // eslint-disable-next-line max-len
          link: "http://kunterbunt.vm.rzl/dashboard/db/allgemeines-copy-ranlvor?orgId=1",
          text: "RZL-Dashboard",
          icon: svg(icons.mdiOpenInNew)
        },
        {
          type: "text",
          text: "Anwesend",
          topic: "presenceStatus",
          icon: svg(icons.mdiAccount)
        },
        {
          type: "text",
          text: "Devices",
          topic: "devicesStatus",
          icon: svg(icons.mdiWifi)
        },
        {
          type: "toggle",
          text: "Deko",
          topic: "deko",
          icon: svg(icons.mdiInvertColors)
        },
        {
          type: "text",
          text: "Power Hauptraum",
          topic: "powerConsumption",
          icon: svg(icons.mdiSpeedometer)
        }

      ]
    },
    infoscreen: {
      name: "Infoscreen",
      position: [255, 495],
      icon: svg(icons.mdiTelevisionGuide).flipV().color(
        tasmota.iconColor("infoscreen", hex("#4444FF"))
      ),
      ui: [
        {
          type: "toggle",
          text: "Infoscreen",
          topic: "infoscreen",
          icon: svg(icons.mdiPower)
        },
        {
          type: "link",
          link: "http://cashdesk.rzl:3030/rzl",
          text: "Open Infoscreen",
          icon: svg(icons.mdiOpenInNew)
        }
      ]
    },
    pilze: {
      name: "Pilze",
      position: [48, 499],
      icon: withState(({pilze}) =>
        (pilze === "on" ? svg(icons.mdiLedOn) : svg(icons.mdiLedOff))).color(
        tasmota.iconColor("pilze", rainbow)),
      ui: [
        {
          type: "toggle",
          text: "Pilze",
          topic: "pilze",
          icon: svg(icons.mdiPower)
        }
      ]
    },
    printer3D: {
      name: "Ultimaker 3",
      position: [754, 560],
      icon: svg(icons.mdiPrinter3d).color(({printer3DStatus}) =>
        ({
          awaitingInteraction: hex("#b3b300"),
          printing: hex("#00ff00"),
          idle: hex("#000000"),
          unavailable: hex("#888888"),
          error: hex("#ff0000")
        })[printer3DStatus]),
      ui: [
        {
          type: "link",
          link: "http://ultimaker.rzl/",
          text: "Open Webinterface",
          icon: svg(icons.mdiOpenInNew)
        },
        {
          type: "section",
          text: "Current Job"
        },
        {
          type: "progress",
          icon: svg(icons.mdiRotateRight),
          min: 0,
          max: 1,
          text: "Printing Progress",
          topic: "printer3DProgresss"
        },
        {
          type: "text",
          text: "Time Left",
          icon: svg(icons.mdiClock),
          topic: "printer3Dremaining"
        }
      ]
    },
    partkeepr: {
      name: "Partkeepr",
      position: [48, 450],
      icon: svg(icons.mdiChip),
      ui: [
        {
          type: "link",
          link: "http://partkeepr.rzl/",
          text: "Open Partkeepr",
          icon: svg(icons.mdiOpenInNew)
        }
      ]
    },
    printerAnnette: {
      name: "Drucker",
      position: [800, 350],
      icon: svg(icons.mdiPrinter).color(tasmota.iconColor("printerAnnette")),
      ui: [
        {
          type: "toggle",
          text: "Drucker",
          topic: "printerAnnette",
          icon: svg(icons.mdiPower)
        },
        {
          type: "link",
          link: "http://annette.rzl/",
          text: "Open Annette",
          icon: svg(icons.mdiOpenInNew)
        }
      ]
    },
    nebenraumPowerStatus: {
      name: "Strom Fablab",
      position: [613, 537],
      icon: withState(({nebenraumPowerStatus}) =>
        (nebenraumPowerStatus === "on" ?
          svg(icons.mdiFlash).color(hex("#00FF00")) : svg(icons.mdiFlashOff))),
      ui: [
        {
          type: "text",
          icon: svg(icons.mdiPower),
          text: "Strom Fablab",
          topic: "nebenraumPowerStatus"
        }
      ]
    },
    whirlpool: {
      name: "Vorstandswhirlpool",
      position: [1413, 500],
      icon: svg(icons.mdiPool).color(
        ({whirlpoolBubbles}) =>
          (parseInt(whirlpoolBubbles, 10) > 0 ? hex("#00ff00")
            : hex("#000000"))),
      ui: [
        {
          type: "text",
          icon: svg(icons.mdiOilTemperature),
          text: "Temperatur",
          topic: "whirlpoolTemperature"
        },
        {
          type: "text",
          icon: svg(icons.mdiOilTemperature),
          text: "Temperatur Sollwert",
          topic: "whirlpoolTemperatureSetpoint"
        },
        {
          type: "slider",
          min: 4,
          max: 100,
          text: "Temperatur Sollwert",
          icon: svg(icons.mdiOilTemperature),
          topic: "whirlpoolTemperatureSetpoint"
        },
        {
          type: "slider",
          min: 0,
          max: 9,
          text: "Bubbles",
          icon: svg(icons.mdiChartBubble),
          topic: "whirlpoolBubbles"
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
        bottomRight: [1320, 720]
      }
    },
    {
      image: require("./assets/layers/details.svg"),
      name: "Details",
      defaultVisibility: "visible",
      opacity: 0.4,
      bounds: {
        topLeft: [0, 0],
        bottomRight: [1320, 720]
      }
    },
    {
      image: require("./assets/layers/labels.svg"),
      name: "Labels",
      defaultVisibility: "hidden",
      opacity: 0.8,
      bounds: {
        topLeft: [0, 0],
        bottomRight: [1320, 720]
      }
    }
  ]
};

window.config = config;
