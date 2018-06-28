// @flow
import type { TopicType } from "config/flowtypes";
import at from "lodash/at";

export const string: TopicType = (msg: Buffer) => msg.toString();

export const json = (path: string, innerType?: TopicType): TopicType => {
  const parseAgain = innerType == null ? (x) => x.toString() : innerType;
  return (msg) => parseAgain(Buffer.from(
    at(JSON.parse(msg.toString()), path)[0].toString()));
};

export type TypeOptionParam = { otherwise?: string, [string]: string };
export const option = (values: TypeOptionParam): TopicType => {
  // TODO: error
  const defaultValue = values.otherwise != null ? values.otherwise : "";
  const mapVal = (x) => (values[x] != null ? values[x] : defaultValue);
  return (x) => mapVal(x.toString());
};

export const jsonArray = (msg: Buffer) => JSON.parse(msg.toString()).join(", ");
