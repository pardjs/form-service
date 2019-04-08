import { ApiModelProperty } from '@nestjs/swagger';

enum Status {
  success,
  error,
}

export class SubmitFormResDto {
  @ApiModelProperty({
    type: Status,
    enum: Status,
    description: '',
    example: '',
  })
  status: Status;
  readonly clientId: string;
  readonly token?: string;
  readonly [x: string]: any;
}
