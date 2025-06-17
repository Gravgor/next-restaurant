import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string({ message: "Database URL is required" }),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  throw new Error(
    "⚠️ Missing environment variables. Please check your .env file: " +
      JSON.stringify(_env.error.format(), null, 2),
  );
}

export const environment = {
  DATABASE_URL: _env.data.DATABASE_URL,
};
