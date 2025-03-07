import { BaseEntityWithTimestamps } from "src/common/base.entity";
import { Meaning } from "src/modules/meaning/entities/meaning.entity";
import { Status } from "src/modules/status/entities/status.entity";
import { User } from "src/modules/user/entities/user.entity";
import { Column, Entity, ManyToOne, Unique } from "typeorm";

@Entity()
@Unique(['user', 'meaning']) 
export class UserWord extends BaseEntityWithTimestamps {
  @ManyToOne(() => User, { eager: true, onDelete: "CASCADE" })
  user: User;

  @ManyToOne(() => Meaning, { eager: true, onDelete: "CASCADE" })
  meaning: Meaning;

  @ManyToOne(() => Status, { eager: true, onDelete: "CASCADE" })
  status: Status; 

  @Column({  type: "timestamp", nullable: true })
  repetitionDate?: Date;

  @Column({ type: "bool" })
  due?: boolean;

  @Column({ type: "int", default: 0 })
  repetitionCount: number;
}