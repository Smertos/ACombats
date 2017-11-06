import { ItemStats } from './item-stats'
import { ItemType } from '../enums/item-type'

export interface ItemInfo {
  id:         number,
  uid?:       string,
  name:       string,
  'type':     ItemType,
  stats:      ItemStats,  
  durability: number,
  price:      number
}
