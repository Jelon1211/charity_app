import Hero from "../../components/hero/Hero";
import { mysqlHelper } from "../../lib/mysql/MysqlHelper";
import { getTotalAmount } from "../../lib/mysql/queries/getTotalAmount";

export default async function Home() {
  const totalAmount = await getTotalAmount();
  console.log(totalAmount);
  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {totalAmount ? <Hero amount={totalAmount} /> : <div>loading</div>}
    </div>
  );
}
