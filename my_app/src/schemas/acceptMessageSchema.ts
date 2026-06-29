import { z } from "zod";
export const acceptMessageSchema = z.object({
    content: z.string().min(1, { message: "Message content cannot be empty" }),
    createdAt: z.date().default(new Date())
});