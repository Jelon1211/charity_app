"use clinet";

export default function Hero({ amount }: HeroPros) {
  return (
    <div>
      Wspólnie pomogliśmy tyle:
      <span>{amount}</span>
    </div>
  );
}
