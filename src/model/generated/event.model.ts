import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import {Block} from "./block.model"
import {Extrinsic} from "./extrinsic.model"
import {Call} from "./call.model"

@Index_(["eventName", "palletName"], {unique: false})
@Entity_()
export class Event {
  constructor(props?: Partial<Event>) {
    Object.assign(this, props)
  }

  /**
   * Event id - e.g. 0000000001-000000-272d6
   */
  @PrimaryColumn_()
  id!: string

  @Index_()
  @ManyToOne_(() => Block, {nullable: true})
  block!: Block

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
  @ManyToOne_(() => Extrinsic, {nullable: true})
  extrinsic!: Extrinsic | undefined | null

  @Index_()
  @ManyToOne_(() => Call, {nullable: true})
  call!: Call | undefined | null

  @Index_()
  @Column_("int4", {nullable: true})
  indexInBlock!: number | undefined | null

  @Column_("text", {nullable: false})
  eventName!: string

  @Index_()
  @Column_("text", {nullable: false})
  palletName!: string

  @Column_("text", {array: true, nullable: true})
  argsStr!: (string | undefined | null)[] | undefined | null

  @Column_("jsonb", {nullable: true})
  argsJson!: unknown | undefined | null
}
