// @flow
import mqtt from "mqtt";
import uniq from "lodash/uniq";

// TODO: type mqtt.js

export type MqttSettings = {
  onReconnect?: (mqtt: mqtt.Client) => void,
  onDisconnect?: (mqtt: mqtt.Client) => void,
  onMessage?: (topic: string, message: Buffer) => void,
  onMessageSent?: (topic: string, message: Buffer) => void,
  onConnect?: (mqtt: mqtt.Client) => void,
  subscribe?: Array<string>
}

export type MessageCallback = (topic: string, message: Buffer) => void;

export default function connectMqtt(
  url: string,
  settings: MqttSettings = {}
): MessageCallback {
  const client = mqtt.connect(url);
  client.on("connect", () => {
    if (settings.subscribe != null) {
      client.subscribe(uniq(settings.subscribe));
    }
    if (settings.onConnect != null) {
      settings.onConnect(client);
    }
  });
  client.on("message", (topic: string, message: Buffer) => {
    if (settings.onMessage != null) {
      settings.onMessage(topic, message);
    }
  });
  client.on("offline", () => {
    if (settings.onDisconnect != null) {
      settings.onDisconnect(client);
    }
  });
  client.on("close", () => {
    if (settings.onDisconnect != null) {
      settings.onDisconnect(client);
    }
  });
  client.on("reconnect", () => {
    if (settings.onReconnect != null) {
      settings.onReconnect(client);
    }
  });
  return (topic: string, message: Buffer) => {
    client.publish(topic, message, {}, (error) => {
      if (error == null && settings.onMessageSent != null) {
        settings.onMessageSent(topic, message);
      }
    });
  };
}
