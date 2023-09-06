const colors = [
  "bg-amber-500",
  "bg-red-500",
  "bg-lime-500",
  "bg-emerald-500",
  "bg-sky-500",
  "bg-blue-500",
  "bg-purple-500",
  "bg-rose-500",
];

export const color = () => colors[Math.floor(Math.random() * colors.length)];
