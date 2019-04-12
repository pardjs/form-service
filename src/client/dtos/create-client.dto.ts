import { ApiModelProperty } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiModelProperty()
  readonly name: string;
  readonly responseSchema?: object;
  readonly notifyMails?: string[];
  readonly isNotifyByMail?: boolean;
  readonly isValidateRequired?: boolean;
  readonly senderName?: string;
  readonly senderEmail?: string;
  readonly templateName?: string;
}
