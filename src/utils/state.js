// @flow
import _ from "lodash";

export const getInternals = (state: State): Map<string, Internal> =>
  _.mapValues(state, (x) => x.internal || x.actual);

export const getActuals = (state: State): Map<string, Actual> =>
  _.mapValues(state, (x) => x.actual);
