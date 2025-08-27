import React, { useEffect, useState, useContext } from "react";
import { Tooltip, Grow } from "@mui/material";
import GeneralContext from "./GeneralContext"; // <-- import context

import DoughnutChart from "./DoughnutChart";
import { watchlist } from "../data/data"; // <-- import your static array

const WatchList = () => {
  // const [watchlist, setWatchlist] = useState(watchlist);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8000/allWatchlist") // <-- your API endpoint
  //     .then((res) => setWatchlist(res.data))
  //     .catch((err) => console.error(err));
  // }, []);

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
          className="search"
        />
        <span className="counts"> {watchlist.length} / 50</span>
      </div>

      <ul className="list">
        {watchlist.map((stock, index) => {
          return <WatchListItem stock={stock} key={index} />;
        })}
      </ul>
      {/* Doughnut chart below the list */}
      <DoughnutChart watchlist={watchlist} />
    </div>
  );
};

export default WatchList;

//WatchListItem is not reused so we are going to create this comp. below

const WatchListItem = ({ stock }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="item">
        <p>{stock.name}</p>
        <div className="itemInfo">
          <span className="percent">{stock.percent}</span>
          {stock.isDown ? (
            <span className="material-symbols-outlined down">south</span>
          ) : (
            <span className="material-symbols-outlined up">
              arrow_upward_alt
            </span>
          )}
          <span className="price">{stock.price}</span>
        </div>
      </div>
      {isHovered && <WatchListActions uid={stock.name} price={stock.price} />}
    </li>
  );
};

const WatchListActions = ({ uid, price }) => {
  const { openBuyWindow } = useContext(GeneralContext); // <-- use context

  return (
    <span className="actions">
      <Tooltip title="Buy (B)" placement="top" arrow TransitionComponent={Grow}>
        <button className="buy" onClick={() => openBuyWindow(uid, price)}>
          Buy
        </button>
      </Tooltip>
      <Tooltip
        title="Sell (S)"
        placement="top"
        arrow
        TransitionComponent={Grow}
      >
        <button className="sell">Sell</button>
      </Tooltip>
      <Tooltip
        title="Analytics (A)"
        placement="top"
        arrow
        TransitionComponent={Grow}
      >
        <button className="action">
          <span className="material-symbols-outlined">bar_chart</span>
        </button>
      </Tooltip>
      <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
        <button className="action">
          <span className="material-symbols-outlined">more_horiz</span>
        </button>
      </Tooltip>
    </span>
  );
};
