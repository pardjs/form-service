import { ApiModelProperty } from '@nestjs/swagger';

interface ErrorRes {
  type?: string;
  message: string;
  code?: number;
  stack: object;
}

export class ErrorResDto {
  @ApiModelProperty({
    description: '',
    example: '',
  })
  error: ErrorRes;
}
