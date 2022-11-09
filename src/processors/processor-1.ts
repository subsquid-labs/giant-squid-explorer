import { initProcessor } from '../utils/processorUtils';
import { TransactionsQueueManager } from '../utils/transactionsQueueManager';

const processorInstance = initProcessor({
  from: 4000000,
  to: 8000000,
  promPort: 3002,
  index: 1,
  txQueueManager: TransactionsQueueManager.getInstance({
    connectName: 'sqd-processor-1',
    subscribers: ['sqd-processor-0', 'sqd-processor-2', 'sqd-processor-3']
  })
});
