import { ReportData } from './components/card-analisys-details/card-analisys-details';

type VirusReportType = 'URL' | 'FILE' | 'WEB';

export interface IReportVirusData {
  type: VirusReportType;
  reportDetail: ReportData;
  user: string;
}
