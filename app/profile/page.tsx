'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import ProfileCard from '../components/profile-card'
import { EditNavbar } from '../components/EditNavbar'

export default function UsernameSettingPage() {
  const { data: session, status } = useSession()
  const user:any = session?.user
  const userId = user?.id

  const [username, setUsername] = useState('')
  const [state, setState] = useState<any>({ success: null, error: null })
  const [isPending, setIsPending] = useState(false)

  // Fetch the current username when the userId is available
  useEffect(() => {
    if (userId) {
      const fetchUsername = async () => {
        try {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/user/username/${userId}`)
          console.log("ress=>", res);
          setUsername(res.data.username || '') // Ensure the username is not undefined
        } catch (error) {
          setState({ error: 'Failed to fetch username', success: null })
        }
      }

      fetchUsername()
    }
  }, [userId])

  // Handle username update on form submission
  const handleSubmit = async (e : any) => {
    e.preventDefault()
    setIsPending(true)
    setState({ success: null, error: null })

    try {
      
     
      // Update username via API
      const result = await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/user/username`, {
        username,
        userId
      })
      console.log(result);

      if (result.data.error) {
        setState({ error: result.data.error, success: null })
      } else {
        setState({ success: `Username updated to ${username}`, error: null })
      }
    } catch (error) {
      setState({ error: 'An unexpected error occurred. Please try again.', success: null })
    } finally {
      setIsPending(false)
    }
  }
  console.log(state);

  // Handle username change
  const handleUsernameChange = (e: any) => {
    console.log(e.target.value);
    setUsername(e.target.value)
  }

  return (
    <>
    <EditNavbar />

    <div className="flex gap-x-5 items-center justify-center min-h-screen text-white bg-[#08090a]">
      
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Set Your Username</CardTitle>
          <CardDescription>Choose a unique username for your profile</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  value={username}  // Controlled input
                  onChange={handleUsernameChange}
                  required
                />
                <div>{username ? `Your portfolio is live on https://localhost:3000/${username}` : "not live yet set username to make it live" } {}</div>
              </div>
              {state.error && (
                <div className="flex items-center text-red-500 space-x-2">
                  <AlertCircle size={20} />
                  <span>{state.error}</span>
                </div>
              )}
              {state.success && (
                <div className="flex items-center text-green-500 space-x-2">
                  <CheckCircle2 size={20} />
                  <span>{state.success}</span>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? 'Updating...' : 'Update Username'}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <div>
        <ProfileCard />
      </div>
    </div>
    </>
    
  )
}
