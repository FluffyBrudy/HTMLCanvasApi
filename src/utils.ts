export function generateRandomColor() {
  const r = randint(100, 255);
  const g = randint(100, 255);
  const b = randint(100, 255);
  return `rgb(${r}, ${g}, ${b})`;
}

export function randint(s: number, e: number) {
  if (s > e) throw new Error("Invalid range");
  return Math.floor(s + Math.random() * (e - s + 1));
}
