import { RtmClient, CLIENT_EVENTS, RTM_EVENTS } from '@slack/client';

class MoneyBot {
  client: Slack.RtmClient;
  botId: string;

  constructor(token: string) {
    this.client = new RtmClient(token);
  }

  start(): void {
    this.listen();
    this.client.start();
  }

  private listen(): void {
    this.client.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (message) => {
      this.botId = this.getBotId(message);
    });

    this.client.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, () => {
      console.log('Ready!');
    });

    this.client.on(RTM_EVENTS.MESSAGE, (message) => {
      if (this.wasMentioned(message)) {
        console.log('I was mentioned');
        this.client.sendMessage('I was mentioned.', message.channel);
      }
    });
  }

  private wasMentioned(message: Slack.Message): boolean {
    return message.type === 'message' && message.text.startsWith(this.botId);
  }

  private getBotId(message: Slack.Message): string {
    return `<@${message.self.id}>`;
  }
}

export default MoneyBot;
