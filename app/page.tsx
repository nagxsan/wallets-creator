"use client"

import { Mnemonics } from "@/components/mnemonics";
import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";
import { RecoilRoot } from "recoil";

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto flex flex-col gap-y-10 px-4 py-10 min-h-[92vh]">
      <RecoilRoot>
        <Navbar />
        <Mnemonics />
        <Toaster />
      </RecoilRoot>
    </main>
  )
}
