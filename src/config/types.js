// @flow
import type { TopicType } from "config/flowtypes";
import at from "lodash/at";
import set from "lodash/set";

export const string: TopicType = {
  from: (msg: Buffer) => msg.toString(),
  to: (msg: string) => Buffer.from(msg)
};

export const json = (path: string, innerType?: TopicType): TopicType => {
  const parseAgain = innerType?.from ?? ((x) => x.toString());
  const parseFirst = innerType?.to ?? ((x) => Buffer.from(x));
  return {
    from: (msg) => parseAgain(Buffer.from(
      at(JSON.parse(msg.toString()), path)[0].toString())),
    to: (msg) => Buffer.from(
      JSON.stringify(set({}, path, parseFirst(msg).toString())))
  };
};

export type TypeOptionParam = { otherwise?: string, [string]: string };
export const option = (values: TypeOptionParam): TopicType => {
  const defaultValue = (x) => {
    if (values.otherwise != null) {
      return values.otherwise;
    } else {
      return x;
    }
  };
  const mapVal = (x) => (values[x] != null ? values[x] : defaultValue(x));
  return {
    from: (x) => mapVal(x.toString()),
    to: (x) => Buffer.from(mapVal(x))
  };
};

export const jsonArray = {
  from: (msg: Buffer) => JSON.parse(msg.toString()).join(", "),
  to: (msg: string) => Buffer.from(`[${msg}]`)
};
