import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ProxyService {
  async fetchData(url: string) {
    try {
      const response = await axios.get(url, {
        proxy: {
          host: '45.196.48.9',
          port: 5435,
          auth: {
            username: 'jtzhwqur',
            password: 'jnf0t0n2tecg',
          },
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Something went wrong..`);
    }
  }
}
