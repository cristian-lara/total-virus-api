import { useMutation, useQuery, UseMutationResult, UseQueryResult } from 'react-query';
import axios from 'axios';

interface ScanData {
  url: string;
}

interface ReportData {
  idAnalysis: string;
}
const urlBackend = 'http://186.101.189.34:8085'

const scanUrl = async (data: ScanData): Promise<any> => {
  const { url } = data;
  const response = await axios.post(urlBackend +'/api/urls/scan', { url });
  return response.data;
};

const getUrlReport = async (idAnalysis: string): Promise<any> => {
  const response = await axios.get(`${urlBackend}/api/urls/report/${idAnalysis}`);
  return response.data;
};

export const useScanUrl = (): UseMutationResult<any, unknown, ScanData, unknown> => {
  return useMutation(scanUrl);
};

export const useGetUrlReport = (idAnalysis: string, isEnabled: boolean): UseQueryResult<any, unknown> => {
  return useQuery(['report', idAnalysis], () => getUrlReport(idAnalysis), {
    enabled: isEnabled,
  });
};
