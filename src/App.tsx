import React, { useEffect, useState } from 'react';
import './App.css';
import {Select, ApiCurrency} from './components/Select'
import { Spinner } from './Spinner'


function App() {
    
  const [currencies, setCurrencies] = useState<ApiCurrency[]>([]);
  const [amount, setAmount] = useState<string>('1.00');
  const [fromCurrency, setFromCurrency] = useState<CurrencySelect>();
  const [toCurrency, setToCurrency] = useState<CurrencySelect>();
  const [conversionResult, setconversionResult] = useState<ApiResult>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [convLoading, setConvLoading] = useState<boolean>(false);

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

  const handleSelectChange = (currencyCode: string, name: string, label: string) => {
    label === 'From' ? setFromCurrency({name, label, code: currencyCode}) : setToCurrency({name, label, code: currencyCode});
  }
  
  const handleConvertClick = (amount: string, fromCurrency: CurrencySelect, toCurrency: CurrencySelect) => {
    const fromCode = fromCurrency.code;
    const toCode = toCurrency.code;
    const fromName = fromCurrency.name;
    const toName = toCurrency.name;

    if (amount === '0.00') {
      alert('Please enter a valid amount');
      return;
    }

    if (fromCode === "" || toCode === "") {
      alert('Please select a currency');
      return;
    }

    setConvLoading(true)

    fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${toCode}&from=${fromCode}&amount=${amount}`, {
      method: 'GET',
      headers: {
        apikey: process.env.REACT_APP_APILAYER_KEY as string,
      }
    }).then(res => res.json()).then(data => {
      setconversionResult({amount, fromCode, fromName, toCode, toName, result: data.result, rate: data.info.rate});
      setConvLoading(false);
    })
  }


  return (
    <div className="App">
      <div className="title">Currency Converter</div>
      <div className="main">
        { isLoading ? <div className="spinner"><Spinner size={"60"} color={"#fdfdfd"}/></div> :
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
              <div className="result">
                {convLoading && <Spinner size={"40"} color={"#000000"} />}
                {
                  (conversionResult && !convLoading) && (
                    <div>
                      <p className="conversion-from">{conversionResult.amount} {conversionResult.fromCode} =</p>
                      <p className="conversion-result">{conversionResult.result} {conversionResult.toCode}</p>
                      { conversionResult.amount !== '1.00' ? <p className="conversion-rate">1 {conversionResult.fromCode} = {conversionResult.rate} {conversionResult.toCode}</p> : ''}
                    </div>
                  )              
                }
              </div>
              <div className="button" onClick={() => handleConvertClick(amount, fromCurrency as CurrencySelect, toCurrency as CurrencySelect)}>Convert</div>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

interface ApiResult {
  amount: string;
  fromCode: string;
  fromName: string;
  toCode: string;
  toName: string;
  result: number;
  rate: number;
}

interface CurrencySelect {
  name: string;
  code: string;
  label: string;
}

export default App;

