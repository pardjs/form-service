import * as dotenv from 'dotenv';
import * as fs from 'fs';

export class EnvService {
  private readonly envConfig: { [prop: string]: string };

  constructor(filePath: string) {
    this.envConfig = dotenv.parse(fs.readFileSync(filePath));
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
