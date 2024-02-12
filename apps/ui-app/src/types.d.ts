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


export interface AnalysisResponseUpload {
  data: {
    id: string;
  };
}
// file
export interface AnalysisResponseFile {
  data: {
    id: string;
    type: string;
    links: {
      self: string;
      item: string;
    };
    attributes: {
      date: number;
      stats:  {
        malicious: number;
        suspicious: number;
        undetected: number;
        harmless: number;
        timeout: number;
        "confirmed-timeout": number;
        failure: number;
        "type-unsupported": number;
      };
      status: string;
      results: {
        [key: string]:  {
          method: string;
          engine_name: string;
          engine_version: string;
          engine_update: string;
          category: string;
          result: null | string;
        };
      };
    };
  };
  meta: {
    file_info: {
      sha256: string;
      md5: string;
      sha1: string;
      size: number;
    };
  };
}
// details
interface EngineAnalysisResultDetails {
  method: string;
  engine_name: string;
  engine_version: string;
  engine_update: string;
  category: string;
  result: null | string;
}

interface SandboxVerdictDetails {
  category: string;
  confidence: number;
  sandbox_name: string;
  malware_classification: string[];
}

interface BundleInfoDetails {
  highest_datetime: string;
  lowest_datetime: string;
  num_children: number;
  extensions: Record<string, number>;
  file_types: Record<string, number>;
  type: string;
  uncompressed_size: number;
}

interface TridDetails {
  file_type: string;
  probability: number;
}

interface FileAttributesDetails {
  sandbox_verdicts: Record<string, SandboxVerdictDetails>;
  last_submission_date: number;
  type_extension: string;
  total_votes: {
    harmless: number;
    malicious: number;
  };
  tags: string[];
  bundle_info: BundleInfoDetails;
  times_submitted: number;
  last_analysis_results: Record<string, EngineAnalysisResultDetails>;
  reputation: number;
  ssdeep: string;
  type_description: string;
  sha1: string;
  size: number;
  first_submission_date: number;
  type_tags: string[];
  last_analysis_stats: {
    malicious: number;
    suspicious: number;
    undetected: number;
    harmless: number;
    timeout: number;
    "confirmed-timeout": number;
    failure: number;
    "type-unsupported": number;
  };
  type_tag: string;
  names: string[];
  magic: string;
  trid: TridDetails[];
  meaningful_name: string;
  last_analysis_date: number;
  tlsh: string;
  last_modification_date: number;
  vhash: string;
  md5: string;
  sha256: string;
  unique_sources: number;
}

interface FileDataDetails {
  id: string;
  type: string;
  links: {
    self: string;
    item: string;
  };
  attributes: FileAttributesDetails;
}

interface FileInfoDetails {
  sha256: string;
  md5: string;
  sha1: string;
  size: number;
}

interface FileMetaDetails {
  file_info: FileInfoDetails;
}

export interface FileAnalysisDetailsResponse {
  data: FileDataDetails;
  meta: FileMetaDetails;
}
