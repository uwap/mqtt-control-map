declare type Map<K,V> = { [K]: V };

declare type Topic = {
  state: string,
  command: string,
  defaultValue: any,
  values: Map<string,any>,
  parseState?: (msg: Object) => any
};
declare type Topics = Map<string,Topic>;

declare type ControlUI = {
  type: "toggle" | "dropDown" | "slider" | "section",
  text: string,
  topic?: string,
  icon?: string,

  enableCondition?: (internal: string, actual: any) => boolean,

  // LINK optiona properties
  link?: string,

  // TOGGLE optional properties
  on?: string, // on override for toggle
  off?: string, // off override for toggle
  toggled?: (internal: string, actual: any) => boolean,

  // DROPDOWN optional properties
  options?: Map<string,any>, //options for dropDown
  renderValue?: (value: string) => string

  // SLIDER optional properties
  min?: number,
  max?: number,
  step?: number
};

declare type Control = {
  name: string,
  position: Array<number>,
  icon: string,
  iconColor?: (state: Map<string,any>) => string,
  ui: Array<ControlUI>
};
declare type Controls = Map<string,Control>;

declare type Config = {
  topics: Topics,
  controls: Controls,
  layers: Array<Layer>
};

declare type State = {
  mqtt: ?any,
  uiOpened: ?string,
  // A map of the actual state values for each topic.
  // internal is the internal term for the value,
  // that is equal to the key in the values section of that
  // topic, for example given by:
  // values: { off: "OFF", on: "ON" }
  // and actual is the value of that or whatever is given by mqtt.
  values: Map<string, { internal: ?string, actual: any }>,
  visibleLayers: Array<string>
};

declare type Layer = {
  image: string,
  name: string,
  baseLayer: boolean,
  defaultVisibility: "visible" | "hidden",
};

declare type StateAction = {
  type: "DISCONNECT" | "CONNECT" | "MESSAGE" | "UI_POPUP",
  payload?: any
};
