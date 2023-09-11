const colors = [
  "bg-amber-50",
  "bg-red-50",
  "bg-lime-50",
  "bg-teal-50",
  "bg-sky-50",
  "bg-blue-50",
  "bg-purple-50",
  "bg-rose-50",
];

export const color = () => colors[Math.floor(Math.random() * colors.length)];
