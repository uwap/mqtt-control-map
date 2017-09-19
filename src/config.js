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
      values: { tisch: "SLI11", chromecast: "SLI01", pult: "SLI10" },
      parseState: msg => JSON.parse(msg.toString()).val
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
      position: [360, 80],
      icon: "wb_incandescent",
      iconColor: state => state.led_stahltraeger == "on" ? "#CCCC00" : "#000000",
      ui: [
        {
          type: "toggle",
          text: "Stahlträger LED",
          topic: "led_stahltraeger"
        },
      ]
    },
    snackbar: {
      name: "Snackbar",
      position: [560, 200],
      icon: "kitchen",
      iconColor: state => state.snackbar == "on" ? "#E20074" : "#000000",
      ui: [
        {
          type: "toggle",
          text: "Snackbar",
          topic: "snackbar"
        }
      ]
    },
    twinkle: {
      name: "Twinkle",
      position: [500, 280],
      icon: "wb_incandescent",
      iconColor: state => state.twinkle == "on" ? "#CCCC00" : "#000000",
      ui: [
        {
          type: "toggle",
          text: "Twinkle",
          topic: "twinkle"
        }
      ]
    },
    flyfry: {
      name: "Fliegenbratgerät",
      position: [450, 320],
      icon: "whatshot",
      iconColor: state => state.flyfry == "on" ? "#6666FF" : "#000000",
      ui: [
        {
          type: "toggle",
          text: "Fliegenbratgerät",
          topic: "flyfry"
        }
      ]
    },
    artnet: {
      name: "Artnet",
      position: [560,165],
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
          toggled: val => val != "off"
        },
        {
          type: "dropDown",
          text: "Artnet",
          topic: "artnet",
          options: {
            yellow: "Gelb",
            red: "Rot",
            purple: "Pink",
            green: "Grün",
            cycle: "Cycle Random"
          },
          enableCondition: val => val != "off"
        }
      ]
    },
    onkyo: {
      name: "Onkyo",
      position: [350, 380],
      icon: "volume_up",
      ui: [
        {
          type: "slider",
          text: "Volume",
          topic: "onkyo_volume",
          min: 0,
          max: 100
        },
        {
          type: "dropDown",
          text: "Inputs",
          topic: "onkyo_inputs",
          options: {
            tisch: "Tisch",
            chromecast: "Chromecast",
            pult: "Pult"
          }
        }
      ]
    },
    rundumleuchte: {
      name: "Rundumleuchte",
      position: [225,220],
      icon: "wb_sunny",
      iconColor: state => state.rundumleuchte == "on" ? "#CCCC00" : "#000000",
      ui: [
        {
          type: "toggle",
          text: "Rundumleuchte",
          topic: "rundumleuchte"
        }
      ]
    },
    door: {
      name: "Tür",
      position: [480,20],
      icon: "swap_vert",
      iconColor: state => state.door_status == "on" ? "#00FF00" : "#FF0000",
      ui: []
    },
    infoscreen: {
      name: "Infoscreen",
      position: [255, 195],
      icon: "developer_board",
      iconColor: state => state.infoscreen == "on" ? "#4444FF" : "#000000",
      ui: [
        {
          type: "toggle",
          text: "Infoscreen",
          topic: "infoscreen"
        }
      ]
    }
  }
};

export default config;
