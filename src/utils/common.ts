import {
  ChainDataName,
  BlockData,
  EventData,
  ExtrinsicData,
  ParsedEventsDataMap,
  ParsedChainData
} from './types';

import * as ss58 from '@subsquid/ss58';
import { decodeHex } from '@subsquid/util-internal-hex';
import { processorConfig } from '../config';
import { Block } from '../processor';

const ss58codec = ss58.codec(processorConfig.prefix);

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
//
// export function encodeAccount(id: Uint8Array) {
//   return ss58codec.encode(typeof id === 'string' ? decodeHex(id) : id);
// }
//
// export function decodeAccount(id: string) {
//   return ss58codec.decode(id);
// }
