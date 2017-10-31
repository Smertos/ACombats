import { Item } from './interfaces/item'

const inventorySizeLimit = 50
const goldLimit = 50000

export class Inventory {

  constructor (private items: Item[], private gold: number = 100) {}

  getItems (): Item[] {
    return this.items    
  }

  addItem (item: Item): boolean {
    if (inventorySizeLimit <= 0 || this.items.length < inventorySizeLimit) {
      this.items.push(item)

      return true
    }

    return false
  }

  addGold (amount: number): boolean {
    if (goldLimit <= 0 || this.gold + amount <= goldLimit) {
      this.gold += amount

      return true
    }

    return false
  }

  removeGold (amount: number): boolean {
    if (this.gold >= amount) {
      this.gold -= amount

      return true
    }

    return false
  }

}
