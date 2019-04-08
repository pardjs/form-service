import { ApiModelProperty } from '@nestjs/swagger';

export class SubmitFormDto {
  @ApiModelProperty()
  readonly clientId: string;
  readonly token?: string;
  readonly [x: string]: any;
}
