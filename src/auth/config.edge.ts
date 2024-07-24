import { PrismaAdapter } from "@auth/prisma-adapter";
import { type User } from "@prisma/client";
import { type NextAuthConfig, type DefaultSession } from "next-auth";
import { type DefaultJWT } from "next-auth/jwt";
import { db } from "prisma/client";
import { z } from "zod";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      username: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    username?: string;
  }
}

const SessionUpdateSchema = z.object({
  user: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    picture: z.string().optional(),
    username: z.string().optional(),
  }),
});

export const authConfig: NextAuthConfig = {
  logger: {
    debug: (message, metadata) => console.debug(message, { metadata }),
    error: (error) => console.error(error),
    warn: (message) => console.warn(message),
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  callbacks: {
    signIn: async ({ user }) => !!user.id,
    jwt: async ({ token, user, trigger, session }) => {
      if (user) {
        token.sub = user.id;
        token.email = user.email;
        token.username = (user as User).username ?? undefined;
        token.name = user.name;
      }

      if (trigger === "update") {
        const updateSessionValidation = SessionUpdateSchema.parse(session);
        const keysToUpdate = Object.keys(updateSessionValidation.user) as Array<
          keyof z.infer<typeof SessionUpdateSchema.shape.user>
        >;
        for (const key of keysToUpdate) {
          token[key] = updateSessionValidation.user[key];
        }
        const dbUser = await db.user.update({
          where: { id: token.sub },
          data: {
            name: token.name,
            email: token.email,
            username: token.username,
          },
        });
        token.sub = dbUser.id;
        token.email = dbUser.email;
        token.username = dbUser.username ?? undefined;
        token.name = dbUser.name;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token?.sub) session.user.id = token.sub;
      if (token?.email) session.user.email = token.email;
      if (token?.username) session.user.username = token.username;
      if (token?.name) session.user.name = token.name;
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        const res = await fetch('https://craft-ezhk.frb.io/api/login', {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRF-Token': 'q45q34dsfdshgefghfsd2345234523',
            'X-Requested-With': 'XMLHttpRequest' 
          }

        });

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const user = await res.json();

        if (res.ok && user) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return user;
        } else {
          return null;
        }
      }
    })
  ],
  secret: process.env.AUTH_SECRET,
};
