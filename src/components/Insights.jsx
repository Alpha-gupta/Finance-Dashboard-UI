import { useStore } from "../store/useStore";

function formatMonth(monthKey) {
  const [year, month] = monthKey.split("-");
  return new Date(Number(year), Number(month) - 1).toLocaleString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export default function Insights() {
  const { transactions } = useStore();

  const income = transactions
    .filter((txn) => txn.type === "income")
    .reduce((total, txn) => total + txn.amount, 0);
  const expense = transactions
    .filter((txn) => txn.type === "expense")
    .reduce((total, txn) => total + txn.amount, 0);

  const expenseByCategory = transactions.reduce((acc, txn) => {
    if (txn.type !== "expense") return acc;
    acc[txn.category] = (acc[txn.category] || 0) + txn.amount;
    return acc;
  }, {});

  const topCategory = Object.entries(expenseByCategory)
    .sort((a, b) => b[1] - a[1])
    .map(([category]) => category)[0] || "No expenses yet";

  const largestTransaction = transactions.reduce((current, txn) => {
    if (!current || txn.amount > current.amount) return txn;
    return current;
  }, null);

  const monthlySummaries = transactions.reduce((acc, txn) => {
    const monthKey = txn.date.slice(0, 7);
    acc[monthKey] = acc[monthKey] || { income: 0, expense: 0 };
    acc[monthKey][txn.type] += txn.amount;
    return acc;
  }, {});

  const months = Object.keys(monthlySummaries).sort();
  const latestMonth = months[months.length - 1];
  const previousMonth = months[months.length - 2];

  const latestExpense = latestMonth ? monthlySummaries[latestMonth].expense : 0;
  const previousExpense = previousMonth ? monthlySummaries[previousMonth].expense : 0;
  const expenseChange = previousExpense
    ? Math.round(((latestExpense - previousExpense) / previousExpense) * 100)
    : 0;

  return (
    <section className="grid gap-4 md:grid-cols-3">
      <InsightCard
        title="Top spending category"
        value={topCategory}
        detail={`₹ ${expenseByCategory[topCategory] || 0} total`}
      />
      <InsightCard
        title="Monthly comparison"
        value={latestMonth ? formatMonth(latestMonth) : "No data"}
        detail={
          latestMonth
            ? `${expenseChange >= 0 ? "+" : ""}${expenseChange}% vs last month`
            : "Add transactions to compare"
        }
      />
      <InsightCard
        title="Largest transaction"
        value={largestTransaction ? `${largestTransaction.category} (${largestTransaction.type})` : "No activity"}
        detail={largestTransaction ? `₹ ${largestTransaction.amount}` : "Start tracking expenses"}
      />
    </section>
  );
}

function InsightCard({ title, value, detail }) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</h3>
      <p className="mt-4 text-xl font-semibold text-slate-900 dark:text-slate-100">{value}</p>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{detail}</p>
    </div>
  );
}