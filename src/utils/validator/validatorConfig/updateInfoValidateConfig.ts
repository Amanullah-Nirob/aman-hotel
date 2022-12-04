import { updateProfileInfo } from '../../../types/types';
import { ValidatorConfigType } from '../validator'

type ConfigType = {
  [Property in keyof updateProfileInfo]?: ValidatorConfigType[Property];
};

const updateInfoValidateConfig: ConfigType = {
    name: {
        isRequired: {
          message: 'Name required',
        },
    },
};

export default updateInfoValidateConfig;