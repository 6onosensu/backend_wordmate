import { BaseEntityWithTimestamps } from 'src/common/base.entity';
import { Entity, Column} from 'typeorm';

@Entity('goal')
export class Goal extends BaseEntityWithTimestamps {
  @Column({ type: 'varchar', length: 100 })
  goal: string;
}