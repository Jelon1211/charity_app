import { nowUnix } from "../../../helpers/nowUnix";
import { AddRequest } from "../../../schemas/donation.schema";
import { mysqlHelper } from "../MysqlHelper";

export async function addDonation(data: AddRequest) {
  const { donated_at, amount, purpose, source } = data;

  const query = `
  INSERT INTO donations (donated_at, amount, purpose, source, created, modified)
  VALUES (?, ?, CAST(? AS JSON), ?, ?, ?)
  `;

  const params = [
    donated_at,
    amount,
    JSON.stringify(purpose),
    source,
    nowUnix(),
    nowUnix(),
  ];

  await mysqlHelper.query(query, params);

  return {
    donated_at,
    amount,
    purpose,
    source,
  };
}
