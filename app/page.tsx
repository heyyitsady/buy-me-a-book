"use client"

import Profile from "@/components/profile"
import InfoCard from "@/components/info-card"
import DonationCard from "@/components/donation-card"

export default function Home() {

  return (
    <main className="container max-w-6xl h-full flex flex-col justify-center items-center m-auto">
      <Profile />

      <div className="flex flex-col md:flex-row justify-center items-start gap-8 mb-6">
        <InfoCard />
        <DonationCard />
      </div>
    </main>
  )
}
