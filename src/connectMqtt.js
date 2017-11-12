// @flow
import mqtt from "mqtt";

// TODO: type mqtt.js

export type MqttSettings = {
  onReconnect?: (mqtt: Object) => void,
  onDisconnect?: (mqtt: Object) => void,
  onMessage?: (topic: string, message: Object) => void,
  onMessageSent?: (topic: string, message: any) => void,
  onConnect?: (mqtt: Object) => void,
  subscribe?: Array<string>
}

export type MessageCallback = (topic: string, message: any) => void;

export default function connectMqtt(
  url: string,
  settings: MqttSettings = {}
): MessageCallback {
  const client = mqtt.connect(url);
  client.on("connect", () => {
    if (settings.subscribe != null) {
      client.subscribe(settings.subscribe);
    }
    if (settings.onConnect != null) {
      settings.onConnect(client);
    }
  });
  client.on("message", (topic, message) => {
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
  return (topic: string, message: any) => {
    client.publish(topic, message, null, (error) => {
      if (error == null && settings.onMessageSent != null) {
        settings.onMessageSent(topic, message);
      }
    });
  };
}
