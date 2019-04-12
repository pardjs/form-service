import { ApiModelProperty } from '@nestjs/swagger';

export class SubmitResponseDto {
  @ApiModelProperty()
  readonly clientId: string;
  readonly token?: string;
  readonly [x: string]: any;
}
