import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const DateSwitcher = (props) => {
  const { setStartDate, setEndDate, startDate, endDate } = props;

  return (
    <div className="d-flex justify-content-sm-between bg-white rounded mb-3 align-items-center">
      <div style={{ marginRight: "100px", marginLeft: "70px" }}>
        Start Date:{" "}
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          minDate={new Date("2015-01-01")}  
          maxDate={endDate}     
        />
      </div>
      <div>
        End Date:{" "}
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          minDate={startDate}   
        />
      </div>
    </div>
  );
};