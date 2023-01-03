import { Chart as ChartJS, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { stockPrice } from '../../types/stockPrice';

ChartJS.register(...registerables);

interface props {
  stockPrice: stockPrice;
}

const gridColor = '#404651';

function StockPriceChart(props: props) {
  return (
    <div className="molecules-stock-price-chart">
      <Line
        data={{
          labels: props.stockPrice.date,
          datasets: [
            {
              data: props.stockPrice.price,
            },
          ],
        }}
        options={{
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: props.stockPrice.code,
              color: '#aaa',
            },
          },
          scales: {
            x: {
              grid: {
                color: gridColor,
              },
            },
            y: {
              grid: {
                color: gridColor,
              },
            },
          },
        }}
      />
    </div>
  );
}

export default StockPriceChart;
