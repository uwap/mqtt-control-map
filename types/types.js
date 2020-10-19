// @flow
import type { Color } from "config/colors";

declare type Map<K,V> = { [K]: V };

declare type Classes = {
  classes: Map<string, string>
};

declare type State = Map<string,string>;

declare type Point = [number, number];
