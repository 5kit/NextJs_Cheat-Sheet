"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import Link from "next/link"

export default function dashboardPage() {

  // initializes form data state aswell as setFormData function to update it
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    image_url: "",
    quantity: 0,
  })

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

    const { error } = await supabase.from("components").insert([formData])

    if (error) {
      console.error("Insert failed:", error)
    } else {
      alert("Component inserted successfully!")
      setFormData({
        name: "",
        category: "",
        description: "",
        image_url: "",
        quantity: 0,
      })
    }
  }

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Dashboard Page</h1>
      <nav className="mb-6">
        <Link href="/">Home</Link>
      </nav>

      <h2 className="text-xl font-semibold mb-2">Add New Component</h2>
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
