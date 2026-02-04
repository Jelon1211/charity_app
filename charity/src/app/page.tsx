import Hero from "../../components/Hero";
import ProgressBar from "../../components/ProgressBar";
import Table from "../../components/Table";
import { NEXT_PUBLIC_GOAL } from "../../config/const";
import { getDonations } from "../../lib/queries/getDonattions";
import { getThisYearDonations } from "../../lib/queries/getThisYearDonations";
import { getTotalAmount } from "../../lib/queries/getTotalAmount";

import { Donation } from "../../types/Table";

export default async function Home() {
  const totalAmount = await getTotalAmount();
  const donations: Donation[] | null = await getDonations();
  const thisYearAmount: number = await getThisYearDonations();

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
          {donations ? <Table donationsProp={donations} /> : ""}
        </div>

        <div className="my-7">
          <ProgressBar goal={NEXT_PUBLIC_GOAL} thisYearAmount={thisYearAmount} />
        </div>
      </div>
    </>
  );
}
