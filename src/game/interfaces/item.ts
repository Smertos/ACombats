import { ItemType } from '../enums/item-type'
import { ItemStats } from './item-stats'

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
