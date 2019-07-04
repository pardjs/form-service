import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  IsBoolean,
  IsByteLength,
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpsertConfigDto {
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
  @IsOptional()
  readonly responseSchema?: object;

  @ApiModelPropertyOptional({
    description:
      '用来控制显示的schema，包含显示的名称，以及数据的类型，如`String`,  `Email`, `Mobile`, `Text`, `Number`, `FILE`,`Image`, `Video`',
    example: {
      name: { title: '姓名', type: 'String' },
      contact: { title: '联系方式', type: 'Mobile' },
      message: { title: null, type: 'Text' },
    },
  })
  @IsOptional()
  readonly displaySchema?: object;

  @ApiModelPropertyOptional({
    description: '接收通知邮件的列表。',
    example: ['contact@yakefood.com', 'help@yakefood.com'],
  })
  @IsOptional()
  @IsEmail(
    {},
    {
      each: true,
    },
  )
  @ArrayMaxSize(100)
  readonly notifyMails?: string[];

  @ApiModelPropertyOptional({
    description: '是否使用邮件通知',
    example: true,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  readonly isNotifyByMail?: boolean;

  @ApiModelPropertyOptional({
    description: '是否强制验证，验证使用responseSchema进行验证。',
    example: true,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  readonly isValidateRequired?: boolean;

  @ApiModelPropertyOptional({
    description: '是否使用防机器人验证。',
    example: true,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  readonly isReCaptchaRequired?: boolean;

  @ApiModelPropertyOptional({
    description: '发件人名称',
    example: '合作联系通知',
  })
  @IsOptional()
  @IsByteLength(1, 15)
  @IsString()
  readonly senderName?: string;

  @ApiModelPropertyOptional({
    description: '发送邮件地址[需要再阿里云后台预先配置]。',
    example: 'contact@dozto.com',
  })
  @IsOptional()
  @IsEmail()
  // FIXME: USE env variable to config the enum values
  // FIXME: IsIn not working as expected.
  @IsIn(['contact@do021.com'])
  readonly senderEmail?: string;

  @ApiModelPropertyOptional({
    description: '发送邮件标题。',
    example: '联系通知邮件',
  })
  @IsOptional()
  @IsString()
  readonly mailTitle?: string;

  @ApiModelPropertyOptional({
    description: '邮件模版文件名[关于文档说明参见项目README部分]。',
    example: 'yake-contact-business.hbs',
  })
  @IsOptional()
  @Matches(/[A-Za-z0-9-_,s]+.hbs$/)
  readonly templateName?: string;
}
