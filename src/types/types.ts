
export type RoomType = {
  _id: string;
  roomNumber: number | string;
  title: string;
  description: string;
  countReviews?: number;
  rate?: number;
  images?: Array<string>;
  price: number;
  type?: 'standard' | 'moderate' | 'deluxe'| 'suite';
  comforts?: Array<string>;
  bookings?: Array<string> | null;
  reviews?: Array<string> | null;
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
  name?: string;
  email?: string;
  phone?: string;
  paymentMethod?: string;
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
  role: 'user' | 'admin'  | string;
  gender: 'male' | 'female'| string ;
};

export type updateProfileInfo = {
  name: string;
};

export type SignInDataType = {
  email: string;
  password: string;
};

export type ReviewType = {
  _id?: string;
  content: string;
  rating: number;
  roomId: string;
  userId?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
};