// @flow
import type { Color } from "config/colors";

export type Topic = {
  state: string,
  command: string,
  defaultValue: Actual,
  values: Map<Internal, Actual>,
  parseState?: (msg: Object) => any
};
export type Topics = Map<string, Topic>;

export type TopicDependentOption<T> = (
    internal: Internal, actual: Actual, state: State
  ) => T;
export type StateDependentOption<T> = (
    internals: Map<string, Internal>, actuals: Map<string, Actual>, state: State
  ) => T;

export interface UIControl {
  +type: string,
  +text: string,
  +topic: string
}

export interface Enableable {
  enableCondition?: TopicDependentOption<boolean>
}

export type UIToggle = $ReadOnly<{|
  type: "toggle",
  text: string,
  topic: string,
  icon?: string,
  enableCondition?: TopicDependentOption<boolean>,
  on?: string,
  off?: string,
  toggled?: TopicDependentOption<boolean>
|}>;

export type UIDropDown = $ReadOnly<{|
  type: "dropDown",
  text: string,
  topic: string,
  icon?: string,
  enableCondition?: TopicDependentOption<boolean>,
  options: Map<string, any>,
  renderValue?: (value: string) => string
|}>;

export type UISlider = $ReadOnly<{|
  type: "slider",
  text: string,
  topic: string,
  icon?: string,
  enableCondition?: TopicDependentOption<boolean>,
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
  enableCondition?: StateDependentOption<boolean>,

  // TODO: check if both the following options are implemented
  icon?: string
|}>;

export type UIText = $ReadOnly<{|
  type: "text",
  text: string,
  topic: string,
  icon?: string
|}>;

export type UIProgress = $ReadOnly<{|
  type: "progress",
  text: string,
  topic: string,
  icon?: string,
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
  icon: string | (
      internals: Map<string, Internal>,
      actuals: Map<string, Actual>,
      state: State
    ) => string,
  iconColor?: (
      internals: Map<string, Internal>,
      actuals: Map<string, Actual>,
      state: State
    ) => Color,
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

export type Config = {
  space: Space,
  topics: Topics | Array<Topics>,
  controls: Controls,
  layers: Array<Layer>
};
