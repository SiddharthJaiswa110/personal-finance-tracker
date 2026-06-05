import {
  useEffect,
  useState
} from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import API from "../services/api";

import TransactionForm from "../components/TransactionForm";

function Transactions() {

  const [transactions, setTransactions] = useState([]);

  const [editingTransaction, setEditingTransaction] = useState(null);

  // Fetch Transactions
  const fetchTransactions = async () => {

    try {

      const response = await API.get("/transactions");

      setTransactions(response.data.transactions);

    } catch (error) {

      console.error(error);
    }
  };

  // Load transactions
  useEffect(() => {

    fetchTransactions();

  }, []);

  // Add Transaction
  const handleAddTransaction = async (formData) => {

    try {

      await API.post(
        "/transactions",
        formData
      );

      fetchTransactions();

    } catch (error) {

      console.error(error);
    }
  };

  // Delete Transaction
  const handleDelete = async (id) => {

    try {

      await API.delete(`/transactions/${id}`);

      fetchTransactions();

    } catch (error) {

      console.error(error);
    }
  };

  // Edit Transaction
  const handleEdit = (transaction) => {

    setEditingTransaction(transaction);
  };

  // Update Transaction
  const handleUpdateTransaction = async (formData) => {

    try {

      await API.put(
        `/transactions/${editingTransaction._id}`,
        formData
      );

      setEditingTransaction(null);

      fetchTransactions();

    } catch (error) {

      console.error(error);
    }
  };

  return (

    <DashboardLayout>

      <h1 className="text-3xl font-bold text-[#E0531F] mb-8">
        Transactions
      </h1>

      {/* Form */}
      <TransactionForm
        onSubmit={
          editingTransaction
            ? handleUpdateTransaction
            : handleAddTransaction
        }
        editingTransaction={editingTransaction}
      />

      {/* Transactions Table */}
      <div className="bg-white rounded-2xl shadow-md p-6 overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left py-3">
                Title
              </th>

              <th className="text-left py-3">
                Amount
              </th>

              <th className="text-left py-3">
                Type
              </th>

              <th className="text-left py-3">
                Category
              </th>

              <th className="text-left py-3">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {transactions.map((transaction) => (

              <tr
                key={transaction._id}
                className="border-b"
              >

                <td className="py-4">
                  {transaction.title}
                </td>

                <td
                  className={`py-4 font-semibold ${
                    transaction.type === "income"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  ₹ {transaction.amount}
                </td>

                <td className="py-4 capitalize">
                  {transaction.type}
                </td>

                <td className="py-4">
                  {transaction.category}
                </td>

                <td className="py-4 flex gap-3">

                  <button
                    onClick={() =>
                      handleEdit(transaction)
                    }
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(transaction._id)
                    }
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </DashboardLayout>
  );
}

export default Transactions;