import { Controller, Body, Post, Get, HttpStatus, Param } from '@nestjs/common';
import { SubmitResponseDto } from './dtos/submit-response.dto';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';
import { SubmitResponseResDto } from './dtos/submit-response-res.dto';
import { ErrorResDto } from './dtos/error-res.dot';
import { logger } from '@pardjs/common';

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
  @Get('clients/:clientId/responses')
  async getRecords(@Param('clientId') clientId: string): Promise<any> {
    return await this.responseService.findAllById(clientId);
  }
}
