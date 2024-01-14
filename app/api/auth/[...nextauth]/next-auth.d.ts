import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
  }

  interface Session {
    user: User;
  }

  interface JWT {
    id: number;
  }
}
