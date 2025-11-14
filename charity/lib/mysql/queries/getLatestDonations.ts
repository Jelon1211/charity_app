import formatAmount from "../../../helpers/formatAmount";
import { sourceLinks } from "../../../helpers/linksHelper";
import { formatDateToDisplay } from "../../../helpers/timeHelper";
import { donationsRaw } from "../../../types/db";
import { mysqlHelper } from "../MysqlHelper";

// TODO dodać typ co zwraca
export async function getLatestDonations(
  offset: number = 0,
  limit: number = 3
) {
  const result = await mysqlHelper.query(
    `
        SELECT amount, purpose, source, donated_at
        FROM donations
        LIMIT ? OFFSET ?;
    `,
    [limit, offset]
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
      donated_at: formatDateToDisplay(item.donated_at, "pl-PL", {
        dateStyle: "medium",
        timeZone: "Europe/Warsaw",
      }),
    };
    return result;
  });

  return formatedData;
}
