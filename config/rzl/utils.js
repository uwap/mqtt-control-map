// @flow
import type { ControlUI } from "config/flowtypes";
import { mdi } from "config/icon";
import { hex } from "config/colors";
import * as types from "config/types";

export const tasmota = {
  topics: (id: string, name: string) => ({
    [name]: {
      state: {
        name: `stat/sonoff${id}/POWER`,
        type: types.option({ ON: "on", OFF: "off" })
      },
      command: {
        name: `cmnd/sonoff${id}/power`,
        type: types.option({ on: "ON", off: "OFF" })
      },
      defaultValue: "off"
    },
    [`${name}_online`]: {
      state: {
        name: `tele/sonoff${id}/LWT`,
        type: types.string
      },
      defaultValue: "offline"
    }
  }),
  icon_color: (name: string, on_color: Color = hex("#00FF00")) =>
    (state: State) => {
      if (state[`${name}_online`] === "offline") {
        return hex("#888888");
      } else {
        if (state[name] === "on") {
          return on_color;
        } else {
          return hex("#000000");
        }
      }
    }
};
export const floalt = {
  color: (lightId: string) => `floalt_${lightId}_color`,
  brightness: (lightId: string) => `floalt_${lightId}_brightness`,
  topics: (lightId: string) => ({
    [`floalt_${lightId}_color`]: {
      state: {
        name: `/service/openhab/out/tradfri_0220_gwb8d7af2b448f_${lightId}` +
                "_color_temperature/state",
        type: types.string
      },
      command: {
        name: `/service/openhab/in/tradfri_0220_gwb8d7af2b448f_${lightId}` +
                "_color_temperature/command",
        type: types.string
      },
      defaultValue: "0"
    },
    [`floalt_${lightId}_brightness`]: {
      state: {
        name: `/service/openhab/out/tradfri_0220_gwb8d7af2b448f_${lightId}` +
                "_brightness/state",
        type: types.string
      },
      command: {
        name: `/service/openhab/in/tradfri_0220_gwb8d7af2b448f_${lightId}` +
                "_brightness/command",
        type: types.string
      },
      defaultValue: "0"
    }
  })
};

const tradfriRemote = {
  level: (remoteId: string) => `tradfri_remote_${remoteId}_level`,
  low: (remoteId: string) => `tradfri_remote_${remoteId}_low`,
  topics: (remoteId: string) => ({
    [`tradfri_remote_${remoteId}_level`]: {
      state: {
        name: `/service/openhab/out/tradfri_0830_gwb8d7af2b448f_${remoteId}` +
                "_battery_level/state",
        type: types.string
      },
      defaultValue: "0"
    },
    [`tradfri_remote_${remoteId}_low`]: {
      state: {
        name: `/service/openhab/out/tradfri_0830_gwb8d7af2b448f_${remoteId}` +
                "_battery_low/state",
        type: types.option({ ON: "true", OFF: "false" })
      },
      defaultValue: "false"
    }
  })
};

export const tradfri = {
  remote: tradfriRemote
};

const esperStatistics = (name: string,
  prev_ui: Array<ControlUI> = []): Array<ControlUI> => (
  prev_ui.concat([
    {
      type: "section",
      text: "Funkdose"
    },
    {
      type: "text",
      text: "Device Variant",
      icon: mdi("chart-donut"),
      topic: `esper_${name}_device`
    },
    {
      type: "text",
      text: "Version",
      icon: mdi("source-branch"),
      topic: `esper_${name}_version`
    },
    {
      type: "text",
      text: "IP",
      icon: mdi("access-point-network"),
      topic: `esper_${name}_ip`
    },
    {
      type: "text",
      text: "RSSI",
      icon: mdi("wifi"),
      topic: `esper_${name}_rssi`
    },
    {
      type: "text",
      text: "Running since…",
      icon: mdi("av-timer"),
      topic: `esper_${name}_uptime`
    }
  ])
);
const esperTopics = (chipId: string, name: string) => ({
  [`esper_${name}_version`]: {
    state: {
      name: `/service/esper/${chipId}/info`,
      type: types.json("version.esper")
    },
    defaultValue: "UNKNOWN"
  },
  [`esper_${name}_ip`]: {
    state: {
      name: `/service/esper/${chipId}/info`,
      type: types.json("network.ip")
    },
    defaultValue: "UNKNOWN"
  },
  [`esper_${name}_rssi`]: {
    state: {
      name: `/service/esper/${chipId}/info`,
      type: types.json("wifi.rssi")
    },
    defaultValue: "UNKNOWN"
  },
  [`esper_${name}_uptime`]: {
    state: {
      name: `/service/esper/${chipId}/info`,
      type: (msg) => new Date(JSON.parse(msg.toString()).time.startup * 1000)
        .toLocaleString()
    },
    defaultValue: "UNKNOWN"
  },
  [`esper_${name}_device`]: {
    state: {
      name: `/service/esper/${chipId}/info`,
      type: types.json("device")
    },
    defaultValue: "UNKNOWN"
  }
});

export const esper = {
  topics: esperTopics,
  statistics: esperStatistics
};
