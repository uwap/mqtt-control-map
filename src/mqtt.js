// @flow
import mqtt from "mqtt";
import { Actions } from "./state";
import { Store } from "redux";
import Config from "./config";
import R from "ramda";

export default function connectMqtt(url: string, store: Store<*, *>) {
  const client = mqtt.connect(url);
  client.on("connect", () => {
    store.dispatch({
      type: Actions.MQTT_CONNECT, payload: client
    });
    R.forEachObjIndexed(v =>
      client.subscribe(v.state), Config.topics);
  });
  client.on("message", (topic, message) => {
    store.dispatch({
      type: Actions.MQTT_MESSAGE,
      payload: {
        message: message,
        topic: topic
      }
    });
  });
  client.on("offline", () => {
    store.dispatch({ type: null });
  });
  client.on("close", () => {
    store.dispatch({ type: null });
  });
  client.on("reconnect", () => {
    store.dispatch({ type: null });
  });
}
