import { Injectable } from '@nestjs/common';

@Injectable()
export class DevConfigService {
  dbHost = 'localhost';
  getDbHost() {
    return this.dbHost;
  }
}
