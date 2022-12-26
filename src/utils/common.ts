import {
  ChainDataName,
  BlockData,
  EventData,
  ExtrinsicData,
  ParsedEventsDataMap,
  ParsedChainData
} from './types';

import * as ss58 from '@subsquid/ss58';
import { decodeHex, toHex } from '@subsquid/util-internal-hex';
import { getConfig } from '../config';
import assert from 'assert';

const chainConfig = getConfig();

const ss58codec = ss58.codec(chainConfig.srcConfig.prefix);

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
