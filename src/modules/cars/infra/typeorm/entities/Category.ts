import {Column, CreateDateColumn, Entity, PrimaryColumn} from "typeorm";
import {v4 as uuidV4} from 'uuid'

@Entity("categories")
class Category {
  @PrimaryColumn()
  id?: String

  @Column()
  name: string

  @Column()
  description: string

  @CreateDateColumn()
  created_at: Date

  constructor() {
    if(!this.id) {
      this.id = uuidV4()
    }
  }
}

export {Category}
