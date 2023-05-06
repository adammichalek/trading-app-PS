import React from "react";
import Table from "react-bootstrap/Table";

const StockInfoTable = (props) => {

  const { previousClose, open, volume, high, low } = props.info;

  return (
    <div className="pt-3 d-flex shadow-sm justify-content-sm-between bg-white rounded p-3 mb-3 align-items-center gap-3">
    <Table striped hover size="sm">
      <thead>
        <tr>
          <th>Previous Close:</th>
          <td>{previousClose}</td>
        </tr>
        <tr>
          <th>Open:</th>
          <td>{open}</td>
        </tr>
        <tr>
          <th>Volume:</th>
          <td>{volume}</td>
        </tr>
        <tr>
          <th>High :</th>
          <td>{high}</td>
        </tr>
        <tr>
          <th>Low :</th>
          <td>{low}</td>
        </tr>
        </thead>
      </Table>
    </div>
  );
};

export default StockInfoTable;
