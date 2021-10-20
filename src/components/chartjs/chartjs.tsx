import React, { useRef, useEffect, useState } from 'react';

import Chart from 'chart.js/auto';
import moment from 'moment';

import './chart.css';

// Data generation
function getRandomArray(numItems: number) {
  // Create random array of objects
  let names = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let data = [];
  for (var i = 0; i < numItems; i++) {
    data.push({
      label: names[i],
      value: Math.round(50 + 80 * Math.random()),
    });
  }
  return data;
}

function getRandomDateArray(numItems: number): Data[] {
  // Create random array of objects (with date)
  const mainFormat = 'DD-MM-YY';
  let data = [];
  let weeks = 0;

  for (var i = 0; i < numItems; i++) {
    data.push({
      time: moment('2020-01-01')
        .add(weeks++, 'week')
        .format(mainFormat),
      value: Math.round(30 + 80 * Math.random()),
    });
  }
  return data;
}

function getData() {
  let data: RandomData[] = [];

  data.push({
    title: 'Visits',
    data: getRandomDateArray(50),
  });

  data.push({
    title: 'Categories',
    data: getRandomArray(20),
  });

  data.push({
    title: 'Categories',
    data: getRandomArray(10),
  });

  data.push({
    title: 'Data 4',
    data: getRandomArray(6),
  });

  return data;
}
interface Data {
  label?: string;
  value: number;
  time?: string;
}
interface RandomData {
  title: string;
  data: Data[];
}
interface ChartProps {
  data: any[]; //Data[];
  title: string;
  color: string;
}

interface DoughnutChartProps {
  data: Data[];
  colors: string[];
  title: string;
}

// LineChart
const LineChart: React.FC<ChartProps> = ({ data, color, title }) => {
  const canvasRef = useRef(null);
  const [myChart, setMyChart] = useState<
    Chart<'line', (number | undefined)[], string | undefined>
  >();

  useEffect(() => {
    if (canvasRef) {
      const newChartInstance = new Chart(canvasRef.current!, {
        type: 'line',
        options: {
          maintainAspectRatio: false,
          animations: {
            tension: {
              duration: 1000,
              easing: 'linear',
              from: 1,
              to: 0,
              loop: true,
            },
          },
          scales: {
            y: {
              // defining min and max so hiding the dataset does not change scale range
              min: 0,
              max: 110,
            },
          },
        },
        data: {
          labels: data.map((d: Data) => d.time),
          datasets: [
            {
              label: title,
              data: data.map((d: Data) => d.value),
              fill: 'none',
              backgroundColor: color,
              pointRadius: 2,
              borderColor: color,
              borderWidth: 1,
            },
          ],
        },
      });
      setMyChart(newChartInstance);
    }
  }, [canvasRef]);

  useEffect(() => {
    if (myChart) {
      myChart.data.labels = data.map((d) => d.time);
      myChart.data.datasets[0].data = data.map((d) => d.value);
      myChart.update();
    }
  }, [data, myChart]);

  return <canvas ref={canvasRef} />;
};

// Doughnut
const DoughnutChart: React.FC<DoughnutChartProps> = ({
  data,
  colors,
  title,
}) => {
  const canvasRef = useRef(null);
  const [myChart, setMyChart] = useState<
    Chart<'doughnut', (number | undefined)[], string | undefined>
  >();

  useEffect(() => {
    if (canvasRef) {
      const newChartInstance = new Chart(canvasRef.current!, {
        type: 'doughnut',
        options: {
          maintainAspectRatio: false,
        },
        data: {
          labels: data.map((d) => d.label),
          datasets: [
            {
              label: title,
              data: data.map((d) => d.value),
              backgroundColor: colors,
            },
          ],
        },
      });
      setMyChart(newChartInstance);
    }
  }, [canvasRef]);

  useEffect(() => {
    if (myChart) {
      myChart.data.labels = data.map((d) => d.label);
      myChart.data.datasets[0].data = data.map((d) => d.value);
      myChart.update();
    }
  }, [data, myChart]);

  return <canvas ref={canvasRef} />;
};

// BarChart
const BarChart: React.FC<ChartProps> = ({ data, title, color }) => {
  const canvasRef = useRef(null);
  const [myChart, setMyChart] = useState<
    Chart<'bar', (number | undefined)[], string | undefined>
  >();
  useEffect(() => {
    if (canvasRef) {
      const newChartInstance = new Chart(canvasRef.current!, {
        type: 'bar',
        options: {
          maintainAspectRatio: false,
          plugins: { legend: { labels: { font: { size: 30 } } } },
          layout: { padding: { right: 10 } },
        },
        data: {
          labels: data.map((d: Data) => d.label),
          datasets: [
            {
              label: title,
              data: data.map((d: Data) => d.value),
              backgroundColor: color,
            },
          ],
        },
      });
      setMyChart(newChartInstance);
    }
  }, [canvasRef]);
  useEffect(() => {
    if (myChart) {
      myChart.data.labels = data.map((d) => d.label);
      myChart.data.datasets[0].data = data.map((d) => d.value);
      myChart.update();
    }
  }, [data, myChart]);
  return <canvas ref={canvasRef} />;
};

// ChartJS
const ChartJS = () => {
  const [data, setData] = useState<RandomData[]>(getData());

  useEffect(() => {
    //  setInterval(() => {
    setData(getData());
    // }, 5000);
  }, []);

  return (
    <div className="App">
      <div className="main chart-wrapper">
        <LineChart data={data[0].data} title={data[0].title} color="#3E517A" />
      </div>
      <div className="sub chart-wrapper">
        <BarChart
          data={[
            { label: 'AAA', value: 10 },
            { label: 'BBBB', value: 20 },
            { label: 'CCC', value: 30 },
            { label: 'DDDD', value: 40 },
          ]}
          title={'ABCD'}
          color="#70CAD1"
        />
      </div>
      <div className="sub chart-wrapper">
        <BarChart data={data[2].data} title={data[2].title} color="#B08EA2" />
      </div>
      <div className="sub chart-wrapper">
        <DoughnutChart
          data={data[3].data}
          title={data[3].title}
          colors={[
            '#a8e0ff',
            '#8ee3f5',
            '#70cad1',
            '#3e517a',
            '#b08ea2',
            '#BBB6DF',
          ]}
        />
      </div>
    </div>
  );
};

export default ChartJS;
