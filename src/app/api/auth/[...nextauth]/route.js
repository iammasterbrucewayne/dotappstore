import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";
import Credentials from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import { MongoClient } from "mongodb";
import { isValidSignature } from "@/lib/utils";
export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    Credentials({
      name: "credentials",
      id: "credentials",
      credentials: {
        address: { label: "Address", type: "text" },
        message: { label: "Message", type: "text" },
        signature: { label: "Signature", type: "text" },
      },
      async authorize(credentials, req) {
        const options = {};
        const client = new MongoClient(process.env.MONGODB_USERS_URI, options);
        const db = client.db("users");
        const projectsCollection = db.collection("users");
        const ifExists = await projectsCollection.findOne({
          address: credentials.address,
        });
        if (!ifExists) {
          await projectsCollection.insertOne({
            address: credentials.address,
          });
        }
        const user = {
          name: credentials.address,
        };
        const isValid = isValidSignature(
          credentials.message,
          credentials.signature,
          credentials.address
        );
        if (isValid) {
          return user;
        } else {
          return null;
        }
      },
    }),
    {
      id: "sendgrid",
      type: "email",
      async sendVerificationRequest({ identifier: email, url }) {
        const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
          body: JSON.stringify({
            personalizations: [{ to: [{ email }] }],
            from: { email: process.env.SENDER_EMAIL },
            subject: "Sign in to Dotappstore",
            content: [
              {
                type: "text/html",
                value: `<body>
                <table width="100%" border="0" cellspacing="20" cellpadding="0" style="max-width: 600px; margin: auto; border-radius: 10px;">
                  <tr>
                    <td align="center"
                      style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif">
                      Sign in to <strong><a href="https://www.dotappstore.com" style="color: inherit; text-decoration: none;">dotappstore.com</a></strong>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="padding: 20px 0;">
                      <table border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td align="center" style="border-radius: 5px;">
                            <a href="${url}"
                              target="_blank"
                              style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid; display: inline-block; font-weight: bold; background-color: #d53f8c; color: white;">Sign in</a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </body>`,
              },
            ],
          }),
          headers: {
            Authorization: `Bearer ${process.env.SENDGRID_BEARER}`,
            "Content-Type": "application/json",
          },
          method: "POST",
        });

        if (!response.ok) {
          const { errors } = await response.json();
          throw new Error(JSON.stringify(errors));
        }
      },
    },
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      version: "2.0",
      profile({ data }) {
        return {
          id: data.id,
          name: data.name,
          image: data.profile_image_url,
          username: data.username,
        };
      },
    }),
  ],
  pages: {
    signIn: "/signin",
    verifyRequest: "/verifyrequest",
  },
  secret: process.env.JWT_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (profile) {
        token.username = profile.data.username;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.username = token.username;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
