// @flow
import type { TopicType } from "config/flowtypes";

export const string: TopicType = (msg) => msg.toString();
export const json = (path: string, innerType?: TopicType): TopicType => {
  const parseAgain = innerType == null ? (x) => x : innerType;
  return (msg) => parseAgain(JSON.parse(msg.toString())[path]);
};
