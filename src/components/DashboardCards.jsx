import { useStore } from "../store/useStore";
import { ArrowDownRight, ArrowUpRight, Wallet } from "lucide-react";

export default function DashboardCards() {
  const { transactions } = useStore();

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, item) => acc + item.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, item) => acc + item.amount, 0);

  const balance = income - expense;
  const savingsRate = income ? Math.max(0, Math.round(((income - expense) / income) * 100)) : 0;

  return (
    <div className="grid gap-4 lg:grid-cols-4">
      <Card
        title="Current Balance"
        value={balance}
        description="Available funds"
        Icon={Wallet}
        accent="from-sky-500 to-indigo-500"
      />
      <Card
        title="Total Income"
        value={income}
        description="Money earned this period"
        Icon={ArrowUpRight}
        accent="from-emerald-500 to-teal-500"
      />
      <Card
        title="Total Expenses"
        value={expense}
        description="Money spent this period"
        Icon={ArrowDownRight}
        accent="from-rose-500 to-orange-500"
      />
      <Card
        title="Savings Rate"
        value={`${savingsRate}%`}
        description="Income retained"
        Icon={Wallet}
        accent="from-violet-500 to-fuchsia-500"
      />
    </div>
  );
}

function Card({ title, value, description, Icon, accent }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</h2>
          <p className="mt-4 text-3xl font-semibold text-slate-900 dark:text-slate-100">₹ {value}</p>
        </div>
        <div className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${accent} text-white`}>
          <Icon size={20} />
        </div>
      </div>
      <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">{description}</p>
    </div>
  );
}