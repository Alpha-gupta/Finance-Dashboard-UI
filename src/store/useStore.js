import { create } from "zustand";
import { transactions as initialTransactions } from "../data/mockData";

const STORAGE_KEY = "finance-dashboard-state";

const normalizeTransactions = (transactions) =>
  transactions.map((txn) => ({
    timestamp: "09:00",
    paymentMode: "Online",
    ...txn,
  }));

const loadState = () => {
  const defaultState = {
    transactions: initialTransactions,
    role: "viewer",
    filter: "",
    sortKey: "date_desc",
    darkMode: false,
  };

  if (typeof window === "undefined") {
    return defaultState;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw);
    return {
      ...defaultState,
      ...parsed,
      transactions: parsed.transactions
        ? normalizeTransactions(parsed.transactions)
        : initialTransactions,
      darkMode: parsed.darkMode ?? false,
    };
  } catch {
    return defaultState;
  }
};

const persistState = (state) => {
  if (typeof window === "undefined") return;
  const payload = {
    transactions: state.transactions,
    role: state.role,
    filter: state.filter,
    sortKey: state.sortKey,
    darkMode: state.darkMode,
  };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
};

export const useStore = create((set) => ({
  ...loadState(),
  setRole: (role) =>
    set((state) => {
      const next = { ...state, role };
      persistState(next);
      return { role };
    }),
  setFilter: (filter) =>
    set((state) => {
      const next = { ...state, filter };
      persistState(next);
      return { filter };
    }),
  setSortKey: (sortKey) =>
    set((state) => {
      const next = { ...state, sortKey };
      persistState(next);
      return { sortKey };
    }),
  toggleDarkMode: () =>
    set((state) => {
      const next = { ...state, darkMode: !state.darkMode };
      persistState(next);
      return { darkMode: !state.darkMode };
    }),
  addTransaction: (txn) =>
    set((state) => {
      const nextTransactions = [...state.transactions, txn];
      const next = { ...state, transactions: nextTransactions };
      persistState(next);
      return { transactions: nextTransactions };
    }),
  editTransaction: (updatedTxn) =>
    set((state) => {
      const nextTransactions = state.transactions.map((txn) =>
        txn.id === updatedTxn.id ? updatedTxn : txn
      );
      const next = { ...state, transactions: nextTransactions };
      persistState(next);
      return { transactions: nextTransactions };
    }),
}));