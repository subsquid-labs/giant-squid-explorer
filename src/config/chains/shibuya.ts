import {ProcessorConfig} from '../processorConfig'

const config: ProcessorConfig = {
    chainName: 'shibuya',
    prefix: 'shibuya',
    dataSource: {
        chain: 'wss://rpc.shibuya.astar.network',
    },
}

export default config
