import React, { useEffect, useState } from 'react';
import './App.css';
import {Select, ApiCurrency} from './components/Select'
import { Spinner } from './Spinner'


function App() {
    
  const [currencies, setCurrencies] = useState<ApiCurrency[]>([]);
  const [amount, setAmount] = useState<string>('1.00');
  const [fromCurrency, setFromCurrency] = useState<string>('');
  const [toCurrency, setToCurrency] = useState<string>('');
  const [conversionResult, setconversionResult] = useState<ApiResult>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
      fetch('https://api.cloudmersive.com/currency/exchange-rates/list-available', {
      method: 'POST',
      headers: {
          apikey: process.env.REACT_APP_CLOUDMERSIVE_KEY as string,
      }
      }).then(res => res.json().then(data => {
          setCurrencies(data.Currencies);
          setIsLoading(false);
      }));
  }, []);


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    if (event.target.value === '' || Number.isNaN(parseFloat(event.target.value))) {
      setAmount('1.00');
      return;
    }
    const value = parseFloat(event.target.value).toFixed(2);
    setAmount(value);
  }

  const handleSelectChange = (currencyCode: string, label: string) => {
    label === 'From' ? setFromCurrency(currencyCode) : setToCurrency(currencyCode);
  }
  
  const handleConvertClick = (amount: string, fromCurrency: string, toCurrency: string) => {
    const from = fromCurrency;
    const to = toCurrency;
    console.log(amount)

    if (amount === '0.00') {
      alert('Please enter a valid amount');
      return;
    }

    if (from === "" || to === "") {
      alert('Please select a currency');
      return;
    }

    fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`, {
      method: 'GET',
      headers: {
        apikey: process.env.REACT_APP_APILAYER_KEY as string,
      }
    }).then(res => res.json()).then(data => {
      setconversionResult({amount, from, to, result: data.result, rate: data.info.rate})
    })
  }


  return (
    <div className="App">
      <div className="title">Currency Converter</div>
      { isLoading ? <div className="spinner"><Spinner /></div> :
        <div className="card">
          <div className="input-container">
            <div className="input-group">
              <label htmlFor="amount">Amount</label>
              <input className="amount-input"
                type="number" id='amount' placeholder='1.00'
                step='1.00' min="0.00" max="1000000000000000000"
                onChange={(e) => handleInputChange(e)}/>
            </div>
            <Select currencies={currencies} label={"From"} onSelect={handleSelectChange} />
            <Select currencies={currencies} label={"To"} onSelect={handleSelectChange} />
          </div>
          <div className="result-container">
            {
              conversionResult && (
                <div className="result">
                  <p className="conversion-from">{conversionResult.amount} {conversionResult.from} =</p>
                  <p className="conversion-result">{conversionResult.result} {conversionResult.to}</p>
                  <p className="conversion-rate">1 {conversionResult.from} = {conversionResult.rate} {conversionResult.to}</p>
                </div>
              )              
              }
            <div className="button" onClick={() => handleConvertClick(amount, fromCurrency, toCurrency)}>Convert</div>
          </div>
        </div>
      }
    </div>
  );
}

interface ApiResult {
  amount: string;
  from: string;
  to: string;
  result: number;
  rate: number;
}


export default App;
