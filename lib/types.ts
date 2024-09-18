export type Hotels = {
  id: string;
  userId: string;
  starRating: string;
  title: string;
  description: string;
  image: string;
  country: string;
  state: string;
  city: string;
  locationDescription: string;
  gym: boolean;
  spa: boolean;
  bar: boolean;
  laundry: boolean;
  restaurant: boolean;
  shopping: boolean;
  freeParking: boolean;
  bikeRental: boolean;
  freeWifi: boolean;
  movieNights: boolean;
  swimmingPool: boolean;
  coffeeShop: boolean;
  createdAt: string;
  updatedAt: string;
  rooms?: Rooms[]; // Optional array of rooms
};

export type Rooms = {
  created_at: string;

  id: string;
  hotelId: string;
  title: string;
  description: string;
  bedCount: number;
  guestCount: number;
  bathroomCount: number;
  kingBed: number;
  queenBed: number;
  image: string;
  breakfastPrice: number;
  roomPrice: number;
  roomService: boolean;
  TV: boolean;
  balcony: boolean;
  freeWifi: boolean;
  cityView: boolean;
  oceanView: boolean;
  forestView: boolean;
  mountainView: boolean;
  airConditions: boolean;
  soundProofed: boolean;
  hotel?: Hotels; // Optional reference to the parent hotel
};

export type Booking = {
  id: string;
  userName: string;
  userEmail: string;
  userId: string;
  hotelId: string;
  roomId: string;
  hotelOwnerId: string;
  startDate: string;
  endDate: string;
  breakfastIncluded: boolean;
  currency: string;
  totalPrice: number;
  paymentStatus: boolean;
  paymentIntentId: string;
  created_at: string;
  hotel?: Hotels; // Optional reference to the booked hotel
  room?: Rooms; // Optional reference to the booked room
};

export type HotelWithRooms = Hotels & {
  rooms: Rooms[];
};

export interface Errors {
  title?: string;
  description?: string;
  locationDescription?: string;
  image?: string;
  country?: string;
  unAuth?: string;
  success?: boolean;
  redirectUrl?: string;
  starRating?: string;
}

export type DeleteHotelState = {
  success: boolean | null;
  redirectUrl: string;
};

export interface ErrorRoom {
  title?: string;
  description?: string;
  image?: string;
  roomPrice?: string;
  bedCount?: string;
  guestCount?: string;
  breakFastPrice?: string;
  bathroomCount?: string;
  kingBed?: string;
  queenBed?: string;
  success?: boolean;
}

export type SearchParamsProps = {
  searchParams: {
    query: string;
    display: string;
    country: string;
    cities: string;
    page: string;
    rating: string;
    states: string;
  };
};
