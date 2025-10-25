import { z } from "zod";

export const DonationRequestSchema = z.object({
  donated_at: z.number().int().positive(),
  amount: z.number().int().positive(),
  purpose: z.any(),
  source: z.enum(["dozbrajamy", "web_dev"]),
});

export type AddRequest = z.infer<typeof DonationRequestSchema>;
