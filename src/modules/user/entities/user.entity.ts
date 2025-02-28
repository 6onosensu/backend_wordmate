import { Entity, Column } from 'typeorm';
import { BaseEntityWithTimestamps } from 'src/common/base.entity';

@Entity()
export class User extends BaseEntityWithTimestamps {
  @Column({ unique: true, length: 255 })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 20, nullable: true })
  number?: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  countryName?: string;

  @Column({ type: 'text', nullable: true })
  pictureUrl?: string;
}