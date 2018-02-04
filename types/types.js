// @flow
import type { Color } from "config/colors";

declare type Map<K,V> = { [K]: V };

declare type Classes = {
  classes: Map<string, string>
};

declare type Internal = string;
declare type Actual = any;
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
