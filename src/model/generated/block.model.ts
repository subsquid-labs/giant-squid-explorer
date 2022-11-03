import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import {Event} from "./event.model"
import {Extrinsic} from "./extrinsic.model"
import {Call} from "./call.model"

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

  @Index_()
  @Column_("text", {nullable: false})
  parentHash!: string

  @Index_()
  @Column_("timestamp with time zone", {nullable: false})
  timestamp!: Date

  @OneToMany_(() => Event, e => e.block)
  events!: Event[]

  @OneToMany_(() => Extrinsic, e => e.block)
  extrinsics!: Extrinsic[]

  @OneToMany_(() => Call, e => e.block)
  calls!: Call[]
}
