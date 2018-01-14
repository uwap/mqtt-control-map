// @flow

export const rainbow = "rgba(200,120,120,0.5);"
      + "--before-background: linear-gradient(40deg, #FF0000 0%, #00FF00 50%, #0000FF 70%, #FFFF00 100%);";

export const esper_topics = (chip_id: string) => ({
  [ `esper_${chip_id}_version` ]: {
    state: `/service/esper/${chip_id}/info`,
    command: "",
    defaultValue: "UNKNOWN",
    values: {},
    parseState: msg => JSON.parse(msg.toString()).version.esper
  }
});

export const esper_statistics = (chip_id: string,
    prev_ui: Array<ControlUI> = []) => (
      prev_ui.concat([
        {
          type: "section",
          text: "Funkdose"
        },
        {
          type: "text",
          text: "Version",
          topic: `esper_${chip_id}_version`
        }
      ])
    );
