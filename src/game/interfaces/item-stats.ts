import { ItemArmorStats } from './item-armor-stats'

export interface ItemStats {
  health?: number,
  armor?: ItemArmorStats,
  damage?: number
}
