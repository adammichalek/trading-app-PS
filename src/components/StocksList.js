import React, { useState } from "react";
import StockListItem from "./StockListItem";
import TableSkeleton from "./TableSkeleton";
import Table from "react-bootstrap/Table";
import useFetch from "../hooks/useFetch";
import Pagination from "./Pagination";

const api_token = "636046181036a1.65629111";
const API_URL = `https://eodhistoricaldata.com/api/screener?api_token=${api_token}&sort=market_capitalization.desc&filters=[[%22market_capitalization%22,%22%3E%22,1000],[%22exchange%22,%22=%22,%22us%22]]&limit=100&offset=0`;

const StocksList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const { data: info, loading } = useFetch(API_URL);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = info.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div className="pt-4">
        {!loading ? (
          <>
            <Table responsive striped bordered className="bg-white">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Ticker</th>
                  <th>Market Cap</th>
                  <th>Last Sale</th>
                  <th>Net Change</th>
                  <th>Percentage Change</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <StockListItem
                    key={index}
                    name={item.name}
                    ticker={item.code}
                    price={item.adjusted_close}
                    market_capitalization={item.market_capitalization}
                    currency_symbol={item.currency_symbol}
                    refund_1d={item.refund_1d}
                    refund_1d_p={item.refund_1d_p}
                  />
                ))}
              </tbody>
            </Table>
            <Pagination
              itemsPerPage={itemsPerPage}Y
              totalItems={info.length}
              setCurrentPage={setCurrentPage}
            />
          </>
        ) : (
          <TableSkeleton rows={10} columns={1} />
        )}
      </div>
    </>
  );
};

export default StocksList;
