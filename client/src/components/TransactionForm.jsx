import { useState } from "react";

function TransactionForm({
  onSubmit,
  editingTransaction
}) {

  const [formData, setFormData] = useState({
    title: editingTransaction?.title || "",
    amount: editingTransaction?.amount || "",
    type: editingTransaction?.type || "expense",
    category: editingTransaction?.category || ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    onSubmit(formData);

    setFormData({
      title: "",
      amount: "",
      type: "expense",
      category: ""
    });
  };

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-md p-6 mb-8"
    >

      <h2 className="text-2xl font-semibold mb-6 text-[#E0531F]">

        {editingTransaction
          ? "Update Transaction"
          : "Add Transaction"}

      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        >

          <option value="income">
            Income
          </option>

          <option value="expense">
            Expense
          </option>

        </select>

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />

      </div>

      <button
        type="submit"
        className="mt-6 bg-[#E0531F] hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold"
      >

        {editingTransaction
          ? "Update"
          : "Add"}

      </button>

    </form>
  );
}

export default TransactionForm;