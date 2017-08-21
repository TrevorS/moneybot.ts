import { ActionResponse } from './ActionResponse';

class Action {
  regex: RegExp;
  response: ActionResponse;

  constructor(regex: RegExp, response: ActionResponse) {
    this.regex = regex;
    this.response = response;
  }

  doesMatch(message: Slack.Message): boolean {
    return this.regex.test(message.text);
  }

  execute(client: Slack.RtmClient, message: Slack.Message): void {
    this.response(client, message);
  }
}

export default Action;
