import { DefaultSession } from "next-auth";

export type SafeUser = DefaultUser & Omit<Prisma.User, "password">;

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}
