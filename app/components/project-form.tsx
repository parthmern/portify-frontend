'use client'

import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { FileUpload } from './file-upload'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { X } from 'lucide-react'

interface ProjectFormValues {
  title: string;
  href?: string;
  description?: string;
  technologies: string[];
  links: {
    website?: string;
    github?: string;
    others?: string;
  };
  image?: File;
  thumbnail?: File;
  featuredVideo?: File;
  video?: string;
  featured: boolean;
}

export function ProjectForm() {
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
      links: {
        website: '',
        github: '',
        others: '',
      },
      featured: false,
    },
  })

  const [newTechnology, setNewTechnology] = useState('')

  const onSubmit = (data: ProjectFormValues) => {
    console.log(data)
    // Here you would typically send this data to your backend
  }

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
                e.preventDefault()
                addTechnology()
              }
            }}
          />
          <Button type="button" onClick={addTechnology}>Add</Button>
        </div>
      </div>

      <div>
        <Label htmlFor="links.website">Website Link</Label>
        <Input id="links.website" {...register('links.website')} />
      </div>

      <div>
        <Label htmlFor="links.github">GitHub Link</Label>
        <Input id="links.github" {...register('links.github')} />
      </div>

      <div>
        <Label htmlFor="links.others">Other Link</Label>
        <Input id="links.others" {...register('links.others')} />
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
              message: "Please enter a valid YouTube URL"
            }
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

      <Button type="submit">Submit</Button>
    </form>
  )
}

