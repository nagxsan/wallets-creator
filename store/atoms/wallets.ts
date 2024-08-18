import { BlockchainType } from "@/constants/enums";
import { atom, RecoilState } from "recoil";

export interface Wallets {
  id: string,
  publicKey: string,
  privateKey: string,
  blockchainType: BlockchainType
}

export const walletsAtom: RecoilState<Wallets[]> = atom({
  key: 'walletsAtom',
  default: new Array()
})
