import { walletsAtom } from "@/store/atoms/wallets"
import { useRecoilValue } from "recoil"

export function DisplayWallets() {

  const wallets = useRecoilValue(walletsAtom)

  return (
    <div>
      {wallets.map((wallet, idx) => (
        <div key={idx}>
          <div>{wallet.id}</div>
          <div>{wallet.blockchainType}</div>
          <div>{wallet.publicKey}</div>
          <div>{wallet.privateKey}</div>
        </div>
      ))}
    </div>
  )
}