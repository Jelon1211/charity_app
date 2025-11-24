import { z } from "zod";

export const DonationRequestSchema = z.object({
  donated_at: z.number().int().positive().gte(946684800).lte(32503680000),

  amount: z.number().int().positive(),

  purpose: z.object({
    link: z.string().refine((val) => {
      try {
        new URL(val);
        return true;
      } catch {
        return false;
      }
    }, "Invalid URL"),

    description: z.string().min(3),
  }),

  source: z.enum(["dozbrajamy", "web_dev"]),
});

export type AddRequest = z.infer<typeof DonationRequestSchema>;
