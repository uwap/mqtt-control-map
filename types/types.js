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

declare type UIBase = {
  text: string,
  topic?: string,
  icon?: string, 
  enableCondition?: (internal: string, actual: any, state: State) => boolean
}

declare type UIToggle = {
  type: "toggle",
  on?: string,
  off?: string,
  toggled?: (internal: string, actual: any, state: State) => boolean,
} & UIBase;

declare type UIDropDown = {
  type: "dropDown",
  options: Map<string, any>,
  renderValue?: (value: string) => string
} & UIBase;

declare type UISlider = {
  type: "slider",
  min?: number,
  max?: number,
  step?: number
} & UIBase;

declare type UISection = {
  type: "section",
  text: string
};

declare type UILink = {
  type: "link",
  link: string
} & UIBase;

declare type UIText = {
  type: "text"
} & UIBase;

declare type ControlUI =
    UIToggle
  | UIDropDown
  | UISlider
  | UISection
  | UILink
  | UIText

declare type Control = {
  name: string,
  position: Array<number>,
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
