import Hero from "../../components/hero/Hero";
import { getLatestDonations } from "../../lib/mysql/queries/getLatestDonations";
import { getTotalAmount } from "../../lib/mysql/queries/getTotalAmount";

export default async function Home() {
  const totalAmount = await getTotalAmount();
  const latestDonations = await getLatestDonations();
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--bg)] text-[var(--text)]">
        <div>
          {totalAmount ? <Hero amount={totalAmount} /> : <div>loading</div>}
        </div>
        <div className="flex flex-col">
          {latestDonations
            ? latestDonations.map((item) => (
                <div key={item.id}>
                  <span>{item.amount}</span>
                  <span>{item.source_link}</span>
                  <span>{JSON.stringify(item.purpose)}</span>
                  <span>{item.donated_at.toLocaleString("pl-PL")}</span>
                </div>
              ))
            : null}
        </div>
      </div>
    </>
  );
}
