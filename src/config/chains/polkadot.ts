import {ProcessorConfig} from '../processorConfig'

const config: ProcessorConfig = {
    chainName: 'polkadot',
    prefix: 'polkadot',
    dataSource: {
        chain: 'wss://rpc.polkadot.io',
    },
}

export default config
