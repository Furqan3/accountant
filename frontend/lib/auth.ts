import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { getDatabase } from "./mongodb"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please provide email and password")
        }

        const db = await getDatabase()
        const user = await db.collection("users").findOne({ email: credentials.email })

        if (!user || !user.password) {
          throw new Error("Invalid email or password")
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password)

        if (!isPasswordValid) {
          throw new Error("Invalid email or password")
        }

        // Only return minimal data - image will be fetched in session callback
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      // Only store user ID in JWT token, nothing else
      if (user) {
        token.sub = user.id
      }
      return token
    },
    async session({ session, token }) {
      // Fetch user data from database on each request
      if (session.user && token.sub) {
        const db = await getDatabase()
        const { ObjectId } = await import("mongodb")

        try {
          const user = await db.collection("users").findOne({
            _id: new ObjectId(token.sub)
          })

          if (user) {
            session.user.id = user._id.toString()
            session.user.email = user.email
            session.user.name = user.name
            session.user.image = user.image // Include image from database
          }
        } catch (error) {
          console.error("Session error:", error)
        }
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}
