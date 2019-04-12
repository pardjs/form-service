import { Module } from '@nestjs/common';

import { EnvService } from '.';

@Module({
  providers: [
    {
      provide: EnvService,
      useValue: new EnvService(`${process.env.NODE_ENV || 'development'}.env`),
    },
  ],
  exports: [EnvService],
})
export class EnvModule {}
