import {StoreWithCache, TypeormDatabaseWithCache} from '@belopash/typeorm-store'
import {decodeHex} from '@subsquid/substrate-processor'
import * as model from './model'
import {BlockHeader, Call, Event, Extrinsic, processor, ProcessorContext} from './processor'

processor.run(new TypeormDatabaseWithCache(), async (ctx) => {
    for (const {header: block, calls, events, extrinsics} of ctx.blocks) {
        ctx.log.debug(
            `block ${block.height}: extrinsics - ${extrinsics.length}, calls - ${calls.length}, events - ${events.length}`
        )

        await saveBlock(ctx, block)

        for (const extrinsic of extrinsics) {
            await saveExtrinsic(ctx, extrinsic)
        }

        for (const call of calls.reverse()) {
            await saveCall(ctx, call)
        }

        for (const event of events) {
            await saveEvent(ctx, event)
        }
    }
})

async function saveBlock(ctx: ProcessorContext<StoreWithCache>, block: BlockHeader) {
    const entity = new model.Block({
        id: block.id,
        height: block.height,
        hash: decodeHex(block.hash),
        parentHash: decodeHex(block.parentHash),
        timestamp: new Date(block.timestamp ?? 0),
        extrinsicsicRoot: decodeHex(block.extrinsicsRoot),
        specName: block.specName,
        specVersion: block.specVersion,
        implName: block.implName,
        implVersion: block.implVersion,
        stateRoot: decodeHex(block.stateRoot),
        validator: block.validator ? decodeHex(block.validator) : undefined,
        extrinsicsCount: 0,
        callsCount: 0,
        eventsCount: 0,
    })

    await ctx.store.insert(entity)
}

async function saveExtrinsic(ctx: ProcessorContext<StoreWithCache>, extrinsic: Extrinsic) {
    const block = await ctx.store.getOrFail(model.Block, extrinsic.block.id)

    const entity = new model.Extrinsic({
        id: extrinsic.id,
        block,
        error: extrinsic.error,
        fee: extrinsic.fee,
        hash: decodeHex(extrinsic.hash),
        index: extrinsic.index,
        signature: new model.ExtrinsicSignature(extrinsic.signature),
        success: extrinsic.success,
        tip: extrinsic.tip,
        version: extrinsic.version,
    })
    await ctx.store.insert(entity)

    block.extrinsicsCount += 1
    await ctx.store.upsert(block)
}

async function saveCall(ctx: ProcessorContext<StoreWithCache>, call: Call) {
    const block = await ctx.store.getOrFail(model.Block, call.block.id)
    const extrinsic = await ctx.store.getOrFail(model.Extrinsic, call.getExtrinsic().id)
    const parent = call.parentCall ? await ctx.store.getOrFail(model.Call, call.parentCall.id) : undefined

    const [pallet, name] = call.name.split('.')

    const entity = new model.Call({
        id: call.id,
        block,
        address: call.address,
        args: call.args,
        error: call.error,
        extrinsic,
        name,
        pallet,
        parent,
        success: call.success,
    })
    await ctx.store.insert(entity)

    block.callsCount += 1
    await ctx.store.upsert(block)

    if (call.address.length == 0) {
        extrinsic.call = entity
        await ctx.store.upsert(extrinsic)
    }
}

async function saveEvent(ctx: ProcessorContext<StoreWithCache>, event: Event) {
    const block = await ctx.store.getOrFail(model.Block, event.block.id)
    const extrinsic = event.extrinsic ? await ctx.store.getOrFail(model.Extrinsic, event.extrinsic.id) : undefined
    const call = event.call ? await ctx.store.getOrFail(model.Call, event.call.id) : undefined

    const [pallet, name] = event.name.split('.')

    const entity = new model.Event({
        id: event.id,
        block,
        args: event.args,
        call,
        extrinsic,
        index: event.index,
        name,
        pallet,
        phase: event.phase,
    })
    await ctx.store.insert(entity)

    block.eventsCount += 1
    await ctx.store.upsert(block)
}
