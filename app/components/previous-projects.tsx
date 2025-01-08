"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import axios from "axios";

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

export function PreviousProjects() {
  const [userId, setUserId] = useState<string | null>(null);
  const [prevProjects, setPrevProjects] = useState<any>([]);
  const { data: session }: any = useSession();

  useEffect(() => {
    setUserId(session?.user?.id ? session.user.id : null);
  }, [session]);

  async function fetchPreviousProjects() {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/projects/${userId}`);
      setPrevProjects(res?.data);
    } catch (error) {
      console.log("Error fetching projects:", error);
    }
  }

  async function handleRemoveProject(projectId: number) {
   

      try{
        
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/projects/${projectId}`);
      console.log(res);
      setPrevProjects((prev:any) => prev.filter((project:any) => project.id !== projectId));
      console.log(`Project with ID ${projectId} removed successfully.`);

      }catch(error){
        console.log(error);
      }


  }

  useEffect(() => {
    if (userId) {
      fetchPreviousProjects();
    }
  }, [userId]);

  return (
    <div className="space-y-6 text-black">
      <h2 className="text-2xl text-white mt-9 font-bold">Previous Projects</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {prevProjects.map((project: Project) => (
          <Card key={project.id}>
            <CardHeader>
              <CardTitle>{project.title || "Untitled Project"}</CardTitle>
              <CardDescription>
                {project.description || "No description provided."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {project.technologies.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech: string) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p>No technologies listed.</p>
              )}
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="flex space-x-2">
                {project.links?.website && (
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={project.links.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Website
                    </a>
                  </Button>
                )}
                {project.links?.github && (
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </a>
                  </Button>
                )}
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleRemoveProject(project.id)}
              >
                Remove
              </Button>
              {project.featured && <Badge>Featured</Badge>}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
