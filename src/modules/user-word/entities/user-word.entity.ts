import { BaseEntityWithTimestamps } from "src/common/base.entity";
import { User } from "src/modules/user/entities/user.entity";
import { Word } from "src/modules/word/entities/word.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class UserWord extends BaseEntityWithTimestamps {
  @ManyToOne(() => User, { eager: true, onDelete: "CASCADE" })
  user: User;

  @ManyToOne(() => Word, {eager: true, onDelete: "CASCADE"})
  word: Word;

  @Column({ type: "varchar", length: 20 })
  status: string;

  @Column({  type: "timestamp", nullable: true })
  repetitionDate?: Date;

  @Column({ type: "int", default: 0 })
  repititionCount: number;
}