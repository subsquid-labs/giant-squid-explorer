import { initProcessor } from '../utils/processorUtils';
// import { TransactionsQueueManager } from '../utils/transactionsQueueManager';
// 15_257_244
const processorInstance = initProcessor({
  from: 0,
  to: 100000,
  promPort: 3001,
  index: 0,
  // txQueueManager: TransactionsQueueManager.getInstance({
  //   connectName: 'sqd-processor-0',
  //   subscribers: ['sqd-processor-1', 'sqd-processor-2', 'sqd-processor-3']
  // })
});
