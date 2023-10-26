import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials"

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials, req) {
        const res = await fetch("http://apitestingelfec.somee.com/api/Users/login", {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });
        if (res.ok) {
          return await res.json();
        }
        return null
      }
    })
  ],

  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token
    }
  },

  pages: {
    signIn: '/login',
    error: '/auth/error',
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
