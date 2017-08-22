export type ActionResponse =
  (client: Slack.RtmClient, message: Slack.Message, matches: RegExpMatchArray | null) => void;
