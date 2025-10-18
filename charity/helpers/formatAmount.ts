export default function formatAmount(amount: number) {
  const formatter = new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
    minimumFractionDigits: 2,
  });

  return formatter.format(amount / 100);
}
