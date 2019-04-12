import { Controller, Body, Post, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';

import { logger } from '@pardjs/common';

import { ErrorResDto, SubmitResponseDto, SubmitResponseResDto } from './dto';
import { ResponseService } from '.';

@Controller('api')
@ApiUseTags('Response')
export class ResponseController {
  constructor(private readonly responseService: ResponseService) {}
  @Post('/responses')
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: SubmitResponseResDto,
  })
  async submit(
    @Body() data: SubmitResponseDto,
  ): Promise<SubmitResponseResDto | ErrorResDto | any> {
    logger.debug('submit form', data);
    const sendRes = await this.responseService.submit(data);
    return {
      status: 'success',
      data: sendRes,
    };
  }
  @Get('configs/:configId/responses')
  async getRecords(@Param('configId') configId: string): Promise<any> {
    return await this.responseService.findAllById(configId);
  }
}
