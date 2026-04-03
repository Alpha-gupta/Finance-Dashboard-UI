import { useMemo, useState } from "react";
import { PlusCircle } from "lucide-react";
import { useStore } from "../store/useStore";

const typeClasses = {
  income: "bg-emerald-100 text-emerald-700",
  expense: "bg-rose-100 text-rose-700",
};

export default function TransactionsTable() {
  const {
    transactions,
    filter,
    setFilter,
    sortKey,
    setSortKey,
    role,
    addTransaction,
    editTransaction,
  } = useStore();

  const [showForm, setShowForm] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    date: "",
    timestamp: "09:00",
    amount: "",
    category: "",
    type: "",
    paymentMode: "",
  });

  const inputStyle =
    "rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 placeholder:text-slate-600 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200";

  const selectStyle =
    "rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200";

  const filtered = useMemo(() => {
    const search = filter.trim().toLowerCase();
    return transactions.filter((txn) => {
      if (!search) return true;
      return [txn.category, txn.type, txn.date, txn.timestamp, txn.paymentMode].some((v) =>
        v.toLowerCase().includes(search)
      );
    });
  }, [transactions, filter]);

  const sorted = useMemo(() => {
    const data = [...filtered];
    data.sort((a, b) => {
      if (sortKey === "date_asc") return a.date.localeCompare(b.date);
      if (sortKey === "date_desc") return b.date.localeCompare(a.date);
      if (sortKey === "amount_asc") return a.amount - b.amount;
      if (sortKey === "amount_desc") return b.amount - a.amount;
      return 0;
    });
    return data;
  }, [filtered, sortKey]);

  // ✅ EDIT CLICK
  const handleEditClick = (txn) => {
    setEditId(txn.id);
    setForm({
      date: txn.date,
      timestamp: txn.timestamp,
      amount: txn.amount,
      category: txn.category,
      type: txn.type,
      paymentMode: txn.paymentMode,
    });
    setShowForm(true);
  };

  // ✅ SUBMIT (ADD + EDIT)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.date || !form.timestamp || !form.amount || !form.category || !form.type || !form.paymentMode) {
      setErrorMsg("⚠️ All fields are required");
      return;
    }

    setErrorMsg("");

    if (editId !== null) {
      // ✏️ UPDATE SAME POSITION
      editTransaction({
        id: editId,
        ...form,
        amount: Number(form.amount),
      });
    } else {
      // ➕ ADD
      addTransaction({
        id: Date.now(),
        ...form,
        amount: Number(form.amount),
      });
    }

    setEditId(null);
    setForm({
      date: "",
      timestamp: "09:00",
      amount: "",
      category: "",
      type: "",
      paymentMode: "",
    });

    setShowForm(false);
  };

  return (
    <section className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
      
      {/* HEADER */}
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Transactions</h2>
          <p className="mt-2 text-sm text-slate-500">
            Search, sort, and review your entries.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="grid gap-3 sm:grid-flow-col">
            <input
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Search category, type..."
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm"
            />

            <select value={sortKey} onChange={(e) => setSortKey(e.target.value)} className={selectStyle}>
              <option value="date_desc">Newest</option>
              <option value="date_asc">Oldest</option>
              <option value="amount_desc">High</option>
              <option value="amount_asc">Low</option>
            </select>
          </div>

          {role === "admin" && (
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-2xl hover:bg-slate-700"
            >
              <PlusCircle size={18} />
              {showForm ? "Cancel" : "Add transaction"}
            </button>
          )}
        </div>
      </div>

      {/* FORM */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 grid gap-4 md:grid-cols-3">

          {errorMsg && (
            <p className="col-span-3 text-red-500 text-sm font-medium">
              {errorMsg}
            </p>
          )}

          <input type="date" value={form.date} onChange={(e)=>setForm({...form,date:e.target.value})} className={inputStyle}/>

          {/* 🔥 BETTER TIME INPUT */}
          <div className="relative">
            <input
              type="time"
              value={form.timestamp}
              onChange={(e) => setForm({ ...form, timestamp: e.target.value })}
              className={`${inputStyle} pr-10`}
            />
            <span className="absolute right-3 top-2.5 text-slate-400 text-xs">
              ⏱
            </span>
          </div>

          <input type="number" placeholder="Amount" value={form.amount} onChange={(e)=>setForm({...form,amount:e.target.value})} className={inputStyle}/>
          <input placeholder="Category" value={form.category} onChange={(e)=>setForm({...form,category:e.target.value})} className={inputStyle}/>

          <select value={form.type} onChange={(e)=>setForm({...form,type:e.target.value})} className={selectStyle}>
            <option value="">Type</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <select value={form.paymentMode} onChange={(e)=>setForm({...form,paymentMode:e.target.value})} className={selectStyle}>
            <option value="">Mode</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>

          <button className="col-span-3 bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-500">
            {editId !== null ? "Update" : "Save"}
          </button>
        </form>
      )}

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-3">
          <tbody>
            {sorted.map((txn) => (
              <tr key={txn.id} className="bg-slate-50 rounded-2xl shadow-sm">
                <td className="px-4 py-3">{txn.date}</td>
                <td className="px-4 py-3">{txn.timestamp}</td>
                <td className="px-4 py-3 font-medium">₹ {txn.amount}</td>
                <td className="px-4 py-3">{txn.category}</td>

                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${typeClasses[txn.type]}`}>
                    {txn.type}
                  </span>
                </td>

                <td className="px-4 py-3">{txn.paymentMode}</td>

                <td className="px-4 py-3">
                  {role === "admin" && (
                    <button
                      onClick={() => handleEditClick(txn)}
                      className="text-blue-600 text-xs hover:underline"
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}