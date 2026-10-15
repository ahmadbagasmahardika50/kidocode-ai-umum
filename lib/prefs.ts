// Pengaturan tampilan yang disimpan di browser.
export function getTextBig(): boolean {
  try {
    return localStorage.getItem("kido-text") === "besar";
  } catch {
    return false;
  }
}

export function applyTextSize(on: boolean) {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.text = on ? "besar" : "normal";
}

export function setTextBig(on: boolean) {
  try {
    localStorage.setItem("kido-text", on ? "besar" : "normal");
  } catch {
    // localStorage tidak tersedia: abaikan
  }
  applyTextSize(on);
}