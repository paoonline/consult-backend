/* eslint-disable @typescript-eslint/no-unused-vars */
// your.service.ts
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

import 'dotenv/config';
@Injectable()
export class ApiService {
  constructor(private readonly httpService: HttpService) {}

  async getFromApi<T, P = unknown>(
    url: string,
    token: string,
    params?: P,
  ): Promise<T> {
    try {
      const response$ = this.httpService.get<T>(process.env.URL_PREFIX + url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const response = await firstValueFrom(response$);
      return response.data;
    } catch (error) {
      console.error('Error fetching from API:', (error as Error).message);
      throw error;
    }
  }

  async postApi<T, P = unknown>(
    url: string,
    token: string,
    body?: P,
  ): Promise<T> {
    try {
      const response$ = this.httpService.post<T>(
        process.env.URL_PREFIX + url,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const response = await firstValueFrom(response$);
      return response.data;
    } catch (error) {
      console.error('Error fetching from API:', (error as Error).message);
      throw error;
    }
  }
}
