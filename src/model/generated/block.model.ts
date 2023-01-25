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
  @Column_("text", {nullable: false})
  hash!: string

  @Column_("text", {nullable: false})
  parentHash!: string

  @Index_()
  @Column_("timestamp with time zone", {nullable: false})
  timestamp!: Date

  @Index_()
  @Column_("int4", {nullable: false})
  specVersion!: number

  @Index_()
  @Column_("text", {nullable: true})
  validator!: string | undefined | null

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
