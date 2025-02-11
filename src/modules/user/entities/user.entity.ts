import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @Column({ unique: true, length: 255 })
  email: string;

  @Column({ length: 20 })
  password: string;

  @Column({ length: 50 })
  role: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 20, nullable: true })
  number: string;

  @Column({ type: 'text', nullable: true })
  picture: string;

  @Column({ length: 100, nullable: true })
  countryName: string;
}