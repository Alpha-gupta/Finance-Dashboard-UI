import { Moon, Sun } from "lucide-react";
import { useStore } from "../store/useStore";

export default function RoleSwitcher() {
  const { role, setRole, darkMode, toggleDarkMode } = useStore();

  return (
    <section className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        
        {/* LEFT CONTENT */}
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
            Finance dashboard
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-slate-100">
            Overview & role preview
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
            Switch between roles to simulate viewer access and admin actions.
          </p>
        </div>

        {/* RIGHT CONTROLS */}
        <div className="flex flex-wrap items-center gap-4">

          {/* 🌙 PREMIUM TOGGLE */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleDarkMode}
              className={`relative w-14 h-7 flex items-center rounded-full p-1 transition duration-300 ${
                darkMode ? "bg-slate-800" : "bg-slate-300"
              }`}
            >
              <div
                className={`w-5 h-5 flex items-center justify-center rounded-full bg-white shadow-md transform transition duration-300 ${
                  darkMode ? "translate-x-7" : "translate-x-0"
                }`}
              >
                {darkMode ? <Moon size={12} /> : <Sun size={12} />}
              </div>
            </button>

            <span className="text-xs text-slate-500 dark:text-slate-400">
              {darkMode ? "Dark" : "Light"}
            </span>
          </div>

          {/* ROLE SWITCH */}
          <div className="flex items-center gap-2 rounded-3xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800">
            <button
              type="button"
              onClick={() => setRole("viewer")}
              className={`min-w-24 rounded-2xl px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] transition ${
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
              className={`min-w-24 rounded-2xl px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] transition ${
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

      {/* INFO CARDS */}
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          {role === "admin"
            ? "Admin can add new transactions and preview how the dashboard updates."
            : "Viewer can explore summaries, charts, and transaction data without editing."}
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200">
          <p className="font-medium">Current mode</p>
          <p className="mt-2">
            {role === "admin"
              ? "Admin dashboard tools enabled"
              : "Viewer access only"}
          </p>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Switch roles to see the interface update clearly.
          </p>
        </div>
      </div>
    </section>
  );
}