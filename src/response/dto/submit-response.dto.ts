import { ApiModelProperty } from '@nestjs/swagger';

export class SubmitResponseDto {
  @ApiModelProperty()
  readonly configId: string;
  readonly token?: string;
  readonly [x: string]: any;
}
