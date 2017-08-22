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

moneyBot.createAndAddAction(/what is the price of (\w+)/, (client, message, matches) => {
  if (matches === null) {
    client.sendMessage(
      "Please include the stock's symbol in your request.", message.channel);
  } else {
    messageBuilder.getMostRecentPrice(matches[1], response =>
      client.sendMessage(response, message.channel));
  }
});

moneyBot.start();
