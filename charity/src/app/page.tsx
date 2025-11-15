import Hero from "../../components/Hero";
import ProgressBar from "../../components/ProgressBar";
import Table from "../../components/Table";
import { NEXT_PUBLIC_AMOUNT } from "../../config/const";
import { getLatestDonations } from "../../lib/mysql/queries/getLatestDonations";
import { getTotalAmount } from "../../lib/mysql/queries/getTotalAmount";

type TotalAmount = {
  formatted: string;
  raw: number;
};

export default async function Home() {
  //TODO: add this after more payments
  // const totalAmount = await getTotalAmount();
  const totalAmount: TotalAmount = {
    formatted: `${NEXT_PUBLIC_AMOUNT} zł`,
    raw: Number(NEXT_PUBLIC_AMOUNT),
  };
  const latestDonations = await getLatestDonations();
  // const latestDonations = null;

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--bg)] text-[var(--text)]">
        <div>
          {totalAmount ? (
            <Hero amount={totalAmount.formatted} />
          ) : (
            <div>loading</div>
          )}
        </div>
        <div className="flex flex-col">
          <Table latestDonations={latestDonations} />
        </div>
        <div className="my-4">
          <ProgressBar goal={150} current={totalAmount.raw} />
        </div>
      </div>
    </>
  );
}
