import { ApiModelProperty, ApiResponseModelProperty } from '@nestjs/swagger';

export class CreateClientResDto {
  @ApiResponseModelProperty({
    example: '1',
  })
  readonly id: string;
  @ApiResponseModelProperty({
    example: 'yLA6m0oM',
  })
  readonly hashId: string;
  @ApiResponseModelProperty({
    example: '雅客食品',
  })
  readonly name: string;
  @ApiResponseModelProperty({
    example: {
      name: 'contactForm',
      properties: {
        name: [
          { type: 'isString' },
          {
            type: 'minLength', // validation type. All validation types are listed in ValidationTypes class.
            constraints: [2],
          },
          {
            type: 'maxLength',
            constraints: [20],
          },
        ],
        email: [{ type: 'isEmail' }],
        content: [
          { type: 'isString' },
          {
            type: 'maxLength',
            constraints: [400],
          },
        ],
      },
    },
  })
  readonly responseSchema?: object;

  @ApiResponseModelProperty({
    example: ['contact@yakefood.com', 'reply@yakefood.com'],
  })
  readonly notifyMails?: string[];
  @ApiResponseModelProperty({
    example: true,
  })
  readonly isNotifyByMail?: boolean;
  @ApiResponseModelProperty({
    example: true,
  })
  readonly isValidateRequired?: boolean;
  @ApiResponseModelProperty({
    example: '通知邮件',
  })
  readonly senderName?: string;
  @ApiResponseModelProperty({
    example: 'contact@dozto.com',
  })
  readonly senderEmail?: string;
  @ApiResponseModelProperty({
    example: 'yake-contact-us.hbs',
  })
  readonly templateName?: string;

  @ApiResponseModelProperty({
    example: '2019-04-12T06:01:44.494Z',
  })
  readonly createdAt: Date;
  @ApiResponseModelProperty({
    example: '2019-04-12T06:01:44.494Z',
  })
  readonly updatedAt: Date;
}
