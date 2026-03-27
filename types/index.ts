export interface Item {
  id: string
  name: string
  brand: string
  category: "Furniture" | "Lighting" | "Decor" | "Textiles" | "Appliances"
  imageUrl: string
  externalUrl: string
  specs: Record<string, string>
  cardSpecKeys: string[]
  displayPosition?: number
  projectId?: string
}

export interface Project {
  id: string
  name: string
  slug: string
  description?: string
  isActive: boolean
  adminUsername: string
  adminPassword: string
  createdAt: Date
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
