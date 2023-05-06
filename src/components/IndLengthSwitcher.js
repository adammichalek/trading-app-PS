import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

export const IndLengthSwitcher = (props) => {
  const {indicator, setIndicator } = props;
  const [selectedOption, setSelectedOption] = useState("10");
  const handleSelect = (e) => {
    setIndicator(e);
    setSelectedOption(e);
  };

  const indicatorLengthArr = [5, 10, 20, 30, 40];

  return (
    <div className="pt-3 d-flex shadow-sm justify-content-sm-between bg-white rounded p-3 mb-3 align-items-center gap-3">
      <h5> Indicator length </h5>
      <DropdownButton
        title={selectedOption}
        style={{ width: "25%", textAlign: "center" }}
        id="dropdown-menu-align-right"
        onSelect={handleSelect}
        disabled={indicator === 'sar'}
      >
        {indicatorLengthArr.map((indLength, index) => (
          <Dropdown.Item key={index} eventKey={indLength}>{indLength}</Dropdown.Item>
        ))}
      </DropdownButton>
    </div>
  );
};
