import { FormServiceAuthPointNames, FormServiceAuthPoints } from './auth-points';
import { Injectable } from '@nestjs/common';
import { PardjsUsersService } from '@pardjs/users-service-sdk';
import { logger } from '@pardjs/common';

@Injectable()
export class AppService {
  constructor(private readonly pardjsUsersService: PardjsUsersService) {
    if (!process.env.pm_id || parseInt(process.env.pm_id, 10) === 0) {
      const names = Object.values(FormServiceAuthPoints);
      const displayNames = Object.values(FormServiceAuthPointNames);
      this.pardjsUsersService.registerAuthPoints({
        authPoints: names.map((name, i) => {
          return { name, displayName: displayNames[i] };
        }),
      });
      logger.info('register auth points done.');
    }
  }
  getStatus(): string {
    return 'Hello World!';
  }
}
