function DashboardCard({ title, amount, color }) {

  return (

    <div className="bg-white rounded-2xl shadow-md p-6">

      <h3 className="text-gray-500 text-lg mb-2">
        {title}
      </h3>

      <h1
        className="text-3xl font-bold"
        style={{ color }}
      >
        ₹ {amount}
      </h1>

    </div>
  );
}

export default DashboardCard;