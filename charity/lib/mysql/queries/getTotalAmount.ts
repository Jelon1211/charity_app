import formatAmount from "../../../helpers/formatAmount";
import { totalAmountRaw } from "../../../types/db";
import { mysqlHelper } from "../MysqlHelper";

export async function getTotalAmount() {
  const result = await mysqlHelper.query(
    `
        SELECT SUM(amount) AS total_amount
        FROM donations;
        `
  );
  return prepareTotalAmount(result[0]);
}

function prepareTotalAmount(result: totalAmountRaw) {
  return formatAmount(result.total_amount);
}
