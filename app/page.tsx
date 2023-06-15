"use client"

import { useState } from "react"

import { DONATION_IN_CENTS, MAX_DONATION } from "@/config"

import Profile from "@/components/profile"
import InfoCard from "@/components/info-card"

export default function Home() {
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState<number>(1)
  const [name, setName] = useState<string>("")
  const [message, setMessage] = useState<string>("")

  // preset number of books
  const presets = [1, 3, 5]

  return (
    <main className="container max-w-6xl h-screen flex flex-col justify-center items-center m-auto">
      <Profile />

      <div className="flex flex-col md:flex-row justify-center items-center">
        <InfoCard />

        <div className="w-2/5">
          <h1>Buy me a book</h1>
          {presets.map((preset) => (
            <button key={preset} onClick={() => setQuantity(preset)}>{preset}</button>
          ))}

          <input
            type="number"
            onChange={(e) => setQuantity(parseFloat(e.target.value))}
            className="border border-input"
            value={quantity}
            min={1}
            max={MAX_DONATION / DONATION_IN_CENTS}
          />

          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>

          <div>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              onChange={(e) => {
                setMessage(e.target.value)
                console.log(message)
              }}
              value={message}
            />
            <button>Donate ${quantity * (DONATION_IN_CENTS / 100)}</button>
          </div>
        </div>
      </div>
    </main>
  )
}
