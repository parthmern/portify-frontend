import { EditNavbar } from "@/app/components/EditNavbar";
import SkillsSection from "@/app/components/SkillsSection";


export default function Home() {
  return (
    <>
    <EditNavbar/>
    <main className="flex min-h-screen flex-col items-center justify-center p-24">  
      <SkillsSection />
    </main>
    </>
    
  )
}

