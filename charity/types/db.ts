export type totalAmountRaw = {
  total_amount: number;
};

export type donationsRaw = {
  amount: number;
  purpose: any;
  source: SOURCE;
  donated_at: number;
}[];

export enum SOURCE {
  DOZBRAJAMY = "dozbrajamy",
  WEB_DEV = "web_dev",
}
