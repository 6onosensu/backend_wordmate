import { Entity, Column, } from 'typeorm';

@Entity()
export class Word {
  @Column()
  word: string;

  @Column({nullable: true})
  audio: string;
}
