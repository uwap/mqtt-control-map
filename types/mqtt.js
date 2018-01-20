declare module 'mqtt' {
  declare type QoS = 0 | 1 | 2;

  declare type ClientOptions = {
    wsOptions?: any, // TODO: websocket options
    keepalive?: number,
    reschedulePings?: boolean,
    clientId?: string,
    protocolId?: 'MQTT' | 'MQIsdp',
    protocolVersion?: 3 | 4,
    clean?: boolean,
    reconnectPeriod?: number,
    connectTimeout?: number,
    username?: string,
    password?: string | Buffer,
    incomingStore?: any, // TODO: redux store
    outgoingStore?: any, // TODO: store
    queueQoSZero?: boolean,
    will?: {
      topic?: string,
      payload?: Buffer,
      qos?: QoS,
      retain?: boolean
    },
    transformWsUrl?: any, // TODO: function
    resubscribe?: boolean
  };

  declare type PublishOptions = {
    qos?: QoS,
    retain?: boolean,
    dup?: boolean
  };

  declare type ClientSubscribeOptions = {
    qos: QoS
  };

  declare class Client {
    constructor(streamBuilder: any, options?: ClientOptions): Client; // TODO: StreamBuilder

    publish(topic: string, message: Buffer | string, options: ?PublishOptions, callback: any): void; // TODO: message: Buffer|string, callback..., topic array and topic object

    subscribe(topic: string | Array<string>, cb?: (error: Error, granted: any) => void): void; // TODO: granted
    subscribe(topic: string | Array<string>, opts: ClientSubscribeOptions, cb: (error: Error, granted: any) => void): void; // TODO: granted

    on(event: "message", // TODO: packet
      cb: (topic: string, payload: Buffer, packet: any) => void): void;
    on(event: "offline", cb: () => void): void;
    on(event: "reconnect", cb: () => void): void;
    on(event: "connect", cb: () => void): void;
    on(event: "close", cb: () => void): void;
  }

  declare function connect(url: string, options?: ClientOptions): Client;
}
