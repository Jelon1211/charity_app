import Hero from "../../components/Hero";
import ProgressBar from "../../components/ProgressBar";
import Table from "../../components/Table";
import { NEXT_PUBLIC_GOAL } from "../../config/const";
import { getLatestDonations } from "../../lib/queries/getLatestDonattions";
import { getTotalAmount } from "../../lib/queries/getTotalAmount";

import { Donation } from "../../types/Table";

export default async function Home() {
  const totalAmount = await getTotalAmount();
  const latestDonations: Donation[] | null = await getLatestDonations();

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
          {latestDonations ? <Table latestDonations={latestDonations} /> : ""}
        </div>

        <div className="my-7">
          <ProgressBar goal={NEXT_PUBLIC_GOAL} current={totalAmount.raw} />
        </div>
      </div>
    </>
  );
}
