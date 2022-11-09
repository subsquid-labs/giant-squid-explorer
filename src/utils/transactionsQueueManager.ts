import { v4 as uuidv4 } from 'uuid';
import ipc from 'node-ipc';

import {
  BatchContext,
  BatchProcessorItem,
  SubstrateBatchProcessor,
  BatchProcessorCallItem
} from '@subsquid/substrate-processor';

import { Store } from '@subsquid/processor-tools';

type IpcInstanceConfig = {
  connectName: string;
  subscribers: string[];
};

export type Context = BatchContext<
  Store,
  BatchProcessorItem<SubstrateBatchProcessor>
>;

export class TransactionsQueueManager {
  public queue: { actionsId: string; action: () => Promise<void> }[] = [];

  private context: Context | null = null;

  private slotBusy = false;

  private actionsForResolve: Map<string, () => void> = new Map();

  private static instance: TransactionsQueueManager;

  private constructor(private ipcInstConfig: IpcInstanceConfig) {
    ipc.config.id = ipcInstConfig.connectName;
    ipc.config.retry = 1500;
    ipc.config.silent = true;

    ipc.serve(() =>
      ipc.server.on('message_stol_busy', (data) => {
        if (this.context) {
          this.context.log
            .child('IPC')
            .info(`message received from ${data.sender} - ${data.status}`);
        } else {
          console.log(
            `IPC:: message received from ${data.sender} - ${data.status}`
          );
        }
        this.slotBusy = data.status;
      })
    );
    ipcInstConfig.subscribers.forEach((subscriber) => {
      ipc.connectTo(subscriber, () => {
        // ipc.of[subscriber].on('message_stol_busy', (slotStatus) => {
        //   console.log('connection.connectTo - ', slotStatus);
        //   this.slotBusy = slotStatus;
        // });

        ipc.of[subscriber].on('connect', () => {
          if (this.context) {
            this.context.log.child('IPC').info(`connected to ${subscriber}`);
          } else {
            console.log(`IPC:: connected to ${subscriber}`);
          }
        });
        ipc.of[subscriber].on('disconnect', () => {
          if (this.context) {
            this.context.log.child('IPC').warn(`disconnect from ${subscriber}`);
          } else {
            console.log(`IPC:: disconnect from ${subscriber}`);
          }
        });
      });
    });
    ipc.server.start();
  }

  setContext(ctx: Context) {
    this.context = ctx;
  }

  static getInstance(
    ipcInstConfig: IpcInstanceConfig
  ): TransactionsQueueManager {
    if (!TransactionsQueueManager.instance) {
      TransactionsQueueManager.instance = new TransactionsQueueManager(
        ipcInstConfig
      );
    }
    return TransactionsQueueManager.instance;
  }

  async sendSlotStatus(newSlotStatus: boolean) {
    return new Promise<void>((res) => {
      this.ipcInstConfig.subscribers.forEach((subscriber) => {
        ipc.of[subscriber].emit('message_stol_busy', {
          sender: this.ipcInstConfig.connectName,
          status: newSlotStatus
        });
      });
      res();
    });
  }

  async executeInQueue(action: () => Promise<void>): Promise<void> {
    const actionsId = uuidv4();
    const newProm = { actionsId, action };

    // @ts-ignore
    this.queue.push(newProm);
    const intInst = setInterval(() => {
      if (!this.slotBusy) {
        this.executionLoop().catch(() => null);
        clearInterval(intInst);
      }
    }, 500);

    return new Promise((res) => {
      this.subscribeToActionResolve(actionsId, res);
    });
  }

  private async executionLoop() {
    while (this.queue.length) {
      this.slotBusy = true;
      await this.sendSlotStatus(true);
      const actionForExec = this.queue.shift();

      if (actionForExec) {
        await new Promise<void>((res) => {
          setTimeout(async () => {
            await actionForExec.action();
            res();
          }, 1000);
        });
        this.dispatchActionResolveCallback(actionForExec.actionsId);
      }
    }
    this.slotBusy = false;
    await this.sendSlotStatus(false);
  }

  private subscribeToActionResolve(actionsId: string, callback: () => void) {
    this.actionsForResolve.set(actionsId, callback);
  }

  private dispatchActionResolveCallback(actionsId: string) {
    if (this.actionsForResolve.has(actionsId)) {
      const clb = this.actionsForResolve.get(actionsId)!;
      this.actionsForResolve.delete(actionsId);
      clb();
    }
  }
}
