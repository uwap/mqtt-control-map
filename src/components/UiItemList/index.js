// @flow
import React from "react";
import {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText
} from "material-ui/List";
import { renderIcon } from "utils/parseIconName";

import type { ControlUI, UIControl, UISlider } from "config/flowtypes";

// TODO: Use something else
import Slider from "material-ui-old/Slider";
import MuiThemeProvider from "material-ui-old/styles/MuiThemeProvider";

import { Toggle, DropDown, Link, Section, Text, Progress } from "./UiItem";

export type UiItemListProps = {
  controls: Array<ControlUI>,
  state: State,
  onChangeState: (topic: string, nextState: Actual) => void
};

export default class UiItemList extends React.Component<UiItemListProps> {
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
      return this.renderSlider(control);
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

  getValue(control: UIControl) {
    const value = this.props.state[control.topic];
    if (value == null) {
      throw new Error(
        `Unknown topic "${control.topic}" in ${control.type} "${control.text}"`
      );
    }
    return value;
  }

  renderSlider(control: UISlider) {
    const value = this.getValue(control);
    return [
      <ListItemText primary={control.text} key="text" />,
      <ListItemSecondaryAction key="action">
        <MuiThemeProvider>
          <Slider value={value.internal || value.actual}
            min={control.min || 0}
            max={control.max || 100}
            step={control.step || 1}
            onChange={
              (_event, newvalue) =>
                this.props.onChangeState(control.topic, newvalue)
            }
            style={{width: 100}}
          /></MuiThemeProvider>
      </ListItemSecondaryAction>
    ];
  }
}
