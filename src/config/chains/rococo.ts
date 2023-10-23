import {ProcessorConfig} from '../processorConfig'

const config: ProcessorConfig = {
    chainName: 'rococo',
    prefix: 'rococo',
    dataSource: {
        chain: 'wss://rococo-rpc.polkadot.io',
    },
}

export default config
