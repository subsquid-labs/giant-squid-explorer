import {
  ChainDataName,
  BlockData,
  EventData,
  ExtrinsicData,
  ParsedEventsDataMap,
  ParsedChainData
} from './types';
import { getConfig } from '../config';
import * as ss58 from '@subsquid/ss58';
import { decodeHex, toHex } from '@subsquid/util-internal-hex';
import assert from 'assert';

const chainConfig = getConfig();

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

function parseArgsHelper(srcNode: any, res: string[]): void {
  if (!srcNode) return;

  const handleVertex = (val: any) => {
    if (ArrayBuffer.isView(val) && val.constructor.name === 'Uint8Array') {
      const tr = toHex(val as Uint8Array);
      if (tr.length < chainConfig.argsStringMaxLengthLimit) res.push(tr);
      return;
    }
    if (ArrayBuffer.isView(val) && val.constructor.name !== 'Uint8Array') {
      const tr = val.toString();
      if (tr.length < chainConfig.argsStringMaxLengthLimit) res.push(tr);
      return;
    }

    switch (typeof val) {
      case 'string':
        if (val.length > 0 && val.length < chainConfig.argsStringMaxLengthLimit)
          res.push(val);
        break;
      case 'number':
      case 'bigint':
        res.push((<any>val).toString());
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
  let result: string[] = [];
  parseArgsHelper(srcArgs, result);
  return result;
}
