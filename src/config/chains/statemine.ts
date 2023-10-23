import {ProcessorConfig} from '../processorConfig'

const config: ProcessorConfig = {
    chainName: 'statemine',
    prefix: 'statemine',
    dataSource: {
        chain: 'wss://statemine-rpc.polkadot.io',
    },
}

export default config
