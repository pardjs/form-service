import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateConfigDto {
  @ApiModelProperty()
  readonly clientId: string;
  readonly token?: string;
  readonly [x: string]: any;
}
