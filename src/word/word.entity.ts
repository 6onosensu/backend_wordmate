import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import { Meaning } from './meaning.entity';

@Entity()
export class Word {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  word: string;

  @Column({nullable: true})
  audio: string;

  @Column()
  partOfSpeech: string;

  @OneToMany(() => Meaning, (meaning) => meaning.word, { cascade: true })
  meanings: Meaning[];
}
