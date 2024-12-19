import { EditNavbar } from "@/app/components/EditNavbar";
import { ProfileForm } from "@/app/components/ProfileForm";

export default function Home() {
    return (
        <div >
            <EditNavbar />
            <main className="w-full mx-auto h-screen flex items-center justify-center flex-col text-white bg-[#08090a]">
                <div className="text-2xl  text-center  mx-auto w-full font-bold pt-10 mb-4">
                    <p>Create Your Profile</p>
                </div>
                <div className="w-[70%] mx-auto">
                    <ProfileForm />
                </div>
            </main>
        </div>

    )
}

