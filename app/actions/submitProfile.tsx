"use server";

export async function submitProfile(formData: FormData) {
  try {
    const name = formData.get("name");
    const about = formData.get("about");
    const photo = formData.get("photo");

    if (!name || !about || !photo) {
      throw new Error("All fields are required.");
    }

    // Example: Simulate saving to a database or an API
    console.log("Name:", name);
    console.log("About:", about);
    console.log("Photo:", photo);

    return { message: "Profile submitted successfully!" };
  } catch (error: any) {
    console.error("Error submitting profile:", error.message);
    throw new Error("Failed to submit the profile. Please try again.");
  }
}
