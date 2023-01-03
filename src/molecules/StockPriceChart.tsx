import { Chart as ChartJS, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { stockPrice } from '../types/stockPrice';

ChartJS.register(...registerables);

interface props {
  stockPrice: stockPrice;
}

function StockPriceChart(props: props) {
  return (
    <div className="molecules-stock-price-chart">
      <Line
        data={{
          labels: props.stockPrice.date,
          datasets: [
            {
              label: props.stockPrice.code,
              data: props.stockPrice.price,
            },
          ],
        }}
      />
    </div>
  );
}

export default StockPriceChart;
