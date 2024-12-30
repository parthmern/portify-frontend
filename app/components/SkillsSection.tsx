"use client"

import { useState, KeyboardEvent, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X } from 'lucide-react'
import axios from 'axios'
import { useSession } from 'next-auth/react'

export default function SkillsSection() {
    const [skills, setSkills] = useState<string[]>([])
    const [inputValue, setInputValue] = useState('')
    const session: any = useSession();
    const [fetchingSkills, setFetchingSkills] = useState(true);
    let userId = session?.data?.user?.id;

    // {
    //     "data": {
    //         "user": {
    //             "id": "112590557890221636881",
    //             "name": "Parth Ptl",
    //             "email": "pptl8685@gmail.com"
    //         },
    //         "expires": "2025-01-28T22:59:00.292Z"
    //     },
    //     "status": "authenticated"
    // }



    async function fetchSkills() {




        try {
            const req = await axios.get(`http://127.0.0.1:8787/api/v1/skills/${userId}`);
            console.log(req);
            const fetchedSkills = (req?.data?.skills?.name) ? (req?.data?.skills?.name) : [];
            setSkills(fetchedSkills);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setFetchingSkills(false);
        }

    }
    useEffect(() => {

        if (userId) { fetchSkills(); }

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
        
        console.log('Submitting skills:', skills);

        try{
            const res = await axios.post(
                "http://127.0.0.1:8787/api/v1/skills",
                {skills, userId},
                { headers: { 'Content-Type': 'application/json' } }
            );
            console.log(res);
        }
        catch(error){
            console.log(error);
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
                        <div className="flex flex-wrap gap-2">
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
                        <Button
                            onClick={handleSubmit}
                            className="w-full mt-10 bg-blue-600 text-white hover:bg-blue-700"
                        >
                            Update Skills
                        </Button>
                    </>
                )
            }
        </div>
    )
}

