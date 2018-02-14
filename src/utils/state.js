// @flow
import mapValues from "lodash/mapValues";

export const getInternals = (state: State): Map<string, Internal> =>
  mapValues(state, (x) => x.internal || x.actual);

export const getActuals = (state: State): Map<string, Actual> =>
  mapValues(state, (x) => x.actual);
