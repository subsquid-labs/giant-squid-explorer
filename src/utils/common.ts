import { ChainDataName, ParsedEventsDataMap, ParsedChainData } from './types'
import { getChainConfig, BLACKLIST_CONFIG } from '../config'
import * as ss58 from '@subsquid/ss58'
import { decodeHex, toHex } from '@subsquid/util-internal-hex'
import assert from 'assert'
import { CommonHandlerContext } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { CounterLevel, ItemsCounter, ItemType } from '../model'

const CHAIN_CONFIG = getChainConfig()
const LIMIT = Number(process.env.LIMIT) ?? 100

interface ICounterNameProps {
  type: ItemType
  level: CounterLevel
  palletName?: string
  itemName?: string
}

export class ItemsLogger {
  private static itemsMap = new Map<string, ItemsCounter>()
  private static initilized = false

  static isInitialized = () => this.initilized

  static async init(ctx: CommonHandlerContext<Store>) {
    const items = await ctx.store.find(ItemsCounter)
    for (const item of items) {
      this.itemsMap.set(item.id, item)
    }
    this.initilized = true
    ctx.log.info('Items counters were initialized')
  }

  private static _add(item: ICounterNameProps) {
    const { level, type, palletName, itemName } = item
    let id = type.toString()
    if (palletName) id += `.${palletName}`
    if (itemName) id += `.${itemName}`

    const curState =
      this.itemsMap.get(id) ?? new ItemsCounter({ id, total: 0, type, level })
    curState.total += 1
    this.itemsMap.set(id, curState)
  }

  private static _addItem(item: Omit<ICounterNameProps, 'level'>) {
    const { itemName, palletName, type } = item
    this._add({ type, palletName, itemName, level: CounterLevel.Item })
    this._add({ type, palletName, level: CounterLevel.Pallet })
    this._add({ type, level: CounterLevel.Global })
  }

  static addEvent = (item: Omit<ICounterNameProps, 'level' | 'type'>) =>
    this._addItem({ type: ItemType.Events, ...item })

  static addCall(
    item: Omit<ICounterNameProps, 'level' | 'type'>,
    isMainInExtrinsic: boolean
  ) {
    this._addItem({ type: ItemType.Calls, ...item })
    if (isMainInExtrinsic)
      this._addItem({type: ItemType.Extrinsics, ...item })
  }

  static async saveToDB(ctx: CommonHandlerContext<Store>) {
    await ctx.store.save([...this.itemsMap.values()])
    //ctx.log.info('Items counters were saved')
  }
}

export class ParsedChainDataScope {
  private scope: ParsedEventsDataMap

  constructor() {
    this.scope = new Map<ChainDataName, Set<ParsedChainData>>()
  }

  set(section: ChainDataName, value: ParsedChainData) {
    this.scope.set(section, (this.scope.get(section) || new Set()).add(value))
  }

  get<T>(section: ChainDataName): Set<T> {
    return (this.scope.get(section) as Set<T>) || new Set<T>()
  }
}

export function encodeAccount(
  id: Uint8Array | string | null,
  prefix?: string | number | undefined
) {
  assert(id, 'Cannot encode public key with value null.')
  if (typeof id === 'string' && !!prefix) {
    return ss58.codec(prefix).encode(decodeHex(id))
  } else if (typeof id === 'string' && !prefix) {
    return id
  } else if (typeof id !== 'string' && !prefix) {
    return toHex(id)
  } else if (typeof id !== 'string' && !!prefix) {
    return ss58.codec(prefix).encode(id)
  }
  return id.toString()
}

export function decodeAccount(
  id: string,
  prefix?: string | number | undefined
) {
  return prefix != null ? ss58.codec(prefix).decode(id) : decodeHex(id)
}

function parseArgsHelper(srcNode: any, res: Set<string>): void {
  if (!srcNode) return

  const handleVertex = (val: any) => {
    if (ArrayBuffer.isView(val) && val.constructor.name === 'Uint8Array') {
      const tr = toHex(val as Uint8Array)
      if (tr.length <= BLACKLIST_CONFIG.argsStringMaxLengthLimit) res.add(tr)
      return
    }
    if (ArrayBuffer.isView(val) && val.constructor.name !== 'Uint8Array') {
      const tr = val.toString()
      if (tr.length <= BLACKLIST_CONFIG.argsStringMaxLengthLimit) res.add(tr)
      return
    }

    switch (typeof val) {
      case 'string':
        if (
          val.length > 0 &&
          val.length <= BLACKLIST_CONFIG.argsStringMaxLengthLimit
        ) {
          res.add(val)
        }
        break
      case 'number':
      case 'bigint':
        res.add((<any>val).toString())
        break
    }
  }

  if (
    Array.isArray(srcNode) ||
    (!Array.isArray(srcNode) &&
      !ArrayBuffer.isView(srcNode) &&
      typeof srcNode === 'object')
  ) {
    // It's array or object
    for (const key in srcNode) parseArgsHelper(srcNode[key], res)
  } else {
    // It's primitive value
    handleVertex(srcNode)
  }
}

export function getParsedArgs(srcArgs: any): string[] {
  let result: Set<string> = new Set()
  parseArgsHelper(srcArgs, result)
  return [...result.values()]
}
