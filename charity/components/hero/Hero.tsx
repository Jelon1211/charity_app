export default function Hero({ amount }: HeroPros) {
  return (
    <div className="flex flex-col justify-center items-center">
      <span>Przekazałem już</span>
      <span className="text-6xl my-4 font-bold">{amount}</span>
      <span>na cele charytatywne z moich działalności</span>
    </div>
  );
}
