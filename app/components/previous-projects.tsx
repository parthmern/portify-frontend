import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from 'lucide-react'

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  links: {
    website?: string;
    github?: string;
  };
  featured: boolean;
}

const dummyProjects: Project[] = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A full-stack e-commerce solution with user authentication, product management, and payment integration.",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    links: {
      website: "https://example-ecommerce.com",
      github: "https://github.com/example/ecommerce"
    },
    featured: true
  },
  {
    id: 2,
    title: "Weather App",
    description: "A responsive weather application that provides real-time weather data and forecasts.",
    technologies: ["React", "OpenWeatherMap API", "CSS3"],
    links: {
      website: "https://weather-app-example.com",
      github: "https://github.com/example/weather-app"
    },
    featured: false
  },
  {
    id: 3,
    title: "Task Management System",
    description: "A collaborative task management tool with real-time updates and team features.",
    technologies: ["Vue.js", "Firebase", "Vuex"],
    links: {
      github: "https://github.com/example/task-manager"
    },
    featured: true
  }
]

export function PreviousProjects() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Previous Projects</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {dummyProjects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary">{tech}</Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex space-x-2">
                {project.links.website && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.links.website} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Website
                    </a>
                  </Button>
                )}
                {project.links.github && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      GitHub
                    </a>
                  </Button>
                )}
              </div>
              {project.featured && (
                <Badge>Featured</Badge>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

