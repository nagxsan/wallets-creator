import { walletsAtom } from "@/store/atoms/wallets"
import { useRecoilState } from "recoil"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"
import { BlockchainType } from "@/constants/enums"
import Image from "next/image"
import { useState } from "react"
import { Asterisk, Copy, Eye, EyeOff, Trash2 } from "lucide-react"
import { toast } from "sonner"

export function DisplayWallets() {

  const [wallets, setWallets] = useRecoilState(walletsAtom)
  const [viewPrivateKey, setViewPrivateKey] = useState<boolean[]>(new Array(wallets.length).fill(false))

  const getBlockchainIcon = (blockchainType: BlockchainType) => {
    var asset = ''
    if (blockchainType === BlockchainType.BTC) {
      asset = '/bitcoin.svg'
    } else if (blockchainType === BlockchainType.ETH) {
      asset = '/ethereum.svg'
    } else {
      asset = '/solana.svg'
    }

    return <Image src={asset} alt={asset} width={24} height={24} />
  }

  const handleViewPrivateKey = (idx: number, view: boolean) => {
    const newViewPrivateKey = [...viewPrivateKey]
    newViewPrivateKey[idx] = view

    console.log(newViewPrivateKey)
    setViewPrivateKey(newViewPrivateKey)
  }

  const getMaskedPrivateKey = (length: number) => {
    return (
      <span className="flex items-center ml-2">
        {Array.from({ length }).map((_, index) => (
          <Asterisk key={index} size={12} />
        ))}
      </span>
    )
  }

  const handleDeleteWallet = (idx: number) => {
    const updatedWallets = [...wallets]
    const walletToDelete = wallets[idx]
    updatedWallets.filter((wallet) => wallet.id !== walletToDelete.id)
    setWallets(updatedWallets)
  }

  return (
    <div className="flex flex-col gap-y-4">
      {wallets.map((wallet, idx) => (
        <Accordion key={idx} type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger disableChevronDown={true}>
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-x-4 text-2xl">
                  {getBlockchainIcon(wallet.blockchainType)}
                  {wallet.name}
                </div>
                <Trash2 size={28} color="#e83b3b" onClick={() => handleDeleteWallet(idx)} />
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-y-3 text-lg">
                <div
                  className="hover:cursor-pointer"
                  onClick={() => {
                    navigator.clipboard.writeText(wallet.publicKey)
                    toast('Public Key copied to clipboard.')
                  }}
                >
                  Public Key: {wallet.publicKey}
                </div>
                <div className="flex items-center justify-between">
                  <div
                    className="flex items-center hover:cursor-pointer"
                    onClick={() => {
                      navigator.clipboard.writeText(wallet.privateKey)
                      toast('Private Key copied to clipboard.')
                    }}
                  >
                    Private Key: {viewPrivateKey[idx] ? wallet.privateKey : getMaskedPrivateKey(wallet.privateKey.length)}
                  </div>
                  {
                    viewPrivateKey[idx]
                    ?
                    <Eye
                      size={28}
                      className="hover:cursor-pointer"
                      onClick={() => handleViewPrivateKey(idx, false)}
                    />
                    :
                    <EyeOff
                      size={28}
                      className="hover:cursor-pointer"
                      onClick={() => handleViewPrivateKey(idx, true)}
                    />
                  }
                </div>
              </div>
              <div className="flex gap-x-3 pt-6 text-md">
                Click on key to copy to clipboard. <Copy size={20} />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  )
}