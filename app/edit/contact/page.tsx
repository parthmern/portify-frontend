'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { EditNavbar } from '@/app/components/EditNavbar'
import toast from 'react-hot-toast'

// Dummy initial data
// const initialProfileData = {
//     emailId: 'user@example.com',
//     githubUrl: 'https://github.com/user',
//     leetcodeUrl: 'https://leetcode.com/user',
//     linkedinUrl: 'https://linkedin.com/in/user',
//     twitterUrl: 'https://twitter.com/user',
// }

export default function ProfileUpdatePage() {

    const [profileData, setProfileData] = useState({
        emailId: '',
        githubUrl: '',
        leetcodeUrl: '',
        linkedinUrl: '',
        twitterUrl: '',
    })
    const [isUpdating, setIsUpdating] = useState(false)

    const [userId, setUserId] = useState<string | null>(null);
    const { data: session }: any = useSession();

    useEffect(() => {
        setUserId(session?.user?.id ? session.user.id : null);
    }, [session]);

    async function fetchPrevData() {
        try {
            const res:any = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/contacts/${userId}`);
            console.log(res);
            setProfileData({
                emailId: res?.data?.emailId,
                githubUrl: res?.data?.githubUrl,
                leetcodeUrl: res?.data?.leetcodeUrl,
                linkedinUrl: res?.data?.linkedinUrl,
                twitterUrl: res?.data?.twitterUrl,
            });
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        userId && fetchPrevData();
    }, [userId]);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setProfileData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsUpdating(true)

        const toastId = toast.loading("Submitting..");
        try {
            
            console.log('Updated Profile Data:', profileData, userId);

            try {
                const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/contacts/contact`, { profileData, userId });
                console.log(res);
                toast.success("submitted");
            }
            catch (error: any) {
                console.log(error);
                toast.error("Error in submitting");
            }finally{
                toast.dismiss(toastId);
            }

        } catch (error) {
            console.error('Error updating profile:', error)
            toast.error("Error in submitting");
        } finally {
            setIsUpdating(false)
            toast.dismiss(toastId);
        }
    }

    return (
        <div className="container mx-auto p-4">
            <EditNavbar className={"block w-full"}/>
            <Card className="w-full max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Update Profile</CardTitle>
                    <CardDescription>Modify your profile information below</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        {Object.entries(profileData).map(([key, value]) => (
                            <div key={key} className="space-y-2">
                                <Label htmlFor={key} className="capitalize">
                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                </Label>
                                <Input
                                    id={key}
                                    name={key}
                                    value={value}
                                    onChange={handleInputChange}
                                    placeholder={`Enter your ${key.replace(/([A-Z])/g, ' $1').trim().toLowerCase()}`}
                                    disabled={isUpdating}
                                />
                            </div>
                        ))}
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full" disabled={isUpdating}>
                            {isUpdating ? "Updating..." : "Update Profile"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}

