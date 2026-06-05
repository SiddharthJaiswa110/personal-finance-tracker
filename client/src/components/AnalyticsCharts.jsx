import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from "recharts";

function AnalyticsCharts({
  categoryData,
  monthlyData
}) {

  const COLORS = [
    "#E0531F",
    "#FF8042",
    "#FFBB28",
    "#00C49F",
    "#0088FE"
  ];

  return (

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">

      {/* Pie Chart */}
      <div className="bg-white rounded-2xl shadow-md p-6">

        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          Expense Categories
        </h2>

        <div className="h-[350px]">

          <ResponsiveContainer width="100%" height="100%">

            <PieChart>

              <Pie
                data={categoryData}
                dataKey="total"
                nameKey="category"
                outerRadius={120}
                label
              >

                {categoryData.map((entry, index) => (

                  <Cell
                    key={index}
                    fill={
                      COLORS[
                        index % COLORS.length
                      ]
                    }
                  />

                ))}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* Bar Chart */}
      <div className="bg-white rounded-2xl shadow-md p-6">

        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          Monthly Overview
        </h2>

        <div className="h-[350px]">

          <ResponsiveContainer width="100%" height="100%">

            <BarChart data={monthlyData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar
                dataKey="income"
                fill="#00C49F"
                radius={[6, 6, 0, 0]}
              />

              <Bar
                dataKey="expense"
                fill="#E0531F"
                radius={[6, 6, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}

export default AnalyticsCharts;