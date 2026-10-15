const USERS_KEY = "kido-users";
const SESSION_KEY = "kido-user";

export function getUser(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(SESSION_KEY);
  } catch {
    return null;
  }
}

export function login(username: string, pin: string): { ok: boolean; error?: string } {
  const name = username.trim().toLowerCase();
  if (!/^[a-z0-9_]{3,15}$/.test(name)) {
    return { ok: false, error: "Username 3-15 karakter: huruf, angka, atau _." };
  }
  if (!/^\d{4}$/.test(pin)) {
    return { ok: false, error: "PIN harus 4 angka." };
  }
  try {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) ?? "{}") as Record<string, string>;
    if (users[name]) {
      if (users[name] !== pin) {
        return { ok: false, error: "PIN salah untuk username ini." };
      }
    } else {
      users[name] = pin;
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }
    localStorage.setItem(SESSION_KEY, name);
    return { ok: true };
  } catch {
    return { ok: false, error: "Browser tidak mengizinkan penyimpanan." };
  }
}

export function logout() {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {
    // abaikan
  }
}