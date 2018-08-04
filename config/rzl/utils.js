// @flow
import type { ControlUI } from "config/flowtypes";
import { mdi } from "config/icon";
import * as types from "config/types";

export const esper_topics = (chip_id: string, name: string) => ({
  [ `esper_${name}_version` ]: {
    state: {
      name: `/service/esper/${chip_id}/info`,
      type: types.json("version.esper")
    },
    defaultValue: "UNKNOWN"
  },
  [ `esper_${name}_ip` ]: {
    state: {
      name: `/service/esper/${chip_id}/info`,
      type: types.json("network.ip")
    },
    defaultValue: "UNKNOWN"
  },
  [ `esper_${name}_rssi` ]: {
    state: {
      name: `/service/esper/${chip_id}/info`,
      type: types.json("wifi.rssi")
    },
    defaultValue: "UNKNOWN"
  },
  [ `esper_${name}_uptime` ]: {
    state: {
      name: `/service/esper/${chip_id}/info`,
      type: msg => new Date(JSON.parse(msg.toString()).time.startup * 1000)
                          .toLocaleString()
    },
    defaultValue: "UNKNOWN",
  },
  [ `esper_${name}_device` ]: {
    state: {
      name: `/service/esper/${chip_id}/info`,
      type: types.json("device")
    },
    defaultValue: "UNKNOWN"
  }
});

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
    }
  })
}
export const floalt = {
  color: (light_id: string) => `floalt_${light_id}_color`,
  brightness: (light_id: string) => `floalt_${light_id}_brightness`,
  topics: (light_id: string) => ({
    [ `floalt_${light_id}_color` ]: {
      state: {
        name: `/service/openhab/out/tradfri_0220_gwb8d7af2b448f_${light_id}_color_temperature/state`,
        type: types.string
      },
      command: {
        name: `/service/openhab/in/tradfri_0220_gwb8d7af2b448f_${light_id}_color_temperature/command`,
        type: types.string
      },
      defaultValue: "0"
    },
    [ `floalt_${light_id}_brightness` ]: {
      state: {
        name: `/service/openhab/out/tradfri_0220_gwb8d7af2b448f_${light_id}_brightness/state`,
        type: types.string
      },
      command: {
        name: `/service/openhab/in/tradfri_0220_gwb8d7af2b448f_${light_id}_brightness/command`,
        type: types.string
      },
      defaultValue: "0"
    }
  })
}

export const tradfri_remote = {
  level: (remote_id: string) => `tradfri_remote_${remote_id}_level`,
  low: (remote_id: string) => `tradfri_remote_${remote_id}_low`,
  topics: (remote_id: string) => ({
    [ `tradfri_remote_${remote_id}_level` ]: {
      state: {
        name: `/service/openhab/out/tradfri_0830_gwb8d7af2b448f_${remote_id}_battery_level/state`,
        type: types.string
      },
      defaultValue: "0"
    },
    [ `tradfri_remote_${remote_id}_low` ]: {
      state: {
        name: `/service/openhab/out/tradfri_0830_gwb8d7af2b448f_${remote_id}_battery_low/state`,
        type: types.option({ ON: "true", OFF: "false" })
      },
      defaultValue: "false",
    }
  })
}

export const esper_statistics = (name: string,
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
