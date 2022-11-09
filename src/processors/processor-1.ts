import { initProcessor } from '../utils/processorUtils';
import TransactionsQueueManager from '../utils/transactionsQueueManager';

const processorInstance = initProcessor({
  from: 0,
  to: 1000000,
  promPort: 3001,
  txQueueManager: TransactionsQueueManager
});
