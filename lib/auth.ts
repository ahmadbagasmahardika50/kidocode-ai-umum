const ACCOUNTS_KEY = "kido-accounts-v2";
const SESSION_KEY = "kido-user";

type Accounts = Record<string, { hash: string }>;

function readAccounts(): Accounts {
  try {
    return JSON.parse(localStorage.getItem(ACCOUNTS_KEY) ?? "{}");
  } catch {
    return {};
  }
}

async function hashPassword(username: string, password: string): Promise<string> {
  const data = new TextEncoder().encode(`${username}:${password}:kidocode`);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function normalizeUsername(u: string): string {
  return u.trim().toLowerCase();
}

export async function register(
  rawUsername: string,
  password: string
): Promise<{ ok: boolean; error?: string }> {
  const username = normalizeUsername(rawUsername);
  if (!/^[a-z0-9_]{3,15}$/.test(username)) {
    return { ok: false, error: "Username 3-15 karakter: huruf kecil, angka, atau _." };
  }
  if (password.length < 6 || password.length > 30) {
    return { ok: false, error: "Kata sandi harus 6 sampai 30 karakter." };
  }
  try {
    const accounts = readAccounts();
    if (accounts[username]) {
      return { ok: false, error: "Username sudah dipakai. Silakan masuk." };
    }
    accounts[username] = { hash: await hashPassword(username, password) };
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
    localStorage.setItem(SESSION_KEY, username);
    return { ok: true };
  } catch {
    return { ok: false, error: "Browser tidak mengizinkan penyimpanan." };
  }
}

export async function login(
  rawUsername: string,
  password: string
): Promise<{ ok: boolean; error?: string }> {
  const username = normalizeUsername(rawUsername);
  const accounts = readAccounts();
  const acc = accounts[username];
  if (!acc) {
    return { ok: false, error: "Akun tidak ditemukan. Silakan daftar dulu." };
  }
  const hash = await hashPassword(username, password);
  if (hash !== acc.hash) {
    return { ok: false, error: "Kata sandi salah." };
  }
  try {
    localStorage.setItem(SESSION_KEY, username);
    return { ok: true };
  } catch {
    return { ok: false, error: "Browser tidak mengizinkan penyimpanan." };
  }
}

// Mengembalikan username yang sedang masuk, hanya jika akunnya masih ada.
export function getUser(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const u = localStorage.getItem(SESSION_KEY);
    if (!u) return null;
    return readAccounts()[u] ? u : null;
  } catch {
    return null;
  }
}

export function logout() {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {
    // abaikan
  }
}

// Setiap akun punya progres sendiri.
export function progressKey(): string {
  const u = getUser();
  return u ? `kido-progress-${u}` : "kido-progress";
}