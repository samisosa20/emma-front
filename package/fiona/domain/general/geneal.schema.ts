import { z } from "zod";

const currencySchema = z.object({
  id: z.number(),
  code: z.string(),
  name: z.string(),
});

export { currencySchema }