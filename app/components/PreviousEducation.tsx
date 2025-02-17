"use client"

import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

interface EducationItem {
    name: string
    href: string
    degree: string
    logoUrl: string
    start: string
    end: string
    description: string
    id: string // Ensure that each education item has an 'id' field
}

export function PreviousEducation() {

    const [previousEducation, setPreviousEducation] = useState<EducationItem[]>([]);
    const [userId, setUserId] = useState<string | null>(null);

    async function fetchEducation() {
        console.log("=============================================================================", userId);
        const toastId = toast.loading("Fetching Prev Education");
        if (!userId) return [];
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/education/${userId}`);
            console.log(res.data);
            setPreviousEducation(res.data);
            toast.success("Fetched Successfully");
        } catch (error) {
            console.error("Error fetching education data:", error);
            toast.error("Failed Fetching");
        }finally{
            toast.dismiss(toastId);
        }
    }

    const { data: session }: any = useSession();

    useEffect(() => {
        setUserId(session?.user?.id ? session.user.id : null);
    }, [session]);

    useEffect(() => {
        userId && fetchEducation();
    }, [userId]);

    // Function to handle item removal
    const handleRemove = async (id: string) => {
        const toastId = toast.loading(`Deleting ${id}`);
        console.log("Removing item with ID:", id);
        try {
            const res = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/education/${id}`);
            console.log(res);
               
            fetchEducation();
            toast.success("Deleted");
        } catch (error) {
            console.error("Error removing education item:", error);
            toast.error("Deletion failed");
        }
        toast.dismiss(toastId);
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">Previous Education</h2>
            {previousEducation.length !== 0 && previousEducation.map((item: EducationItem, index: number) => (
                <Card key={index} className="relative">
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <img src={item.logoUrl} alt={`${item.name} logo`} width={32} height={32} className="rounded-full" />
                            <span>{item.name}</span>
                        </CardTitle>
                        {/* Remove button */}
                        <button
                            onClick={() => handleRemove(item.id)}
                            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                        >
                            Remove
                        </button>
                    </CardHeader>
                    <CardContent>
                        <p><strong>Degree:</strong> {item.degree}</p>
                        <p><strong>Period:</strong> {item.start} - {item.end}</p>
                        <p><strong>Description:</strong> {item.description}</p>
                        <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                            Visit website
                        </a>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
