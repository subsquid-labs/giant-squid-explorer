import { initProcessor } from '../utils/processorUtils';
import TransactionsQueueManager from '../utils/transactionsQueueManager';

const processorInstance = initProcessor({
  from: 2000000,
  promPort: 3000,
  txQueueManager: TransactionsQueueManager
});
