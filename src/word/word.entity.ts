import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';

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
/*
  @OneToMany(())
  meanings: Meaning[];*/
}
