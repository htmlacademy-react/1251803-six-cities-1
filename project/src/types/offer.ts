export type RoomImg = {
  src: string;
  alt: string;
}

export type Offer = {
  id: number;
  name: string;
  imgs: RoomImg[];
  isPremium: boolean;
  isMark: boolean;
  price: number;
  rating: number;
  type: string;
  bedroomsCount: number;
  adultsCount: number;
  location: string;
  features: string[];
}

export type Offers = Offer[];
