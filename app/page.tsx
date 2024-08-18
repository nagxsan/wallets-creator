"use client"

import { DisplayWallets } from "@/components/display-wallets";
import { Mnemonics } from "@/components/mnemonics";
import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";
import { WalletButtons } from "@/components/wallet-buttons";
import { useEffect, useState } from "react";
import { RecoilRoot } from "recoil";

export default function Home() {

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <main className="max-w-7xl mx-auto flex flex-col gap-y-10 px-4 py-10 min-h-[92vh]">
      <RecoilRoot>
        <Navbar />
        <Mnemonics />
        <WalletButtons />
        <DisplayWallets />
        <Toaster />
      </RecoilRoot>
    </main>
  )
}
