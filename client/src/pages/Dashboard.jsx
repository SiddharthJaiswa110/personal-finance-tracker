import {
  useEffect,
  useState
} from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import DashboardCard from "../components/DashboardCard";

import AnalyticsCharts from "../components/AnalyticsCharts";

import API from "../services/api";

function Dashboard() {

  const [summary, setSummary] = useState({
    totalBalance: 0,
    totalIncome: 0,
    totalExpense: 0
  });

  const [recentTransactions, setRecentTransactions] = useState([]);

  const [categoryData, setCategoryData] = useState([]);

  const [monthlyData, setMonthlyData] = useState([]);

  const [loading, setLoading] = useState(true);

  // Fetch Dashboard Data
  const fetchDashboardData = async () => {

    try {

      setLoading(true);

      // Dashboard Summary
      const response = await API.get("/dashboard");

      setSummary(response.data.summary);

      setRecentTransactions(
        response.data.recentTransactions
      );

      // Category Analytics
      const categoryResponse = await API.get(
        "/dashboard/categories"
      );

      setCategoryData(
        categoryResponse.data.categoryData
      );

      // Monthly Analytics
      const monthlyResponse = await API.get(
        "/dashboard/monthly"
      );

      setMonthlyData(
        monthlyResponse.data.monthlyData
      );

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  };

  // Load Data on Page Load
  useEffect(() => {

    fetchDashboardData();

  }, []);

  // Loading UI
  if (loading) {

    return (

      <DashboardLayout>

        <div className="flex items-center justify-center h-[70vh]">

          <h1 className="text-2xl font-bold text-[#E0531F]">
            Loading Dashboard...
          </h1>

        </div>

      </DashboardLayout>
    );
  }

  return (

    <DashboardLayout>

      <h1 className="text-3xl font-bold text-[#E0531F] mb-8">
        Finance Dashboard
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <DashboardCard
          title="Total Balance"
          amount={summary.totalBalance}
          color="#E0531F"
        />

        <DashboardCard
          title="Total Income"
          amount={summary.totalIncome}
          color="green"
        />

        <DashboardCard
          title="Total Expense"
          amount={summary.totalExpense}
          color="red"
        />

      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-10">

        <h2 className="text-2xl font-semibold mb-6 text-gray-700">
          Recent Transactions
        </h2>

        <div className="space-y-4">

          {recentTransactions.length > 0 ? (

            recentTransactions.map((transaction) => (

              <div
                key={transaction._id}
                className="flex justify-between items-center border-b pb-3"
              >

                <div>

                  <h3 className="font-semibold text-gray-700">
                    {transaction.title}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {transaction.category}
                  </p>

                </div>

                <h2
                  className={`font-bold ${
                    transaction.type === "income"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {transaction.type === "income"
                    ? "+"
                    : "-"}
                  ₹ {transaction.amount}
                </h2>

              </div>

            ))

          ) : (

            <p className="text-gray-500">
              No transactions found.
            </p>

          )}

        </div>

      </div>

      {/* Charts */}
      <AnalyticsCharts
        categoryData={categoryData}
        monthlyData={monthlyData}
      />

    </DashboardLayout>
  );
}

export default Dashboard;