import { EditNavbar } from "@/app/components/EditNavbar";
import ExperienceSection from "@/app/components/experience-section";


export default function Home() {
  return (
    <main className="min-h-screen p-24">
      <EditNavbar/>
      <h1 className="text-4xl font-bold mb-8">My Experience</h1>
      <ExperienceSection />
    </main>
  )
}

