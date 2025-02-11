import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ 
    type: 'varchar', 
    length: 255 
  })
  name: string;

  @Column({ 
    type: 'varchar', 
    length: 255, unique: true 
  })
  email: string;

  @Column({ 
    type: 'varchar', 
    length: 20 
  })
  password: string;

  @Column({ 
    type: 'varchar', 
    length: 50 
  })
  role: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  //@OneToMany(() => UserWord, (userWord) => userWord.user)
  //words: UserWord[];
}