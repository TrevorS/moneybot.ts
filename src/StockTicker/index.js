"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var OutputSize_1 = require("./Options/OutputSize");
var Interval_1 = require("./Options/Interval");
var SeriesType_1 = require("./Options/SeriesType");
var TimeSeries_1 = require("./Options/TimeSeries");
var TechnicalIndicator_1 = require("./Options/TechnicalIndicator");
var StockTicker = (function () {
    function StockTicker(apiKey, outputSize) {
        this.apiKey = apiKey;
        this.outputSize = outputSize;
    }
    StockTicker.prototype.getTimeSeriesUrl = function (timeSeries, symbol, interval) {
        return [
            StockTicker.BASE_URL,
            "?function=" + timeSeries,
            "&symbol=" + symbol,
            "&outputsize=" + this.outputSize,
            "&apikey=" + this.apiKey,
            interval ? "&interval=" + interval : '',
        ].join('');
    };
    StockTicker.prototype.getTechnicalIndicatorUrl = function (technicalIndicator, symbol, interval, timePeriod, seriesType) {
        return [
            StockTicker.BASE_URL,
            "?function=" + technicalIndicator,
            "&symbol=" + symbol,
            "&interval=" + interval,
            "&time_period=" + timePeriod,
            "&series_type=" + seriesType,
            "&apikey=" + this.apiKey,
        ].join('');
    };
    StockTicker.prototype.getTimeSeries = function (timeSeries, symbol, interval) {
        var url = this.getTimeSeriesUrl(timeSeries, symbol, interval);
        return axios_1["default"].get(url);
    };
    StockTicker.prototype.getTechnicalIndicator = function (technicalIndicator, symbol, interval, timePeriod, seriesType) {
        var url = this.getTechnicalIndicatorUrl(technicalIndicator, symbol, interval, timePeriod, seriesType);
        return axios_1["default"].get(url);
    };
    StockTicker.BASE_URL = 'https://www.alphavantage.co/query';
    StockTicker.OUTPUT_SIZE = OutputSize_1["default"];
    StockTicker.INTERVAL = Interval_1["default"];
    StockTicker.SERIES_TYPE = SeriesType_1["default"];
    StockTicker.TIME_SERIES = TimeSeries_1["default"];
    StockTicker.TECHNICAL_INDICATOR = TechnicalIndicator_1["default"];
    return StockTicker;
}());
exports["default"] = StockTicker;
