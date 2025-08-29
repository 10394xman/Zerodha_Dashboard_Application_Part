import React, { useState, useEffect } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";
// import { holdings } from "../data/data";

const Holdings = () => {
  const [Allholdings, setAllholdings] = useState([]);

  useEffect(() => {
    axios
      .get("https://zerodha-backend-hgfc.onrender.com/allHoldings")
      .then((res) => {
        setAllholdings(res.data);
      })
      .catch((error) => {
        console.error("Error fetching holdings:", error);
      });
  }, []);

  //const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  const labels = Allholdings.map((subArray) => subArray["name"]);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: Allholdings.map((stock) => stock.price),
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(255, 159, 64, 0.7)",
          "rgba(255, 205, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(153, 102, 255, 0.7)",
          "rgba(201, 203, 207, 0.7)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
      },
    ],
  };
  //  const data = {
  //     labels,
  //     datasets: [
  //       {
  //         label: 'Dataset 1',
  //         data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
  //         backgroundColor: 'rgba(255, 99, 132, 0.5)',
  //       },
  //       {
  //         label: 'Dataset 2',
  //         data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
  //         backgroundColor: 'rgba(53, 162, 235, 0.5)',
  //       },
  //     ],
  //   };

  return (
    <>
      <h3 className="title">Holdings ({Allholdings.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>
          <tbody>
            {Allholdings.map((stock, index) => {
              const curValue = stock.price * stock.qty;
              const isProfit = curValue > stock.avg * stock.qty;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";
              return (
                <tr key={index}>
                  <td>
                    {/* {console.log(index, stock.avg, stock.price, stock.qty)}
                  {console.log(Allholdings)} */}
                    {/* <img src={holding.img} alt={holding.name} /> */}
                    {stock.name}
                  </td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td>{curValue.toFixed(2)}</td>
                  <td className={profClass}>
                    {(curValue - stock.avg * stock.qty).toFixed(2)}
                  </td>
                  <td className={dayClass}>{stock.net}</td>
                  <td className={dayClass}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>
            29,875.<span>55</span>{" "}
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            31,428.<span>95</span>{" "}
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5>1,553.40 (+5.20%)</h5>
          <p>P&L</p>
        </div>
      </div>
      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;
