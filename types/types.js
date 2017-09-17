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
  type: "toggle" | "dropDown",
  text: string,
  topic: string,
  on?: string, // on override for toggle
  off?: string, // off override for toggle
  options?: Map<string,any> //options for dropDown
};

declare type Control = {
  name: string,
  position: Array<number>,
  icon: string,
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
