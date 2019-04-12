import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateClientDto {
  @ApiModelProperty()
  readonly clientId: string;
  readonly token?: string;
  readonly [x: string]: any;
}
