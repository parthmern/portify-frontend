"use client";

import { useState, ChangeEvent } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function ProfileForm() {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);
    setMessage(null);
    setError(null);

    const formData = new FormData(event.currentTarget);

    try {
      const result = await submitProfile(formData);
      setMessage(result.message || "Profile submitted successfully!");
    } catch (err: any) {
      setError(err.message || "Failed to submit the profile.");
    } finally {
      setIsPending(false);
    }
  };

  async function submitProfile(formData: FormData) {
    try {
        console.log("started submitiing");
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input type="text" id="name" name="name" required />
      </div>
      <div>
        <Label htmlFor="about">About</Label>
        <Textarea id="about" name="about" rows={4} required />
      </div>
      <div>
        <Label htmlFor="photo">Photo</Label>
        <Input
          type="file"
          id="photo"
          name="photo"
          accept="image/*"
          onChange={handlePhotoChange}
          required
          className="text-white bg-[#08090a]"
        />
        {photoPreview && (
          <div className="mt-2">
            <Image
              src={photoPreview}
              alt="Preview"
              width={100}
              height={100}
              className="rounded-full object-cover"
            />
          </div>
        )}
      </div>
      <Button type="submit" disabled={isPending}>
        {isPending ? "Submitting..." : "Submit Profile"}
      </Button>
      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-600">{error}</p>}
    </form>
  );
}
