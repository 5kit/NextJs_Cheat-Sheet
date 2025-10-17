"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"
import Link from "next/link"

// Define table columns with types as a data structure
type ComponentRow = {
  id: number
  name: string
  category: string | null
  description: string | null
  image_url: string | null
  quantity: number
}

// Home Page function
// default export makes it the main component for this file
export default function Home() {

  // sets rows state and setRows function to update it
  // structures rows according to ComponentRow type
  // State is just the active data
  const [rows, setRows] = useState<ComponentRow[]>([])

  // effect with empty dependency is running code after first render
  useEffect(() => {
    // async function to load data from supabase since useEffect can't be async
    const load = async () => {
      // SQL query to fetch all rows from the "components" table
      const { data, error } = await supabase
        .from("components")
        .select("*")

      // Log error or set rows state
      if (error) console.error(error)
      else setRows(data || [])
    }

    // call the async function
    load()
  }, []) // empty dependency array

  // html output to client
  // link changes route to dashboard page in directory src/app/dashboard/page.tsx
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Home Page</h1>
      <nav className="mt-6">
        <Link href="/dashboard">Dashboard</Link>
      </nav>
      <div className="grid gap-2 mt-6">
        <h2 className="text-xl font-semibold mb-2">Components</h2>
    {rows.map((row) => (
      <div
        key={row.id}
        className="border p-4 rounded shadow-sm flex flex-col gap-1"
      >
        <div>
          <strong>Name:</strong> {row.name}
        </div>
        <div>
          <strong>Category:</strong> {row.category || "-"}
        </div>
        <div>
          <strong>Description:</strong> {row.description || "-"}
        </div>
        <div>
          <strong>Image URL:</strong> {row.image_url || "-"}
        </div>
        <div>
          <strong>Quantity:</strong> {row.quantity}
        </div>
      </div>
    ))}
  </div>

    </main>
  )
}

/*
Notes:

Type script:

 data structures:
type TypeName = {
  key: Type;
  key2: Type2;
}

 function definition:
const f = async (param: Type): ReturnType => {
  // function body
}
or () => {}
async optional keyword for asynchronous operations

 home page function:
export default function Home() {
  // function body
}
export means it can be imported in other files
default export makes it the main component for this file

React:

 import:
import { useState, useEffect } from "react"

 components:
functions that return html

 states and effects:
States are used to manage dynamic data for a component
const [state, setState] = useState<type>(initialValue)
Effects are used to run code in response to component lifecycle events.
useEffect(() => {
  // effect body
}, [dependencies]) // dependencies array to control when effect runs
omit [dependencies] to run after every update
empty dependencies to run only after first render
add state variables to dependencies to run when they change

return:
return html in brackets inside function body

link:
import Link from "next/link"
<Link href="/path">Link Text</Link>
path is the route route sub folder inside src/app
which has a page.tsx file

Supabase:

 import:
import { createClient } from "@supabase/supabase-js"

 Supabase client:
import { supabase } from "path/to/supabaseClient"

 Querying data:
const { data, error } = await supabase
  .from("table_name")
  .select("column1, column2")
  
 Error handling:
if (error) console.error(error)
else // process data

*/
