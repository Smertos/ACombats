export enum ItemType {
  Head,
  Chestplate,
  Gloves,
  Pants,
  Boots,
  Jewelry,
  Ring,
  Weapon
}

export interface ItemArmorStats {
  head?: number,
  body?: number,
  legs?: number,
  boots?: number
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
  durability: number
}
