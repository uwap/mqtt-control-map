// @flow
import _ from "lodash";

const keyOf = <a, b> (map: Map<a, b>, value: b): ?a => (
  _.findKey(map, (x) => x === value)
);

export default keyOf;
