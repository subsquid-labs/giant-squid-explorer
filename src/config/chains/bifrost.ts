import {ProcessorConfig} from '../processorConfig'

const config: ProcessorConfig = {
    chainName: 'bifrost',
    prefix: 'bifrost',
    dataSource: {
        chain: 'wss://eu.bifrost-rpc.liebi.com/ws',
    },
}

export default config
