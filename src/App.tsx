import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

import StockPriceChart from './molecules/StockPriceChart';

import { stockPrice } from './types/stockPrice';

const baseURL = 'http://localhost:8000';

function App() {
  const [data, setData] = useState<stockPrice[]>([]);

  useEffect(() => {
    axios.get(baseURL + '?code=7203').then((res) => {
      const stockPrice: stockPrice = {
        date: Object.keys(res.data).map((d: string) => d.slice(0, 10)),
        price: Object.values(res.data),
      };
      setData([...data, stockPrice]);
    });
  }, []);

  return (
    <div className="App">
      {data.length &&
        data.map((d, index) => <StockPriceChart stockPrice={data[index]} />)}
    </div>
  );
}

export default App;
