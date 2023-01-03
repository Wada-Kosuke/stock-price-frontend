import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './destyle.css';
import './App.scss';

import StockPriceChart from './components/molecules/StockPriceChart';

import { stockPrice } from './types/stockPrice';

const baseURL = 'http://localhost:8000';

function App() {
  const [data, setData] = useState<stockPrice[]>([]);
  const [code, setCode] = useState<string>('');

  const addData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.get(`${baseURL}?code=${code}`).then((res) => {
      const stockPrice: stockPrice = {
        code,
        date: Object.keys(res.data).map((d: string) => d.slice(0, 10)),
        price: Object.values(res.data),
      };
      setData([...data, stockPrice]);
    });
  };

  return (
    <div className="App">
      <form onSubmit={addData}>
        <div className="input-area">
          <div className="input">
            <input
              type="number"
              placeholder="証券コードを入力"
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <button className="add-button" type="submit">
            追加
          </button>
        </div>
      </form>
      <div className="chart-area">
        {data.length > 0 &&
          data.map((d, index) => <StockPriceChart stockPrice={data[index]} />)}
      </div>
    </div>
  );
}

export default App;
