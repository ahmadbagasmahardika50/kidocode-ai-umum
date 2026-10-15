export type BlockType = "maju" | "belok" | "ambil" | "ulang";
export type Dir = 0 | 1 | 2 | 3; // 0 kanan, 1 bawah, 2 kiri, 3 atas
export type Pos = { x: number; y: number };

export const COLS = 4;
export const ROWS = 3;
const DX = [1, 0, -1, 0];
const DY = [0, 1, 0, -1];

export type Mission = {
  id: number;
  title: string;
  story: string;
  hint: string;
  start: Pos;
  battery: Pos;
};

export const MISSIONS: Mission[] = [
  {
    id: 1,
    title: "Jalan lurus",
    story: "Baterai berada di ujung kanan atas. Robot hanya perlu berjalan lurus lalu mengambil baterai.",
    hint: "Robot menghadap ke kanan. Berapa kali robot harus maju?",
    start: { x: 0, y: 0 },
    battery: { x: 3, y: 0 },
  },
  {
    id: 2,
    title: "Belok sekali",
    story: "Baterai ada di kiri bawah. Robot harus berbelok sebelum bisa maju ke sana.",
    hint: "Robot menghadap ke kanan. Arah mana yang harus dihadapi agar robot turun?",
    start: { x: 0, y: 0 },
    battery: { x: 0, y: 2 },
  },
  {
    id: 3,
    title: "Belok dua kali",
    story: "Baterai ada di tengah bawah. Robot perlu berjalan, berbelok, lalu berjalan lagi.",
    hint: "Pikirkan dulu jalan ke kanan, lalu kapan robot harus berbelok ke bawah.",
    start: { x: 0, y: 0 },
    battery: { x: 2, y: 2 },
  },
  {
    id: 4,
    title: "Pakai pengulangan",
    story: "Baterai ada di kanan bawah. Jalan ke kanan cukup panjang, jadi gunakan blok ulang agar urutannya lebih ringkas.",
    hint: "Blok Ulang maju 3x melakukan tiga langkah maju sekaligus. Setelah itu, robot perlu berbelok ke bawah.",
    start: { x: 0, y: 0 },
    battery: { x: 3, y: 2 },
  }, 
  {
    id: 5,
    title: "Turun lalu ambil",
    story: "Baterai ada di kiri bawah. Robot harus berbelok ke bawah, lalu mengambil baterai.",
    hint: "Robot menghadap ke kanan. Arah mana yang harus dihadapi agar robot bisa turun?",
    start: { x: 0, y: 0 },
    battery: { x: 0, y: 1 },
  },
];

export type Frame = { x: number; y: number; dir: Dir; msg?: string; won?: boolean };

// Blok ulang diubah menjadi tiga blok maju sebelum simulasi dimulai.
function expand(blocks: BlockType[]): BlockType[] {
  return blocks.flatMap((b) => (b === "ulang" ? ["maju", "maju", "maju"] : [b])) as BlockType[];
}

// Simulasi murni: menghitung seluruh langkah robot dari urutan blok.
export function simulate(blocks: BlockType[], m: Mission): Frame[] {
  let { x, y } = m.start;
  let dir: Dir = 0;
  const frames: Frame[] = [{ x, y, dir }];

  for (const b of expand(blocks)) {
    if (b === "belok") {
      dir = ((dir + 1) % 4) as Dir;
      frames.push({ x, y, dir });
    } else if (b === "maju") {
      const nx = x + DX[dir];
      const ny = y + DY[dir];
      if (nx < 0 || ny < 0 || nx >= COLS || ny >= ROWS) {
        frames.push({ x, y, dir, msg: "Robot menabrak dinding. Coba atur ulang urutannya." });
        return frames;
      }
      x = nx;
      y = ny;
      frames.push({ x, y, dir });
    } else if (b === "ambil") {
      const won = x === m.battery.x && y === m.battery.y;
      frames.push({
        x,
        y,
        dir,
        won,
        msg: won
          ? "Robot berhasil mengambil baterai."
          : "Baterai belum ditemukan. Coba susun ulang blok.",
      });
      return frames;
    }
  }

  frames.push({ x, y, dir, msg: "Program selesai, tetapi robot belum mengambil baterai." });
  return frames;
}