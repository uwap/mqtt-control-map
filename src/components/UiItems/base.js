// @flow
import * as React from "react";
import MqttContext from "mqtt/context";

import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";

import throttle from "lodash/throttle";
import { renderRawIcon } from "config/icon";
import type { Icon } from "config/icon";

export type Helpers = {
  Icon: (props: Object) => React.Node,
  Label: (props: Object) => React.Node,
  Action: (props: Object) => React.Node
};

export type BaseComponent<T> = (
  helpers: Helpers,
  item: T,
  state: State,
  nextValue: <T: { +topic: string }> (item: T, next: string) => void
) => React.Node;

export type Component<T> = {
  id: string,
  name: string,
  desc: string,

  /*
   * TODO: Map<$Keys<T>, string> doesn't really work :(
   * See https://github.com/facebook/flow/issues/5276
   * If there is progress on the issue try to make it $Exact as well
   */
  parameters: Map<$Keys<T>, string>,
  baseComponent: BaseComponent<T>
};

type SuperT = $ReadOnly<{ text: string }>;

const IconHelper = ({item, state}: { item: { +icon?: Icon }, state: State }) =>
  ( <ListItemIcon>
    {item.icon == null || renderRawIcon(item.icon(state), "mdi-24px")}
  </ListItemIcon>
  );

const createHelpers = <T: SuperT> (item: T) =>
  ({
    Icon: IconHelper,
    Label: (props) => (
      <ListItemText primary={item.text} {...props} />
    ),
    Action: (props) => (
      <ListItemSecondaryAction {...props} />
    )
  });

const debouncedChangeState = (chState: (tpc: string, nxt: string) => void) => (
  throttle(<T: { +topic: string }> (item: T, next: string) =>
    chState(item.topic, next), 50, {
    leading: true,
    trailing: true
  })
);

const createComponent = <T: SuperT> (component: Component<T>) => ({
  component: (item: T) => (
    <MqttContext.Consumer>
      {({state, changeState}) => component.baseComponent(
        createHelpers(item), item, state, debouncedChangeState(changeState)
      )}
    </MqttContext.Consumer>
  )
});

export default createComponent;
