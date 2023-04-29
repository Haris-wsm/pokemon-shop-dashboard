import ApiReq from "@/util/axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "UserId", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        const { data: resData } = await ApiReq.post(
          "/api/auth/login",
          credentials
        );

        if (!resData.ok) {
          throw new Error(resData.message);
        }
        // If no error and we have user data, return it
        if (resData.ok) {
          const user = resData.data;
          const token = user;
          return { access_token: token };
        }

        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.access_token = user.access_token;
      }

      return token;
    },
    async session({ session, user, token }) {
      session.access_token = token.access_token;
      return session;
    },
  },
  pages: {
    signIn: "/",
    signOut: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
