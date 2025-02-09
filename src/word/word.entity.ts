import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne} from 'typeorm';
import { Meaning } from '../meaning/meaning.entity';
import { User } from '../user/user.entity'; 

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

  @ManyToOne(() => User, (user) => user.words, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  userId: number;
}
