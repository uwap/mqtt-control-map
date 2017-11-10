// @flow
import React from "react";

export default function parseIconName(name: string): string {
  return `mdi ${name.split(" ").map((icon) => "mdi-".concat(icon)).join(" ")}`;
}

export const renderIcon = (name: string, extraClass?: string) => {
  return <i className={`${extraClass || ""} ${parseIconName(name)}`}></i>;
};
