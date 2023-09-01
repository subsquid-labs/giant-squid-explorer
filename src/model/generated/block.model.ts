import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import {Extrinsic} from "./extrinsic.model"
import {Call} from "./call.model"
import {Event} from "./event.model"

@Entity_()
export class Block {
    constructor(props?: Partial<Block>) {
        Object.assign(this, props)
    }

    /**
     * BlockHeight-blockHash - e.g. 0001812319-0001c
     */
    @PrimaryColumn_()
    id!: string

    @Index_()
    @Column_("int4", {nullable: false})
    height!: number

    @Index_()
    @Column_("bytea", {nullable: false})
    hash!: Uint8Array

    @Column_("bytea", {nullable: false})
    parentHash!: Uint8Array

    @Column_("bytea", {nullable: false})
    stateRoot!: Uint8Array

    @Column_("bytea", {nullable: false})
    extrinsicsicRoot!: Uint8Array

    @Column_("text", {nullable: false})
    specName!: string

    @Index_()
    @Column_("int4", {nullable: false})
    specVersion!: number

    @Column_("text", {nullable: false})
    implName!: string

    @Column_("int4", {nullable: false})
    implVersion!: number

    @Index_()
    @Column_("timestamp with time zone", {nullable: false})
    timestamp!: Date

    @Index_()
    @Column_("bytea", {nullable: true})
    validator!: Uint8Array | undefined | null

    @Column_("int4", {nullable: false})
    extrinsicsCount!: number

    @Column_("int4", {nullable: false})
    callsCount!: number

    @Column_("int4", {nullable: false})
    eventsCount!: number

    @OneToMany_(() => Extrinsic, e => e.block)
    extrinsics!: Extrinsic[]

    @OneToMany_(() => Call, e => e.block)
    calls!: Call[]

    @OneToMany_(() => Event, e => e.block)
    events!: Event[]
}
