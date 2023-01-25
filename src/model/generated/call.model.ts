import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, ManyToOne as ManyToOne_} from "typeorm"
import {Block} from "./block.model"
import {Extrinsic} from "./extrinsic.model"

@Index_(["id", "palletName", "callName"], {unique: false})
@Entity_()
export class Call {
  constructor(props?: Partial<Call>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Index_()
  @Column_("text", {nullable: true})
  parentId!: string | undefined | null

  @Index_()
  @ManyToOne_(() => Block, {nullable: true})
  block!: Block

  @Index_()
  @ManyToOne_(() => Extrinsic, {nullable: true})
  extrinsic!: Extrinsic | undefined | null

  @Index_()
  @Column_("text", {nullable: true})
  extrinsicHash!: string | undefined | null

  @Index_()
  @Column_("int4", {nullable: false})
  blockNumber!: number

  @Index_()
  @Column_("timestamp with time zone", {nullable: false})
  timestamp!: Date

  @Index_()
  @Column_("text", {nullable: false})
  callName!: string

  @Index_()
  @Column_("text", {nullable: false})
  palletName!: string

  @Index_()
  @Column_("bool", {nullable: false})
  success!: boolean

  @Index_()
  @Column_("text", {nullable: true})
  callerPublicKey!: string | undefined | null

  @Column_("text", {array: true, nullable: true})
  argsStr!: (string | undefined | null)[] | undefined | null
}
