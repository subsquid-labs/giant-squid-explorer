import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {Block} from "./block.model"
import {ExtrinsicSignature} from "./_extrinsicSignature"
import {Call} from "./call.model"
import {Event} from "./event.model"

@Entity_()
export class Extrinsic {
    constructor(props?: Partial<Extrinsic>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => Block, {nullable: true})
    block!: Block

    @Column_("int4", {nullable: false})
    index!: number

    @Column_("int4", {nullable: false})
    version!: number

    @Column_("jsonb", {transformer: {to: obj => obj == null ? undefined : obj.toJSON(), from: obj => obj == null ? undefined : new ExtrinsicSignature(undefined, obj)}, nullable: true})
    signature!: ExtrinsicSignature | undefined | null

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    tip!: bigint | undefined | null

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    fee!: bigint | undefined | null

    @Index_()
    @Column_("bool", {nullable: true})
    success!: boolean | undefined | null

    @Column_("jsonb", {nullable: true})
    error!: unknown | undefined | null

    @Index_()
    @Column_("bytea", {nullable: false})
    hash!: Uint8Array

    @OneToMany_(() => Call, e => e.extrinsic)
    calls!: Call[]

    @OneToMany_(() => Event, e => e.extrinsic)
    events!: Event[]
}
