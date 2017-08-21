import StockTicker from '../StockTicker';
import { MostRecentPriceCallback } from './MostRecentPriceCallback';

const ONE_MIN_TIMESERIES = 'Time Series (1min)';

class MessageBuilder {
  private stockTicker: StockTicker;

  constructor(stockTicker: StockTicker) {
    this.stockTicker = stockTicker;
  }

  getMostRecentPrice(symbol: string, callback: MostRecentPriceCallback): void {
    const results = this.stockTicker.getTimeSeries(StockTicker.TIME_SERIES.INTRADAY,
      symbol, StockTicker.INTERVAL.ONE_MIN);

      results.then((response) => {
        const mostRecentPrice = this.extractMostRecentPrice(response);

        const message = `The most recent price for \`${symbol}\` I have is: *$${mostRecentPrice}*.`;

        callback(message);
      });
  }

  // TODO: Hairy proper type signature.
  private extractMostRecentPrice(response: any): string {
    const timeSeries = response.data['Time Series (1min)'];

    const mostRecentTime = Object.keys(timeSeries)[0];

    return timeSeries[mostRecentTime][StockTicker.PRICE.CLOSE];
  }
}

export default MessageBuilder;
