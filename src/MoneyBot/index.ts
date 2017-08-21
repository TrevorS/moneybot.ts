import { RtmClient, CLIENT_EVENTS, RTM_EVENTS } from '@slack/client';

import Action from './Action';
import { ActionResponse } from './ActionResponse';

class MoneyBot {
  private client: Slack.RtmClient;
  private botId: string;
  private actions: Array<Action>;

  constructor(token: string) {
    this.client = new RtmClient(token);
    this.actions = [];
  }

  start(): void {
    this.listen();
    this.client.start();
  }

  addAction(action: Action): void {
    this.actions.push(action);
  }

  createAndAddAction(regex: RegExp, response: ActionResponse): void {
    const action = new Action(regex, response);

    this.addAction(action);
  }

  clearActions(): void {
    this.actions = [];
  }

  private listen(): void {
    this.client.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (message) => {
      this.botId = this.getBotId(message);
    });

    this.client.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, () =>
      console.log('Ready!'));

    this.client.on(RTM_EVENTS.MESSAGE, (message) => {
      if (this.wasMentioned(message)) {
        this.actions.forEach((action) => {
          if (action.doesMatch(message)) {
            action.execute(this.client, message);
          }
        });
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
