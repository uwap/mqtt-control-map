// @flow
import R from "ramda";

export const keyOf = <a, b> (map: Map<b, a>, value: a): ?b =>
  ((keys) => keys[R.findIndex((k) => map[k] === value, keys)])(R.keys(map));
