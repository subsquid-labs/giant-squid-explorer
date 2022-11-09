import { initProcessor } from '../utils/processorUtils';
import { TransactionsQueueManager } from '../utils/transactionsQueueManager';

const processorInstance = initProcessor({
  from: 0,
  to: 750000,
  promPort: 3001,
  index: 0,
  txQueueManager: TransactionsQueueManager.getInstance({
    connectName: 'sqd-processor-0',
    subscribers: ['sqd-processor-1', 'sqd-processor-2', 'sqd-processor-3']
  })
});
