"use client"

import { useUser } from "@/hooks/useUser"
import { useState, useEffect, use } from "react"

import { supabase } from "@/lib/supabaseClient"

import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter() // get router object for navigation
  const {user, setUser} = useUser() // get user from custom hook

  // initializes form data state aswell as setFormData function to update it
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    image_url: "",
    quantity: 0,
  })

    // redirect to login if not logged in
    useEffect(() => {
      if (user === null) {
        router.push("/login")
      }
    }, [user, router])

    if (user === undefined) {
      return <p>Loading...</p>
    }

  // run every time an input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    // pass a function to setFormData to return object form data updated state based on previous state
    setFormData((prev) => ({
      ...prev, // keep previous form data
      [name]: name === "quantity" ? Number(value) : value, // only update edited field, convert quantity to number
    }))
  }

  // Called when form is submitted in html passes event object
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // insert formData into supabase "components" table
    // returns error object to check for errors
    const { error } = await supabase.from("components").insert([formData])

    // error should be null if insert was successful
    if (error) {
      console.error("Insert failed:", error)
    } else {
      alert("Component inserted successfully!")
      // reset form data
      setFormData({
        name: "",
        category: "",
        description: "",
        image_url: "",
        quantity: 0,
      })
    }
  }

  // html form with inputs values bound to formData state and onChange to handleChange
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Dashboard Page</h1>

      {user && <p>Logged in as: {user.email}</p>}

      <h2 className="text-xl font-semibold mb-2 gap-2 mt-6">Add New Component</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <input
          type="text"
          name="image_url"
          placeholder="Image URL"
          value={formData.image_url}
          onChange={handleChange}
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Component</button>
      </form>
    </main>
  )
}

/*
Notes:

form handling in React:
1. useState to manage form data state

2. handleChange function to update state on input changes
example:
const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  // extract name and value from event target
  const { name, value } = e.target
  
  setFormData((prev) => ({
    ...prev, 
    [name]: name === "quantity" ? Number(value) : value, 
  }))
}

setFormData explanation:
We can either pass an object or a function to setFormData.

We pass a function when the new state depends on the previous state.
The function receives the previous state as an argument (commonly called `prev`).

Inside the function, we spread the previous state(...prev) to keep all other fields unchanged.

the purpose of the line:
[name]: name === "quantity" ? Number(value) : value

- name is a placeholder for the name of the field being updated.
- if the field being updated is "quantity", it casts the value to a number.
- otherwise, it just assigns the value as is.

3. handleSubmit function to process form submission
example:
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  // handle form submission logic here using formData state
}

html form:
<form onSubmit={handleSubmit}>
  ...
</form>

4. Bind input values to state and set onChange to handleChange
example:
<input
      type="text"
      name="name"
      placeholder="Name"
      value={formData.name}
      onChange={handleChange}
      required
/>

supabase insert:
const { error } = await supabase.from("components").insert([formData])
// the insert method takes an array of objects to insert into the table
// it returns an object with error property to check for errors

// error should be null if insert was successful
if (error) {
  console.error("Insert failed:", error)
} else {
  alert("Component inserted successfully!")
  // reset form data after successful insert
  setFormData({
    name: "",
    category: "",
    description: "",
    image_url: "",
    quantity: 0,
  })
}

User Authentication Check:
useEffect will run every time user or router changes.
it checks if user is null (not logged in):
- if so it redirects to /login using router.push("/login").
- otherwise if its loading in it will be undefined and show loading message.
- if user is an object it will render the dashboard form.

*/