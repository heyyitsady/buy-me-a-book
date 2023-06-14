"use client"

import { DONATION_IN_CENTS, MAX_DONATION } from "@/config"
import Image from "next/image"
import { useState } from "react"

import profile from "@/public/avatar.png"
import Art from "@/public/weird-rect-thing.gif"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Home() {
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState<number>(1)
  const [name, setName] = useState<string>("")
  const [message, setMessage] = useState<string>("")

  // preset number of books
  const presets = [1, 3, 5]

  return (
    <main className="container h-screen flex flex-col justify-center items-center m-auto">
      <div className="flex flex-col justify-center items-center my-6">
        <Avatar className="h-28 w-28 md:h-36 md:w-36" >
          <AvatarImage src="https://avatars.githubusercontent.com/u/66564964?v=4" />
          <AvatarFallback>Sazed</AvatarFallback>
        </Avatar>
        <h1 className="text-3xl font-bold">Atharva Pardeshi (Sazed)</h1>
        <p className="text-xl">is a self-taught software developer</p>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center">
        <div className="w-1/2">
          <Image src={Art} alt="Generative art thing" className="aspect-video" />
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
        <div>
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
