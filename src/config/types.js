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
  const defaultValue = (x) => {
    if (values.otherwise != null) {
      return values.otherwise;
    } else {
      throw new Error(
        `Value ${x.toString()} cannot by mapped by the option parameters given`
      );
    }
  };
  const mapVal = (x) => (values[x] != null ? values[x] : defaultValue(x));
  return (x) => mapVal(x.toString());
};

export const jsonArray = (msg: Buffer) => JSON.parse(msg.toString()).join(", ");
