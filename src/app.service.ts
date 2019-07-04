import { Injectable } from '@nestjs/common';
import { logger } from '@pardjs/common';
import { PardjsUsersService } from '@pardjs/users-service-sdk';
import {
  FormServiceAuthPointNames,
  FormServiceAuthPoints,
} from './auth-points';

@Injectable()
export class AppService {
  constructor(private readonly pardjsUsersService: PardjsUsersService) {
    if (
      (!process.env.pm_id || parseInt(process.env.pm_id, 10) === 0) &&
      process.env.PARDJS_USERS_SERVICE_BASE_URL
    ) {
      const names = Object.values(FormServiceAuthPoints);
      const displayNames = Object.values(FormServiceAuthPointNames);
      this.pardjsUsersService.registerAuthPoints({
        authPoints: names.map((name, i) => {
          return { name, displayName: displayNames[i] };
        }),
      });
      logger.info('register auth points done.');
    } else {
      logger.info('no need to register modules to users-service');
    }
  }
  getStatus(): string {
    return 'Hello World!';
  }
}
