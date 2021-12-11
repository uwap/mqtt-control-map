// @flow
import type { Config } from "config/flowtypes";
import * as types from "config/types";
import { svg, withState } from "config/icon";
import { hex } from "config/colors";
import * as icons from "@mdi/js";
//import { Buffer } from "bl";

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

const topicHomeBoolean = (name: string, topic: string,
  defaultValue: boolean = false) => ({
  [`${name}`]: {
    state: {
      name: `home-rust/${topic}`,
      type: types.option({ true: "on", false: "off" })
    },
    command: {
      name: `home-rust/${topic}/set`,
      type: types.option({ on: "true", off: "false" })
    },
    defaultValue: defaultValue ? "on" : "off"
  }
});

const topicHomeNumber = (name: string, topic: string,
  defaultValue: number = 0) => ({
  [`${name}`]: {
    state: {
      name: `home-rust/${topic}`,
      type: types.string
    },
    command: {
      name: `home-rust/${topic}/set`,
      type: types.string
    },
    defaultValue: defaultValue
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

const topicHeating = (name: string) => ({
  [`heater${name}Tsoll`]: {
    state: {
      name: `tele/home-rust/fritzbox/device/${name}`,
      type: (msg) => {
        const json = JSON.parse(msg.toString());
        if (!json || !json["tsoll"]) {
          return "126.5";
        } else {
          const tsoll = json["tsoll"] / 2;
          if (!json["offset"] || tsoll > 50) {
            return tsoll.toString();
          } else {
            return (tsoll - json["offset"]/10).toString();
          }
        }
      }
    },
    command: {
      name: `home-rust/fritzbox/device/${name}/tsoll/set`,
      //TODO: add offset before writing out new value
      type: (msg) => (Buffer.from((parseFloat(msg) * 2).toString()))
    },
    defaultValue: "126.5"
  },
  [`heater${name}WindowEnd`]: {
    state: {
      name: `tele/home-rust/fritzbox/device/${name}`,
      type: (msg) => {
        const json = JSON.parse(msg.toString());
        if (!json || !json["windowopenactiveendtime"]) {
          return "inactive";
        } else {
          return new Date(json["windowopenactiveendtime"] * 1000).toLocaleTimeString();
        }
      }
    },
    defaultValue: "unavailable"
  },
  [`heater${name}BoostEnd`]: {
    state: {
      name: `tele/home-rust/fritzbox/device/${name}`,
      type: (msg) => {
        const json = JSON.parse(msg.toString());
        if (!json || !json["boostactiveendtime"]) {
          return "inactive";
        } else {
          return new Date(json["boostactiveendtime"] * 1000).toLocaleTimeString();
        }
      }
    },
    defaultValue: "unavailable"
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
const radiatorUI = (name: string) => ([
  {
    type: "toggle",
    topic: `heater${name}Tsoll`,
    text: "Volle Power",
    icon: svg(icons.mdiRadiator),
    on: "127",
    off: "22"
  },
  {
    type: "toggle",
    topic: `heater${name}Tsoll`,
    text: "Ausschalten",
    icon: svg(icons.mdiRadiatorDisabled),
    on: "126.5",
    off: "22"
  },
  {
    type: "slider",
    min: 8,
    max: 33,
    step: 0.5,
    text: "Zieltemperatur",
    icon: svg(icons.mdiOilTemperature),
    topic: `heater${name}Tsoll`,
    marks: [
      { value: 3, label: "3°C" },
      { value: 22, label: "22°C" },
      { value: 33, label: "33°C" }
    ]
  },
  {
    type: "text",
    text: "Window open mode till",
    icon: svg(icons.mdiSortClockAscending),
    topic: `heater${name}WindowEnd`,
  },
  {
    type: "text",
    text: "Boost mode till",
    icon: svg(icons.mdiSortClockDescending),
    topic: `heater${name}BoostEnd`,
  }
]);

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

      ...topicBulbHomeRust("ledstrip_livingroom", "r"),
      ...topicBulbHomeRust("ledstrip_livingroom", "g"),
      ...topicBulbHomeRust("ledstrip_livingroom", "b"),
      ...topicBulbHomeRust("ledstrip_livingroom", "h"),
      ...topicBulbHomeRust("ledstrip_livingroom", "s"),
      ...topicBulbHomeRust("ledstrip_livingroom", "v"),
      ...topicBulbHomeRust("ledstrip_livingroom", "x"),
      ...topicBulbHomeRust("ledstrip_livingroom", "y"),
      ...topicBulbNumber("ledstrip_livingroom", "brightness"),
      ...topicBulbState("ledstrip_livingroom"),


      ...topicBulbNumber("bedroom", "brightness"),
      ...topicBulbNumber("bedroom", "color_temp"),
      ...topicBulbState("bedroom"),

      ...topicBulbNumber("office_window", "brightness"),
      ...topicBulbNumber("office_window", "color_temp"),
      ...topicBulbState("office_window"),

      ...topicBulbNumber("3d_printer", "brightness"),
      ...topicBulbState("3d_printer"),

      ...topicBulbNumber("office", "brightness"),
      ...topicBulbState("office"),

      ...topicBulbNumber("hallway", "brightness"),
      ...topicBulbState("hallway"),

      ...topicBulbNumber("hallway2", "brightness"),
      ...topicBulbState("hallway2"),

      ...topicBulbNumber("ledstrip_storeroom", "brightness"),
      ...topicBulbState("ledstrip_storeroom"),

      ...topicBulbNumber("diningroom", "brightness"),
      ...topicBulbState("diningroom"),

      ...topicTasmota("speakerOffice", "sonoff-office-speaker"),
      ...topicHomeBoolean("officeSwitchPollingActive", "switch/office/polling",
        true),

      ...topicTasmota("fanBedroom", "sonoff-bedroom-fan"),
      ...topicTasmota("fanOffice", "sonoff-office-fan"),
      ...topicTasmota("tasmotaProjector", "tasmota-projector"),
      ...topicHomeBoolean("fanBedroomAuto", "temperature-control/bedroom"),
      ...topicHomeBoolean("fanOfficeAuto", "temperature-control/office"),
      ...topicHomeNumber("fanBedroomTarget",
        "temperature-control/bedroom/target", 21.5),
      ...topicHomeNumber("fanOfficeTarget",
        "temperature-control/office/target", 21.5),

      ...topicHomeNumber("heaterOfficeTarget",
        "temperature-control/office_heating/target", 21.5),
      ...topicHomeBoolean("heaterOfficeAuto",
        "temperature-control/office_heating"),
      ...topicHomeBoolean("heaterOfficeSelfControl",
        "temperature-control/office_heating/self_control"),

      ...topicHomeNumber("heaterLivingroomTarget",
        "temperature-control/livingroom_heating/target", 21.5),
      ...topicHomeBoolean("heaterLivingroomAuto",
        "temperature-control/livingroom_heating"),

      ...topicHomeBoolean("livingroomKodiControlled",
        "bulb/livingroom/kodi-controlled"),
      ...topicHomeBoolean("bedroomWakeup", "wakeup"),
      ...topicHomeBoolean("lueftenHint", "lueften"),
      ...topicHomeBoolean("printerLight",
        "bulb/bulb_3d_printer/auto"),
      ...topicHomeNumber("temperatureWarningKitchen",
        "temperature-warning/kitchen/setpoint", 15.0),
      ...topicHomeNumber("temperatureWarningOffice",
        "temperature-warning/office/setpoint", 15.0),
      ...topicHomeNumber("temperatureWarningBedroom",
        "temperature-warning/bedroom/setpoint", 15.0),
      temperatureKitchen: {
        state: {
          name: "tele/sonoff-kittchen/SENSOR",
          type: types.json("DS18B20-5674FF.Temperature")
          //type: types.json("$..[?(@.Address==\"28FF7456B5013CBB\")].Temperature")
        },
        defaultValue: "0"
      },
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

      ...topicHeating("diningroom"),
      ...topicHeating("bedroom"),
      ...topicHeating("office"),

      heaterBedroomSummermode: {
        state: {
          name: "tele/home-rust/fritzbox/device/bedroom",
          type: types.json("summeractive")
        },
        defaultValue: "1"
      },
      heaterOfficeNachtabsenkung: {
        state: {
          name: "home-rust/temperature-control/office_heating/heat_request/4",
          type: types.option({ true: "off", false: "on" })
        },
        command: {
          name: "home-rust/temperature-control/office_heating/heat_request/4",
          type: types.option({ off: "true", on: "false" })
        },
        defaultValue: "on"
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
      tasmotaProjectorAutoOff: {
        state: {
          name: "tele/tasmota-projector/auto-off",
          type: types.option({ OFF: "off", ON: "on" })
        },
        command: {
          name: "cmnd/tasmota-projector/backlog",
          type: types.option({
            off: "Rule2 off; RuleTimer1 0; Publish2 tele/tasmota-projector/auto-off OFF;",
            on: "Rule2 on; Publish2 tele/tasmota-projector/auto-off ON;"
          })
        },
        defaultValue: "on"
      },
      printer3DProgresss: {
        state: {
          name: "tele/octoPrint/progress/printing",
          type: (msg) => JSON.parse(msg.toString()).printer_data.progress.completion || "0"
        },
        defaultValue: "0"
      },
      printer3Dremaining: {
        state: {
          name: "tele/octoPrint/progress/printing",
          type: (msg) => {
            const json = JSON.parse(msg.toString());
            if (!json) {
              return "unavailable";
            }
            const secondsLeft = json.printer_data.progress.printTimeLeft;
            return new Date(secondsLeft * 1000).toISOString().substr(11, 8);
          }
        },
        defaultValue: "unavailable"
      },
      kodi: {
        state: {
          name: "kodi/connected",
          type: types.string
        },
        command: {
          name: "kodi/command/shutdown",
          type: types.string
        },
        defaultValue: "0"
      },
      wled_livingroom_brightness: {
        state: {
          name: "wled/livingroom/g",
          type: types.string
        },
        command: {
          name: "wled/livingroom",
          type: types.string
        },
        defaultValue: "0"
      },
      twitch_status_uwap: {
        state: {
          name: "tele/twitch/uwap",
          type: (msg) => { return msg.toString().endsWith("off") ? "off" : "on"; }
        },
        defaultValue: "off"
      },
      tadpole_freshness: {
        state: {
          name: "stat/tadpole/freshness",
          type: types.string
        },
        defaultValue: "unkown"
      },
      tadpole_mic: {
        state: {
          name: "stat/tadpole/mic",
          type: types.string
        },
        defaultValue: "unkown"
      },
      tadpole_webcam: {
        state: {
          name: "stat/tadpole/webcam",
          type: types.string
        },
        defaultValue: "unkown"
      },
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
      name: "Lüftung/Heizung Schlafzimmer",
      position: [140, 25],
      icon: withState((s) => (
        s["heaterBedroomSummermode"] === "1" ?

          //Sommermodus => Lüftungsstatus anzeigen
          svg(icons.mdiFan).color(({fanBedroomState}) =>
            (fanBedroomState === "on" ? hex("#00FF00") : hex("#000000")))

          //Wintermodus => Heizungsstatus anzeigen
          : s["heaterbedroomTsoll"] === "126.5" ?
            //Solltemperatur == aus
            svg(icons.mdiRadiatorDisabled)
            //Normalbetrieb
            : svg(icons.mdiRadiator)
      )),
      ui: [
        {
          type: "section",
          text: "Lüftung"
        },
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
          type: "slider",
          min: 15,
          max: 25,
          step: 0.1,
          text: "Zieltemperatur",
          icon: svg(icons.mdiOilTemperature),
          topic: "fanBedroomTarget",
          marks: [
            { value: 15, label: "15°C" },
            { value: 20, label: "20°C" },
            { value: 25, label: "25°C" }
          ]
        },
        {
          type: "section",
          text: "Heizung"
        }].concat(radiatorUI("bedroom"))
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
      name: "Lüftung/Heizung Büro",
      position: [140, 658],
      icon: withState(({heaterOfficeAuto}) => (

        heaterOfficeAuto === "on" ?

          svg(icons.mdiRadiator).color(({heaterofficeTsoll}) =>
            (heaterofficeTsoll === "127" ? hex("#FF0000") : hex("#000000")))

          : svg(icons.mdiFan).color(({fanOfficeState}) =>
            (fanOfficeState === "on" ? hex("#00FF00") : hex("#000000")))
      )),
      ui: [
        {
          type: "section",
          text: "Lüftung"
        },
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
          type: "slider",
          min: 15,
          max: 25,
          step: 0.1,
          text: "Zieltemperatur",
          icon: svg(icons.mdiOilTemperature),
          topic: "fanOfficeTarget",
          marks: [
            { value: 15, label: "15°C" },
            { value: 20, label: "20°C" },
            { value: 25, label: "25°C" }
          ]
        },
        {
          type: "section",
          text: "Heizung (Automatik)"
        },
        {
          type: "toggle",
          topic: "heaterOfficeAuto",
          text: "Automatik",
          icon: svg(icons.mdiRadiator)
        },
        {
          type: "toggle",
          topic: "heaterOfficeNachtabsenkung",
          text: "Nachtabsekung",
          icon: svg(icons.mdiWeatherNight)
        },
        {
          type: "toggle",
          topic: "heaterOfficeSelfControl",
          text: "Run control on valve",
          icon: svg(icons.mdiRadiator)
        },
        {
          type: "slider",
          min: 15,
          max: 25,
          step: 0.1,
          text: "Zieltemperatur",
          icon: svg(icons.mdiOilTemperature),
          topic: "heaterOfficeTarget",
          marks: [
            { value: 15, label: "15°C" },
            { value: 21.5, label: "21.5°C" },
            { value: 25, label: "25°C" }
          ]
        },
        {
          type: "section",
          text: "Heizung (Manuell)"
        }].concat(radiatorUI("office"))
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
      position: [280, 658],
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
      icon: withState((s) => (
        svg(icons.mdiCeilingLight).color(
            s["hallway2State"] === "on" ? 
              (s["tadpole_webcam"] == "on" ? hex("#FF0000") : s["tadpole_mic"] == "on" ? hex("#0000FF") : s["twitch_status_uwap"] === "on" ? hex("#FF00FF") : hex("#00FF00"))
            : 
              (s["tadpole_webcam"] == "on" ? hex("#990000") : s["tadpole_mic"] == "on" ? hex("#000099") : s["twitch_status_uwap"] === "on" ? hex("#990099") : hex("#000000"))
        ))),
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
        },
        {
          type: "text",
          text: "Twitch Uwap",
          icon: svg(icons.mdiTwitch),
          topic: "twitch_status_uwap"
        },
        {
          type: "section",
          text: "Laptop tadpole"
        },
        {
          type: "text",
          text: "Datenstand",
          icon: svg(icons.mdiRefresh),
          topic: "tadpole_freshness"
        },
        {
          type: "text",
          text: "Mikrofon",
          icon: svg(icons.mdiMicrophone),
          topic: "tadpole_mic"
        },
        {
          type: "text",
          text: "Webcam",
          icon: svg(icons.mdiVideo),
          topic: "tadpole_webcam"
        }
      ]
    },
    temperatureWarningKitchen: {
      name: "Untertemperatur-Warnung",
      position: [625, 660],
      icon: withState((s) => (

        ( parseFloat(s["temperatureKitchen"])
          < parseFloat(s["temperatureWarningKitchen"])
        )
          ? svg(icons.mdiThermometerAlert).color(hex("#FF0000"))
          : svg(icons.mdiThermometer)
      )),
      ui: [
        {
          type: "text",
          text: "Istwert:",
          icon: svg(icons.mdiThermometer),
          topic: "temperatureKitchen"
        },
        {
          type: "slider",
          min: 0,
          max: 20,
          step: 1,
          text: "Schwellwert",
          icon: svg(icons.mdiThermometerChevronDown),
          topic: "temperatureWarningKitchen",
          marks: [
            { value: 0, label: "0°C" },
            { value: 15, label: "15°C" },
            { value: 20, label: "20°C" }
          ]
        }
      ]
    },
    diningroomLight: {
      name: "Esszimmer",
      position: [410, 570],
      icon: svg(icons.mdiCeilingLight).color(({diningroomState}) =>
        (diningroomState === "on" ? hex("#00FF00") : hex("#000000"))),
      ui: [
        {
          type: "toggle",
          topic: "diningroomState",
          text: "Ein/Ausschalten",
          icon: svg(icons.mdiPower)
        },
        {
          type: "slider",
          min: 0,
          max: 255,
          text: "Helligkeit",
          icon: svg(icons.mdiBrightness7),
          topic: "diningroombrightness"
        }
      ]
    },
    diningroomHeater: {
      name: "Heizung Esszimmer",
      position: [410, 658],
      icon: withState(({heaterdiningroomTsoll}) => (
        heaterdiningroomTsoll === "126.5" ?
          svg(icons.mdiRadiatorDisabled) : svg(icons.mdiRadiator)
      )),
      ui: [
        {
          type: "section",
          text: "Heizung (Automatik)"
        },
        {
          type: "toggle",
          topic: "heaterLivingroomAuto",
          text: "Automatik",
          icon: svg(icons.mdiRadiator)
        },
        {
          type: "slider",
          min: 15,
          max: 25,
          step: 0.1,
          text: "Zieltemperatur",
          icon: svg(icons.mdiOilTemperature),
          topic: "heaterLivingroomTarget",
          marks: [
            { value: 15, label: "15°C" },
            { value: 21.5, label: "21.5°C" },
            { value: 25, label: "25°C" }
          ]
        },
        {
          type: "section",
          text: "Heizung (Manuell)"
        },
      ] . concat(radiatorUI("diningroom"))
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
        },
        {
          type: "link",
          link: "http://192.168.0.12:1780/",
          text: "Snapcast",
          icon: svg(icons.mdiOpenInNew)
        },
        {
          type: "link",
          link: "http://carina.fritz.box:9981/",
          text: "tvheadend",
          icon: svg(icons.mdiOpenInNew)
        },
        {
          type: "section",
          text: "Kälte-Warnung"
        },
        {
          type: "slider",
          min: 0,
          max: 20,
          step: 1,
          text: "Küche",
          icon: svg(icons.mdiThermometerChevronDown),
          topic: "temperatureWarningKitchen",
          marks: [
            { value: 0, label: "0°C" },
            { value: 15, label: "15°C" },
            { value: 20, label: "20°C" }
          ]
        },
        {
          type: "slider",
          min: 0,
          max: 20,
          step: 1,
          text: "Büro",
          icon: svg(icons.mdiThermometerChevronDown),
          topic: "temperatureWarningOffice",
          marks: [
            { value: 0, label: "0°C" },
            { value: 15, label: "15°C" },
            { value: 20, label: "20°C" }
          ]
        },
        {
          type: "slider",
          min: 0,
          max: 20,
          step: 1,
          text: "Schlafzimmer",
          icon: svg(icons.mdiThermometerChevronDown),
          topic: "temperatureWarningBedroom",
          marks: [
            { value: 0, label: "0°C" },
            { value: 15, label: "15°C" },
            { value: 20, label: "20°C" }
          ]
        },
      ]
    },
    nas: {
      name: "NAS",
      position: [310, 500],
      icon: svg(icons.mdiNas).color(({nasPower}) =>
        (nasPower === "on" ? hex("#00FF00") : hex("#000000"))),
      ui: [
        {
          type: "toggle",
          topic: "nasPower",
          text: "Einschalten",
          icon: svg(icons.mdiPower),
        }
      ]
    },
    officeWindowLight: {
      name: "Büro Fenster",
      position: [310, 658],
      /* eslint-disable camelcase */
      icon: svg(icons.mdiDeskLamp).color(({office_windowState}) =>
        (office_windowState === "on" ? hex("#00FF00") : hex("#000000"))),
      /* eslint-enable camelcase */
      ui: [
        {
          type: "section",
          text: "Beleuchtung"
        },
        {
          type: "toggle",
          topic: "office_windowState",
          text: "Ein/Ausschalten",
          icon: svg(icons.mdiPower)
        },
        {
          type: "slider",
          min: 0,
          max: 255,
          text: "Helligkeit",
          icon: svg(icons.mdiBrightness7),
          topic: "office_windowbrightness"
        },
        {
          type: "slider",
          min: 250,
          max: 454,
          text: "Farbtemperatur",
          icon: svg(icons.mdiWeatherSunsetDown),
          topic: "office_windowcolor_temp"
        },
      ]
    }, 
    printer3D: {
      name: "3D-Drucker",
      position: [310, 430],
      icon: svg(icons.mdiPrinter3d),
      ui: [
        {
          type: "link",
          link: "http://octopi.fritz.box/",
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
          max: 100,
          text: "Printing Progress",
          topic: "printer3DProgresss"
        },
        {
          type: "text",
          text: "Time Left",
          icon: svg(icons.mdiClock),
          topic: "printer3Dremaining"
        },
        {
          type: "section",
          text: "Beleuchtung"
        },
        {
          type: "toggle",
          topic: "3d_printerState",
          text: "Ein/Ausschalten",
          icon: svg(icons.mdiPower)
        },
        {
          type: "toggle",
          topic: "printerLight",
          text: "Sync to 3D printer",
          icon: svg(icons.mdiBrightnessAuto)
        },
        {
          type: "slider",
          min: 0,
          max: 255,
          text: "Helligkeit",
          icon: svg(icons.mdiBrightness7),
          topic: "3d_printerbrightness"
        },
      ]
    },
    storeRoomStrip: {
      name: "LED-Leisten Lager",
      position: [310, 465],
      icon: svg(icons.mdiWhiteBalanceIridescent),
      icon: svg(icons.mdiWhiteBalanceIridescent).color(({ledstrip_storeroomState}) =>
        (ledstrip_storeroomState === "on" ? hex("#00FF00") : hex("#000000"))),
      ui: [
        {
          type: "toggle",
          topic: "ledstrip_storeroomState",
          text: "Ein/Ausschalten",
          icon: svg(icons.mdiPower)
        },
        {
          type: "slider",
          min: 0,
          max: 255,
          text: "Helligkeit",
          icon: svg(icons.mdiBrightness7),
          topic: "ledstrip_storeroombrightness"
        }
      ]
    },
    projector: {
      name: "Beamer",
      position: [410, 230],
      icon: svg(icons.mdiProjector).color(({tasmotaProjectorState}) =>
        (tasmotaProjectorState === "on" ? hex("#00FF00") : hex("#000000"))),
      ui: [
        {
          type: "toggle",
          topic: "tasmotaProjectorState",
          text: "Ein/Ausschalten",
          icon: svg(icons.mdiPower)
        },
        {
          type: "toggle",
          topic: "tasmotaProjectorAutoOff",
          text: "Automatik",
          icon: svg(icons.mdiAutoDownload)
        },
        {
          type: "section",
          text: "Kodi"
        },
        {
          type: "toggle",
          topic: "kodi",
          text: "Kodi herunterfahren",
          icon: svg(icons.mdiPower),
          on: "2",
          off: "0",
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
          marks: [
            { value: 1, label: "Dunkel" },
            { value: 120, label: "Medium" },
            { value: 254, label: "Hell" }
          ],
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
            "4": "Work",
            "5": "Winter"
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
    },
    livingroomLedStrip: {
      name: "Ledstreifen Wohnzimmer",
      position: [450, 73],
      icon: svg(icons.mdiWhiteBalanceIridescent),
      /* eslint-disable camelcase */
      iconColor: ({ledstrip_livingroomState}) =>
        (ledstrip_livingroomState === "on" ? hex("#00FF00") : hex("#000000")),
      /* eslint-enable camelcase */
      ui: ([
        {
          type: "toggle",
          topic: "ledstrip_livingroomState",
          text: "Ein/Ausschalten",
          icon: svg(icons.mdiPower)
        },
        {
          type: "slider",
          min: 0,
          max: 255,
          text: "Helligkeit",
          icon: svg(icons.mdiBrightness7),
          topic: "ledstrip_livingroombrightness"
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
            "4": "Work",
            "5": "Winter"
          },
          icon: svg(icons.mdiCog)
        },
        {
          type: "section",
          text: "RGB"
        }
      ]).concat(sliderRGB("ledstrip_livingroom", "r"))
        .concat(sliderRGB("ledstrip_livingroom", "g"))
        .concat(sliderRGB("ledstrip_livingroom", "b"))
        .concat([
          {
            type: "section",
            text: "HSV"
          }
        ]).concat(sliderH("ledstrip_livingroom", "h"))
        .concat(sliderSVXY("ledstrip_livingroom", "s"))
        .concat(sliderSVXY("ledstrip_livingroom", "v"))
        .concat([
          {
            type: "section",
            text: "XY"
          }
        ]).concat(sliderSVXY("ledstrip_livingroom", "x"))
        .concat(sliderSVXY("ledstrip_livingroom", "y"))
    },
    livingroomLedStripWled: {
      name: "Ledstreifen Wohnzimmer",
      position: [550, 200],
      icon: svg(icons.mdiWhiteBalanceIridescent),
      /* eslint-disable camelcase */
      iconColor: ({ledstrip_livingroomState}) =>
        (ledstrip_livingroomState === "on" ? hex("#00FF00") : hex("#000000")),
      /* eslint-enable camelcase */
      ui: ([
        {
          type: "toggle",
          topic: "wled_livingroom_brightness",
          text: "Ein/Ausschalten",
          icon: svg(icons.mdiPower),
          on: "107",
          off: "0",
          toggled: (n) => parseInt(n, 10) > 0
        },
        {
          type: "slider",
          min: 1,
          max: 255,
          text: "Helligkeit",
          icon: svg(icons.mdiBrightness7),
          topic: "wled_livingroom_brightness"
        }
      ])
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
