import StockTicker from './StockTicker';

const apiKey = process.env.API_KEY as string;
const symbol = 'NEWR';

const outputSize = StockTicker.OUTPUT_SIZE.COMPACT;
const interval = StockTicker.INTERVAL.ONE_MIN;

const ticker = new StockTicker(apiKey, outputSize);

const timeSeries = StockTicker.TIME_SERIES.INTRADAY;
ticker.getTimeSeries(timeSeries, symbol, interval)
  .then(results => {
    console.log(`timeSeries: ${timeSeries}`);
    console.log('results.data', results.data);
  });

const technicalIndicator = StockTicker.TECHNICAL_INDICATOR.SMA;
const timePeriod = 60;
const seriesType = StockTicker.SERIES_TYPE.CLOSE;
ticker.getTechnicalIndicator(technicalIndicator, symbol, interval, timePeriod, seriesType)
  .then(results => {
    console.log(`technicalIndicator: ${technicalIndicator}`);
    console.log('results.data', results.data);
  });
