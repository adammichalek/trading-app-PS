import React from "react";

const StockInfoHeader = (props) => {
  const {
    code,
    timestamp,
    close,
    change_p,
    isLoaded,
  } = props;

  let stockDate = new Date(parseInt(timestamp * 1000)).toLocaleDateString(
    "en-US"
  );
  let stockTime = new Date(parseInt(timestamp * 1000)).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      <div className="pt-3 d-flex shadow-sm justify-content-sm-between bg-white rounded p-3 mb-3 align-items-center placeholder-glow gap-3">
        <div className="w-100">
          <span className={`h3 ${!isLoaded ? "placeholder d-block" : ""}`}>
            {code}
          </span>
          <div>
            <span>
              As of {stockDate} , {stockTime}
            </span>
          </div>
        </div>
        <div className="d-flex gap-3">
          <span
            className={`h3 ${change_p > 0 ? "text-success" : "text-danger"}`}
          >
            {close}
          </span>
          <span className="h3 font-weight-light text-secondary">USD</span>
          <span
            className={`h3 ${change_p > 0 ? "text-success" : "text-danger"}`}
          >
            {change_p}%
          </span>
        </div>
      </div>
    </>
  );
};

export default StockInfoHeader;
