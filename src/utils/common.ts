import {
  ChainDataName,
  BlockData,
  EventData,
  ExtrinsicData,
  ParsedEventsDataMap,
  ParsedChainData
} from './types';
import { getChainConfig } from '../config';
import * as ss58 from '@subsquid/ss58';
import { decodeHex, toHex } from '@subsquid/util-internal-hex';
import assert from 'assert';

const chainConfig = getChainConfig();
const LIMIT = Number(process.env.LIMIT) ?? 100;

export class ItemsLogger {
  private static itemsMap = new Map<string, { total: number; len: number }>();
  private static bigItemsMap = new Map<
    string,
    { total: number; len: number }
  >();

  static add(itemName: string, len_: number) {
    if (len_ > LIMIT) {
      const curVal = ItemsLogger.bigItemsMap.get(itemName) ?? {
        total: 0,
        len: 0
      };
      ItemsLogger.bigItemsMap.set(itemName, {
        total: curVal.total + 1,
        len: curVal.len + len_
      });
    }
    const curVal = ItemsLogger.itemsMap.get(itemName) ?? {
      total: 0,
      len: 0
    };
    ItemsLogger.itemsMap.set(itemName, {
      total: curVal.total + 1,
      len: curVal.len + len_
    });
  }

  static printStats() {
    console.log('Regular items:');
    const sortedReg = [...ItemsLogger.itemsMap.entries()].sort(
      (i1, i2) => i2[1].total - i1[1].total
    );

    sortedReg.forEach((val) => {
      console.log(
        `${val[0]} - ${val[1].total} times (${
          val[1].len / val[1].total
        } av. values)`
      );
    });
    console.log('Big items:');
    const sortedBig = [...ItemsLogger.bigItemsMap.entries()].sort(
      (i1, i2) => i2[1].total - i1[1].total
    );
    sortedBig.forEach((val) => {
      console.log(
        `${val[0]} - ${val[1].total} times (${
          val[1].len / val[1].total
        } av. values)`
      );
    });
  }
}

export class ParsedChainDataScope {
  private scope: ParsedEventsDataMap;

  constructor() {
    this.scope = new Map<ChainDataName, Set<ParsedChainData>>();
  }

  set(section: ChainDataName, value: ParsedChainData) {
    this.scope.set(section, (this.scope.get(section) || new Set()).add(value));
  }

  get<T>(section: ChainDataName): Set<T> {
    return (this.scope.get(section) as Set<T>) || new Set<T>();
  }
}

export function encodeAccount(
  id: Uint8Array | string | null,
  prefix?: string | number | undefined
) {
  assert(id, 'Cannot encode public key with value null.');
  if (typeof id === 'string' && !!prefix) {
    return ss58.codec(prefix).encode(decodeHex(id));
  } else if (typeof id === 'string' && !prefix) {
    return id;
  } else if (typeof id !== 'string' && !prefix) {
    return toHex(id);
  } else if (typeof id !== 'string' && !!prefix) {
    return ss58.codec(prefix).encode(id);
  }
  return id.toString();
}

export function decodeAccount(
  id: string,
  prefix?: string | number | undefined
) {
  return prefix != null ? ss58.codec(prefix).decode(id) : decodeHex(id);
}

function parseArgsHelper(srcNode: any, res: Set<string>): void {
  if (!srcNode) return;

  const handleVertex = (val: any) => {
    if (ArrayBuffer.isView(val) && val.constructor.name === 'Uint8Array') {
      const tr = toHex(val as Uint8Array);
      if (tr.length < chainConfig.argsStringMaxLengthLimit) res.add(tr);
      return;
    }
    if (ArrayBuffer.isView(val) && val.constructor.name !== 'Uint8Array') {
      const tr = val.toString();
      if (tr.length < chainConfig.argsStringMaxLengthLimit) res.add(tr);
      return;
    }

    switch (typeof val) {
      case 'string':
        if (
          val.length > 0 &&
          val.length < chainConfig.argsStringMaxLengthLimit
        ) {
          res.add(val);
        }
        break;
      case 'number':
      case 'bigint':
        res.add((<any>val).toString());
        break;
    }
  };

  if (
    Array.isArray(srcNode) ||
    (!Array.isArray(srcNode) &&
      !ArrayBuffer.isView(srcNode) &&
      typeof srcNode === 'object')
  ) {
    // It's array or object
    for (const key in srcNode) parseArgsHelper(srcNode[key], res);
  } else {
    // It's primitive value
    handleVertex(srcNode);
  }
}

export function getParsedArgs(srcArgs: any): string[] {
  let result: Set<string> = new Set();
  parseArgsHelper(srcArgs, result);
  return [...result.values()];
}
