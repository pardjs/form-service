import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  ArrayMaxSize,
  IsBoolean,
  IsIn,
  Matches,
} from 'class-validator';

export class CreateClientDto {
  @ApiModelProperty({
    description: '名称标识。',
    example: '雅客食品',
    minLength: 2,
    maxLength: 20,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  readonly name: string;

  @ApiModelPropertyOptional({
    description:
      '表单验证Schema，参见`class-validator`的`validation schema`说明。',
    example: {
      name: '321',
      properties: {
        name: [
          {
            type: 'isString',
          },
        ],
      },
    },
  })
  readonly responseSchema?: object;

  @ApiModelPropertyOptional({
    description: '接收通知邮件的列表。',
    example: ['contact@yakefood.com', 'help@yakefood.com'],
  })
  @IsEmail(null, {
    each: true,
  })
  @ArrayMaxSize(100)
  readonly notifyMails?: string[];

  @ApiModelPropertyOptional({
    description: '是否使用邮件通知',
    example: true,
    default: false,
  })
  @IsBoolean()
  readonly isNotifyByMail?: boolean;

  @ApiModelPropertyOptional({
    description: '是否强制验证，验证使用responseSchema进行验证。',
    example: true,
    default: false,
  })
  @IsBoolean()
  readonly isValidateRequired?: boolean;

  @ApiModelPropertyOptional({
    description: '发件人名称',
    example: '合作联系通知',
  })
  @IsString()
  readonly senderName?: string;

  @ApiModelPropertyOptional({
    description: '发送邮件地址[需要再阿里云后台预先配置]。',
    example: 'contact@dozto.com',
  })
  @IsEmail()
  // FIXME: USE env variable to config the enum values
  // FIXME: IsIn not working as expected.
  @IsIn(['contact@do021.com'])
  readonly senderEmail?: string;

  @ApiModelPropertyOptional({
    description: '邮件模版文件名[关于文档说明参见项目README部分]。',
    example: 'yake-contact-business.hbs',
  })
  @Matches(/[A-Za-z0-9-_,s]+.hbs$/)
  readonly templateName?: string;
}
