import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { STOCK_ORACLE_ABI, STOCK_ORACLE_ADDRESS } from "./quotecontract";


function App() {
 
  const [data, setData] = useState("");
  const [val, setVal] = useState("");
  const [symbol, setSymbol] = useState("MSFT");

  const web3 = new Web3("http://localhost:8545")
  const account = async ()=>{
 var accounts = await web3.eth.getAccounts()
  console.log("Account 0 = ", accounts[0] )}

  const stockQuote = new web3.eth.Contract(
    STOCK_ORACLE_ABI,
    STOCK_ORACLE_ADDRESS
  );

   const retval = async () => {
    var getPrice = await stockQuote.methods.getStockPrice(web3.utils.fromAscii(val)).call();
    var getVolume = await stockQuote.methods.getStockVolume(web3.utils.fromAscii(val)).call();
    console.log(retval);
   }
  useEffect(() => {
    fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=71EBIKKDUVSFZU8P`
    )
      .then(res => res.json())
      .then(res => {
        setData(res["Global Quote"]);
      });
  }, [symbol]);
  

  function handleChange(event) {
    event.preventDefault();
    setVal(event.target.value);
  }

  function onclickSearch(event) {
    event.preventDefault();
    setSymbol(val);
  }

  return (
    <div>
      <h2>Stock Quotes</h2>
      <div>
        <form  >
        Enter symbol: {''}
          <input
            onChange={handleChange}
          />
          <div>
            <button  onClick={onclickSearch}>
              Search Stock
            </button>
          </div>
        </form>
        <div>
            Symbol: {''}
          <input
            value={data["01. symbol"]}
          ></input>
        </div>
        <div>
        Price: {' '}
          <input
            value={data["05. price"]}
          ></input>
        </div>
        <div>
        Volume: {''}
          <input
            value={data["06. volume"]}
          ></input>
        </div>
        {/* <div>
            <button  onClick={onclickSet}>
              Set Stock
            </button>
          </div> */}
      </div>
    </div>
  );
}

export default App;
