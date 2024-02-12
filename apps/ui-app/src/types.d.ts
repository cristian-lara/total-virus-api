interface IAnalysisResults {
  method: string;
  engine_name: string;
  category: string;
  result: string;
}

interface IAnalysisStats {
  malicious: number;
  suspicious: number;
  undetected: number;
  harmless: number;
  timeout: number;
}

interface IReportVirusDataAttributes {
  whois: string;
  tags: string[];
  last_modification_date: number;
  last_analysis_stats: IAnalysisStats;
  last_analysis_date: number;
  network: string;
  last_analysis_results: { [key: string]: IAnalysisResults };
  whois_date: number;
  asn: number;
  total_votes: {
    harmless: number;
    malicious: number;
  };
  as_owner: string;
  country: string;
  continent: string;
  regional_internet_registry: string;
  reputation: number;
}

export interface IReportIPVirusData {
  attributes: IReportVirusDataAttributes;
}
