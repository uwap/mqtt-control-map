// @flow
import type { ControlUI, Topics } from "config/flowtypes";
import { svg } from "config/icon";
import { hex, type Color } from "config/colors";
import * as types from "config/types";
import * as icons from "@mdi/js";

export const tasmota = {
  topics: (id: string, name: string): Topics => ({
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
        type: types.option({ Online: "on", online: "on",
          Offline: "off", offline: "off" })
      },
      defaultValue: "off"
    }
  }),
  iconColor: (name: string, onCol: Color = hex("#00FF00")): (State => Color) =>
    (state: State): Color => {
      if (state[`${name}_online`] === "off") {
        return hex("#888888");
      } else if (state[name] === "on") {
        return onCol;
      }
      return hex("#000000");
    }
};
export const floalt = {
  color: (lightId: string): string => `floalt_${lightId}_color`,
  brightness: (lightId: string): string => `floalt_${lightId}_brightness`,
  topics: (lightId: string): Topics => ({
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
  level: (remoteId: string): string => `tradfri_remote_${remoteId}_level`,
  low: (remoteId: string): string => `tradfri_remote_${remoteId}_low`,
  topics: (remoteId: string): Topics => ({
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
  prevUI: Array<ControlUI> = []): Array<ControlUI> => (
  prevUI.concat([
    {
      type: "section",
      text: "Funkdose"
    },
    {
      type: "text",
      text: "Device Variant",
      icon: svg(icons.mdiChartDonut),
      topic: `esper_${name}_device`
    },
    {
      type: "text",
      text: "Version",
      icon: svg(icons.mdiSourceBranch),
      topic: `esper_${name}_version`
    },
    {
      type: "text",
      text: "IP",
      icon: svg(icons.mdiAccessPointNetwork),
      topic: `esper_${name}_ip`
    },
    {
      type: "text",
      text: "RSSI",
      icon: svg(icons.mdiWifi),
      topic: `esper_${name}_rssi`
    },
    {
      type: "text",
      text: "Running since…",
      icon: svg(icons.mdiAvTimer),
      topic: `esper_${name}_uptime`
    }
  ])
);
const esperTopics = (chipId: string, name: string): Topics => ({
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
