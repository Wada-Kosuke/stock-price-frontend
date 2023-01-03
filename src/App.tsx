import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';

import logo from './logo.svg';
import './App.css';

ChartJS.register(...registerables);
const baseURL = 'http://localhost:8000';

interface stockPrice {
  date: string[];
  price: number[];
}

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
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      {data.length &&
        data.map((d, index) => (
          <Line
            key={d.date[index]}
            data={{
              labels: d.date,
              datasets: [
                {
                  label: '',
                  data: d.price,
                },
              ],
            }}
          />
        ))}
    </div>
  );
}

export default App;
