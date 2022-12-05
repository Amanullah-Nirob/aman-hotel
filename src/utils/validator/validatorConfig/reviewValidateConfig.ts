import { ValidatorConfigType } from '../validator';
import { ReviewType } from '../../../types/types'

type ConfigType = {
  [Property in keyof ReviewType]?: ValidatorConfigType[Property];
};

const reviewValidateConfig: ConfigType = {
    content: {
        isRequired: { message: 'The "Message" field must not be empty' },
    },
};

export default reviewValidateConfig;