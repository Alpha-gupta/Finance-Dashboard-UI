import { useEffect } from "react";
import { useStore } from "../store/useStore";
import DashboardCards from "../components/DashboardCards";
import Charts from "../components/Charts";
import TransactionsTable from "../components/TransactionsTable";
import RoleSwitcher from "../components/RoleSwitcher";
import Insights from "../components/Insights";
import ParticlesBackground from "../components/ParticlesBackground";

export default function Dashboard() {
  const { darkMode } = useStore();

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
      document.body.style.backgroundColor = "#0f172a";
      document.body.style.color = "#e2e8f0";
    } else {
      root.classList.remove("dark");
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
      document.body.style.backgroundColor = "";
      document.body.style.color = "";
    }
  }, [darkMode]);

  return (
    <main className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"}`}>
      <div className="relative overflow-hidden">
        <ParticlesBackground />
        <div className="relative mx-auto max-w-7xl p-6 space-y-6">
          <RoleSwitcher />
          <DashboardCards />
          <Charts />
          <Insights />
          <TransactionsTable />
        </div>
      </div>
    </main>
  );
}