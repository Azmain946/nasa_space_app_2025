import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AnalyticsSection = () => {
  const [chartType, setChartType] = useState<"bar" | "horizontal" | "pie">(
    "bar"
  );
  const [ChartData, setChartData] = useState([]);
  const data = {
    labels: ChartData.map(item => item.category), // ["Plant", "Genomics & Multi-omics", "Human", ...]
    datasets: [
      {
        label: "Research Data",
        data: ChartData.map(item => item.count), // [7, 5, 5, 5, 2]
        backgroundColor: [
          "hsl(208 100% 65%)", // Primary blue
          "#22c55e", // Green
          "#eab308", // Yellow
          "#a855f7", // Purple
          "#06b6d4", // Cyan
        ],
        borderColor: "transparent",
        borderWidth: 0,
      },
    ],
  };
  
  console.log(data);
  

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: chartType === "pie",
        labels: {
          color: "white",
        },
      },
      tooltip: {
        backgroundColor: "hsl(225 54% 23%)",
        titleColor: "white",
        bodyColor: "white",
        borderColor: "hsl(208 100% 65%)",
        borderWidth: 1,
      },
    },
    scales:
      chartType !== "pie"
        ? {
            x: {
              ticks: { color: "white" },
              grid: { color: "rgba(255,255,255,0.1)" },
            },
            y: {
              beginAtZero: true,
              ticks: { color: "white" },
              grid: { color: "rgba(255,255,255,0.1)" },
            },
          }
        : undefined,
    indexAxis: chartType === "horizontal" ? ("y" as const) : ("x" as const),
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://www.syfuddhin.com/api/analytics/basic"
        );
        const result = await response.json();
        setChartData(result?.categories);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  console.log(ChartData)
  const renderChart = () => {
    if (chartType === "pie") {
      return <Pie data={data} options={options} />;
    }
    return <Bar data={data} options={options} />;
  };

  return (
    <section className="space-section">
      <h2 className="text-center mb-6 text-primary text-2xl font-semibold">
        Research Data Analytics
      </h2>

      <div className="text-center mb-6">
        <button
          onClick={() => setChartType("bar")}
          className={`space-chart-button ${
            chartType === "bar" ? "bg-primary" : ""
          }`}
        >
          Bar Chart
        </button>
        <button
          onClick={() => setChartType("horizontal")}
          className={`space-chart-button ${
            chartType === "horizontal" ? "bg-primary" : ""
          }`}
        >
          Horizontal
        </button>
        <button
          onClick={() => setChartType("pie")}
          className={`space-chart-button ${
            chartType === "pie" ? "bg-primary" : ""
          }`}
        >
          Pie Chart
        </button>
      </div>

      <div className="bg-chart-bg rounded-xl p-4 h-80">{renderChart()}</div>
    </section>
  );
};

export default AnalyticsSection;
