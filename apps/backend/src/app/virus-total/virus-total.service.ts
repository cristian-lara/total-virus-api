import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosError, AxiosResponse } from 'axios';
import { catchError, firstValueFrom, pipe } from 'rxjs';
import FormData from 'form-data';

@Injectable()
export class VirusTotalService {

  private readonly baseURL: string = 'https://www.virustotal.com/api/v3';
  private readonly apiKey: string = process.env.TOKEN_TOTAL_VIRUS;
  constructor(private readonly httpService: HttpService) {}

  // IpAdress
  async getIpAddressReport(ipAddress: string) {
    const urlEndpoint = `${this.baseURL}/ip_addresses/${ipAddress}`;
    const {data} = await firstValueFrom(
      this.httpService.get(urlEndpoint, {
        headers: {
          ...this.getRequestHeaders().headers,
          'Content-Type': 'application/json'
        }
      }).pipe(catchError((error: AxiosError) => {
        console.error(error.response.data);
        throw 'An error happened!';
      }),)
    )
    return data;
  }
  async getCommentsOnIpAddress(ipAddress: string): Promise<AxiosResponse> {
    const url = `${this.baseURL}/ip_addresses/${ipAddress}/comments`;
    return this.httpService.get(url, this.getRequestHeaders()).toPromise();
  }

  async addCommentToIpAddress(ipAddress: string, comment: string): Promise<AxiosResponse> {
    const url = `${this.baseURL}/ip_addresses/${ipAddress}/comments`;
    return this.httpService.post(url, { data: comment }, this.getRequestHeaders()).toPromise();
  }

  async getRelatedObjectsToIpAddress(ipAddress: string): Promise<AxiosResponse> {
    const url = `${this.baseURL}/ip_addresses/${ipAddress}/related`;
    return this.httpService.get(url, this.getRequestHeaders()).toPromise();
  }

  async getObjectDescriptorsRelatedToIpAddress(ipAddress: string): Promise<AxiosResponse> {
    const url = `${this.baseURL}/ip_addresses/${ipAddress}/object_relationships`;
    return this.httpService.get(url, this.getRequestHeaders()).toPromise();
  }

  async getVotesOnIpAddress(ipAddress: string): Promise<AxiosResponse> {
    const url = `${this.baseURL}/ip_addresses/${ipAddress}/votes`;
    return this.httpService.get(url, this.getRequestHeaders()).toPromise();
  }

  async addVoteToIpAddress(ipAddress: string, vote: 'harmless' | 'malicious'): Promise<AxiosResponse> {
    const url = `${this.baseURL}/ip_addresses/${ipAddress}/votes`;
    return this.httpService.post(url, { data: { vote } }, this.getRequestHeaders()).toPromise();
  }

  // Domains Resolutions
  async getDomainReport(domain: string): Promise<AxiosResponse> {
    const url = `${this.baseURL}/domains/${domain}`;
    return this.httpService.get(url, this.getRequestHeaders()).toPromise();
  }

  async getCommentsOnDomain(domain: string): Promise<AxiosResponse> {
    const url = `${this.baseURL}/domains/${domain}/comments`;
    return this.httpService.get(url, this.getRequestHeaders()).toPromise();
  }

  async addCommentToDomain(domain: string, comment: string): Promise<AxiosResponse> {
    const url = `${this.baseURL}/domains/${domain}/comments`;
    return this.httpService.post(url, { data: comment }, this.getRequestHeaders()).toPromise();
  }

  async getRelatedObjectsToDomain(domain: string): Promise<AxiosResponse> {
    const url = `${this.baseURL}/domains/${domain}/related`;
    return this.httpService.get(url, this.getRequestHeaders()).toPromise();
  }

  async getObjectDescriptorsRelatedToDomain(domain: string): Promise<AxiosResponse> {
    const url = `${this.baseURL}/domains/${domain}/object_relationships`;
    return this.httpService.get(url, this.getRequestHeaders()).toPromise();
  }

  async getDNSResolutionObject(domain: string): Promise<AxiosResponse> {
    const url = `${this.baseURL}/domains/${domain}/dns_resolutions`;
    return this.httpService.get(url, this.getRequestHeaders()).toPromise();
  }

  async getVotesOnDomain(domain: string): Promise<AxiosResponse> {
    const url = `${this.baseURL}/domains/${domain}/votes`;
    return this.httpService.get(url, this.getRequestHeaders()).toPromise();
  }

  async addVoteToDomain(domain: string, vote: 'harmless' | 'malicious'): Promise<AxiosResponse> {
    const url = `${this.baseURL}/domains/${domain}/votes`;
    return this.httpService.post(url, { data: { vote } }, this.getRequestHeaders()).toPromise();
  }

  // FILE
  async uploadFile(file: { fieldname: string,
    originalname: string,
    encoding: string,
    mimetype: string,
  buffer: Buffer}): Promise<AxiosResponse> {
    const urlEndpoint = `${this.baseURL}/files`;
    const formData = new FormData();
    formData.append('file', file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype,
    });
    const {data} = await firstValueFrom(
      this.httpService.post(urlEndpoint, formData,{
        headers: {
          ...this.getRequestHeaders().headers,
          'Content-Type': 'multipart/form-data'
        }
      }).pipe(catchError((error: AxiosError) => {
        console.error(error.response.data);
        throw 'An error happened!';
      }),)
    )
    return data;
  }
  async getUploadUrlForLargeFiles(): Promise<AxiosResponse> {
    const url = `${this.baseURL}/files/upload_url`;
    return this.httpService.get(url, this.getRequestHeaders()).toPromise();
  }

  async getFileReport(fileId: string): Promise<AxiosResponse> {
    const urlEndpoint = `${this.baseURL}/analyses/${fileId}`;
    const {data} = await firstValueFrom(
      this.httpService.get(urlEndpoint, {
        headers: {
          ...this.getRequestHeaders().headers,
          'Content-Type': 'application/json'
        }
      }).pipe(catchError((error: AxiosError) => {
        console.error(error.response.data);
        throw 'An error happened!';
      }),)
    )
    return data;
  }
  async getFileReport2(fileId: string): Promise<AxiosResponse> {
    const urlEndpoint = `${this.baseURL}/files/${fileId}`;
    const {data} = await firstValueFrom(
      this.httpService.get(urlEndpoint, {
        headers: {
          ...this.getRequestHeaders().headers,
          'Content-Type': 'application/json'
        }
      }).pipe(catchError((error: AxiosError) => {
        console.error(error.response.data);
        throw 'An error happened!';
      }),)
    )
    return data;
  }
  async requestFileRescan(fileId: string): Promise<AxiosResponse> {
    const url = `${this.baseURL}/files/${fileId}/analyse`;
    return this.httpService.post(url, null, this.getRequestHeaders()).toPromise();
  }

  async getFileDownloadUrl(fileId: string): Promise<AxiosResponse> {
    const url = `${this.baseURL}/files/${fileId}/download_url`;
    return this.httpService.get(url, this.getRequestHeaders()).toPromise();
  }

  async getCommentsOnFile(fileId: string): Promise<AxiosResponse> {
    const url = `${this.baseURL}/files/${fileId}/comments`;
    return this.httpService.get(url, this.getRequestHeaders()).toPromise();
  }

  async addCommentToFile(fileId: string, comment: string): Promise<AxiosResponse> {
    const url = `${this.baseURL}/files/${fileId}/comments`;
    return this.httpService.post(url, { data: comment }, this.getRequestHeaders()).toPromise();
  }

  async getRelatedObjectsToFile(fileId: string): Promise<AxiosResponse> {
    const url = `${this.baseURL}/files/${fileId}/related`;
    return this.httpService.get(url, this.getRequestHeaders()).toPromise();
  }

  async getObjectDescriptorsRelatedToFile(fileId: string): Promise<AxiosResponse> {
    const url = `${this.baseURL}/files/${fileId}/object_relationships`;
    return this.httpService.get(url, this.getRequestHeaders()).toPromise();
  }

  async getCrowdsourcedSigmaRule(fileId: string): Promise<AxiosResponse> {
    const url = `${this.baseURL}/files/${fileId}/sigma`;
    return this.httpService.get(url, this.getRequestHeaders()).toPromise();
  }

  async getCrowdsourcedYARARuleset(fileId: string): Promise<AxiosResponse> {
    const url = `${this.baseURL}/files/${fileId}/yara`;
    return this.httpService.get(url, this.getRequestHeaders()).toPromise();
  }

  async getVotesOnFile(fileId: string): Promise<AxiosResponse> {
    const url = `${this.baseURL}/files/${fileId}/votes`;
    return this.httpService.get(url, this.getRequestHeaders()).toPromise();
  }

  async addVoteToFile(fileId: string, vote: 'harmless' | 'malicious'): Promise<AxiosResponse> {
    const url = `${this.baseURL}/files/${fileId}/votes`;
    return this.httpService.post(url, { data: { vote } }, this.getRequestHeaders()).toPromise();
  }

  // URL
  async scanUrl(url: string) {
    const urlEndpoint = `${this.baseURL}/urls`; // Endpoint para escanear URL
    const {data} = await firstValueFrom(
      this.httpService.post(urlEndpoint, {url}, {
      headers: {
        ...this.getRequestHeaders().headers,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).pipe(catchError((error: AxiosError) => {
        console.error(error.response.data);
        throw 'An error happened!';
      }),)
    )
    return data;
  }

  async getUrlAnalysisReport(resource: string): Promise<AxiosResponse> {
    const urlEndpoint = `${this.baseURL}/analyses/${resource}`;
    const {data} =  await firstValueFrom(
      this.httpService.get(urlEndpoint,  this.getRequestHeaders() )
        .pipe(
          catchError((error) => {
            console.error('Error:', error.response?.data || error.message);
            throw new BadRequestException({ error });
          })
        )
    );
    return data;
  }

  async requestUrlRescan(resource: string): Promise<AxiosResponse> {
    const urlEndpoint = `${this.baseURL}/urls/${encodeURIComponent(resource)}/analyse`;
    return this.httpService.post(urlEndpoint, null, this.getRequestHeaders()).toPromise();
  }

  async getCommentsOnUrl(resource: string): Promise<AxiosResponse> {
    const urlEndpoint = `${this.baseURL}/urls/${encodeURIComponent(resource)}/comments`;
    return this.httpService.get(urlEndpoint, this.getRequestHeaders()).toPromise();
  }

  async addCommentToUrl(resource: string, comment: string): Promise<AxiosResponse> {
    const urlEndpoint = `${this.baseURL}/urls/${encodeURIComponent(resource)}/comments`;
    return this.httpService.post(urlEndpoint, { data: comment }, this.getRequestHeaders()).toPromise();
  }

  async getRelatedObjectsToUrl(resource: string): Promise<AxiosResponse> {
    const urlEndpoint = `${this.baseURL}/urls/${encodeURIComponent(resource)}/related`;
    return this.httpService.get(urlEndpoint, this.getRequestHeaders()).toPromise();
  }

  async getObjectDescriptorsRelatedToUrl(resource: string): Promise<AxiosResponse> {
    const urlEndpoint = `${this.baseURL}/urls/${encodeURIComponent(resource)}/object_relationships`;
    return this.httpService.get(urlEndpoint, this.getRequestHeaders()).toPromise();
  }

  async getVotesOnUrl(resource: string): Promise<AxiosResponse> {
    const urlEndpoint = `${this.baseURL}/urls/${encodeURIComponent(resource)}/votes`;
    return this.httpService.get(urlEndpoint, this.getRequestHeaders()).toPromise();
  }

  async addVoteToUrl(resource: string, vote: 'harmless' | 'malicious'): Promise<AxiosResponse> {
    const urlEndpoint = `${this.baseURL}/urls/${encodeURIComponent(resource)}/votes`;
    return this.httpService.post(urlEndpoint, { data: { vote } }, this.getRequestHeaders()).toPromise();
  }
  private getRequestHeaders() {
    return {
      headers: { 'X-Apikey': this.apiKey },
    };
  }
}
