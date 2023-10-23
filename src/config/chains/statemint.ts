import {ProcessorConfig} from '../processorConfig'

const config: ProcessorConfig = {
    chainName: 'statemint',
    prefix: 'statemint',
    dataSource: {
        chain: 'wss://statemint-rpc.polkadot.io',
    },
}

export default config
