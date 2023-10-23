import {ProcessorConfig} from '../processorConfig'

const config: ProcessorConfig = {
    chainName: 'phala',
    prefix: 'phala',
    dataSource: {
        chain: 'wss://api.phala.network/ws',
    },
}

export default config
