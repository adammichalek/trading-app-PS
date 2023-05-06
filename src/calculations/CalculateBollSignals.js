
const CalculateBollSignals = (stockDataPrices, stockDataIndicator, setIndicatorBuySignals, setIndicatorSellSignals, stockDataIndicatorBands) =>
{

    const BuySignals = {
        x: [],
        y: [],
    }
    ;

    const SellSignals = {
        x: [],
        y: [],
    }
    ;

    for (let i = 1; i < stockDataPrices.x.length; i++) {
        const index = stockDataIndicator.x.findIndex(date => date === stockDataPrices.x[i]);
        if (index !== -1) {
          
            if (stockDataPrices.y[i] > stockDataIndicator.y[index]) {
                SellSignals.x.push(stockDataPrices.x[i]);
                SellSignals.y.push(stockDataPrices.y[i]);
            }
            if (stockDataPrices.y[i] < stockDataIndicatorBands.y[index]) {
                BuySignals.x.push(stockDataPrices.x[i]);
                BuySignals.y.push(stockDataPrices.y[i]);
            }
        }
    }

    setIndicatorBuySignals({
        x: BuySignals.x,
        y: BuySignals.y,
        name: 'BUY',
        mode: 'markers',
        marker: {
            size: 8,
            color: "rgb(71, 209, 71)",
        },
    });
    setIndicatorSellSignals({
        x: SellSignals.x,
        y: SellSignals.y,
        name: 'SELL',
        mode: 'markers',
        marker: {
            size: 8,
            color: "rgb(204, 0, 0)",
        },
    });

};



export default CalculateBollSignals;