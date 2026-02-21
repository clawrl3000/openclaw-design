import NextAuth, { NextAuthOptions } from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/db"
import { eq } from "drizzle-orm"
import {
  accounts,
  sessions,
  users,
  verificationTokens,
} from "@/db/schema"

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "read:user user:email repo",
        },
      },
    }),
  ],
  events: {
    async signIn({ user, profile }) {
      // Save GitHub username from OAuth profile after user is created/found in DB
      if (profile && user.id) {
        const ghProfile = profile as { login?: string }
        if (ghProfile.login) {
          try {
            await db
              .update(users)
              .set({ github_username: ghProfile.login })
              .where(eq(users.id, user.id))
          } catch (err) {
            console.error("Failed to save GitHub username:", err)
          }
        }
      }
    },
  },
  callbacks: {
    async session({ session, user }) {
      // Add user id and GitHub username to session
      session.user.id = user.id

      // Fetch GitHub username from DB
      const [dbUser] = await db
        .select({ github_username: users.github_username })
        .from(users)
        .where(eq(users.id, user.id))
        .limit(1)
      
      if (dbUser?.github_username) {
        (session.user as Record<string, unknown>).githubUsername = dbUser.github_username
      }

      return session
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
}

export default NextAuth(authOptions)