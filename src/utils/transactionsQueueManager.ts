import { v4 as uuidv4 } from 'uuid';

class TransactionsQueue {
  public queue: Promise<string>[] = [];

  // private slotBusy = false;

  private actionsForResolve: Map<string, () => void> = new Map();

  private static instance: TransactionsQueue;

  private constructor() {}

  static getInstance(): TransactionsQueue {
    if (!TransactionsQueue.instance) {
      TransactionsQueue.instance = new TransactionsQueue();
    }
    return TransactionsQueue.instance;
  }

  async executeInQueue(action: () => Promise<void>): Promise<void> {
    const actionsId = uuidv4();

    console.log(
      'process.env.SQD_TUNEL_STOL_BUSY - ',
      process.env.SQD_TUNEL_STOL_BUSY
    );
    console.log('Added to queue - ', actionsId);

    const newProm = new Promise(async (res): Promise<void> => {
      await action();
      console.log('Executed - ', actionsId);
      res(actionsId);
    });

    // @ts-ignore
    this.queue.push(newProm);

    // if (!this.slotBusy) this.executionLoop().catch(() => null);
    // if (process.env.SQD_TUNEL_STOL_BUSY !== 'true') {
    //   this.executionLoop().catch(() => null);
    // } else {
    //   const intInst = setInterval(() => {
    //     if (process.env.SQD_TUNEL_STOL_BUSY !== 'true') {
    //       this.executionLoop().catch(() => null);
    //     }
    //     clearInterval(intInst);
    //   }, 500);
    // }

    const intInst = setInterval(() => {
      if (process.env.SQD_TUNEL_STOL_BUSY !== 'true') {
        this.executionLoop().catch(() => null);
      }
      clearInterval(intInst);
    }, 2000);

    return new Promise((res) => {
      this.subscribeToActionResolve(actionsId, res);
    });
  }

  private async executionLoop() {
    while (this.queue.length) {
      console.log('this.queue.length - ', this.queue.length, process.env.SQD_TUNEL_STOL_BUSY);
      // this.slotBusy = true;
      process.env.SQD_TUNEL_STOL_BUSY = 'true';
      const actionForExec = this.queue.shift();

      if (actionForExec) {
        const resolvedActionsId = await new Promise<string>((res) => {
          setTimeout(async () => {
            res(await actionForExec);
          }, 2000);
        });
        console.log('resolvedActionsId - ', resolvedActionsId);
        this.dispatchActionResolveCallback(resolvedActionsId);
      }
    }
    // this.slotBusy = false;
    process.env.SQD_TUNEL_STOL_BUSY = 'false';
  }

  private subscribeToActionResolve(actionsId: string, callback: () => void) {
    this.actionsForResolve.set(actionsId, callback);
  }

  private dispatchActionResolveCallback(actionsId: string) {
    if (this.actionsForResolve.has(actionsId)) {
      const clb = this.actionsForResolve.get(actionsId)!;
      this.actionsForResolve.delete(actionsId);
      console.log('Dispatched - ', actionsId);
      clb();
    }
  }
}

const txQueueManager = TransactionsQueue.getInstance();
export default txQueueManager;
