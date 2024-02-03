import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../util/base.entity';

@Entity({name: 'User'})
export class UserEntity extends BaseEntity {
  @Column({type: 'varchar', name:'id_auth0', unique: true})
  idAuth0: string;

  @Column({ unique: true, type:'varchar', name:'email' })
  email: string;

}
