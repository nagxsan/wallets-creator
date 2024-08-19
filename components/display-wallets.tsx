import { walletsAtom } from "@/store/atoms/wallets"
import { useRecoilState } from "recoil"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"
import { BlockchainType } from "@/constants/enums"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Asterisk, Copy, Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog"
import { Button } from "./ui/button"
import useScreenSize from "@/hooks/useSreenSize"

export function DisplayWallets() {

  const screenSize = useScreenSize()

  const [wallets, setWallets] = useRecoilState(walletsAtom)
  const [viewPrivateKey, setViewPrivateKey] = useState<Map<string, boolean>>()

  useEffect(() => {
    const mapViewPrivateKey = new Map()
    for (const wallet of wallets) {
      mapViewPrivateKey.set(wallet.id, false)
    }
    setViewPrivateKey(mapViewPrivateKey)
  }, [])

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

  const handleViewPrivateKey = (id: string, view: boolean) => {
    const newViewPrivateKey = new Map(viewPrivateKey)
    newViewPrivateKey.set(id, view)

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

  const handleDeleteWallet = (id: string) => {
    const updatedWallets = [...wallets].filter((wallet) => wallet.id !== id)
    localStorage.setItem('wallets', JSON.stringify(updatedWallets))
    setWallets(updatedWallets)
  }

  return (
    <div className="flex flex-col gap-y-4">
      {wallets.map((wallet, _) => (
        <Accordion key={wallet.id} type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger disableChevronDown={true}>
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-x-4 text-2xl">
                  {getBlockchainIcon(wallet.blockchainType)}
                  {wallet.name}
                </div>
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
                    Private Key: {viewPrivateKey?.get(wallet.id) ? wallet.privateKey : getMaskedPrivateKey(wallet.privateKey.length)}
                  </div>
                  {
                    viewPrivateKey?.get(wallet.id)
                    ?
                    <Eye
                      size={28}
                      className="hover:cursor-pointer"
                      onClick={() => handleViewPrivateKey(wallet.id, false)}
                    />
                    :
                    <EyeOff
                      size={28}
                      className="hover:cursor-pointer"
                      onClick={() => handleViewPrivateKey(wallet.id, true)}
                    />
                  }
                </div>
              </div>
              <div className="flex gap-x-3 pt-6 text-md mb-5">
                Click on key to copy to clipboard. <Copy size={20} />
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                <Button
                  size={screenSize.width > 500 || screenSize.width === 0 ? "default" : "full"}
                  variant="destructive"
                  disabled={wallets.length === 0}
                >
                  Delete Wallet
                </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to delete the wallet?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently
                      delete your wallet from local storage.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDeleteWallet(wallet.id)}
                      className="text-destructive"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  )
}