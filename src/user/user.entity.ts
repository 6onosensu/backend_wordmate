import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { UserProfile } from './userProfile.entity';
import { UserWord } from './userWord.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 20 })
  password: string;

  @Column({ type: 'varchar', length: 50 })
  role: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @OneToOne(() => UserProfile, (userProfile) => userProfile.user, { cascade: true })
  @JoinColumn()
  profile: UserProfile;

  @OneToMany(() => UserWord, (userWord) => userWord.user)
  words: UserWord[];
}