import formatAmount from "../../../helpers/formatAmount";
import { sourceLinks } from "../../../helpers/linksHelper";
import { fromUnixSeconds } from "../../../helpers/timeHelper";
import { donationsRaw, totalAmountRaw } from "../../../types/db";
import { mysqlHelper } from "../MysqlHelper";

// TODO dodać typ co zwraca
export async function getLatestDonations() {
  const result = await mysqlHelper.query(
    `
        SELECT amount, purpose, source, donated_at
        FROM donations
        LIMIT 5;
        `
  );
  return prepareLatestDonations(result);
}

function prepareLatestDonations(result: donationsRaw) {
  const formatedData = result.map((item, index) => {
    const result = {
      id: index,
      amount: formatAmount(item.amount),
      source_link: sourceLinks(item.source),
      purpose: item.purpose,
      donated_at: fromUnixSeconds(item.donated_at),
    };
    return result;
  });

  return formatedData;
}
