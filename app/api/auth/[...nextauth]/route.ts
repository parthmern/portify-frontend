import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const NEXT_AUTH = {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID || "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      async signIn({ user, account, profile, email, credentials }: any) {
        console.log("User profile on signIn:", profile);
  
        // Custom authentication logic can go here
        // Example: Check if the user's email matches your criteria
        if (profile?.email) {
          console.log("User authenticated");
          return true;
        }
  
        console.log("User authentication failed");
        return false;
      },
      async jwt({ token, user, account, profile }: any) {
        console.log("Token before JWT callback:", token);
        console.log("User in JWT callback:", user);
  
        // Only add user data to token on first login
        if (user) {
          token.userId = user.id || profile?.sub; // Use Google sub ID as fallback
          token.userName = user.name || profile?.name;
          token.userEmail = user.email || profile?.email;
        }
  
        console.log("JWT callback token:", token);
        return token;
      },
      async session({ session, token }: any) {
        console.log("Session callback token:", token);
  
        // Add token data to the session object
        session.user = {
          id: token.userId,
          name: token.userName,
          email: token.userEmail,
        };
  
        console.log("Session callback session:", session);
        return session;
      },
    },
  };
  
  
const handler = NextAuth(NEXT_AUTH);

export const GET = handler;
export const POST = handler;
