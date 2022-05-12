import NextAuth from "next-auth/next";
import CredentialsProvider  from "next-auth/providers/credentials";
import { connectToDatabase } from "../../../lib/db";
import { verifyPassword } from "../../../lib/auth";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
        //https://next-auth.js.org/providers/credentials
      // credentials: { Dont use this since we already ahve a UI
      async authorize(credentials) {
        const client = await connectToDatabase();

        const usersCollection = client.db().collection("users");

        const user = await usersCollection.findOne({
          email: credentials.email
        });

        if (!user) {
          throw new Error("No user found");
        }
        console.log (credentials.password, user.password);
        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error("Could not log you in");
        }
        client.close();
        return {
          email: user.email
        };

      },
    }),
  ],
}); //executed
