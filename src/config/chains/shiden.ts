import {ProcessorConfig} from '../processorConfig'

const config: ProcessorConfig = {
    chainName: 'shiden',
    prefix: 'shiden',
    dataSource: {
        chain: 'wss://rpc.shiden.astar.network',
    },
}

export default config
