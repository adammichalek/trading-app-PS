import React from "react";
import { Link } from "react-router-dom";

const StockListItem = (props) => {
  const { refund_1d_p, refund_1d, market_capitalization } = props;

  return (
    <>
      <tr>
        <td>
          <Link to={`/stocks/${props.ticker}`}>{props.name}</Link>
        </td>
        <td>
          <Link to={`/stocks/${props.ticker}`}>{props.ticker}</Link>
        </td>
        <td>
          {market_capitalization
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </td>
        <td>${props.price} </td>
        <td className={`${refund_1d > 0 ? "text-success" : "text-danger"}`}>
          {refund_1d}
        </td>
        <td className={`${refund_1d_p > 0 ? "text-success" : "text-danger"}`}>
          {refund_1d_p}%
        </td>
      </tr>
    </>
  );
};

export default StockListItem;
