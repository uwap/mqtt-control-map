// @flow
import type { Icon } from "config/icon";

export type TopicType = {
  from: (msg: Buffer) => string,
  to: (newstate: string) => Buffer
};

export type StateTopicType = TopicType | ((msg: Buffer) => string);
export type CommandTopicType = TopicType | ((newstate: string) => Buffer);

export type StateCommand<T> = {
  name: string,
  type: T
}

export type Topic = {
  state?: StateCommand<StateTopicType>,
  command?: StateCommand<CommandTopicType>,
  defaultValue: string
};
export type Topics = Map<string, Topic>;

export interface UIControl {
  +type: string,
  +text: string,
  +topic: string
}

export type Enableable = $ReadOnly<{
  enableCondition?: (s: State) => boolean
}>;

export type UIToggle = $ReadOnly<{|
  type: "toggle",
  text: string,
  topic: string,
  icon?: Icon,
  enableCondition?: (s: State) => boolean,
  on?: string,
  off?: string,
  toggled?: (v: string, s: State) => boolean
|}>;

export type UIDropDown = $ReadOnly<{|
  type: "dropDown",
  text: string,
  topic: string,
  icon?: Icon,
  enableCondition?: (s: State) => boolean,
  options: Map<string, string>,
  renderValue?: (value: string) => string
|}>;

export type UISlider = $ReadOnly<{|
  type: "slider",
  text: string,
  topic: string,
  icon?: Icon,
  enableCondition?: (s: State) => boolean,
  min?: number,
  max?: number,
  step?: number
|}>;

export type UISection = $ReadOnly<{|
  type: "section",
  text: string
|}>;

export type UILink = $ReadOnly<{|
  type: "link",
  text: string,
  link: string,
  enableCondition?: (s: State) => boolean,
  icon?: Icon
|}>;

export type UIText = $ReadOnly<{|
  type: "text",
  text: string,
  topic: string,
  icon?: Icon
|}>;

export type UIProgress = $ReadOnly<{|
  type: "progress",
  text: string,
  topic: string,
  icon?: Icon,
  min?: number,
  max?: number
|}>;

export type ControlUI =
    UIToggle
  | UIDropDown
  | UISlider
  | UISection
  | UILink
  | UIText
  | UIProgress

export type Control = {
  name: string,
  position: [number, number],
  icon: Icon,
  ui: Array<ControlUI>
};
export type Controls = Map<string, Control>;

export type Space = {
  name: string,
  color: "red" | "pink" | "purple"
        | "deepPurple" | "indigo" | "blue"
        | "lightBlue" | "cyan" | "teal"
        | "green" | "lightGreen" | "lime"
        | "yellow" | "amber" | "orange"
        | "deepOrange" | "brown" | "grey" | "blueGrey",
  mqtt: string
};

export type Layer = {
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
export type Config = {
  space: Space,
  topics: Topics | Array<Topics>,
  controls: Controls,
  layers: Array<Layer>
};
