import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

export const IndicatorSwitcher = (props) => {
  const { setIndicator } = props;
  const [selectedOption, setSelectedOption] = useState("sma");
  const handleSelect = (e) => {
    setIndicator(e);
    setSelectedOption(e);
  };

  const indicatorsArr = ["sma", "bbands", "sar"];

  return (
    <div className="pt-3 d-flex shadow-sm justify-content-sm-between bg-white rounded p-3 mb-3 align-items-center gap-3">
      <h5> Indicator </h5>
      <DropdownButton
        title={selectedOption}
        id="dropdown-menu-align-right"
        style={{ textAlign: "center" }}
        onSelect={handleSelect}
      >
        {indicatorsArr.map((indicator, index) => (
          <Dropdown.Item key={index} eventKey={indicator}>
            {indicator}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    </div>
  );
};
