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
import Input, { InputLabel } from "material-ui/Input";
import { FormControl } from "material-ui/Form";
import Select from "material-ui/Select";
import { MenuItem } from "material-ui/Menu";
import Button from "material-ui/Button";

import keyOf from "utils/keyOf";

type UiItemProps<I> = {
  item: I,
  state: State,
  onChangeState: (topic: string, nextState: any) => void
};

export default class UiItem<I> extends React.Component<UiItemProps<I>> {
  constructor(props: UiItemProps<I>) {
    super(props);
  }

  runPrimaryAction() {

  }

  changeState(next: any) {
    if (this.props.item.topic == null) {
      throw new Error(
        `Undefined topic in ${control.type} "${control.text}"`
      );
    }
    this.props.onChangeState(this.props.item.topic, next);
  }

  getValue() {
    const topic: string = this.props.item.topic || "";
    const value = this.props.state[topic];
    if (value == null) {
      throw new Error(
        `Unknown topic "${control.topic}" in ${control.type} "${control.text}"`
      );
    }
    return value;
  }

  isEnabled() {
    const enableCondition = this.props.item.enableCondition;
    if (enableCondition == null) {
      return true;
    } else {
      const value = this.getValue();
      return enableCondition(
        value.internal || value.actual, value.actual, this.props.state);
    }
  }

  render() {
    return null;
  }
}

export class Toggle extends UiItem<UIToggle> {
  isToggled = () => {
    const value = this.getValue();
    const control = this.props.item;
    const isChecked = control.toggled || ((i) => i === (control.on || "on"));
    const checked = isChecked(
      value.internal || value.actual, value.actual, this.props.state);
    return checked;
  }

  runPrimaryAction = () => {
    if (this.isEnabled()) {
      const control = this.props.item;
      const toggled = this.isToggled();
      const next = toggled ? (control.off || "off") : (control.on || "on");
      this.changeState(next);
    }
  }

  render() {
    return [
      <ListItemText key="label" primary={this.props.item.text} />,
      <ListItemSecondaryAction key="action">
        <Switch label={this.props.item.text}
          checked={this.isToggled()}
          onChange={this.runPrimaryAction}
          disabled={!this.isEnabled()} />
      </ListItemSecondaryAction>
    ];
  }
}

export class DropDown extends UiItem<UIDropDown> {
  runPrimaryAction = (next?: any) => {
    if (this.isEnabled()) {
      const control = this.props.item;
      const keys = _.keys(control.options);
      const value = this.getValue();
      const valueIndex = keyOf(keys, value);
      if (next == null) {
        this.changeState(keys[(valueIndex + 1) % keys.length]);
      } else {
        this.changeState(next);
      }
    }
  }

  render() {
    const control = this.props.item;
    const value = this.getValue();
    const id = `${control.topic}-${control.name}`;
    const options = control.options;
    if (options == null) {
      throw new Error(
        `Parameter "options" missing for ${control.type} "${control.text}"`
      );
    }
    return (
      <FormControl>
        <InputLabel htmlFor={id}>{control.text}</InputLabel>
        <Select value={value.internal || value.actual}
          onChange={(event) => this.runPrimaryAction(event.target.value)}
          disabled={!this.isEnabled()}
          input={<Input id={id} />}
        >
          {_.map(options, (v, k) => <MenuItem value={k} key={k}>{v}</MenuItem>)}
        </Select>
      </FormControl>
    );
  }
}

export class Link extends UiItem<UILink> {
  runPrimaryAction = () => {
    const control = this.props.item;
    if (control.link == null) {
      throw new Error(
        `Parameter "link" missing for ${control.type} "${control.text}"`
      );
    }
    if (this.isEnabled()) {
      window.open(control.link, "_blank");
    }
  }

  render() {
    return (
      <Button raised
        onClick={this.runPrimaryAction}
        color="primary"
        disabled={!this.isEnabled()}
      >
        {this.props.item.text}
      </Button>
    );
  }
}

export class Section extends UiItem<UISection> {
  render() {
    return (
      <ListSubheader>{this.props.item.text}</ListSubheader>
    );
  }
}
