import { getServerSession } from "next-auth";

async function getUser() {
    const session = await getServerSession();
    return session;
}
export default async function UserPage() {
    const session = await getUser();

    return (
        <div>
            on server component
            {JSON.stringify(session)}
        </div>
    );
}