declare module '@slack/client';

declare namespace Slack {
  class RtmClient {
    constructor(token: string)

    start(): any

    on(event: string, callback: (message: Message) => any): void

    sendMessage(message: string, channel: string): any
  }

  interface Message {
    self: {
      id: number,
    };
    text: string;
    type: string;
    channel: string;
  }
}
