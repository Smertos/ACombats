export enum ItemType {
  Head = 'head',
  Chestplate = 'chestplate',
  Gloves = 'gloves',
  Pants = 'pants',
  Boots = 'boots',
  Necklace = 'necklace',
  Ring = 'ring',
  Weapon = 'weapon'
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
  id: number,
  uid?: string,
  name: string,
  'type': ItemType,
  stats: ItemStats,  
  durability: number,
  price: number,
  color?: string  
}
