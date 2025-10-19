"use client"

import { useState, useEffect } from "react"

import { supabase } from "@/lib/supabaseClient"
import type { User } from "@supabase/supabase-js"

// Custom hook to manage user authentication state
export function useUser() {
  // user state and setter function
  const [user, setUser] = useState<User | null | undefined>(undefined) 

  useEffect(() => { 
    // check for existing session using supabase auth client
    const checkSession = async () => { 
      const { data: { session } } = await supabase.auth.getSession() 
      setUser(session?.user ?? null)
    }

    checkSession() 
    
    // listen for auth state changes (login, logout, etc.)
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => { 
      // Set user state based on session info
      setUser(session?.user ?? null)
    }) 

    return () => { 
      // cleanup subscription on unmount
      listener.subscription.unsubscribe() 
    }
  }, [])

  // return user state and setter function
  return { user, setUser }
}

/*
notes:

Custom hook:
Custom hooks in React are functions that can be reused across different components to encapsulate and share stateful logic. They typically start with the prefix "use" and can call other hooks inside them.
they allow you to extract component logic into reusable functions.
they can are found in the "src/hooks" directory in this project structure. 
imported by using "import { useUser } from '@/hooks/useUser'".

useUser Hook:
The useUser hook initializes a user state with session data from Supabase authentication.

const { data: { session } } = await supabase.auth.getSession()
is used to get the current session from Supabase. If a session exists, it sets the user state to the authenticated user; otherwise, it sets it to null.

It also sets up a listener for authentication state changes using supabase.auth.onAuthStateChange. This listener updates the user state whenever the authentication state changes (e.g., user logs in or out).
The listener detects events like
login, logout, token refresh, etc.
Unmounting the component cleans up the listener to prevent memory leaks.

The hook returns an object containing the user state and a setter function (setUser) to update the user state.

usage:
const { user, setUser } = useUser()

if user is undefined, the authentication state is still being determined (e.g., checking session).
if user is null, no user is logged in.
if user is an object, a user is logged in and the object contains user details.

*/