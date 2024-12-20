'use server'

import { z } from 'zod'

const usernameSchema = z.string().min(3).max(20).regex(/^[a-zA-Z0-9_]+$/)

export async function updateUsername(prevState: any, formData: FormData) {
  const username = formData.get('username') as string

  try {
    usernameSchema.parse(username)
  } catch (error) {
    return { error: "Username must be 3-20 characters long and can only contain letters, numbers, and underscores." }
  }

  // TODO: Update the username in your database
  console.log('Updating username to:', username)

  // Simulate a delay to show loading state
  await new Promise(resolve => setTimeout(resolve, 1000))

  return { success: `Username updated to ${username}` }
}

