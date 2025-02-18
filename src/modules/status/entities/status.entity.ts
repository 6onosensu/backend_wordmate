import { BaseEntityWithTimestamps } from 'src/common/base.entity';
import { Column, Entity} from 'typeorm';

@Entity()
export class Status extends BaseEntityWithTimestamps {
  @Column({ type: "varchar", length: 20, unique: true })
  status: string;
}
