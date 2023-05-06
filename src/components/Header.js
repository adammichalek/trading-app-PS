import React from "react";
import FinanceFeed from "../components/FinanceFeed";
import Heading from "./Heading";

const Header = () => {
  return (
    <header className="pt-3">
      <div className="container">
        <div className="row">
          <div className="col-12  col-md-6  ">
            <FinanceFeed topPost={0} lastPost={3} showHeader={true}/>
          </div>
          <div className="col-12  col-md-6  ">
            <Heading />
          </div>
        </div>
        <div className="row mb-3">
          <div className="column ">
            <FinanceFeed topPost={3} lastPost={8} showHeader={false}/>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
