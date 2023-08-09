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
    case 'acala':
      return require('./chains/acala').default
    case 'aleph-zero':
      return require('./chains/aleph-zero').default
    case 'aleph-zero-testnet':
      return require('./chains/aleph-zero-testnet').default
    case 'altair':
      return require('./chains/altair').default
    case 'astar':
      return require('./chains/astar').default
    case 'bajun':
      return require('./chains/bajun').default
    case 'basilisk':
      return require('./chains/basilisk').default
    case 'bifrost-polkadot':
      return require('./chains/bifrost-polkadot').default
    case 'bifrost':
      return require('./chains/bifrost').default
    case 'bitcountry-pioneer':
      return require('./chains/bitcountry-pioneer').default
    case 'calamari':
      return require('./chains/calamari').default
    case 'centrifuge':
      return require('./chains/centrifuge').default
    case 'clover':
      return require('./chains/clover').default
    case 'collectives':
      return require('./chains/collectives').default
    case 'composable-finance':
      return require('./chains/composable-finance').default
    case 'crab':
      return require('./chains/crab').default
    case 'crust':
      return require('./chains/crust').default
    case 'darwinia':
      return require('./chains/darwinia').default
    case 'efinity':
      return require('./chains/efinity').default
    case 'elysium-testnet':
      return require('./chains/elysium-testnet').default
    case 'elysium':
      return require('./chains/elysium').default
    case 'equilibrium':
      return require('./chains/equilibrium').default
    case 'foucoco':
      return require('./chains/foucoco').default
    case 'frequency-testnet':
      return require('./chains/frequency-testnet').default
    case 'frequency':
      return require('./chains/frequency').default
    case 'gear-testnet':
      return require('./chains/gear-testnet').default
    case 'gmordie':
      return require('./chains/gmordie').default
    case 'hashed':
      return require('./chains/hashed').default
    case 'heiko':
      return require('./chains/heiko').default
    case 'hydradx':
      return require('./chains/hydradx').default
    case 'integritee-network':
      return require('./chains/integritee-network').default
    case 'interlay':
      return require('./chains/interlay').default
    case 'invarch-tinkernet':
      return require('./chains/invarch-tinkernet').default
    case 'joystream':
      return require('./chains/joystream').default
    case 'kabocha':
      return require('./chains/kabocha').default
    case 'karura':
      return require('./chains/karura').default
    case 'khala':
      return require('./chains/khala').default
    case 'kilt':
      return require('./chains/kilt').default
    case 'kintsugi':
      return require('./chains/kintsugi').default
    case 'kusama':
      return require('./chains/kusama').default
    case 'kylin':
      return require('./chains/kylin').default
    case 'litentry':
      return require('./chains/litentry').default
    case 'litmus':
      return require('./chains/litmus').default
    case 'manta':
      return require('./chains/manta').default
    case 'moonbase':
      return require('./chains/moonbase').default
    case 'moonbeam':
      return require('./chains/moonbeam').default
    case 'moonriver':
      return require('./chains/moonriver').default
    case 'moonsama':
      return require('./chains/moonsama').default
    case 'myriad-testnet':
      return require('./chains/myriad-testnet').default
    case 'myriad':
      return require('./chains/myriad').default
    case 'origin-trail':
      return require('./chains/origin-trail').default
    case 'pangolin':
      return require('./chains/pangolin').default
    case 'pangoro':
      return require('./chains/pangoro').default
    case 'parallel':
      return require('./chains/parallel').default
    case 'peaq':
      return require('./chains/peaq').default
    case 'pendulum':
      return require('./chains/pendulum').default
    case 'phala':
      return require('./chains/phala').default
    case 'picasso':
      return require('./chains/picasso').default
    case 'polymesh':
      return require('./chains/polymesh').default
    case 'polkadot':
      return require('./chains/polkadot').default
    case 'reef-testnet':
      return require('./chains/reef').default
    case 'reef':
      return require('./chains/reef').default
    case 'robonomics':
      return require('./chains/robonomics').default
    case 'rococo':
      return require('./chains/rococo').default
    case 'shibuya':
      return require('./chains/shibuya').default
    case 'shiden':
      return require('./chains/shiden').default
    case 'statemine':
      return require('./chains/statemine').default
    case 'statemint':
      return require('./chains/statemint').default
    case 'subsocial':
      return require('./chains/subsocial').default
    case 't0rn':
      return require('./chains/t0rn').default
    case 'tanganika':
      return require('./chains/tanganika').default
    case 'ternoa':
      return require('./chains/ternoa').default
    case 'tidechain':
      return require('./chains/tidechain').default
    case 'turing':
      return require('./chains/turing').default
    case 'vara':
      return require('./chains/vara').default
    case 'westend-collectives':
      return require('./chains/westend-collectives').default
    case 'xx-network':
      return require('./chains/xx-network').default
    default:
      throw new Error(`Unsupported chain ${process.env.CHAIN}`)
  }
}
