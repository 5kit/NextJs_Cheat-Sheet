"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"

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
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold">Components</h1>
      <pre>{JSON.stringify(rows, null, 2)}</pre>
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
