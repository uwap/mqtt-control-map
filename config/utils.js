// @flow
import type { ControlUI } from "config/types";

export const esper_topics = (chip_id: string, name: string) => ({
  [ `esper_${name}_version` ]: {
    state: `/service/esper/${chip_id}/info`,
    command: "",
    defaultValue: "UNKNOWN",
    values: {},
    parseState: msg => JSON.parse(msg.toString()).version.esper
  },
  [ `esper_${name}_ip` ]: {
    state: `/service/esper/${chip_id}/info`,
    command: "",
    defaultValue: "UNKNOWN",
    values: {},
    parseState: msg => JSON.parse(msg.toString()).network.ip
  },
  [ `esper_${name}_rssi` ]: {
    state: `/service/esper/${chip_id}/info`,
    command: "",
    defaultValue: "UNKNOWN",
    values: {},
    parseState: msg => JSON.parse(msg.toString()).wifi.rssi
  },
  [ `esper_${name}_uptime` ]: {
    state: `/service/esper/${chip_id}/info`,
    command: "",
    defaultValue: "UNKNOWN",
    values: {},
    parseState: msg => new Date(JSON.parse(msg.toString()).time.startup * 1000)
                          .toLocaleString()
  },
  [ `esper_${name}_device` ]: {
    state: `/service/esper/${chip_id}/info`,
    command: "",
    defaultValue: "UNKNOWN",
    values: {},
    parseState: msg => JSON.parse(msg.toString()).device
  }
});

export const esper_statistics = (name: string,
    prev_ui: Array<ControlUI> = []) => (
      prev_ui.concat([
        {
          type: "section",
          text: "Funkdose"
        },
        {
          type: "text",
          text: "Device Variant",
          icon: "chart-donut",
          topic: `esper_${name}_device`
        },
        {
          type: "text",
          text: "Version",
          icon: "source-branch",
          topic: `esper_${name}_version`
        },
        {
          type: "text",
          text: "IP",
          icon: "access-point-network",
          topic: `esper_${name}_ip`
        },
        {
          type: "text",
          text: "RSSI",
          icon: "wifi",
          topic: `esper_${name}_rssi`
        },
        {
          type: "text",
          text: "Running since…",
          icon: "av-timer",
          topic: `esper_${name}_uptime`
        }
      ])
    );
