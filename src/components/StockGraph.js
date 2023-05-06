import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import axios from "axios";

const StockGraph = (props) => {
  const { indicator, startDate, endDate, indLength, stockDataPrices, setStockDataPrices, stockDataIndicator, 
  setStockDataIndicator, stockDataIndicatorBands, setStockDataIndicatorBands, IndicatorBuySignals, IndicatorSellSignals } = props;
  const [isLoaded, setisLoaded] = useState(false);
 

  const Api_Token = '636046181036a1.65629111'
  const StartDate = startDate.toISOString().slice(0, 10);
  const PresentDate = endDate.toISOString().slice(0, 10); 
  const StockSymbol = window.location.pathname.split("/").pop().concat(".US");
  const FinishDate = PresentDate; 

  const dataPromises = () => {
    setisLoaded(false);
    const API_Call_Indicator = `https://eodhistoricaldata.com/api/technical/${StockSymbol}?order=d&fmt=json&from=${StartDate}&to=${FinishDate}&function=${indicator}&period=${indLength}&api_token=${Api_Token}`;
    const API_Call_Price = `https://eodhistoricaldata.com/api/eod/${StockSymbol}?from=${StartDate}&to=${FinishDate}&period=d&fmt=json&api_token=${Api_Token}`;

    const getStockPrices = axios.get(API_Call_Price);
    const getIndicatorValues = axios.get(API_Call_Indicator);

    axios.all([getStockPrices, getIndicatorValues]).then(
      axios.spread((...alldata) => {
        const pricesData = {
          dates: alldata[0].data.map((item) => item.date),
          values: alldata[0].data.map((item) => item.adjusted_close),
        };
        let indicatorData = {};

        if (indicator === "sma") {
          indicatorData = {
            dates: alldata[1].data.map((item) => item.date),
            values: alldata[1].data.map((item) => item.sma),
          };

          setStockDataIndicatorBands({
            ...stockDataIndicator,
            x: indicatorData.dates,
            y: [],
          });

          setStockDataIndicator({
            ...stockDataIndicator,
            x: indicatorData.dates,
            y: indicatorData.values,
            name: 'sma',
            mode: 'lines',
          });
        }
        else if (indicator === "bbands") {
          indicatorData = {
            dates: alldata[1].data.map((item) => item.date),
            upband: alldata[1].data.map((item) => item.uband),
            lowband: alldata[1].data.map((item) => item.lband),
          };

          setStockDataIndicator({
            ...stockDataIndicator,
            x: indicatorData.dates,
            y: indicatorData.upband,
            name: 'upBand',
            mode: 'lines',
          });

          setStockDataIndicatorBands({
            ...stockDataIndicator,
            x: indicatorData.dates,
            y: indicatorData.lowband,
            name: 'lowBand',
            mode: 'lines',
          });
        }

        else if (indicator === "sar") {
          indicatorData = {
            dates: alldata[1].data.map((item) => item.date),
            values: alldata[1].data.map((item) => item.sar),
          };

          setStockDataIndicatorBands({
            ...stockDataIndicator,
            x: indicatorData.dates,
            y: [],
          });

          setStockDataIndicator({
            ...stockDataIndicator,
            x: indicatorData.dates,
            y: indicatorData.values,
            name: 'parabolic sar',
            mode: 'markers',
          });
        }

        setStockDataPrices({
          ...stockDataPrices,
          x: pricesData.dates,
          y: pricesData.values,
          name: 'price',
        });
      })
    );
    setisLoaded(true);
  };
  
  useEffect(() => {
    dataPromises();
  }, [indicator, startDate, endDate, indLength, IndicatorBuySignals, IndicatorSellSignals]);

  return (
    <>
      {isLoaded ? (
        <Plot
          data={[stockDataPrices, stockDataIndicator, stockDataIndicatorBands, IndicatorBuySignals, IndicatorSellSignals]}
          layout={{ autosize: true }}
          className="w-full h-full"
        />
      ) : (
        <div
          className="placeholder-glow placeholder"
          style={{ width: "700px", height: "450px" }}
        ></div>
      )}
    </>
  );
};

export default StockGraph;
