
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
