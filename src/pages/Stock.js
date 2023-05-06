import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import StockInfoTable from "../components/StockInfoTable";
import StockInfoHeader from "../components/StockInfoHeader";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import StockGraph from "../components/StockGraph";
import { IndicatorSwitcher } from "../components/IndicatorSwitcher";
import { DateSwitcher } from "../components/DateSwitcher";
import { IndLengthSwitcher } from "../components/IndLengthSwitcher";
import { SimulateButton } from "../components/SimulateButton";
import EfficiencyInfo from "../components/EfficiencyInfo";

const Stock = () => {
  let { id } = useParams();
  const [data, setData] = useState([]);
  const [indicator, setIndicator] = useState("sma");
  const [indLength, setIndLength] = useState("10");
  const [startDate, setStartDate] = useState(new Date("2021-08-08"));
  const [endDate, setEndDate] = useState(new Date());
  const [isLoaded, setisLoaded] = useState(false);
  const Api_Token = "636046181036a1.65629111";

  const [stockDataPrices, setStockDataPrices] = useState(
    {
      x: [],
      y: [],
      mode: "lines",
      name: "Price",
      color: "rgb(0, 0, 0)",
    },
  );
  const [stockDataIndicator, setStockDataIndicator] = useState(
    {
      x: [],
      y: [],
      mode: "lines",
      name: "Indicator",
      color: "rgb(255, 132, 82)",
    },
  );

  const [stockDataIndicatorBands, setStockDataIndicatorBands] = useState(
    {
      x: [],
      y: [],
      mode: "lines",
      name: "Indicator",
      color: "rgb(255, 132, 82)",
    },
  );

  const [IndicatorBuySignals, setIndicatorBuySignals] = useState(
    {
      x: [],
      y: [],
      mode: 'markers',
      name: "BUY",
      color: "rgb(0, 255, 0)",
    },
  );

  const [IndicatorSellSignals, setIndicatorSellSignals] = useState(
    {
      x: [],
      y: [],
      mode: 'markers',
      name: "SELL",
      color: "rgb(255, 0, 0)",
    },
  );


  const getData = async () => {
    const { data } = await axios.get(
      `https://eodhistoricaldata.com/api/real-time/${id}?fmt=json&api_token=${Api_Token}`
    );
    setData(data);
    setisLoaded(true);
  };



  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setIndicatorBuySignals(
      {
        ...IndicatorBuySignals,
        x: [],
        y: [],
      },
    );
    setIndicatorSellSignals(
      {
        ...IndicatorSellSignals,
        x: [],
        y: [],
      },
    );
  }, [indicator, indLength, startDate, endDate]);

  
  const {
    code,
    timestamp,
    gmtoffset,
    open,
    high,
    low,
    close,
    volume,
    previousClose,
    change,
    change_p,
  } = data;

  return (
    <>
      <Navigation />
      <header className="pt-3">
        <Container className="mt-4">
          <Row>
            <Col>
              <Row>
                <StockInfoHeader
                  code={code}
                  timestamp={timestamp}
                  gmtoffset={gmtoffset}
                  open={open}
                  high={high}
                  low={low}
                  close={close}
                  colume={volume}
                  previousClose={previousClose}
                  change={change}
                  change_p={change_p}
                  isLoaded={isLoaded}
                />
              </Row>
            </Col>
          </Row>
          <Row>
            <Col sm={8}>
              <Row>
                <Col>
                  <div className="pt-2 d-flex shadow-sm justify-content-sm-between bg-white rounded p-2 mb-2 align-items-center gap-2" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "700px" }}>
                    <DateSwitcher
                      startDate={startDate}
                      endDate={endDate}
                      setStartDate={setStartDate}
                      setEndDate={setEndDate}
                    />
                  </div>
                </Col>
              </Row>
              <StockGraph
                indicator={indicator}
                startDate={startDate}
                endDate={endDate}
                indLength={indLength}
                stockDataPrices={stockDataPrices} setStockDataPrices={setStockDataPrices}
                stockDataIndicator={stockDataIndicator} setStockDataIndicator={setStockDataIndicator}
                stockDataIndicatorBands={stockDataIndicatorBands} setStockDataIndicatorBands={setStockDataIndicatorBands}
                IndicatorBuySignals={IndicatorBuySignals}
                IndicatorSellSignals={IndicatorSellSignals}
              />
              <div className="pt-3 d-flex shadow-sm justify-content-sm-between bg-white rounded p-3 mb-3 align-items-center gap-3" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "700px" }}>
                <IndicatorSwitcher setIndicator={setIndicator} />
                <IndLengthSwitcher indicator = {indicator} setIndicator={setIndLength} />
                <SimulateButton
                  indicator={indicator}
                  stockDataPrices={stockDataPrices}
                  stockDataIndicator={stockDataIndicator}
                  setIndicatorBuySignals={setIndicatorBuySignals}
                  setIndicatorSellSignals={setIndicatorSellSignals}
                  stockDataIndicatorBands={stockDataIndicatorBands}
                />
              </div>
            </Col>
            <Col sm={4}>
              <Row>
                <StockInfoTable info={data} />
              </Row>
              <Row>
                <EfficiencyInfo
                  startDate={startDate}
                  endDate={endDate}
                  indicator={indicator}
                  indLength={indLength}
                  stock={id}
                  IndicatorBuySignals={IndicatorBuySignals}
                  IndicatorSellSignals={IndicatorSellSignals}
                  stockDataPrices = {stockDataPrices}
                />
              </Row>
            </Col>
          </Row>
        </Container>
      </header>
      <Footer />
    </>
  );
};

export default Stock;
