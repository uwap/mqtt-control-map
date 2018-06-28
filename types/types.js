// @flow
import type { Color } from "config/colors";

declare type Map<K,V> = { [K]: V };

declare type Classes = {
  classes: Map<string, string>
};

declare type State = Map<string,string>;

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
