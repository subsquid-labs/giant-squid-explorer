import {ProcessorConfig} from '../processorConfig'

const config: ProcessorConfig = {
    chainName: 'interlay',
    prefix: 'interlay',
    dataSource: {
        chain: 'wss://api.interlay.io/parachain',
    },
}

export default config
