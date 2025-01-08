import axios from "axios";
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

        console.log("putting req on db");
        try {
          const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/user/login`, {
            name: profile?.given_name,
            email: profile?.email,
            id: profile?.sub,
          });
          console.log("Response from DB:", res.data);
          if (res.status === 200) {
            return true;
          } else {
            console.error("Unexpected response status:", res.status);
            return false;
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error("Axios error:", error.response?.data || error.message);
          } else {
            console.error("Unexpected error:", error);
          }
          return false;
        }
        
  
        
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
    pages: {
        signIn: '/login', 
    },    
  };
  
  
const handler = NextAuth(NEXT_AUTH);

export const GET = handler;
export const POST = handler;

export const runtime = 'nodejs';
