// your.service.ts
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom, lastValueFrom } from 'rxjs';

require('dotenv').config();
@Injectable()
export class ApiService {
  constructor(private readonly httpService: HttpService) {}

  async getFromApi<T, P= unknown>(url:string, token: string, params?:P): Promise<T> {
    try {
      const response$ = this.httpService.get(process.env.URL_PREFIX + url, {
        headers: {
            Authorization: `Bearer ${token}`,
          },
      });
      const response = await firstValueFrom(response$);
      return response.data;
    } catch (error) {
      console.error('Error fetching from API:', error.message);
      throw error;
    }
  }
}
