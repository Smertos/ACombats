export enum ItemType {
  Head,
  Chestplate,
  Gloves,
  Pants,
  Boots,
  Necklace,
  Ring,
  Weapon
}

export interface ItemArmorStats {
  head?: number,
  chest?: number,
  belt?: number,
  legs?: number,
}

export interface ItemStats {
  health?: number,
  armor?: ItemArmorStats,
  damage?: number
}

export interface Item {
  name: string,
  'type': ItemType,
  stats: ItemStats,  
  durability: number,
  price: number
}
