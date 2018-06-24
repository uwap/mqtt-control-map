// @flow
import type { ControlUI } from "config/flowtypes";
import { mdi } from "config/icon";

export const esper_topics = (chip_id: string, name: string) => ({
  [ `esper_${name}_version` ]: {
    state: `/service/esper/${chip_id}/info`,
    command: "",
    defaultValue: "UNKNOWN",
    values: {},
    type: msg => JSON.parse(msg.toString()).version.esper
  },
  [ `esper_${name}_ip` ]: {
    state: `/service/esper/${chip_id}/info`,
    command: "",
    defaultValue: "UNKNOWN",
    values: {},
    type: msg => JSON.parse(msg.toString()).network.ip
  },
  [ `esper_${name}_rssi` ]: {
    state: `/service/esper/${chip_id}/info`,
    command: "",
    defaultValue: "UNKNOWN",
    values: {},
    type: msg => JSON.parse(msg.toString()).wifi.rssi
  },
  [ `esper_${name}_uptime` ]: {
    state: `/service/esper/${chip_id}/info`,
    command: "",
    defaultValue: "UNKNOWN",
    values: {},
    type: msg => new Date(JSON.parse(msg.toString()).time.startup * 1000)
                          .toLocaleString()
  },
  [ `esper_${name}_device` ]: {
    state: `/service/esper/${chip_id}/info`,
    command: "",
    defaultValue: "UNKNOWN",
    values: {},
    type: msg => JSON.parse(msg.toString()).device
  }
});

export const floalt = {
  color: (light_id: string) => `floalt_${light_id}_color`,
  brightness: (light_id: string) => `floalt_${light_id}_brightness`,
  topics: (light_id: string) => ({
    [ `floalt_${light_id}_color` ]: {
      state: `/service/openhab/out/tradfri_0220_gwb8d7af2b448f_${light_id}_color_temperature/state`,
      command: `/service/openhab/in/tradfri_0220_gwb8d7af2b448f_${light_id}_color_temperature/command`,
      defaultValue: "0",
      values: {}
    },
    [ `floalt_${light_id}_brightness` ]: {
      state: `/service/openhab/out/tradfri_0220_gwb8d7af2b448f_${light_id}_brightness/state`,
      command: `/service/openhab/in/tradfri_0220_gwb8d7af2b448f_${light_id}_brightness/command`,
      defaultValue: "0",
      values: {}
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
