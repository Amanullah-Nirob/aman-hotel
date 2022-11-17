import { UserType } from '../../../types/types';
import { ValidatorConfigType } from '../validator';

type ConfigType = {
  [Property in keyof UserType]?: ValidatorConfigType[Property];
};

const registerValidatorConfig: ConfigType = {
  firstName: {
    isRequired: {
      message: 'first Name required',
    },
  },
  secondName: {
    isRequired: { 
      message: 'Last Name required',
    },
  },
  email: {
    isRequired: {
      message: 'email required',
    },
    isEmail: {
      message: 'invalid email address',
    },
  },
  password: {
    isRequired: {
      message: 'password required',
    },
    isCapitalSymbol: {
      message: 'Password must contain at least 1 capital letter',
    },
    isContainDigit: {
      message: 'Password must contain at least 1 number',
    },

    min: {
      value: 8,
      message: 'Password must contain at least 8 characters',
    },
  },
  
};

export default registerValidatorConfig;