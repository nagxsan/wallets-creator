"use client"

import useScreenSize from "@/hooks/useSreenSize";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SetterOrUpdater, useRecoilState, useRecoilValue } from "recoil";
import { walletsAtom } from "@/store/atoms/wallets";
import { useState } from "react";
import { BlockchainType } from "@/constants/enums";
import { btcWalletsCountAtom, ethWalletsCountAtom, solWalletsCountAtom } from "@/store/atoms/wallets-count";
import { mnemonicsAtom } from "@/store/atoms/mnemonics";
import { toast } from "sonner";
import { generateWallet } from "@/lib/generate-wallet";

export function WalletButtons() {

  const screenSize = useScreenSize()

  const [wallets, setWallets] = useRecoilState(walletsAtom)
  const [blockchainType, setBlockChainType] = useState<BlockchainType>(BlockchainType.BTC)

  const [btcWalletsCount, setBtcWalletsCount] = useRecoilState(btcWalletsCountAtom)
  const [ethWalletsCount, setEthWalletsCount] = useRecoilState(ethWalletsCountAtom)
  const [solWalletsCount, setSolWalletsCount] = useRecoilState(solWalletsCountAtom)
  const mnemonics = useRecoilValue(mnemonicsAtom)

  const stringToBlockchainTypeMap: Map<string, BlockchainType> = new Map([
    ['BTC', BlockchainType.BTC],
    ['ETH', BlockchainType.ETH],
    ['SOL', BlockchainType.SOL],
  ]);

  const blockchainTypeTowalletsCount: Map<BlockchainType, number> = new Map([
    [BlockchainType.BTC, btcWalletsCount],
    [BlockchainType.ETH, ethWalletsCount],
    [BlockchainType.SOL, solWalletsCount],
  ])

  const blockchainTypeToSetWalletsCountFn: Map<BlockchainType, SetterOrUpdater<number>> = new Map([
    [BlockchainType.BTC, setBtcWalletsCount],
    [BlockchainType.ETH, setEthWalletsCount],
    [BlockchainType.SOL, setSolWalletsCount],
  ])

  const getDerivationPath = (blockchainType: BlockchainType, count: number) => {
    if (blockchainType === BlockchainType.BTC) {
      return `m/44'/0'/${count}'/0'`
    } else if (blockchainType === BlockchainType.ETH) {
      return `m/44'/60'/${count}'/0'`
    } else {
      return `m/44'/501'/${count}'/0'`
    }
  }

  const handleBlockchainTypeSelection = (e: string) => {
    const selectedType = stringToBlockchainTypeMap.get(e) ?? 0
    const count = blockchainTypeTowalletsCount.get(selectedType)
    const setCountFn = blockchainTypeToSetWalletsCountFn.get(selectedType)
    const derivationPath = getDerivationPath(selectedType, count ?? 0)

    console.log(derivationPath)

    if (setCountFn && derivationPath) {
      setWallets((wallets) => [...wallets, generateWallet(mnemonics, derivationPath, selectedType)])
      setCountFn((count) => count + 1)
    } else {
      toast('Wallet addition unsuccessful')
    }
    setBlockChainType(selectedType)
  }

  return (
    <div className="flex items-center gap-x-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="default">Add Wallet</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Choose blockchain type</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={String(blockchainType)} onValueChange={(e) => handleBlockchainTypeSelection(e)}>
            <DropdownMenuRadioItem value="BTC">Bitcoin</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="ETH">Ethereum</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="SOL">Solana</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button
        size={screenSize.width > 500 || screenSize.width === 0 ? "default" : "full"}
        variant="destructive"
        disabled={wallets.length === 0}
      >
        Delete all Wallets
      </Button>
    </div>
  )
}