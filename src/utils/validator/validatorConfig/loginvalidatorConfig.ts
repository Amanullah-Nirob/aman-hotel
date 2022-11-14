import { SignInDataType } from '../../../types/types';
import { ValidatorConfigType } from '../validator';

type ConfigType = {
  [Property in keyof SignInDataType]?: ValidatorConfigType[Property];
};

const loginvalidatorConfig: ConfigType = {
  email: {
    isRequired: {
      message: 'Email is required',
    },
    isEmail: {
      message: 'invalid email',
    },
  },
  password: {
    isRequired: {
      message: 'password required',
    },
  },
};

export default loginvalidatorConfig;
