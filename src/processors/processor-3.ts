import { initProcessor } from '../utils/processorUtils';
import { TransactionsQueueManager } from '../utils/transactionsQueueManager';

const processorInstance = initProcessor({
  from: 2250000,
  promPort: 3000,
  index: 3,
  txQueueManager: TransactionsQueueManager.getInstance({
    connectName: 'sqd-processor-3',
    subscribers: ['sqd-processor-0', 'sqd-processor-1', 'sqd-processor-2']
  })
});
