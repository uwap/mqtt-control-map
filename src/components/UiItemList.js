// @flow
import * as React from "react";
import ListItem from "@mui/material/ListItem";

import type { ControlUI } from "config/flowtypes";

import UiItem from "components/UiItems";

export type UiItemListProps = {
  controls: Array<ControlUI>
};

export default function UiItemList(props: UiItemListProps): React.Node {
  return props.controls.map((control, key) => {
    if (control.type == null) {
      throw new Error(
        "A control is missing the \"type\" parameter"
      );
    }
    if (control.type === "section") {
      return (
        <UiItem item={control} />
      );
    }
    return (
      <ListItem key={key}>
        <UiItem item={control} />
      </ListItem>
    );
  });
}

