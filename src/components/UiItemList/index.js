// @flow
import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { renderIcon } from "config/icon";

import type { ControlUI } from "config/flowtypes";

import { Toggle, DropDown, Link,
  Section, Text, Progress, Slider } from "./UiItem";

export type UiItemListProps = {
  controls: Array<ControlUI>,
  state: State,
  onChangeState: (topic: string, nextState: string) => void
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
        return this.renderControl(control, key.toString());
      }
      return (
        <ListItem key={key}>
          <React.Fragment>
            {control.icon == null || control.type === "link" ||
              <ListItemIcon key={`${key.toString()}-liicon`}>
                {renderIcon(control.icon(this.props.state), "mdi-24px")}
              </ListItemIcon>}
            {this.renderControl(control, key.toString())}
          </React.Fragment>
        </ListItem>
      );
    });
  }

  renderControl(control: ControlUI, key: string) {
    switch (control.type) {
    case "toggle": {
      return <Toggle item={control}
        state={this.props.state}
        onChangeState={this.props.onChangeState}
        key={`${key}-licontrol`} />;
    }
    case "dropDown": {
      return <DropDown item={control}
        state={this.props.state}
        onChangeState={this.props.onChangeState}
        key={`${key}-licontrol`} />;
    }
    case "section": {
      return <Section item={control}
        state={this.props.state}
        onChangeState={this.props.onChangeState}
        key={`${key}-licontrol`} />;
    }
    case "link": {
      return <Link item={control}
        state={this.props.state}
        onChangeState={this.props.onChangeState}
        key={`${key}-licontrol`} />;
    }
    case "slider": {
      return <Slider item={control}
        state={this.props.state}
        onChangeState={this.props.onChangeState}
        key={`${key}-licontrol`} />;
    }
    case "text": {
      return <Text item={control}
        state={this.props.state}
        onChangeState={this.props.onChangeState}
        key={`${key}-licontrol`} />;
    }
    case "progress": {
      return <Progress item={control}
        state={this.props.state}
        onChangeState={this.props.onChangeState}
        key={`${key}-licontrol`} />;
    }
    default: {
      throw new Error(
        `Unknown UI type "${control.type}" for "${control.text}" component`
      );
    }
    }
  }
}
