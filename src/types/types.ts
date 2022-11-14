
export type BookingType = {
  _id?: string;
  adults: number;
  babies: number;
  children: number;
  arrivalDate: Date;
  departureDate: Date;
  roomId: string;
  userId: string;
  totalPrice: number;
  expires_at?: number;
};

export type UserType = {
  _id?: string;
  firstName: string;
  secondName: string;
  subscribe?: boolean;
  birthYear: Date | number;
  avatarPhoto?: string;
  email?: string;
  password?: string;
  role: 'user' | 'admin';
  gender: 'male' | 'female';
};

export type SignInDataType = {
  email: string;
  password: string;
};
