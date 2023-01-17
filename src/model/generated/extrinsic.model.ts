import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {Block} from "./block.model"
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

  @OneToMany_(() => Call, e => e.extrinsic)
  calls!: Call[]

  @OneToMany_(() => Event, e => e.extrinsic)
  events!: Event[]

  @Index_()
  @Column_("int4", {nullable: false})
  blockNumber!: number

  @Index_()
  @Column_("timestamp with time zone", {nullable: false})
  timestamp!: Date

  @Index_()
  @Column_("text", {nullable: true})
  extrinsicHash!: string | undefined | null

  @Index_()
  @Column_("int4", {nullable: false})
  indexInBlock!: number

  @Index_()
  @Column_("int4", {nullable: false})
  version!: number

  @Index_()
  @Column_("text", {nullable: true})
  signerPublicKey!: string | undefined | null

  @Index_()
  @Column_("text", {nullable: true})
  signerAccount!: string | undefined | null

  @Index_()
  @Column_("bool", {nullable: false})
  success!: boolean

  @Column_("text", {nullable: true})
  error!: string | undefined | null

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
  tip!: bigint | undefined | null

  @Index_()
  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
  fee!: bigint | undefined | null
}
