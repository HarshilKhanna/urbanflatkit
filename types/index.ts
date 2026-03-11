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
  /**
   * Keys from `specs` to surface on the card line.
   * In order, max two will actually be shown.
   */
  cardSpecKeys?: string[];
  /**
   * If false, clicking the card should go straight to `externalUrl`
   * instead of opening the details modal.
   */
  hasModal?: boolean;
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
