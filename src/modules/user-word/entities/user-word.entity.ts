import { BaseEntityWithTimestamps } from "src/common/base.entity";
import { Meaning } from "src/modules/meaning/entities/meaning.entity";
import { User } from "src/modules/user/entities/user.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class UserWord extends BaseEntityWithTimestamps {
  @ManyToOne(() => User, { eager: true, onDelete: "CASCADE" })
  user: User;

  @ManyToOne(() => Meaning, { eager: true, onDelete: "CASCADE" })
  meaning: Meaning;

  @Column({ type: "varchar", length: 20 })
  status: string;

  @Column({  type: "timestamp", nullable: true })
  repetitionDate?: Date;

  @Column({ type: "int", default: 0 })
  repetitionCount: number;
}