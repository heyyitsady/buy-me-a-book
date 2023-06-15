"use client"


import Image from "next/image"
import { useState } from "react"

import Art from "@/public/weird-rect-thing.gif"

import { Laptop, Github } from "lucide-react"

import { DONATION_IN_CENTS, MAX_DONATION } from "@/config"

import Profile from "@/components/profile"

import { Card, CardContent } from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"

import Link from "next/link"

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
        <Card className="w-3/5">
          <CardContent>
            <AspectRatio ratio={16 / 9}>
              <Image src={Art} alt="Generative art thing" fill />
            </AspectRatio>

            <p className="leading-normal text-muted-foreground mt-4 p-4">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.
            </p>

            <div className="flex flex-row gap-4 p-4 pb-0">
              <Link href="https://github.com/SazedWorldbringer">
                <Github className="text-muted-foreground hover:text-foreground hover:scale-105 transition duration-200" />
              </Link>
              <Link href="https://atharvapardeshi.vercel.app">
                <Laptop className="text-muted-foreground hover:text-foreground hover:scale-105 transition duration-200" />
              </Link>
            </div>
          </CardContent>
        </Card>

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
