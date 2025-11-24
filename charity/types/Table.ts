export interface Donation {
  id: number;
  amount: string;
  source: SourceObj;
  purpose: Purpose;
  donated_at: string;
}

export interface SourceObj {
  link: string;
  text: string;
  img: string;
}

interface Purpose {
  link: string;
  description: string;
}
