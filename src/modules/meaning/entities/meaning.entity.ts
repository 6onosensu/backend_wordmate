import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Word } from 'src/modules/word/entities/word.entity';

@Entity()
export class Meaning {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  definition: string;

  @Column("text", { array: true, nullable: true  })
  synonyms: string[];

  @Column("text", { array: true, nullable: true  })
  antonyms: string[];

  @ManyToOne(() => Word, (word) => word.meanings, { onDelete: "CASCADE" })
  word: Word;

  @Column()
  userId: number;
}