import { initProcessor } from "../utils/processorUtils";
import TransactionsQueueManager from '../utils/transactionsQueueManager';

const processorInstance = initProcessor({
  from: 1000000,
  to: 2000000,
  promPort: 3002,
  txQueueManager: TransactionsQueueManager
});
