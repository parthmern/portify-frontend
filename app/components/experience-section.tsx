export interface Experience {
  id: string;
  company: string;
  href: string;
  location: string;
  title: string;
  logoUrl: string;
  start: string;
  end: string;
  description: string;
}

export interface NewExperience {
  company: string;
  href: string;
  location: string;
  title: string;
  start: string;
  end: string;
  description: string;
}

'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2 } from 'lucide-react'
import Image from 'next/image'
import axios from 'axios';
import { useSession } from 'next-auth/react';

export default function ExperienceSection() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [newExperience, setNewExperience] = useState<NewExperience>({
    company: '',
    href: '',
    location: '',
    title: '',
    start: '',
    end: '',
    description: ''
  })
  const [logo, setLogo] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { data: session } : any = useSession();

  useEffect(() => {
    session?.user?.id && fetchExperiences()
  }, [session?.user?.id])

  const fetchExperiences = async () => {
    setIsLoading(true)
    setError(null)
    try {
      // Fake dummy data for initial load
      const data = [
        {
          id: '1',
          company: 'Company One',
          href: 'https://companyone.com',
          location: 'New York, USA',
          title: 'Software Engineer',
          logoUrl: '/images/company-one-logo.png',
          start: 'Jan 2020',
          end: 'Present',
          description: 'Developed full-stack applications for various clients.'
        },
        {
          id: '2',
          company: 'Company Two',
          href: 'https://companytwo.com',
          location: 'San Francisco, USA',
          title: 'Frontend Developer',
          logoUrl: '/images/company-two-logo.png',
          start: 'Mar 2018',
          end: 'Dec 2019',
          description: 'Worked on the UI/UX of the company’s main product.'
        },
        {
          id: '3',
          company: 'Company Three',
          href: 'https://companythree.com',
          location: 'London, UK',
          title: 'Product Manager',
          logoUrl: '/images/company-three-logo.png',
          start: 'Apr 2016',
          end: 'Feb 2018',
          description: 'Led a team of developers to create a new product line.'
        }
      ]

      const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/works/${session?.user?.id}`);
      console.log(res);

      setExperiences(res?.data) // Set the fake data to the state
    } catch (err) {
      setError('Failed to load experiences. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewExperience(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogo(e.target.files[0])
    }
  }

  const handleAddExperience = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    console.log(newExperience, logo);

    const formData = new FormData();

    // Append `newExperience` fields
    Object.entries(newExperience).forEach(([key, value]) => {
      if (typeof value === 'object') {
        formData.append(key, JSON.stringify(value)); // Serialize objects
      } else {
        formData.append(key, value);
      }
    });

    // Append `logo` if it exists
    if (logo) {
      formData.append('logo', logo);
    }

    formData.append('userId', session?.user?.id);

    // Debugging
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }




    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/works`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response);

        if (response.status != 200) {
          throw new Error('Failed to add experience')
        }

      
        setNewExperience({
          company: '',
          href: '',
          location: '',
          title: '',
          start: '',
          end: '',
          description: ''
        })
        setLogo(null)

        fetchExperiences()


    } catch (err) {
      setError('Failed to add experience. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemoveExperience = async (id: string) => {
    console.log("deleting id", id);
    setIsLoading(true)
    setError(null)

    try {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/works/${id}`);
      console.log(res);

      fetchExperiences();

      // // Remove the experience from the state
      // setExperiences(prev => prev.filter(exp => exp.id !== id))
    } catch (err) {
      setError('Failed to remove experience. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="container mx-auto p-4 text-white">
      <h2 className="text-2xl font-bold mb-4">Add Experience</h2>
      <form onSubmit={handleAddExperience} className="space-y-4 mb-8">
        <Input
          name="company"
          value={newExperience.company}
          onChange={handleInputChange}
          placeholder="Company"
          required
        />
        <Input
          name="href"
          value={newExperience.href}
          onChange={handleInputChange}
          placeholder="Website URL"
          type="url"
          required
        />
        <Input
          name="location"
          value={newExperience.location}
          onChange={handleInputChange}
          placeholder="Location"
          required
        />
        <Input
          name="title"
          value={newExperience.title}
          onChange={handleInputChange}
          placeholder="Job Title"
          required
        />
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
        />
        <Input
          name="start"
          value={newExperience.start}
          onChange={handleInputChange}
          placeholder="Start Date (e.g., Jan 2020)"
          required
        />
        <Input
          name="end"
          value={newExperience.end}
          onChange={handleInputChange}
          placeholder="End Date (e.g., Present)"
        />
        <Textarea
          name="description"
          value={newExperience.description}
          onChange={handleInputChange}
          placeholder="Job Description"
          required
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Adding...' : 'Add Experience'}
        </Button>
      </form>

      <h2 className="text-2xl font-bold mb-4">Experiences</h2>
      <div className="space-y-4">
        {experiences.map((exp) => (
          <Card key={exp.id}>
            <CardHeader>
              <CardTitle>{exp.title} at {exp.company}</CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Location:</strong> {exp.location}</p>
              <p><strong>Duration:</strong> {exp.start} - {exp.end || 'Present'}</p>
              <p><strong>Description:</strong> {exp.description}</p>
              <a href={exp.href} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Company Website
              </a>
              <div className="mt-2">
                {/* <Image
                  src={exp.logoUrl}
                  alt={`${exp.company} logo`}
                  width={100}
                  height={100}
                  className="object-contain"
                /> */}
                <img src={exp.logoUrl} width={"200px"} />
              </div>
              <Button
                className="mt-4"
                variant="destructive"
                onClick={() => handleRemoveExperience(exp.id)}
                disabled={isLoading}
              >
                {isLoading ? 'Removing...' : <Trash2 className="mr-2" />}
                Remove Experience
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
