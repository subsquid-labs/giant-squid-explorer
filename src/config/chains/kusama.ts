import {ProcessorConfig} from '../processorConfig'

const config: ProcessorConfig = {
    chainName: 'kusama',
    prefix: 'kusama',
    dataSource: {
        chain: 'wss://kusama-rpc.polkadot.io',
    },
}

export default config
