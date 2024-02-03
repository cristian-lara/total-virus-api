import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity as TypeORMBaseEntity,
} from 'typeorm';

export abstract class BaseEntity extends TypeORMBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updatedAt: Date;
}
