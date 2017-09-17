declare type Map<K,V> = { [K]: V };

declare type Topic = {
  state: string,
  command: string,
  value: any,
  values: Map<string,any>,
  parseState?: (msg: Object) => any
};
declare type Topics = Map<string,Topic>;

declare type ControlUI = {
  type: "toggle" | "dropDown" | "slider",
  text: string,
  topic: string,

  enableCondition?: (val: any) => boolean,
  
  // TOGGLE optional properties
  on?: string, // on override for toggle
  off?: string, // off override for toggle
  toggled?: (val: any) => boolean,

  // DROPDOWN optional properties
  options?: Map<string,any>, //options for dropDown

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
  controls: Controls
};

declare type State = {
  mqtt: ?any,
  ui: ?string,
  values: Map<string,any>
};
