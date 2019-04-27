import { InternalServerErrorException, HttpException } from '@nestjs/common';

export const ERRORS = {
  UNEXPECTED_ERROR: {
    type: 'UNEXPECTED_ERROR',
    message: {
      'zh-CN': '服务器发成了未知错误，请联系系统管理员。',
      'en-US':
        'There is an unexpected error happened. Please contact admin for help.',
    },
  },
};

export const httpErrorHandler = (error: any, lang = 'zh-CN') => {
  if (typeof error.message !== 'string') {
    const keys = Object.keys[error.message];
    error.message = error.message[lang] || error.message[keys[0]];
  }

  if (error.type) {
    // 如果 error 有 type 则认为是 pardjs error，为已知错误。
    throw new HttpException(error, error.status || 400);
  }
  throw new InternalServerErrorException(
    ERRORS.UNEXPECTED_ERROR,
    error.message,
  );
};
