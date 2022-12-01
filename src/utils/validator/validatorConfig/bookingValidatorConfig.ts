import { ValidatorConfigType } from '../validator';
import { BookingType } from '../../../types/types'

type ConfigType = {
  [Property in keyof BookingType]?: ValidatorConfigType[Property];
};

const validatorConfig: ConfigType = {
  arrivalDate: {
    isValidDate: {
      message: 'Data is not correct',
    },
  },
  departureDate: {
    isValidDate: {
      message: 'Data is not correct',
    },
  },
};

export default validatorConfig;
