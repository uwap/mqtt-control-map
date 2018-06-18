// @flow
import React from "react";
import {
  ListItem,
  ListItemIcon
} from "@material-ui/core/List";
import { renderIcon } from "utils/parseIconName";

import type { ControlUI } from "config/flowtypes";

import { Toggle, DropDown, Link,
        Section, Text, Progress, Slider } from "./UiItem";

export type UiItemListProps = {
  controls: Array<ControlUI>,
  state: State,
  onChangeState: (topic: string, nextState: Actual) => void
};

export default class UiItemList extends React.PureComponent<UiItemListProps> {
  constructor(props: UiItemListProps) {
    super(props);
  }

  render() {
    return this.props.controls.map((control, key) => {
      if (control.type == null) {
        throw new Error(
          "A control is missing the \"type\" parameter"
        );
      }
      if (control.type === "section") {
        return this.renderControl(control);
      }
      return (
        <ListItem key={key}>
          {control.icon == null ||
            <ListItemIcon>{renderIcon(control.icon, "mdi-24px")}</ListItemIcon>}
          {this.renderControl(control)}
        </ListItem>
      );
    });
  }

  renderControl(control: ControlUI) {
    switch (control.type) {
    case "toggle": {
      return <Toggle item={control}
        state={this.props.state}
        onChangeState={this.props.onChangeState} />;
    }
    case "dropDown": {
      return <DropDown item={control}
        state={this.props.state}
        onChangeState={this.props.onChangeState} />;
    }
    case "section": {
      return <Section item={control}
        state={this.props.state}
        onChangeState={this.props.onChangeState} />;
    }
    case "link": {
      return <Link item={control}
        state={this.props.state}
        onChangeState={this.props.onChangeState} />;
    }
    case "slider": {
      return <Slider item={control}
        state={this.props.state}
        onChangeState={this.props.onChangeState} />;
    }
    case "text": {
      return <Text item={control}
        state={this.props.state}
        onChangeState={this.props.onChangeState} />;
    }
    case "progress": {
      return <Progress item={control}
        state={this.props.state}
        onChangeState={this.props.onChangeState} />;
    }
    default: {
      throw new Error(
        `Unknown UI type "${control.type}" for "${control.text}" component`
      );
    }
    }
  }
}
