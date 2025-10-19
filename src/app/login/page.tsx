"use client"

import { supabase } from "@/lib/supabaseClient"

export default function LoginPage() {
  const handleGithubLogin = async () => {
    // initiate GitHub OAuth login flow
    await supabase.auth.signInWithOAuth({ provider: "github" })
  }

  // html button to trigger GitHub login
  return (
    <main className="p-4">
      <h1 className="text-2xl mb-4">Login</h1>
      <button
        onClick={handleGithubLogin}
        className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded"
      >
        Sign in with GitHub
      </button>
    </main>
  )
}

/*
notes:

LoginPage Component:
When the user clicks the "Sign in with GitHub" button, the handleGithubLogin function is called. 
This function uses the Supabase client to handle all login details
This initializes user session to use with the application.

To set up GitHub OAuth with Supabase:
you need to register a new OAuth application in your GitHub account settings.
you also need to add those credentials from OAuth to your Supabase project's authentication settings.

interaction with login logic is done in my src/hooks/useUser.ts file.

*/