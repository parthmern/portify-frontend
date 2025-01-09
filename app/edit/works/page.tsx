import { EditNavbar } from "@/app/components/EditNavbar";
import ExperienceSection from "@/app/components/experience-section";


export default function Home() {
  return (
    <main className="min-h-screen ">
      <EditNavbar className={"block w-full "} />
      <h1 className="text-4xl font-bold mb-8">My Experience</h1>
      <div className="w-[70%] mx-auto">
        <ExperienceSection />
      </div>

    </main>
  )
}

