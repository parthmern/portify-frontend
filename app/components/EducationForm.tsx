'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import axios from 'axios'
import { useSession } from 'next-auth/react'

interface EducationFormData {
    name: string
    href: string
    degree: string
    logo: File | null
    start: string
    end: string
    description: string
    userId : string
}

export function EducationForm() {
    const [formData, setFormData] = useState<EducationFormData>({
        name: '',
        href: '',
        degree: '',
        logo: null,
        start: '',
        end: '',
        description: '',
        userId: ''
    })
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)

    const { data: session } : any = useSession();


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            setFormData(prev => ({ ...prev, logo: file }))
            setPreviewUrl(URL.createObjectURL(file))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log(formData);

        formData.userId = session?.user?.id;

        


        try {
            const res = await axios.post("http://127.0.0.1:8787/api/v1/education", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })

            console.log(res);

            setFormData({
                name: '',
                href: '',
                degree: '',
                logo: null,
                start: '',
                end: '',
                description: '',
                userId : session?.user?.id
            })
            setPreviewUrl(null)

        }catch(error){

            console.log(error);

        }

    }

  return (
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label htmlFor="name">Institution Name</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div>
                    <Label htmlFor="href">Website</Label>
                    <Input id="href" name="href" value={formData.href} onChange={handleChange} required />
                </div>
                <div>
                    <Label htmlFor="degree">Degree</Label>
                    <Input id="degree" name="degree" value={formData.degree} onChange={handleChange} required />
                </div>
                <div>
                    <Label htmlFor="logo">Logo</Label>
                    <div className="flex items-center space-x-4">
                        <Input
                            id="logo"
                            name="logo"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full text-white"
                        />
                        {previewUrl && (
                            <img
                                src={previewUrl}
                                alt="Logo preview"
                                className="w-16 h-16 object-cover rounded-full"
                            />
                        )}
                    </div>
                </div>
                <div>
                    <Label htmlFor="start">Start Date</Label>
                    <Input id="start" name="start" value={formData.start} onChange={handleChange} required />
                </div>
                <div>
                    <Label htmlFor="end">End Date</Label>
                    <Input id="end" name="end" value={formData.end} onChange={handleChange} required />
                </div>
                <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
                </div>
                <Button type="submit" className="w-full">Submit</Button>
            </form>
        )
    }

