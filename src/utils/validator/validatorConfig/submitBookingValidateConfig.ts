import { ValidatorConfigType } from '../validator';
import { BookingType } from '../../../types/types'

type ConfigType = {
  [Property in keyof BookingType]?: ValidatorConfigType[Property];
};

const submitBookingValidateConfig: ConfigType = {
    name: {
        isRequired: {
          message: 'Name is required',
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
    phone: {
        isRequired: {
          message: 'Phone Number is required',
        },
    },
};

export default submitBookingValidateConfig;
