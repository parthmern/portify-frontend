"use client";

import { useSession } from "next-auth/react";

export default function Profile() {
  const { data: session } = useSession(); // Fetch session on the client side

  return (
    <p className="bg-[#28282c] px-2 py-1 rounded-md">
      {session?.user?.email ? session.user.email : "Get started for Free 💚"}
    </p>
  );
}
