import React, { useEffect, useState } from 'react';
import './App.css';
import {Select, ApiCurrency} from './components/Select'



function App() {
    
  const [currencies, setCurrencies] = useState<ApiCurrency[]>([]);
    

  useEffect(() => {
      fetch('https://api.cloudmersive.com/currency/exchange-rates/list-available', {
      method: 'POST',
      headers: {
          apikey: process.env.REACT_APP_API_KEY as string,
      }
      }).then(res => res.json().then(data => {
          setCurrencies(data.Currencies)
      }));
  }, []);

  return (
    <div className="App">
      <div className="title">Currency Converter</div>
      <div className="card">
        <div className="input-container">
          <div className="input-group">
            <label htmlFor="amount">Amount</label>
            <input type="text" id='amount' placeholder='1.00'/>
          </div>
          <Select currencies={currencies} label={"From"} />
          <Select currencies={currencies} label={"To"} />
        </div>
        <div className="button">Convert</div>
      </div>
    </div>
  );
}



export default App;
