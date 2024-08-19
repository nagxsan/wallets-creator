import { BlockchainType } from "@/constants/enums";
import { Wallets } from "@/store/atoms/wallets";
import { Keypair } from "@solana/web3.js";
import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { v4 as uuidv4 } from "uuid";
import bs58 from 'bs58';

export function generateWallet(mnemonics: string, derivationPath: string, blockchainType: BlockchainType, count: number): Wallets {
  const seedPhrase = mnemonicToSeedSync(mnemonics)
  const derivedSeed = derivePath(derivationPath, seedPhrase.toString('hex')).key

  const secretKey = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey
  const publicKey = Keypair.fromSecretKey(secretKey).publicKey.toBase58()

  const blockchainTypeToStringMap: Map<BlockchainType, string> = new Map([
    [BlockchainType.BTC, 'BTC'],
    [BlockchainType.ETH, 'ETH'],
    [BlockchainType.SOL, 'SOL'],
  ])

  return {
    id: uuidv4(),
    name: `${blockchainTypeToStringMap.get(blockchainType)}-Wallet-${count}`,
    publicKey: publicKey,
    privateKey: bs58.encode(secretKey),
    blockchainType: blockchainType
  }
}
