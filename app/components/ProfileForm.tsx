"use client";

import { useState, useEffect, ChangeEvent, useMemo } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useSession } from "next-auth/react";
import MDEditor from '@uiw/react-md-editor';
import toast from "react-hot-toast";




export function ProfileForm() {

  

  const { data: session, status } = useSession();
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [aboutSection, setAboutSection] = useState<string | null>(null);

  useEffect(() => {
    if (status === "authenticated") {
      const fetchProfile = async () => {
        const toastId = toast.loading("fetching previous details");
        try {
          const user : any = session?.user;
          const userId = user?.id;
          if (!userId) return;
          const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/profile/${userId}`);
          const profile = res.data?.profileData;
          if (profile) {
            setName(profile.name || "");
            setAbout(profile.about || "");
            setPhotoPreview(null); 
            setAboutSection(profile.aboutSection || "");
          }
          toast.success("fetched");
        } catch (err) {
          console.error("Error fetching profile data:", err);
          toast.error("failed fetching");
        }
        finally{
          toast.dismiss(toastId);
        }
      };
      fetchProfile();
    }
  }, [session, status]);

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
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

    const toastId = toast.loading("submitting...");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("about", about);
      if (photo) {
        formData.append("photo", photo);
      }
      formData.append("aboutSection", aboutSection||"");

      const userData = JSON.stringify(session?.user);
      if (!userData) {
        throw new Error("User data is required.");
      }

      formData.append("userData", userData);

      const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Profile submitted successfully!");
      console.log("Response:", response.data);
      toast.success("submitted");
    } catch (err: any) {
      setError(err.message || "Failed to submit the profile.");
      console.error("Error submitting profile:", err);
      toast.error("error not submitted");
    } finally {
      setIsPending(false);
      toast.dismiss(toastId);
    }
  };

  // Wait for session to be loaded
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p>Please log in to view this page.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="about">About</Label>
        <Textarea
          id="about"
          name="about"
          rows={4}
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="photo">Photo</Label>
        <Input
          type="file"
          id="photo"
          name="photo"
          accept="image/*"
          onChange={handlePhotoChange}
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
      
      <div>
        <Label htmlFor="aboutSection">About Section (Markdown)</Label>
        <MDEditor
          value={aboutSection || ""}
          onChange={(value) => setAboutSection(value || "")}
          preview="edit"
        />
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? "Submitting..." : "Submit Profile"}
      </Button>
      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-600">{error}</p>}
    </form>
  );
}
