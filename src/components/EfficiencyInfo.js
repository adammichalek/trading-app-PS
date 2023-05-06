import React from "react";
import { Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import SaveInDatabaseButton from "../components/SaveInDatabaseButton";

const EfficiencyInfo = (props) => {
  const {
    startDate,
    endDate,
    indicator,
    indLength,
    stock,
    IndicatorBuySignals,
    IndicatorSellSignals,
    stockDataPrices,
  } = props;

  let efficiency = 0;

  if (IndicatorBuySignals.x === undefined) {
    return;
  }

  const finalBuySignals = 
    {
      x: [],
      y: [],
    };


  const finalSellSignals = 
    {
      x: [],
      y: [],
    };

  const Signals = [];

  if (
    IndicatorBuySignals &&
    IndicatorBuySignals.x &&
    Array.isArray(IndicatorBuySignals.x)
  ) {
    for (let i = 0; i < IndicatorBuySignals.x.length; i++) {
      Signals.push({
        x: IndicatorBuySignals.x[i],
        y: IndicatorBuySignals.y[i],
        origin: "BUY",
      });
    }
  }

  if (
    IndicatorSellSignals &&
    IndicatorSellSignals.x &&
    Array.isArray(IndicatorSellSignals.x)
  ) {
    for (let i = 0; i < IndicatorSellSignals.x.length; i++) {
      Signals.push({
        x: IndicatorSellSignals.x[i],
        y: IndicatorSellSignals.y[i],
        origin: "SELL",
      });
    }
  }

  Signals.sort((a, b) => {
    const dateA = new Date(a.x);
    const dateB = new Date(b.x);

    if (dateA < dateB) {
      return -1;
    }
    if (dateA > dateB) {
      return 1;
    }
    return 0;
  });

  let funds = 100000;
  let tempFunds = 0;
  let stockQuant = 0;
  let isBought = 0;
  let numberofBuys = 0;

  if (!(indicator === "sar")) {
    for (let i = 0; i < Signals.length; i++) {
      if (Signals[i].origin === "BUY" && isBought === 0) {
        isBought = 1;
        stockQuant = Math.floor(funds / Signals[i].y);
        funds = funds % Signals[i].y;
        numberofBuys += 1;
        finalBuySignals.x.push(Signals[i].x);
        finalBuySignals.y.push(Signals[i].y);
      }
      if (Signals[i].origin === "SELL" && isBought === 1) {
        isBought = 0;
        funds += stockQuant * Signals[i].y;
        tempFunds = funds;
        stockQuant = 0;
        finalSellSignals.x.push(Signals[i].x);
        finalSellSignals.y.push(Signals[i].y);
      }
    }
    if (isBought === 1) {
      funds = tempFunds;
      finalBuySignals.x.pop();
      finalBuySignals.y.pop();
      numberofBuys -= 1;
    }
  } else {
    let isSold = 0;
    let StartPrice = 0;
    let finishPrice = 0;

    for (let i = 0; i < Signals.length; i++) {
      if (Signals[i].origin === "BUY" && isBought === 0) {
        if (isSold === 0) {
          StartPrice = Signals[i].y;
        }
        if (isSold === 1) {
          finishPrice = Signals[i].y;
          if (!(StartPrice === 0) && !(finishPrice === 0)) {
            funds += ((StartPrice - finishPrice) / StartPrice) * funds;
          }
          StartPrice = finishPrice;
        }
        numberofBuys +=1;
        finalBuySignals.x.push(Signals[i].x);
        finalBuySignals.y.push(Signals[i].y);
        isBought = 1;
        isSold = 0;
      }
      if (Signals[i].origin === "SELL" && isSold === 0) {
        if (isBought === 0) {
          StartPrice = Signals[i].y;
        }
        if (isBought === 1) {
          finishPrice = Signals[i].y;
          if (!(StartPrice === 0) && !(finishPrice === 0)) {
            funds += ((finishPrice - StartPrice) / StartPrice) * funds;
          }
          StartPrice = finishPrice;
        }
        numberofBuys +=1;
        finalSellSignals.x.push(Signals[i].x);
        finalSellSignals.y.push(Signals[i].y);
        isBought = 0;
        isSold = 1;
      }
    }
  }

  const effectiveness = (((funds - 100000) / 100000) * 100).toFixed(2);
  funds = funds.toFixed(2);

  let fundsWithoutStrategy = 100000;
  let stockWithoutStrategy = 0;
  stockWithoutStrategy = Math.floor(
    fundsWithoutStrategy / stockDataPrices.y[indLength - 1]
  );
  fundsWithoutStrategy =
    fundsWithoutStrategy % stockDataPrices.y[indLength - 1];
  fundsWithoutStrategy +=
    stockWithoutStrategy * stockDataPrices.y[stockDataPrices.y.length - 1];

  const effectivenessWithoutStrategy = (
    ((fundsWithoutStrategy - 100000) / 100000) *
    100
  ).toFixed(2);

  efficiency = effectiveness;

  return (
    <div>
      <Row>
        <div className="pt-3 d-flex shadow-sm justify-content-sm-between bg-white rounded p-3 mb-3 gap-3">
          <Table striped hover size="sm">
            <thead>
              <tr>
                <th>With indicator:</th>
                <td style={{ color: effectiveness >= 0 ? "green" : "red" , textAlign: "right",  paddingRight: "10px"}}>
                  {effectiveness}%
                </td>
              </tr>
              <tr>
                <th>Without indicator:</th>
                <td
                  style={{
                    color: effectivenessWithoutStrategy >= 0 ? "green" : "red",
                    textAlign: "right",
                    paddingRight: "10px"
                  }}
                >
                  {effectivenessWithoutStrategy}%
                </td>
              </tr>
              <tr>
                <th>Number of Operations : </th>
                <td style={{
                    textAlign: "right",
                    paddingRight: "10px"
                  }}>{numberofBuys}</td>
              </tr>
              <tr>
              <th vertical-align="middle">Buy signals:</th>
                <td>
                  <div style={{ overflowY: "scroll", height: "92px" }}>
                    <Table striped hover size="sm">
                      {finalBuySignals.x.map((x, i) => (
                        <thead key={i}>
                        <tr>
                          <td>{x}</td>
                          <td>{finalBuySignals.y[i]}</td>
                        </tr>
                        </thead>
                      ))}
                    </Table>
                  </div>
                </td>
              </tr>
              <tr>
                <th>Sell signals:</th>
                <td>
                  <div style={{ overflowY: "scroll", height: "92px" }}>
                    <Table striped hover size="sm">
                      {finalSellSignals.x.map((x, i) => (
                         <thead key={i}>
                         <tr>
                        <td>{x}</td>
                        <td>{finalSellSignals.y[i]}</td>
                      </tr>
                      </thead>
                      ))}
                    </Table>
                  </div>
                </td>
              </tr>
            </thead>
          </Table>
        </div>
      </Row>
      <Row>
        <div className="pt-3 d-flex shadow-sm justify-content-sm-between bg-white rounded p-3 mb-3 gap-3">
          <SaveInDatabaseButton
            indicator={indicator}
            efficiency={efficiency}
            basic_efficiency={effectivenessWithoutStrategy}
            startDate={startDate}
            endDate={endDate}
            indLength={indLength}
            stock={stock}
          />
        </div>
      </Row>
    </div>
  );
};

export default EfficiencyInfo;
