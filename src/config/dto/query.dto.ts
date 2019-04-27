import { ApiModelPropertyOptional } from '@nestjs/swagger';

export class QueryDto {
  @ApiModelPropertyOptional({
    description: '查询的结果返回的数量',
    example: '10',
  })
  readonly limit: number;

  @ApiModelPropertyOptional({
    description: '查询的结果跳过的结果数量',
    example: '0',
  })
  readonly offset?: number;
}
