export type RoomType = {
  _id: string;
  roomNumber: number | string;
  countReviews?: number;
  rate?: number;
  images?: Array<string>;
  price: number;
  type?: 'standard' | 'moderate' | 'deluxe'| 'suite';
  comforts?: Array<string>;
  bookings?: Array<string> | null;
  hasConditioner: boolean,
  hasWifi: boolean,
  hasWashingMachine: boolean,
  hasKitchen: boolean,
  hasWorkSpace: boolean,
  guestAllow: boolean,
  smokingAllow: boolean,
  animalAllow: boolean,
};
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
