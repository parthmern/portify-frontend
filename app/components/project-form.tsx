'use client'

import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { FileUpload } from './file-upload'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { X } from 'lucide-react'
import axios from 'axios'
import { useSession } from 'next-auth/react'

interface ProjectFormValues {
    title: string;
    href?: string;
    description?: string;
    technologies: string[];
    liveLink?: string;
    githubRepoLink?: string;
    otherLink?: string;
    image?: File;
    thumbnail?: File;
    featuredVideo?: File;
    video?: string;
    featured: boolean;
    userId?: string | null
}

export function ProjectForm() {

    const session: any = useSession();
    const [userId, setUserId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false); // Loading state for button

    useEffect(() => {
        if (session) {
            setUserId(session?.data?.user?.id);
        }
    }, [session]);

    const {
        register,
        handleSubmit,
        control,
        setValue,
        watch,
        formState: { errors },
    } = useForm<ProjectFormValues>({
        defaultValues: {
            technologies: [],
            liveLink: '',
            githubRepoLink: '',
            otherLink: '',
            featured: false,
        },
    })

    const [newTechnology, setNewTechnology] = useState('')

    const onSubmit = async (data: ProjectFormValues) => {
        setLoading(true); // Set loading to true when submitting
        console.log(data);

        // Add userId to the data object
        data.userId = userId;

        // Create FormData to send
        const formDataToSend = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (value) {
                if ((key === 'image' || key === "thumbnail" || key === "featuredVideo") && value instanceof File) {
                    formDataToSend.append(key, value); // Append file to FormData
                } else {
                    formDataToSend.append(key, value as string); // Append other fields as string
                }
            }
        });

        try {
            // Send FormData
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/projects`,
                formDataToSend,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            console.log(res);
            setLoading(false); // Reset loading on success
            window.location.reload(); // Refresh the page upon successful submission
        } catch (error) {
            console.error("Error:", error);
            setLoading(false); // Reset loading on error
        }
    };

    const addTechnology = () => {
        if (newTechnology && !watch('technologies').includes(newTechnology)) {
            setValue('technologies', [...watch('technologies'), newTechnology])
            setNewTechnology('')
        }
    }

    const removeTechnology = (tech: string) => {
        setValue('technologies', watch('technologies').filter(t => t !== tech))
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" {...register('title', { required: 'Title is required' })} />
                {errors.title && <p className="text-red-500">{errors.title.message}</p>}
            </div>

            <div>
                <Label htmlFor="href">Href</Label>
                <Input id="href" {...register('href')} />
            </div>

            <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" {...register('description')} />
            </div>

            <div>
                <Label>Technologies</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                    {watch('technologies').map((tech) => (
                        <div key={tech} className="flex items-center bg-primary text-primary-foreground px-2 py-1 rounded">
                            <span>{tech}</span>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="ml-2 h-auto p-0"
                                onClick={() => removeTechnology(tech)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
                <div className="flex gap-2">
                    <Input
                        value={newTechnology}
                        onChange={(e) => setNewTechnology(e.target.value)}
                        placeholder="Add new technology"
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                addTechnology();
                            }
                        }}
                    />
                    <Button type="button" onClick={addTechnology}>Add</Button>
                </div>
            </div>

            {/* Separate fields for links */}
            <div>
                <Label htmlFor="liveLink">Live Link</Label>
                <Input id="liveLink" {...register('liveLink')} />
            </div>

            <div>
                <Label htmlFor="githubRepoLink">GitHub Repo Link</Label>
                <Input id="githubRepoLink" {...register('githubRepoLink')} />
            </div>

            <div>
                <Label htmlFor="otherLink">Other Link</Label>
                <Input id="otherLink" {...register('otherLink')} />
            </div>

            <div className="space-y-2">
                <Label>Media (Choose either Image or Featured Video)</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="image">Image</Label>
                        <Controller
                            name="image"
                            control={control}
                            render={({ field }) => (
                                <FileUpload onFileSelect={field.onChange} label="Image" />
                            )}
                        />
                    </div>

                    <div>
                        <Label htmlFor="featuredVideo">Featured Video</Label>
                        <Controller
                            name="featuredVideo"
                            control={control}
                            render={({ field }) => (
                                <FileUpload onFileSelect={field.onChange} label="Featured Video" />
                            )}
                        />
                    </div>
                </div>
                <p className="text-sm text-gray-500">Please upload either an image or a featured video, not both.</p>
            </div>

            <div>
                <Label htmlFor="thumbnail">Thumbnail</Label>
                <Controller
                    name="thumbnail"
                    control={control}
                    render={({ field }) => (
                        <FileUpload onFileSelect={field.onChange} label="Thumbnail" />
                    )}
                />
            </div>

            <div>
                <Label htmlFor="video">YouTube Video Link</Label>
                <Input
                    id="video"
                    {...register('video', {
                        pattern: {
                            value: /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/,
                            message: "Please enter a valid YouTube URL",
                        },
                    })}
                    placeholder="https://www.youtube.com/watch?v=..."
                />
                {errors.video && <p className="text-red-500">{errors.video.message}</p>}
            </div>

            <div className="flex items-center space-x-2">
                <Controller
                    name="featured"
                    control={control}
                    render={({ field }) => (
                        <Checkbox
                            id="featured"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                    )}
                />
                <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="featured">
                        Featured
                    </Label>
                    <p className="text-sm text-gray-500">
                        This project will appear on the home page
                    </p>
                </div>
            </div>

            <Button type="submit" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit'}
            </Button>
        </form>
    )
}
