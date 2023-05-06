import React from "react";
import image from "../assets/images/stocks.svg"

const Heading = () => {
  return (
    <div className="shadow-sm p-3 mb-3 bg-white rounded">
      <img
        className="w-100 mw-100"
        src={image}
        alt="stocks_img"
      />
    </div>
  );
};

export default Heading;