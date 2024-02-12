import { useMutation, useQuery, UseMutationResult, UseQueryResult } from 'react-query';
import axios from 'axios';
import { IReportVirusData } from '../constants';
import { IReportIPVirusData } from '../../types';

interface ScanData {
  url: string;
}

interface ReportData {
  idAnalysis: string;
}
const urlBackend = 'http://localhost:3000'
// const urlBackend = 'https://app-scan.manticore-labs.com'

const scanUrl = async (data: ScanData): Promise<any> => {
  const { url } = data;
  const response = await axios.post(urlBackend +'/urls/scan', { url });
  return response.data;
};

const getUrlReport = async (idAnalysis: string): Promise<any> => {
  const response = await axios.get(`${urlBackend}/urls/report/${idAnalysis}`);
  return response.data;
};

export const useScanUrl = (): UseMutationResult<any, unknown, ScanData, unknown> => {
  return useMutation(scanUrl);
};

export const findOrCreateUser = async (idAuth0: string, email:string) => {
  const response = await axios.post(urlBackend+'/user/find-or-create', {
    idAuth0,
    email,
  });
  return response.data;
};

export const useGetUrlReport = (idAnalysis: string, isEnabled: boolean): UseQueryResult<any, unknown> => {
  return useQuery(['report', idAnalysis], () => getUrlReport(idAnalysis), {
    enabled: isEnabled,
  });
};


export const saveReportVirus = async (reportDetails: IReportVirusData) => {
  try {
    const response = await axios.post(`${urlBackend}/report-virus`, reportDetails);
    return response.data;
  } catch (error) {
    console.error('Error saving the report:', error);
    throw error;
  }
};

export const fetchReportsByUser = async (userId: string): Promise<IReportVirusData[]> => {
  const { data } = await axios.get(`${urlBackend}/report-virus/user/${userId}`);
  return data;
};

export const fetchReportbyIp = async (ip: string): Promise<IReportIPVirusData> => {
  const { data } = await axios.get(`${urlBackend}/virus-total/ip/${ip}`);
  return data.data;
};

export const useGetIpReport = (ip: string, isEnabled: boolean): UseQueryResult<any, unknown> => {
  return useQuery(['report-ip', ip], () => fetchReportbyIp(ip), {
    enabled: isEnabled,
  });
};
