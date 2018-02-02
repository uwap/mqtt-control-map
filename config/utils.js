// @flow

export const rainbow = "rgba(200,120,120,0.5);"
      + "--before-background: linear-gradient(40deg, #FF0000 0%, #00FF00 50%, #0000FF 70%, #FFFF00 100%);";

export const hex = (hex: string) => hex;

export const rgb = (r: number, g: number, b: number) => (
  `rgb(${r.toString()}, ${g.toString()}, ${b.toString()})`
);

export const rgba = (r: number, g: number, b: number, a: number) => (
  `rgb(${r.toString()}, ${g.toString()}, ${b.toString()}, ${a.toString()})`
);

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
