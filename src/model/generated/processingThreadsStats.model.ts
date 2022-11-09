import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_} from "typeorm"

@Entity_()
export class ProcessingThreadsStats {
  constructor(props?: Partial<ProcessingThreadsStats>) {
    Object.assign(this, props)
  }

  /**
   * Thread index
   */
  @PrimaryColumn_()
  id!: string

  @Column_("int4", {nullable: false})
  from!: number

  @Column_("int4", {nullable: true})
  to!: number | undefined | null

  @Column_("int4", {nullable: false})
  threadLastBlock!: number

  @Column_("int4", {nullable: false})
  threadProgress!: number

  @Column_("int4", {nullable: false})
  threadProcessedBlocksCount!: number
}
