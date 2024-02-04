import { ReportVirusEntity } from '../app/report-virus/report-virus.entity';
import { UserEntity } from '../app/user/user.entity';

const userEntities = [UserEntity];

const reportVirusEntities = [ReportVirusEntity];

enum VirusReportType {
  URL = "URL",
  FILE = "FILE",
  WEB = "WEB",
}

export {
  userEntities,
  VirusReportType,
  reportVirusEntities
}
