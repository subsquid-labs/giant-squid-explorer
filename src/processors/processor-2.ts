import { initProcessor } from '../utils/processorUtils';
import { TransactionsQueueManager } from '../utils/transactionsQueueManager';

const processorInstance = initProcessor({
  from: 1500000,
  to: 2250000,
  promPort: 3003,
  index: 2,
  txQueueManager: TransactionsQueueManager.getInstance({
    connectName: 'sqd-processor-2',
    subscribers: ['sqd-processor-0', 'sqd-processor-1', 'sqd-processor-3']
  })
});
