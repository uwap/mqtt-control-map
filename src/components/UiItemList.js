// @flow
import React from "react";
import _ from "lodash";
import {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader
} from "material-ui/List";
import Switch from "material-ui/Switch";
import { renderIcon } from "utils/parseIconName";

export type UiItemListProps = {
  controls: Array<ControlUI>,
  state: State
};

export default class UiItemList extends React.Component<UiItemListProps> {
  constructor(props: UiItemListProps) {
    super(props);
  }

  render() {
    return this.props.controls.map((control, key) => (
      <ListItem key={key}>
        {control.icon == null || <ListItemIcon>{renderIcon(control.icon, "mdi-24px")}</ListItemIcon>}
        {this.renderControl(control)}
      </ListItem>
    ));
  }

  renderControl(control: ControlUI) {
    switch (control.type) {
      case "toggle": {
        return this.renderToggle(control);
      }
      default: {
        console.error(
          `Unknown UI type "${control.type}" for "${control.text}" component`
        );
        return "unknown ui type";
      }
    }
  }

  isEnabled(control: ControlUI) {
    const enableCondition = control.enableCondition;
    if (enableCondition == null) {
      return true;
    } else {
      const value = this.getValue(control);
      return enableCondition(
        value.internal || value.actual, value.actual, this.props.state);
    }
  }

  getValue(control: ControlUI) {
    const value = this.props.state[control.topic];
    if (value == null) {
      console.error(
        `Unknown topic "${control.topic}" in ${control.type} "${control.text}"`
      );
      return { internal: "error", actual: "error" };
    }
    return value;
  }

  toggleSwitch(control: ControlUI, newState: boolean) {

  }

  renderToggle(control: ControlUI) {
    const value = this.getValue(control);
    const isToggled = control.isToggled || (i => i === (control.on || "on"));
    const checked = isToggled(
      value.internal || value.actual, value.actual, this.props.state);
    return [
      <ListItemText key="label" primary={control.text} />,
      <ListItemSecondaryAction key="action">
        <Switch label={control.text}
          checked={checked}
          onChange={state => this.toggleSwitch(control, state)}
          disabled={!this.isEnabled(control)} />
      </ListItemSecondaryAction>
    ];
  }
}
