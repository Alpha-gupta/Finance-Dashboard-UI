import {
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
  Legend,
} from "recharts";
import { useStore } from "../store/useStore";

const COLORS = ["#22c55e", "#60a5fa", "#f97316", "#f43f5e", "#a855f7", "#38bdf8"];

function formatMonth(monthKey) {
  const [year, month] = monthKey.split("-");
  return new Date(Number(year), Number(month) - 1).toLocaleString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export default function Charts() {
  const { transactions } = useStore();

  const monthlyTotals = transactions.reduce((acc, txn) => {
    const monthKey = txn.date.slice(0, 7);
    acc[monthKey] = acc[monthKey] || { income: 0, expense: 0 };
    acc[monthKey][txn.type] += txn.amount;
    return acc;
  }, {});

  const monthlyData = Object.keys(monthlyTotals)
    .sort()
    .map((monthKey) => ({
      month: formatMonth(monthKey),
      income: monthlyTotals[monthKey].income,
      expense: monthlyTotals[monthKey].expense,
      balance: monthlyTotals[monthKey].income - monthlyTotals[monthKey].expense,
    }));

  const expenseByCategory = transactions.reduce((acc, txn) => {
    if (txn.type !== "expense") return acc;
    acc[txn.category] = (acc[txn.category] || 0) + txn.amount;
    return acc;
  }, {});

  const pieData = Object.entries(expenseByCategory).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Balance Trend</p>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Monthly activity</h2>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">Income vs Expenses</span>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="income" stroke="#22c55e" strokeWidth={3} dot={false} />
              <Line type="monotone" dataKey="expense" stroke="#f97316" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="mb-4">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Spending Breakdown</p>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Expense categories</h2>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                innerRadius={50}
                outerRadius={90}
                paddingAngle={4}
              >
                {pieData.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend layout="vertical" verticalAlign="middle" align="right" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}