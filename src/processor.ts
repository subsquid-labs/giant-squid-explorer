import { spawn } from 'child_process';
import { createLogger, Logger } from '@subsquid/logger';
import { runProcessor } from './utils/processorUtils';
import { getConfig } from './config';
import { ThreadConfig } from './config/processorConfig';

const chainConfig = getConfig();

const threadsRetriesCounter = new Map(
  chainConfig.threadsList.map((thread) => [thread.index, 0])
);
let logger: Logger = createLogger('sqd:processor');

const runProcessorInIsolatedProcess = (threadConfig: ThreadConfig) => {
  const runProcessRestartOnExit = () => {
    // run process
    const process = spawn(
      'node',
      [__filename, `--thread=${threadConfig.index}`],
      {
        stdio: 'inherit'
      }
    );

    process.on('error', (error) =>
      logger.warn(
        `Failed to spawn process for thread ${threadConfig.index}: ${error}`
      )
    );

    process.on('exit', (code) => {
      if (code !== 0)
        logger.warn(`Thread #${threadConfig.index} exited with an error.`);
      const currentRetriesCount =
        threadsRetriesCounter.get(threadConfig.index) ?? 0;

      if (
        threadConfig.retriesLimit < 0 ||
        currentRetriesCount <= threadConfig.retriesLimit
      ) {
        logger.info(
          `Restarting thread #${threadConfig.index} - attempt #${currentRetriesCount}`
        );
        runProcessRestartOnExit();
      } else {
        logger.info(
          `Thread #${threadConfig.index} has reached retries limit (${threadConfig.retriesLimit} attempts).`
        );
      }

      threadsRetriesCounter.set(threadConfig.index, currentRetriesCount + 1);
    });
  };

  logger.info(
    `Starting thread #${threadConfig.index} for ${chainConfig.srcConfig.chainName} chain`
  );
  runProcessRestartOnExit();
};

const chainArg = process.argv.find((arg) => arg.startsWith('--thread='));
if (chainArg) {
  const threadIndex = Number.parseInt(chainArg.replace(/^--thread=/, ''));
  const thread = chainConfig.threadsList.find(
    ({ index }) => index === threadIndex
  );
  if (!thread) throw new Error(`Thread with index ${threadIndex} not found.`);

  runProcessor(thread, chainConfig.srcConfig);
} else {
  logger.info(
    `Starting processing for "${chainConfig.srcConfig.chainName}" chain with in ${chainConfig.threadsList.length} thread(s).`
  );
  chainConfig.threadsList.forEach(runProcessorInIsolatedProcess);
}
