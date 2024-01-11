import { z } from "zod";
export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password is required").max(255),
});
