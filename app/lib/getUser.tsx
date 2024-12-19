import { getServerSession } from "next-auth";

export const getUserDetails = async () => {
    const session = await getServerSession();
    return session;
}
