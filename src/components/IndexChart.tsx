
import { useData } from "@/contexts/DataContext";
import { formatValue, isPositiveChange } from "@/utils/csvParser";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ChartDataPoint {
  name: string;
  value: number;
}

const IndexChart = () => {
  const { getSelectedIndexData } = useData();
  const indexData = getSelectedIndexData();

  if (!indexData) {
    return <div className="h-full flex items-center justify-center">Select an index to view data</div>;
  }

  // Create mock chart data since we only have one data point per index
  // In a real application, you'd have historical data
  const chartData: ChartDataPoint[] = [
    { name: "Open", value: parseFloat(indexData.open_index_value) || 0 },
    { name: "Low", value: parseFloat(indexData.low_index_value) || 0 },
    { name: "Close", value: parseFloat(indexData.closing_index_value) || 0 },
    { name: "High", value: parseFloat(indexData.high_index_value) || 0 },
  ];

  // Filter out any NaN values
  const filteredChartData = chartData.filter(
    (point) => !isNaN(point.value) && point.value !== 0
  );

  const pointsChangeValue = parseFloat(indexData.points_change);
  const changePercentValue = parseFloat(indexData.change_percent);
  const isPositive = isPositiveChange(indexData.points_change);

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-2xl font-bold">{indexData.index_name}</h2>
        <div className="flex items-baseline mt-2">
          <span className="text-3xl font-bold">
            {formatValue(indexData.closing_index_value)}
          </span>
          <div className="ml-3 flex items-center">
            <span
              className={`text-lg font-medium ${
                isPositive === null
                  ? "text-gray-500"
                  : isPositive
                  ? "text-positive"
                  : "text-negative"
              }`}
            >
              {!isNaN(pointsChangeValue) ? formatValue(indexData.points_change) : "N/A"}
            </span>
            {!isNaN(changePercentValue) && (
              <span
                className={`ml-2 text-sm ${
                  isPositive === null
                    ? "text-gray-500"
                    : isPositive
                    ? "text-positive"
                    : "text-negative"
                }`}
              >
                ({indexData.change_percent}%)
              </span>
            )}
          </div>
        </div>
        <div className="text-sm text-gray-500 mt-1">{indexData.index_date}</div>
      </div>

      <div className="flex-1 p-4">
        {filteredChartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={filteredChartData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="#0066cc"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="#0066cc"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis
                domain={["dataMin - 100", "dataMax + 100"]}
                tickFormatter={(tick) => tick.toLocaleString()}
              />
              <Tooltip
                formatter={(value: number) =>
                  value.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                }
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#0066cc"
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            No chart data available
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50">
        <div className="p-3 bg-white rounded shadow-sm">
          <div className="text-sm text-gray-500">Volume</div>
          <div className="text-lg font-medium">
            {formatValue(indexData.volume)}
          </div>
        </div>
        <div className="p-3 bg-white rounded shadow-sm">
          <div className="text-sm text-gray-500">Turnover (Rs Cr)</div>
          <div className="text-lg font-medium">
            {formatValue(indexData.turnover_rs_cr)}
          </div>
        </div>
        <div className="p-3 bg-white rounded shadow-sm">
          <div className="text-sm text-gray-500">P/E Ratio</div>
          <div className="text-lg font-medium">
            {formatValue(indexData.pe_ratio)}
          </div>
        </div>
        <div className="p-3 bg-white rounded shadow-sm">
          <div className="text-sm text-gray-500">Dividend Yield</div>
          <div className="text-lg font-medium">
            {formatValue(indexData.div_yield)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexChart;
