import { BaseEntityWithTimestamps } from "src/common/base.entity";
import { PartOfSpeech } from "src/modules/part-of-speech/entities/part-of-speech.entity";
import { Word } from "src/modules/word/entities/word.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class Meaning extends BaseEntityWithTimestamps {
  @ManyToOne(() => PartOfSpeech, (partOfSpeech) => partOfSpeech.id, { eager: true, onDelete: 'CASCADE' })
  partOfSpeech: PartOfSpeech;

  @ManyToOne(() => Word, (word) => word.id, { eager: true, onDelete: 'CASCADE' })
  word: Word;

  @Column({ type: 'text' })
  definition: string;

  @Column({ type: 'json', nullable: true })
  synonymMeaningIds?: number[];

  @Column({ type: 'json', nullable: true })
  antonymMeaningIds?: number[];
}