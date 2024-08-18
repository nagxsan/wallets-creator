import { atom } from "recoil";

export const btcWalletsCountAtom = atom({
  key: 'btcWalletsCountAtom',
  default: 0
})

export const ethWalletsCountAtom = atom({
  key: 'ethWalletsCountAtom',
  default: 0
})

export const solWalletsCountAtom = atom({
  key: 'solWalletsCountAtom',
  default: 0
})
