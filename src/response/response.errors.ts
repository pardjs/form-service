export const ERRORS = {
  UNEXPECTED_ERROR: {
    type: 'UNEXPECTED_ERROR',
    message: {
      zh: '服务器发成了未知错误，请联系系统管理员。',
      en:
        'There is an unexpected error happened. Please contact admin for help.',
    },
  },
  INVALID_HUMAN: {
    type: 'NOT_VALID_HUMAN',
    message: {
      zh: '防机器人验证失败，请刷新页面后再试。',
      en: 'reCaptcha verification failed, please try again.',
    },
  },
  FORM_SUBMIT_INTERNAL_ERROR: {
    type: 'FORM_SUBMIT_INTERNAL_ERROR',
    message: {
      zh: '发成了内部错误，无法处理表单提交，请联系系统管理员获得帮助。',
      en:
        'There is an internal error happened, please contact system admin for help',
    },
    isSentry: true,
  },
};
