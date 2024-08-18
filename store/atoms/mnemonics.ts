import { atom, RecoilState } from "recoil";

export const mnemonicsAtom: RecoilState<string> = atom({
  key: 'mnemonicsAtom',
  default: ''
})
