import { useRecoilState } from "recoil";
import { Button } from "./ui/button";
import { mnemonicsAtom } from "@/store/atoms/mnemonics";
import { generateMnemonic } from "bip39";
import { useEffect } from "react";
import useScreenSize from "@/hooks/useSreenSize";

export function Mnemonics() {

  const [mnemonics, setMnemonics] = useRecoilState(mnemonicsAtom)

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

  return (
    <div className="flex flex-col gap-y-4">
      <div className="text-3xl xsm:text-4xl font-extrabold text-primary">
        Secret Recovery Phrase
      </div>
      <div className="text-justify items-center xsm:items-start">
        You will need this 12 letter phrase to generate wallets. Save this phrase in a safe place. If you lose this, you will never be able to recover your wallets.
      </div>
      <div>
        <Button onClick={generateMnemonics} size={screenSize.width <= 500 ? "full" : "default"}>Generate Secret Phrase</Button>
      </div>
      {
        mnemonics?.length !== 0 && (
          <div>

          </div>
        )
      }
    </div>
  )
}
