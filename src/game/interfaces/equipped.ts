import { Item } from './item'

export interface Equipped {
  helmet?:     Item,
  chestplate?: Item,
  pants?:      Item,
  boots?:      Item,
  necklace?:   Item,
  gloves?:     Item,
  leftRing?:   Item,
  rightRing?:  Item,
  weapon?:     Item
}

