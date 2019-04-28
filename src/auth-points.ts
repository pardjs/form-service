export enum FormServiceAuthPoints {
  CREATE_CONFIG = 'FORM_SERVICE-CREATE_CONFIG',
  REPLACE_CONFIG = 'FORM_SERVICE-REPLACE_CONFIG',
  FIND_CONFIGS = 'FORM_SERVICE-FIND_CONFIGS',
  FIND_ONE_CONFIG = 'FORM_SERVICE-FIND_ONE_CONFIG',
  REMOVE_CONFIG = 'FORM_SERVICE-REMOVE_CONFIG',
  FIND_CONFIG_RESPONSES = 'FORM_SERVICE-FIND_CONFIG_RESPONSES',
  CREATE_RESPONSE = 'FORM_SERVICE-CREATE_RESPONSE',
  REMOVE_RESPONSE = 'FORM_SERVICE-REMOVE_RESPONSE',
}

export const FormServiceAuthPointNames = {
  [FormServiceAuthPoints.CREATE_CONFIG]: 'create config',
  [FormServiceAuthPoints.REPLACE_CONFIG]: 'replace config',
  [FormServiceAuthPoints.FIND_CONFIGS]: 'find configs',
  [FormServiceAuthPoints.FIND_ONE_CONFIG]: 'find config by id',
  [FormServiceAuthPoints.REMOVE_CONFIG]: 'remove config',
  [FormServiceAuthPoints.FIND_CONFIG_RESPONSES]: 'find responses of config',
  [FormServiceAuthPoints.CREATE_RESPONSE]: 'create response',
  [FormServiceAuthPoints.REMOVE_RESPONSE]: 'remove response',
};
