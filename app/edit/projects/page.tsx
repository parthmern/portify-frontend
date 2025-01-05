import { PreviousProjects } from "@/app/components/previous-projects";
import { ProjectForm } from "@/app/components/project-form";


export default function Home() {
  return (
    <div className="container w-[60%] text-white mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Project</h1>
      <section>
      <ProjectForm />
      </section>
      
      <section>
        <PreviousProjects />
      </section>
    </div>
  )
}

