export interface Item {
  id: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  imageUrl: string;
  externalUrl: string;
  externalLabel: string;
  specs: Record<string, string>;
}

export interface Room {
  items: Item[];
}

export interface Flat {
  rooms: Room[];
}

export interface Tower {
  flats: Flat[];
}
