import { SubstrateExtrinsicSignature } from '@subsquid/substrate-processor/lib/interfaces/substrate'

export enum ChainDataName {
  BLOCK = 'BLOCK',
  EVENT = 'EVENT',
  EXTRINSIC = 'EXTRINSIC'
}

export interface BlockData {
  id: string
  height: number
  hash: string
  parentHash: string
  timestamp: Date
}

export interface EventData {
  id: string
  blockId: string
  extrinsicId: string | null
  indexInBlock: number | null
  name: string
}

export interface ExtrinsicData {
  id: string
  blockId: string
  indexInBlock: number
  extrinsicHash: string
  version: number
  signer: string | null
  success: boolean
  // error: ExtrinsicError | null;
  error: string | null
  tip: bigint | null
  fee: bigint | null
  callData: CallData
}

type CallData = {
  id: string
  name: string
}

export type ExtrinsicError = {
  kind: string
  value: {
    error: string
    index: number
  } | null
}

export type ParsedChainData = BlockData | EventData | ExtrinsicData

export type ParsedEventsDataMap = Map<ChainDataName, Set<ParsedChainData>>
