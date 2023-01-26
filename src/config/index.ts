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
      return require('./chains/kusama').default
    case 'polkadot':
      return require('./chains/polkadot').default
    case 'statemint':
      return require('./chains/statemint').default
    case 'statemine':
      return require('./chains/statemine').default
    case 'acala':
      return require('./chains/acala').default
    case 'karura':
      return require('./chains/karura').default
    case 'moonriver':
      return require('./chains/moonriver').default
    case 'moonbeam':
      return require('./chains/moonbeam').default
    case 'moonbase':
      return require('./chains/moonbase').default
    case 'bifrost':
      return require('./chains/bifrost').default
    case 'phala':
      return require('./chains/phala').default
    case 'khala':
      return require('./chains/khala').default
    case 'gmordie':
      return require('./chains/gmordie').default
    case 'astar':
      return require('./chains/astar').default
    case 'shibuya':
      return require('./chains/shibuya').default
    case 'shiden':
      return require('./chains/shiden').default
    case 'calamari':
      return require('./chains/calamari').default
    case 'subsocial':
      return require('./chains/subsocial').default
    case 'efinity':
      return require('./chains/efinity').default
    case 'rococo':
      return require('./chains/rococo').default
    case 'interlay':
      return require('./chains/interlay').default
    case 'hydradx':
      return require('./chains/hydradx').default
    default:
      throw new Error(`Unsupported chain ${process.env.CHAIN}`)
  }
}
