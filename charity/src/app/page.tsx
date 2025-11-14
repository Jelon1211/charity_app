import Hero from "../../components/hero/Hero";
import Table from "../../components/hero/Table";
import { NEXT_PUBLIC_AMOUNT } from "../../config/const";
import { getLatestDonations } from "../../lib/mysql/queries/getLatestDonations";
import { getTotalAmount } from "../../lib/mysql/queries/getTotalAmount";

export default async function Home() {
  //TODO: add this after more payments
  const totalAmount = await getTotalAmount();
  // const totalAmount = `${NEXT_PUBLIC_AMOUNT} zł`;
  const latestDonations = await getLatestDonations();
  // const latestDonations = null;
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--bg)] text-[var(--text)]">
        <div>
          {totalAmount ? <Hero amount={totalAmount} /> : <div>loading</div>}
        </div>
        <div className="flex flex-col">
          <Table latestDonations={latestDonations} />
        </div>
      </div>
    </>
  );
}
