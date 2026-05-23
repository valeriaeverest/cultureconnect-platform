// Simple auth store for the MVP (no real Supabase integration yet)

interface User {
  id: string;
  email: string;
  company_name: string;
}

let currentUser: User | null = null;
const listeners: Set<() => void> = new Set();

function notify() {
  listeners.forEach((fn) => fn());
}

export const authStore = {
  getUser: () => currentUser,

  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  login: (email: string, _password: string) => {
    // Mock login — accepts any email/password combo
    currentUser = {
      id: "c1",
      email,
      company_name: "Acme Corp",
    };
    notify();
    return true;
  },

  signup: (email: string, _password: string, companyName: string) => {
    currentUser = {
      id: "c1",
      email,
      company_name: companyName,
    };
    notify();
    return true;
  },

  logout: () => {
    currentUser = null;
    notify();
  },
};
