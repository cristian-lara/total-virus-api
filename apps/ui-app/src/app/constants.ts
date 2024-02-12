import { ReportData } from './components/card-analisys-details/card-analisys-details';
import { FileAnalysisDetailsResponse } from '../types';
import { format } from 'date-fns';


type VirusReportType = 'URL' | 'FILE' | 'WEB';

export interface IReportVirusData {
  type: VirusReportType;
  reportDetail: ReportData | FileAnalysisDetailsResponse | any;
  user: string;
  id?: string;
  createdAt?: string;
  urlSearch: string;
}

export const formatDateCustom = (dateString: string) => {
  const date = new Date(dateString);
  return format(date, "EEEE d MMMM yyyy");
};
