// @flow
const config : Config = {
  topics: {
    led_stahltraeger: {
      state: "/service/openhab/out/pca301_ledstrips/state",
      command: "/service/openhab/in/pca301_ledstrips/command",
      value: "OFF", // defaultValue
      values: { on: "ON", off: "OFF" }
    },
    snackbar: {
      state: "/service/openhab/out/pca301_snackbar/state",
      command: "/service/openhab/in/pca301_snackbar/command",
      value: "OFF",
      values: { on: "ON", off: "OFF" }
    },
    twinkle: {
      state: "/service/openhab/out/pca301_twinkle/state",
      command: "/service/openhab/in/pca301_twinkle/command",
      value: "OFF",
      values: { on: "ON", off: "OFF" }
    },
    flyfry: {
      state: "/service/openhab/out/wifi_flyfry/state",
      command: "/service/openhab/in/wifi_flyfry/command",
      value: "OFF",
      values: { on: "ON", off: "OFF" }
    },
    artnet: {
      state: "/artnet/state",
      command: "/artnet/push",
      value: "blackout",
      values: { off: "blackout", yellow: "yellow", purple: "purple",
                blue: "blue", green: "green", red: "red", random: "random",
                cycle: "cycle-random" }
    },
    onkyo_volume: {
      state: "/service/onkyo/status/volume",
      command: "/service/onkyo/set/volume",
      value: 0,
      values: {},
      parseState: msg => JSON.parse(msg.toString()).val
    },
    rundumleuchte: {
      state: "/service/openhab/out/pca301_rundumleuchte/state",
      command: "/service/openhab/in/pca301_rundumleuchte/command",
      value: "OFF",
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
        }
      ]
    },
    rundumleuchte: {
      name: "Rundumleuchte",
      position: [240,210],
      icon: "wb_sunny",
      iconColor: state => state.rundumleuchte == "on" ? "#CCCC00" : "#000000",
      ui: [
        {
          type: "toggle",
          text: "Rundumleuchte",
          topic: "rundumleuchte"
        }
      ]
    }
  }
};

export default config;
