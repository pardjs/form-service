import { ApiResponseModelProperty } from '@nestjs/swagger';

interface MailResponse {
  EnvId: string;
  RequestId: string;
}

export class ResponseResDto {
  @ApiResponseModelProperty({
    example: 'a473c653-3e4a-49b4-bb0d-9f901f653294',
  })
  id: string;

  @ApiResponseModelProperty({
    example: 3,
  })
  config: number;

  @ApiResponseModelProperty({
    example: { name: 'clientName', age: '12', hobby: 'footbal' },
  })
  content: object;

  @ApiResponseModelProperty({
    example: {
      EnvId: '17870283378841038637',
      RequestId: '539B358B-1B22-4BBD-96D7-E6C6D58FE395',
    },
  })
  emailRes?: MailResponse;

  @ApiResponseModelProperty({
    example: '2019-04-12T06:01:44.494Z',
  })
  readonly createdAt: Date;
  @ApiResponseModelProperty({
    example: '2019-04-12T06:01:44.494Z',
  })
  readonly updatedAt: Date;
}
