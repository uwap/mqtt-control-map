// @flow
import mqtt from "mqtt";
import { MQTT_MESSAGE, MQTT_CONNECT, MQTT_DISCONNECT } from "./stateActions";
import { Store } from "redux";
import Config from "./config";
import R from "ramda";

export default function connectMqtt(url: string, store: Store<*,*>) {
  const client = mqtt.connect(url);
  client.on("connect", () => {
    store.dispatch({
      type: MQTT_CONNECT, mqtt: client
    });
    R.forEachObjIndexed(v =>
      client.subscribe(v.state), Config.topics);
  });
  client.on("message", (topic, message) => {
    store.dispatch({
      type: "mqtt_message", message: message, topic: topic
    });
  });
}
