declare type Map<K,V> = { [K]: V };

declare type Classes = {
  classes: Map<string, string>
};

declare type Topic = {
  state: string,
  command: string,
  defaultValue: any,
  values: Map<string,any>,
  parseState?: (msg: Object) => any
};
declare type Topics = Map<string,Topic>;

declare type TopicDependentOption<T> = (
    internal: string, actual: any, state: State
  ) => T;
declare type StateDependentOption<T> = (
    internals: Map<string, string>, actuals: Map<string, any>, state: State
  ) => T;

interface UIControl {
  +type: string,
  +text: string,
  +topic: string
};

interface Enableable {
  enableCondition?: TopicDependentOption<boolean>
};

declare type UIToggle = $ReadOnly<{|
  type: "toggle",
  text: string,
  topic: string,
  icon?: string,
  enableCondition?: TopicDependentOption<boolean>,
  on?: string,
  off?: string,
  toggled?: TopicDependentOption<boolean>
|}>;

declare type UIDropDown = $ReadOnly<{|
  type: "dropDown",
  text: string,
  topic: string,
  icon?: string,
  enableCondition?: TopicDependentOption<boolean>,
  options: Map<string, any>,
  renderValue?: (value: string) => string
|}>;

declare type UISlider = $ReadOnly<{|
  type: "slider",
  text: string,
  topic: string,
  icon?: string,
  enableCondition?: TopicDependentOption<boolean>,
  min?: number,
  max?: number,
  step?: number
|}>;

declare type UISection = $ReadOnly<{|
  type: "section",
  text: string
|}>;

declare type UILink = $ReadOnly<{|
  type: "link",
  text: string,
  link: string,
  enableCondition?: StateDependentOption<boolean>,
  
  // TODO: check if both the following options are implemented
  icon?: string
|}>;

declare type UIText = $ReadOnly<{|
  type: "text",
  text: string,
  topic: string,
  icon?: string
|}>;

declare type ControlUI =
    UIToggle
  | UIDropDown
  | UISlider
  | UISection
  | UILink
  | UIText

declare type Control = {
  name: string,
  position: [number, number],
  icon: string | (
      internals: Map<string, string>,
      actuals: Map<string, any>,
      state: State
    ) => string,
  iconColor?: (
      internals: Map<string, string>,
      actuals: Map<string, any>,
      state: State
    ) => string,
  ui: Array<ControlUI>
};
declare type Controls = Map<string,Control>;

declare type Config = {
  space: Space,
  topics: Topics,
  controls: Controls,
  layers: Array<Layer>
};

declare type Space = {
  name: string,
  color: "red"|"pink"|"purple"|"deepPurple"|"indigo"|"blue"|"lightBlue"|"cyan"|"teal"|
          "green"|"lightGreen"|"lime"|"yellow"|"amber"|"orange"|"deepOrange"|"brown"|"grey"|"blueGrey",
  mqtt: string
};

declare type StateValue = {
  internal: string,
  actual: any
};
declare type State = Map<string,StateValue>;

//declare type State = {
//  mqtt: ?any,
//  uiOpened: ?string,
  // A map of the actual state values for each topic.
  // internal is the internal term for the value,
  // that is equal to the key in the values section of that
  // topic, for example given by:
  // values: { off: "OFF", on: "ON" }
  // and actual is the value of that or whatever is given by mqtt.
//  values: Map<string, { internal: ?string, actual: any }>,
//  visibleLayers: Array<string>
//};

declare type Point = [number, number];

declare type Layer = {
  image: string,
  name: string,
  baseLayer?: boolean,
  defaultVisibility: "visible" | "hidden",
  opacity?: number,
  bounds: {
    topLeft: Point,
    bottomRight: Point
  }
};
