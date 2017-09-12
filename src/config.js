// @flow
const config : Config = {
  topics: {
    led_stahltraeger: {
      state: "/service/openhab/out/pca301_ledstrips/state",
      command: "/service/openhab/in/pca301_ledstrips/command",
      value: "OFF", # defaultValue
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
    }
  },
  controls: {
    led_stahltrager: {
      name: "LED Stahlträger",
      position: [360, 80],
      icon: "",
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
      position: [550, 200],
      icon: "",
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
      icon: "",
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
      icon: "",
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
      position: [550,150],
      icon: "",
      ui: [
        {
          type: "toggle",
          text: "Gelb",
          topic: "artnet",
          on: "yellow"
        },
        {
          type: "toggle",
          text: "Rot",
          topic: "artnet",
          on: "red"
        },
        {
          type: "toggle",
          text: "Pink",
          topic: "artnet",
          on: "purple"
        },
        {
          type: "toggle",
          text: "Grün",
          topic: "artnet",
          on: "green"
        },
        {
          type: "toggle",
          text: "Cycle Random",
          topic: "artnet",
          on: "cycle"
        }
      ]
    }
  }
};

export default config;
