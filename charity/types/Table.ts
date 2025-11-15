export interface Donation {
  id: number;
  amount: string;
  source_link: SourceObj;
  purpose: Record<string, string>;
  donated_at: string;
}

export interface SourceObj {
  link: string;
  text: string;
  img: string;
}
