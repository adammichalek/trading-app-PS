import { Button } from 'react-bootstrap';
import CalculateSmaSignals from "../calculations/CalculateSmaSignals";
import CalculateBollSignals from "../calculations/CalculateBollSignals";
import CalculateSarSignals from "../calculations/CalculateSarSignals";


export const SimulateButton = (props) => {
    const { indicator, stockDataPrices, stockDataIndicator, 
          setIndicatorBuySignals, setIndicatorSellSignals, stockDataIndicatorBands } = props;

    const runCalculations = () => {

        switch (indicator) {
            case 'sma':
                CalculateSmaSignals (stockDataPrices, stockDataIndicator, setIndicatorBuySignals, setIndicatorSellSignals);
                break;

            case 'bbands':
                CalculateBollSignals (stockDataPrices, stockDataIndicator, setIndicatorBuySignals, setIndicatorSellSignals, stockDataIndicatorBands);
                break;

            case 'sar':
                CalculateSarSignals (stockDataPrices, stockDataIndicator, setIndicatorBuySignals, setIndicatorSellSignals);
                break;

                default:
                    console.log("error reading the indicator");

        };
    }

    return (
        <div className="pt-3 d-flex shadow-sm justify-content-sm-between bg-white rounded p-3 mb-3 align-items-center gap-3">
            <Button onClick={runCalculations} variant="primary" style={{ fontSize: '20px', marginTop: '3px' }}>
                Simulate
            </Button>
        </div>
    );
};



