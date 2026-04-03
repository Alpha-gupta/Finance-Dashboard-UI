import { useMemo, useState } from "react";
import { PlusCircle } from "lucide-react";
import { useStore } from "../store/useStore";

const typeClasses = {
  income: "bg-emerald-100 text-emerald-700",
  expense: "bg-rose-100 text-rose-700",
};

export default function TransactionsTable() {
  const { transactions, filter, setFilter, sortKey, setSortKey, role, addTransaction, editTransaction } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ date: "", timestamp: "", amount: "", category: "", type: "", paymentMode: "" });
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ date: "", timestamp: "09:00", amount: "", category: "", type: "expense", paymentMode: "Online" });

  const resetEditForm = () => {
    setEditId(null);
    setEditForm({ date: "", timestamp: "09:00", amount: "", category: "", type: "expense", paymentMode: "Online" });
  };

  const handleEditClick = (txn) => {
    setEditId(txn.id);
    setEditForm({
      date: txn.date,
      timestamp: txn.timestamp,
      amount: txn.amount.toString(),
      category: txn.category,
      type: txn.type,
      paymentMode: txn.paymentMode,
    });
    setShowForm(false);
  };

  const filtered = useMemo(() => {
    const search = filter.trim().toLowerCase();
    return transactions.filter((txn) => {
      if (!search) return true;
      return [txn.category, txn.type, txn.date, txn.timestamp, txn.paymentMode].some((value) =>
        value.toLowerCase().includes(search)
      );
    });
  }, [transactions, filter]);

  const sorted = useMemo(() => {
    const sortedCopy = [...filtered];
    sortedCopy.sort((a, b) => {
      if (sortKey === "date_asc") return a.date.localeCompare(b.date);
      if (sortKey === "date_desc") return b.date.localeCompare(a.date);
      if (sortKey === "amount_asc") return a.amount - b.amount;
      if (sortKey === "amount_desc") return b.amount - a.amount;
      return 0;
    });
    return sortedCopy;
  }, [filtered, sortKey]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.date || !form.timestamp || !form.amount || !form.category || !form.type || !form.paymentMode) return;

    const nextId = transactions.length
      ? Math.max(...transactions.map((txn) => txn.id)) + 1
      : 1;

    addTransaction({
      id: nextId,
      date: form.date,
      timestamp: form.timestamp,
      amount: Number(form.amount),
      category: form.category,
      type: form.type,
      paymentMode: form.paymentMode,
    });

    setForm({ date: "", timestamp: "09:00", amount: "", category: "", type: "expense", paymentMode: "Online" });
    setShowForm(false);
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();
    if (!editForm.date || !editForm.timestamp || !editForm.amount || !editForm.category || !editForm.type || !editForm.paymentMode) return;

    editTransaction({
      id: editId,
      date: editForm.date,
      timestamp: editForm.timestamp,
      amount: Number(editForm.amount),
      category: editForm.category,
      type: editForm.type,
      paymentMode: editForm.paymentMode,
    });

    resetEditForm();
  };

  const handleCancelEdit = () => {
    resetEditForm();
  };

  return (
    <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Transactions</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Search, sort, and review your recent income and expense entries.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="grid gap-3 sm:grid-flow-col sm:auto-cols-max">
            <input
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Search category, type, payment mode or date"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-sky-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400"
            />
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value)}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-400"
            >
              <option className="text-slate-900 dark:text-slate-100" value="date_desc">Newest first</option>
              <option className="text-slate-900 dark:text-slate-100" value="date_asc">Oldest first</option>
              <option className="text-slate-900 dark:text-slate-100" value="amount_desc">Highest amount</option>
              <option className="text-slate-900 dark:text-slate-100" value="amount_asc">Lowest amount</option>
            </select>
          </div>

          {role === "admin" && (
            <button
              type="button"
              onClick={() => setShowForm((current) => !current)}
              className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              <PlusCircle size={18} />
              {showForm ? "Cancel" : "Add transaction"}
            </button>
          )}
        </div>
      </div>

      {showForm && role === "admin" && (
        <form onSubmit={handleSubmit} className="mb-6 rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800">
          <div className="grid gap-4 md:grid-cols-6">
            <label className="flex flex-col gap-2 text-sm text-slate-700 dark:text-slate-200">
              Date
              <input
                type="date"
                value={form.date}
                placeholder="Select date"
                onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))}
                required
                className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 outline-none transition focus:border-sky-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-slate-700 dark:text-slate-200">
              Time
              <input
                type="time"
                value={form.timestamp}
                placeholder="Select time"
                onChange={(e) => setForm((prev) => ({ ...prev, timestamp: e.target.value }))}
                required
                className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 outline-none transition focus:border-sky-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-slate-700 dark:text-slate-200">
              Amount
              <input
                type="number"
                value={form.amount}
                onChange={(e) => setForm((prev) => ({ ...prev, amount: e.target.value }))}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-2 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400"
                placeholder="0"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-slate-700 dark:text-slate-200">
              Category
              <input
                value={form.category}
                onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-2 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400"
                placeholder="e.g. Groceries"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-slate-700 dark:text-slate-200">
              Type
              <select
                value={form.type}
                onChange={(e) => setForm((prev) => ({ ...prev, type: e.target.value }))}
                required
                className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 outline-none transition focus:border-sky-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              >
                <option value="" disabled>Select transaction type</option>
                <option className="text-slate-900 dark:text-slate-100" value="expense">Expense</option>
                <option className="text-slate-900 dark:text-slate-100" value="income">Income</option>
              </select>
            </label>
            <label className="flex flex-col gap-2 text-sm text-slate-700 dark:text-slate-200">
              Mode
              <select
                value={form.paymentMode}
                onChange={(e) => setForm((prev) => ({ ...prev, paymentMode: e.target.value }))}
                required
                className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 outline-none transition focus:border-sky-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              >
                <option value="" disabled>Select payment mode</option>
                <option className="text-slate-900 dark:text-slate-100" value="Online">Online</option>
                <option className="text-slate-900 dark:text-slate-100" value="Offline">Offline</option>
                <option className="text-slate-900 dark:text-slate-100" value="Direct Deposit">Direct Deposit</option>
              </select>
            </label>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              className="rounded-2xl bg-slate-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              Save transaction
            </button>
          </div>
        </form>
      )}

      {editId !== null && role === "admin" && (
        <form onSubmit={handleEditSubmit} className="mb-6 rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Edit transaction</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Change values and save to update the transaction.</p>
            </div>
            <button
              type="button"
              onClick={handleCancelEdit}
              className="rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            >
              Cancel edit
            </button>
          </div>
          <div className="grid gap-4 md:grid-cols-6">
            <label className="flex flex-col gap-2 text-sm text-slate-700 dark:text-slate-200">
              Date
              <input
                type="date"
                value={editForm.date}
                onChange={(e) => setEditForm((prev) => ({ ...prev, date: e.target.value }))}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 outline-none transition focus:border-sky-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-slate-700 dark:text-slate-200">
              Time
              <input
                type="time"
                value={editForm.timestamp}
                onChange={(e) => setEditForm((prev) => ({ ...prev, timestamp: e.target.value }))}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 outline-none transition focus:border-sky-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-slate-700 dark:text-slate-200">
              Amount
              <input
                type="number"
                value={editForm.amount}
                onChange={(e) => setEditForm((prev) => ({ ...prev, amount: e.target.value }))}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-2 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400"
                placeholder="0"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-slate-700 dark:text-slate-200">
              Category
              <input
                value={editForm.category}
                onChange={(e) => setEditForm((prev) => ({ ...prev, category: e.target.value }))}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-2 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400"
                placeholder="e.g. Groceries"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-slate-700 dark:text-slate-200">
              Type
              <select
                value={editForm.type}
                onChange={(e) => setEditForm((prev) => ({ ...prev, type: e.target.value }))}
                required
                className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 outline-none transition focus:border-sky-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              >
                <option value="" disabled>Select transaction type</option>
                <option className="text-slate-900 dark:text-slate-100" value="expense">Expense</option>
                <option className="text-slate-900 dark:text-slate-100" value="income">Income</option>
              </select>
            </label>
            <label className="flex flex-col gap-2 text-sm text-slate-700 dark:text-slate-200">
              Mode
              <select
                value={editForm.paymentMode}
                onChange={(e) => setEditForm((prev) => ({ ...prev, paymentMode: e.target.value }))}
                required
                className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 outline-none transition focus:border-sky-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              >
                <option value="" disabled>Select payment mode</option>
                <option className="text-slate-900 dark:text-slate-100" value="Online">Online</option>
                <option className="text-slate-900 dark:text-slate-100" value="Offline">Offline</option>
                <option className="text-slate-900 dark:text-slate-100" value="Direct Deposit">Direct Deposit</option>
              </select>
            </label>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              className="rounded-2xl bg-slate-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              Save changes
            </button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-3 text-left">
          <thead>
            <tr className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              <th className="py-3">Date</th>
              <th className="py-3">Time</th>
              <th className="py-3">Amount</th>
              <th className="py-3">Category</th>
              <th className="py-3">Type</th>
              <th className="py-3">Mode</th>
              <th className="py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-10 text-center text-sm text-slate-500 dark:text-slate-400">
                  No transactions found. Try a different search or add a new transaction.
                </td>
              </tr>
            ) : (
              sorted.map((txn) => (
                <tr key={txn.id} className="rounded-3xl bg-slate-50 dark:bg-slate-800">
                  <td className="py-4 text-sm text-slate-700 dark:text-slate-200">{txn.date}</td>
                  <td className="py-4 text-sm text-slate-700 dark:text-slate-200">{txn.timestamp}</td>
                  <td className="py-4 text-sm text-slate-700 dark:text-slate-200">₹ {txn.amount}</td>
                  <td className="py-4 text-sm text-slate-700 dark:text-slate-200">{txn.category}</td>
                  <td className="py-4 text-sm">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${typeClasses[txn.type]}`}>
                      {txn.type}
                    </span>
                  </td>
                  <td className="py-4 text-sm text-slate-700 dark:text-slate-200">{txn.paymentMode}</td>
                  <td className="py-4 text-sm text-slate-700 dark:text-slate-200">
                    {role === "admin" ? (
                      <button
                        type="button"
                        onClick={() => handleEditClick(txn)}
                        className="rounded-2xl border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                      >
                        Edit
                      </button>
                    ) : (
                      <span className="text-sm text-slate-500 dark:text-slate-400">—</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}