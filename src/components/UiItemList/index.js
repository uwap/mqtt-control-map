// @flow
import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { renderRawIcon } from "config/icon";

import type { ControlUI } from "config/flowtypes";

import { Toggle, DropDown, Link,
  Section, Text, Progress, Slider } from "./UiItem";
import MqttContext from "mqtt/context";
import type { MqttContextValue } from "mqtt/context";

export type UiItemListProps = {
  controls: Array<ControlUI>
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
        return(
          <MqttContext.Consumer>
            {this.renderListItem(control, key)}
          </MqttContext.Consumer>
        );
      }
      return (
        <ListItem key={key}>
          <MqttContext.Consumer>
            {this.renderListItem(control, key)}
          </MqttContext.Consumer>
        </ListItem>
      );
    });
  }

  renderListItem(control: ControlUI, key: number) {
    return (mqtt: MqttContextValue) => {
      const node = this.renderControl(control, key.toString(), mqtt);
      if (control.icon == null || control.type === "link") {
        return node;
      } else {
        const listIconNode = (
          <ListItemIcon key={`${key.toString()}-liicon`}>
            {renderRawIcon(control.icon(mqtt.state), "mdi-24px")}
          </ListItemIcon>
        );
        return [listIconNode, node];
      }
    };
  }

  renderControl(control: ControlUI, key: string, mqtt: MqttContextValue) {
    const props = {
      state: mqtt.state,
      onChangeState: mqtt.changeState,
      key: `${key}-licontrol`
    };
    switch (control.type) {
    case "toggle": {
      return <Toggle item={control} {...props} />;
    }
    case "dropDown": {
      return <DropDown item={control} {...props} />;
    }
    case "section": {
      return <Section item={control} {...props} />;
    }
    case "link": {
      return <Link item={control} {...props} />;
    }
    case "slider": {
      return <Slider item={control} {...props} />;
    }
    case "text": {
      return <Text item={control} {...props} />;
    }
    case "progress": {
      return <Progress item={control} {...props} />;
    }
    default: {
      throw new Error(
        `Unknown UI type "${control.type}" for "${control.text}" component`
      );
    }
    }
  }
}
