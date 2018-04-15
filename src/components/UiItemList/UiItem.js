// @flow
import React from "react";
import keys from "lodash/keys";
import map from "lodash/map";
import {
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader
} from "material-ui/List";
import Switch from "material-ui/Switch";
import Input, { InputLabel } from "material-ui/Input";
import { FormControl } from "material-ui/Form";
import Select from "material-ui/Select";
import { MenuItem } from "material-ui/Menu";
import Button from "material-ui/Button";
import { LinearProgress } from "material-ui/Progress";

import type {
  UIControl, UIToggle, UIDropDown, UILink,
  UISection, UIText, UIProgress
} from "config/flowtypes";

import keyOf from "utils/keyOf";
import { getInternals, getActuals } from "utils/state";

type UiItemProps<I> = {
  item: I,
  state: State,
  onChangeState: (topic: string, nextState: Actual) => void
};

// eslint-disable-next-line flowtype/no-weak-types
export default class UiItem<I:Object>
    extends React.PureComponent<UiItemProps<I>> {
  constructor(props: UiItemProps<I>) {
    super(props);
  }

  runPrimaryAction() {

  }

  render() {
    return null;
  }

  /*
   * TODO: The type system can't really check if the enableCondition is of
   * any function type or if it is a TopicDependentOption or a
   * StateDependentOption. This should be fixed.
   */
  isEnabled() {
    if (Object.keys(this.props.item).includes("enableCondition") &&
      typeof this.props.item.enableCondition == "function") {
      const enableCondition = this.props.item.enableCondition;
      const state = this.props.state;
      const internals = getInternals(state);
      const actuals = getActuals(state);
      return enableCondition(internals, actuals, state);
    } else {
      return true;
    }
  }
}

export class UiControl<I: UIControl> extends UiItem<I> {
  constructor(props: UiItemProps<I>) {
    super(props);
  }

  changeState(next: Actual) {
    if (this.props.item.topic == null) {
      throw new Error(
        `Missing topic in ${this.props.item.type} "${this.props.item.text}"`
      );
    }
    this.props.onChangeState(this.props.item.topic, next);
  }

  getValue() {
    const control = this.props.item;
    const topic: string = control.topic || "";
    const value = this.props.state[topic];
    if (value == null) {
      if (topic === "") {
        throw new Error(
          `Missing topic in ${control.type} "${control.text}"`
        );
      }
      throw new Error(
        `Unknown topic "${topic}" in ${control.type} "${control.text}"`
      );
    }
    return value;
  }

  isEnabled() {
    if (Object.keys(this.props.item).includes("enableCondition") &&
      // $FlowFixMe
      typeof this.props.item.enableCondition == "function") {
      const enableCondition = this.props.item.enableCondition;
      const value = this.getValue();
      return enableCondition(
        value.internal || value.actual, value.actual, this.props.state);
    } else {
      return true;
    }
  }
}

export class Toggle extends UiControl<UIToggle> {
  isToggled = () => {
    const value = this.getValue();
    const control = this.props.item;
    const isChecked = control.toggled ||
      ((i, _a, _s) => i === (control.on || "on"));
    const checked = isChecked(
      value.internal || value.actual, value.actual, this.props.state);
    return checked;
  }

  runPrimaryAction = () => {
    if (this.isEnabled()) {
      const control = this.props.item;
      const toggled = this.isToggled();
      const on = control.on == null ? "on" : control.on;
      const off = control.off == null ? "off" : control.off;
      const next = toggled ? off : on;
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
          disabled={!this.isEnabled()}
          color="primary" />
      </ListItemSecondaryAction>
    ];
  }
}

export class DropDown extends UiControl<UIDropDown> {
  runPrimaryAction = (next?: Actual) => {
    if (this.isEnabled()) {
      const control = this.props.item;
      const optionKeys = keys(control.options);
      const value = this.getValue();
      const valueIndex = keyOf(optionKeys, value);
      if (next == null) {
        this.changeState(optionKeys[(valueIndex + 1) % optionKeys.length]);
      } else {
        this.changeState(next);
      }
    }
  }

  render() {
    const control = this.props.item;
    const value = this.getValue();
    const id = `${control.topic}-${control.text}`;
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
          {map(options, (v, k) => <MenuItem value={k} key={k}>{v}</MenuItem>)}
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
      <Button
        variant="raised"
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

export class Text extends UiControl<UIText> {
  render() {
    return [
      <ListItemText key="label" secondary={this.props.item.text} />,
      <ListItemText key="vr" primary={this.getValue().internal} align="right" />
    ];
  }
}

export class Progress extends UiControl<UIProgress> {
  render() {
    const min = this.props.item.min || 0;
    const max = this.props.item.max || 100;
    const val = parseFloat(this.getValue().internal || this.getValue().actual);
    const value = val * 100 / max - min;
    return [
      <ListItemText key="label" secondary={this.props.item.text} />,
      <div style={{ flex: "10 1 auto" }} key="progressbar">
        <LinearProgress variant="determinate" value={value} />
      </div>
    ];
  }
}
