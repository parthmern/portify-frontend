"use client"

import { useState, KeyboardEvent, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X } from 'lucide-react'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

export default function SkillsSection() {
    const [skills, setSkills] = useState<string[]>([])
    const [inputValue, setInputValue] = useState('')
    const [githubUsername, setGithubUsername] = useState('')
    const [fetchingSkills, setFetchingSkills] = useState(true);
    const session: any = useSession();
    let userId = session?.data?.user?.id;

    async function fetchSkills() {
        const toadtId = toast.loading("Fetching prev data");
        try {
            const req = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/skills/${userId}`);
            console.log(req);
            const fetchedSkills = req?.data?.skills?.name || [];
            const fetchedGithubUsername = req?.data?.skills?.githubUsername || 'null';
            setSkills(fetchedSkills);
            setGithubUsername(fetchedGithubUsername);
            toast.success("fetched");
        } catch (error) {
            console.log(error);
            toast.error("failed fetching");
        } finally {
            setFetchingSkills(false);
            toast.dismiss(toadtId);
        }
    }

    useEffect(() => {
        if (userId) {
            fetchSkills();
        }
    }, [userId]);

    const addSkill = () => {
        if (inputValue.trim() !== '' && !skills.includes(inputValue.trim())) {
            setSkills([...skills, inputValue.trim()])
            setInputValue('')
        }
    }

    const removeSkill = (skillToRemove: string) => {
        setSkills(skills.filter(skill => skill !== skillToRemove))
    }

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            addSkill()
        }
    }

    const handleSubmit = async () => {
        console.log('Submitting skills and GitHub username:', { skills, githubUsername });
        const toastId = toast.loading("Updating skills");

        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/skills`,
                { skills, githubUsername, userId },
                { headers: { 'Content-Type': 'application/json' } }
            );
            console.log(res);
            toast.success("updated");
        } catch (error) {
            console.log(error);
            toast.error("failed");
        }finally{
            toast.dismiss(toastId);
        }
    }

    return (
        <div className="w-full text-white max-w-md mx-auto">
            {
                fetchingSkills ? (
                    <div> loading.. </div>
                ) : (
                    <>
                        <h2 className="text-2xl font-bold mb-4">Skills</h2>
                        <div className="flex space-x-2 mb-4">
                            <Input
                                type="text"
                                placeholder="Add a skill"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                            <Button onClick={addSkill}>Add</Button>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {skills.map((skill, index) => (
                                <Badge key={index} variant="secondary" className="px-2 py-1">
                                    {skill}
                                    <X
                                        className="ml-1 h-4 w-4 cursor-pointer"
                                        onClick={() => removeSkill(skill)}
                                    />
                                </Badge>
                            ))}
                        </div>

                        <div className="mb-4">
                            <h3 className="text-lg font-semibold mb-2">GitHub Username</h3>
                            <Input
                                type="text"
                                placeholder="Enter your GitHub username"
                                value={githubUsername}
                                onChange={(e) => setGithubUsername(e.target.value)}
                            />
                        </div>

                        <Button
                            onClick={handleSubmit}
                            className="w-full mt-10 bg-blue-600 text-white hover:bg-blue-700"
                        >
                            Update Skills & GitHub Username
                        </Button>
                    </>
                )
            }
        </div>
    )
}
