import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { VirusReportType } from '../../constants/constants';
import { BaseEntity } from '../../util/base.entity';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'Report_Virus' })
export class ReportVirusEntity extends BaseEntity {
  @Column({
    type: 'enum',
    enum: ['URL', 'FILE', 'WEB'],
    enumName: 'virus_type'
  })
  type: VirusReportType;

  @Column({
    type: 'jsonb',
    name: 'report_detail',
    nullable: false
  })
  reportDetail: any;

  @ManyToOne(() => UserEntity, user => user.reportViruses)
  user: UserEntity;
}
