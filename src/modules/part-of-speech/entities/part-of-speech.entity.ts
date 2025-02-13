import { BaseEntityWithTimestamps } from 'src/common/base.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class PartOfSpeech extends BaseEntityWithTimestamps {
  @Column({ length: 50, unique: true })
  title: string;
}