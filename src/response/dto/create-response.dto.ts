import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class CreateResponseDto {
  @ApiModelProperty({
    description: '提交的config标识[使用config的`hashId`]',
    example: 'yLA6m0oM',
  })
  readonly id: string;

  @ApiModelPropertyOptional({
    description: 'reCaptcha 前端生成的token，用作机器人检测。',
    example: '',
  })
  readonly token?: string;

  readonly [x: string]: any;
}
