"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Profile() {
  const { data: session } = useSession(); // Fetch session on the client side

  const router = useRouter();
  
  
    const handleClick = () => {
      console.log(session?.user?.email);
      if (!session?.user?.email) {
        router.push('/login');
      } else {
        router.push('/profile');
      }
    };

  return (
    <p className="bg-[#28282c] px-2 py-1 rounded-md">
      {session?.user?.email ? session.user.email : <a onClick={handleClick} className="cursor-pointer  ">Get started for Free 💚</a>}
    </p>
  );
}
