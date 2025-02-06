import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Web3Auth } from "@web3auth/modal";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Web3 Wallet",
      credentials: {
        address: { label: "Wallet Address", type: "text" }
      },
      async authorize(credentials) {
        if (credentials?.address) {
          return { id: credentials.address };
        }
        return null;
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      session.address = token.sub;
      return session;
    }
  }
});
