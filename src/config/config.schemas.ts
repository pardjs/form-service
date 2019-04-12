import { ValidationSchema } from 'class-validator';

export const SCHEMAS: ValidationSchema[] = [
  {
    name: 'CREATE_CLIENT_SCHEMA',
    properties: {
      name: [
        {
          type: 'isString',
        },
        {
          type: 'minLength',
          constraints: [2],
        },
        {
          type: 'maxLength',
          constraints: [20],
        },
      ],
      notifyMails: [
        { type: 'isEmail', constraints: [], each: true },
        { type: 'arrayMaxSize', constraints: [100] },
      ],
      isNotifyByMail: [{ type: 'isBoolean' }],
      isValidateRequired: [{ type: 'isBoolean' }],
      senderName: [{ type: 'isString' }],
      senderEmail: [
        { type: 'isEmail', constraints: [] },
        {
          type: 'isIn',
          constraints: ['contact@dozto.com'],
        },
      ],
      templateName: [
        { type: 'matches', constraints: [/[A-Za-z0-9-_,s]+.hbs/g] },
      ],
    },
  },
];
