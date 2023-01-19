import type { ProcessorConfig } from './processorConfig'
import fs from 'fs'
import { assertNotNull } from '@subsquid/substrate-processor'

export const BLACKLIST_CONFIG: IBlackListConfing = getJSON(
  'assets/blacklist-config.json'
)

interface IBlackListConfing {
  blacklistItems: string[]
  argsStringMaxLengthLimit: number
}

function getJSON(filename: string) {
  const data = fs.readFileSync(filename).toString()
  //console.log(data)
  return JSON.parse(data)
}

export function getChainConfig(): ProcessorConfig {
  switch (process.env.CHAIN) {
    case 'kusama':
      return require('./kusama').default
    case 'polkadot':
      return require('./polkadot').default
    case 'acala':
      return require('./acala').default
    case 'moonriver':
      return require('./moonriver').default
    case 'moonbeam':
      return require('./moonbeam').default
    case 'crust':
      return require('./crust').default
    case 'bifrost':
      return require('./bifrost').default
    case 'phala':
      return require('./phala').default
    case 'gmordie':
      return require('./gmordie').default
    case 'astar':
      return require('./astar').default
    default:
      throw new Error(`Unsupported chain ${process.env.CHAIN}`)
  }
}
