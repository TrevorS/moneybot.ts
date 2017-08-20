import axios, { AxiosPromise } from 'axios';

import OUTPUT_SIZE from './Options/OutputSize';
import INTERVAL from './Options/Interval';
import SERIES_TYPE from './Options/SeriesType';
import TIME_SERIES from './Options/TimeSeries';
import TECHNICAL_INDICATOR from './Options/TechnicalIndicator';

class StockTicker {
  private apiKey: string
  private outputSize: string

  static BASE_URL = 'https://www.alphavantage.co/query';

  static OUTPUT_SIZE = OUTPUT_SIZE;
  static INTERVAL = INTERVAL;
  static SERIES_TYPE = SERIES_TYPE;
  static TIME_SERIES = TIME_SERIES;
  static TECHNICAL_INDICATOR = TECHNICAL_INDICATOR;

  constructor(apiKey: string, outputSize?: OUTPUT_SIZE) {
    this.apiKey = apiKey;
    this.outputSize = outputSize || OUTPUT_SIZE.COMPACT;
  }

  private getTimeSeriesUrl(timeSeries: TIME_SERIES, symbol: string, interval?: INTERVAL): string {
    return [
      StockTicker.BASE_URL,
      `?function=${timeSeries}`,
      `&symbol=${symbol}`,
      `&outputsize=${this.outputSize}`,
      `&apikey=${this.apiKey}`,
      interval ? `&interval=${interval}` : '',
    ].join('');
  }

  private getTechnicalIndicatorUrl(technicalIndicator: TECHNICAL_INDICATOR, symbol: string, interval: INTERVAL, timePeriod: number, seriesType: SERIES_TYPE): string {
    return [
      StockTicker.BASE_URL,
      `?function=${technicalIndicator}`,
      `&symbol=${symbol}`,
      `&interval=${interval}`,
      `&time_period=${timePeriod}`,
      `&series_type=${seriesType}`,
      `&apikey=${this.apiKey}`,
    ].join('');
  }

  getTimeSeries(timeSeries: TIME_SERIES, symbol: string, interval?: INTERVAL): AxiosPromise {
    const url = this.getTimeSeriesUrl(timeSeries, symbol, interval);

    return axios.get(url);
  }

  getTechnicalIndicator(technicalIndicator: TECHNICAL_INDICATOR, symbol: string, interval: INTERVAL, timePeriod: number, seriesType: SERIES_TYPE): AxiosPromise {
    const url = this.getTechnicalIndicatorUrl(technicalIndicator, symbol, interval, timePeriod, seriesType);

    return axios.get(url);
  }
}

export default StockTicker;
