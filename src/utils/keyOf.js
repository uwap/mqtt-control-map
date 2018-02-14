// @flow
import findKey from "lodash/findKey";

const keyOf = <a, b> (map: Map<a, b>, value: b): ?a => (
  findKey(map, (x) => x === value)
);

export default keyOf;
