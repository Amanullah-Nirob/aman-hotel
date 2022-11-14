import { BookingType } from '../../../types/types';
import { ValidatorConfigType } from '../validator'

type ConfigType = {
  [Property in keyof BookingType]?: ValidatorConfigType[Property];
};

const roomSearchValidatorConfig: ConfigType = {
  arrivalDate: {
    isValidDate: {
      message: 'Date is not correct',
    }, 
  },
  departureDate: {
    isValidDate: {
      message: 'Date is not correct',
    },
  },
  adults: {
    min: {
      message: 'Number of adult guests minimum 1 adult',
      value: 2,
    },
  },
};

export default roomSearchValidatorConfig;
