import StockTicker from './StockTicker';
import MessageBuilder from './MessageBuilder';
import MoneyBot from './MoneyBot';

const apiKey = process.env.API_KEY as string;
const slackToken = process.env.SLACK_TOKEN as string;

const stockTicker = new StockTicker(apiKey);
const messageBuilder = new MessageBuilder(stockTicker);
const moneyBot = new MoneyBot(slackToken);

moneyBot.createAndAddAction(/NEWR/, (client, message) =>
  messageBuilder.getMostRecentPrice('NEWR', response =>
    client.sendMessage(response, message.channel)));

moneyBot.start();
