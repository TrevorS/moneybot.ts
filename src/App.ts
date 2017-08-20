import StockTicker from './StockTicker';
import MoneyBot from './MoneyBot';

const apiKey = process.env.API_KEY as string;
const slackToken = process.env.SLACK_TOKEN as string;

const stockTicker = new StockTicker(apiKey);
const moneyBot = new MoneyBot(slackToken);

moneyBot.start();
