import { BaseEntityWithTimestamps } from 'src/common/base.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class Word extends BaseEntityWithTimestamps {
  @Column({ length: 255, unique: true })
  word: string;

  @Column({ type: 'text', nullable: true })
  audio?: string;
}
