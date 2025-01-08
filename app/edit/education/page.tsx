import { EditNavbar } from '@/app/components/EditNavbar';
import { EducationForm } from '@/app/components/EducationForm'
import { PreviousEducation } from '@/app/components/PreviousEducation'
import { getServerSession } from "next-auth"

export default async function EducationPage() {



  return (
    <>
      <EditNavbar />
      <div className="container mt-10 w-[50%] mx-auto p-4 text-white">
        {/* <h1 className="text-3xl font-bold mb-6">Education Details</h1> */}

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Add New Education</h2>
          <EducationForm />
        </div>

        <PreviousEducation />
      </div>
    </>
  );
}
