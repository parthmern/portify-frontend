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
import toast from 'react-hot-toast'

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

    const toastId = toast.loading("Updating username...")

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

      toast.success("Username updated")
    } catch (error) {
      setState({ error: 'An unexpected error occurred. Please try again.', success: null })
      toast.error("Username updation failed")
    } finally {
      setIsPending(false)
      
      toast.dismiss(toastId)

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
    <EditNavbar className={"block w-full mb-6"} />

    <div className="flex flex-col gap-y-3 md:flex-row gap-x-5 items-center justify-center min-h-[80vh] text-white bg-[#08090a]">
      
      <Card className="w-[70%] md:w-full bg-[#0f1011] text-white max-w-md">
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
                <div>{username ? (<p>Your portfolio is live on <a target="_blank" href={`https://portify.live/${username}`} className='cursor-pointer text-[#ff31ff] monoFont' >https://portify.live/{username}</a></p>) : "not live yet set username to make it live" } {}</div>
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
