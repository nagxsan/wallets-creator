import { useRecoilState, useRecoilValue } from "recoil";
import { Button } from "./ui/button";
import { mnemonicsAtom } from "@/store/atoms/mnemonics";
import { generateMnemonic } from "bip39";
import { useEffect } from "react";
import useScreenSize from "@/hooks/useSreenSize";
import { Badge } from "./ui/badge";
import { Copy } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { toast } from "sonner";
import { walletsAtom } from "@/store/atoms/wallets";

export function Mnemonics() {

  const [mnemonics, setMnemonics] = useRecoilState(mnemonicsAtom)
  const wallets = useRecoilValue(walletsAtom)

  const screenSize = useScreenSize()

  useEffect(() => {
    const mnemonicsString = localStorage.getItem('mnemonics') ?? ''
    if (mnemonicsString !== '') {
      setMnemonics(mnemonicsString)
    }
  }, [])

  const generateMnemonics = () => {
    const mnemonicsString = generateMnemonic(128)
    localStorage.setItem('mnemonics', mnemonicsString)
    setMnemonics(mnemonicsString)
  }

  const regenerateMnemonics = () => {
    const mnemonicsString = generateMnemonic(128)
    localStorage.setItem('mnemonics', mnemonicsString)
    setMnemonics(mnemonicsString)
  }

  return (
    <div className="flex flex-col gap-y-4">
      <div className="text-3xl xsm:text-4xl font-extrabold text-primary">
        Secret Recovery Phrase
      </div>
      <div className="text-justify items-center xsm:items-start">
        You will need this 12 letter phrase to generate wallets. Save this phrase in a safe place. If you lose this, you will never be able to recover your wallets.
      </div>
      {
        mnemonics.length === 0 
        ?
        (
          <div>
            <Button onClick={generateMnemonics} size={screenSize.width > 500 || screenSize.width === 0 ? "default" : "full"}>Generate Secret Phrase</Button>
          </div>
        )
        :
        (
          <div>
            <Button
              onClick={regenerateMnemonics}
              size={screenSize.width > 500 || screenSize.width === 0 ? "default" : "full"}
              disabled={wallets.length > 0 ? true : false}
            >
              Re-Generate Mnemonics
            </Button>
          </div>
        )
      }
      {
        mnemonics?.length !== 0 && (
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Mnemonics</AccordionTrigger>
              <AccordionContent>
              <div
                className="border-2 border-primary rounded-md p-8"
                onClick={() => {
                  navigator.clipboard.writeText(mnemonics)
                  toast('Mnemonics copied to clipboard.')
                }}
              >
                <div className="grid grid-cols-2 grid-rows-6 sm:grid-cols-3 sm:grid-rows-4 md:grid-cols-4 md:grid-rows-3 gap-2 sm:gap-4 md:gap-8">
                  {mnemonics.split(' ').map((mnemonic, idx) => (
                    <Badge key={idx}>{mnemonic}</Badge>
                  ))}
                </div>
                <div className="flex gap-x-3 pt-6">
                  Click anywhere to copy to clipboard. <Copy size={28} />
                </div>
              </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )
      }
    </div>
  )
}
