export interface Donation {
  id: number;
  amount: string;
  source_link: string;
  purpose: Record<string, string>;
  donated_at: string;
}
