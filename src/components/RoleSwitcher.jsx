import { Moon, Sun } from "lucide-react";
import { useStore } from "../store/useStore";

export default function RoleSwitcher() {
  const { role, setRole, darkMode, toggleDarkMode } = useStore();

  return (
    <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Finance dashboard</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-slate-100">Overview & role preview</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
            Switch between roles to simulate viewer access and admin actions. The dashboard updates clearly in both modes.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={toggleDarkMode}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
              {darkMode ? "Switch to light" : "Switch to dark"}
            </button>
            <span className="inline-flex items-center justify-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600 dark:bg-slate-700 dark:text-slate-200">
              {darkMode ? "Dark mode active" : "Light mode active"}
            </span>
          </div>

          <div className="flex items-center gap-2 rounded-3xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800">
            <button
              type="button"
              onClick={() => setRole("viewer")}
              className={`min-w-[110px] rounded-2xl px-4 py-2 text-sm font-semibold uppercase tracking-[0.12em] transition duration-200 ${
                role === "viewer"
                  ? "bg-slate-900 text-white shadow-lg dark:bg-slate-100 dark:text-slate-900"
                  : "bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
              }`}
            >
              Viewer
            </button>
            <button
              type="button"
              onClick={() => setRole("admin")}
              className={`min-w-[110px] rounded-2xl px-4 py-2 text-sm font-semibold uppercase tracking-[0.12em] transition duration-200 ${
                role === "admin"
                  ? "bg-slate-900 text-white shadow-lg dark:bg-slate-100 dark:text-slate-900"
                  : "bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
              }`}
            >
              Admin
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          {role === "admin"
            ? "Admin can add new transactions and preview how the dashboard updates."
            : "Viewer can explore summaries, charts, and transaction data without editing."}
        </div>
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200">
          <p className="font-medium">Current mode</p>
          <p className="mt-2">{role === "admin" ? "Admin dashboard tools enabled" : "Viewer access only"}</p>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Switch roles to see the interface update clearly across the dashboard.
          </p>
        </div>
      </div>
    </section>
  );
}