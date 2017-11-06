// @flow
import R from "ramda";
import { createStore } from "redux";
import Config from "./config";
import { keyOf } from "./util";
import { onSwitch, isToggled } from "./UiItems";

export const Actions = Object.freeze({
  MQTT_CONNECT: "CONNECT",
  MQTT_MESSAGE: "MESSAGE",
  CHANGE_UI: "UI_POPUP"
});

const initState : State = {
  mqtt: null,
  uiOpened: null,
  values: R.map(
    topic => { return {
      internal: keyOf(topic.values, topic.defaultValue),
      actual: topic.defaultValue
    };}, Config.topics),
  visibleLayers: []
};

const onMessage = (state: State, action: StateAction) => {
  if (action.payload == undefined) return state;
  // action.payload.topic is the mqtt topic
  // topics is the list of all internal topic references
  // that have their state topic set to action.payload.topic
  const payload = action.payload == undefined ? { topic: "", message: {} }
    : action.payload; // thx flow </3
  const topics = R.keys(R.pickBy(
    val => val.state == payload.topic, Config.topics));
  const message = payload.message;
  const parsedMessage = (topic: string) => {
    let parseFunction = Config.topics[topic].parseState;
    if (parseFunction == null) {
      return message.toString();
    } else {
      return parseFunction(message);
    }
  };
  const newValue = (topic: string) => {
    return {
      actual: parsedMessage(topic),
      internal: keyOf(Config.topics[topic].values,parsedMessage(topic))
    };
  };
  return R.mergeDeepRight(state, R.objOf("values", R.mergeAll(
    R.map(topic => R.objOf(topic, newValue(topic)), topics)
  )));
};

const match = (value: any, array: Map<any,any>) => array[value];
const handleEvent = (state: State = initState, action: StateAction) => {
  return match(action.type, {
    [Actions.MQTT_CONNECT   ]: R.merge(state, { mqtt: action.payload }),
    [Actions.MQTT_MESSAGE   ]: onMessage(state, action),
    [Actions.CHANGE_UI      ]: (() => {
      const control = Config.controls[action.payload];
      if (action.toggle && control.ui.length > 0 && control.ui[0].type == "toggle") {
        const props = control.ui[0];
        onSwitch(props.topic, props, state)(null, !isToggled(state, props));
        return state;
      } else {
        return R.merge(state, { uiOpened: action.payload });
      }
    })(),
    [null]: state
  });
};

export const store = createStore(handleEvent, initState);
