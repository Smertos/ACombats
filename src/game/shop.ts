import { Item, ItemType } from './interfaces/item'
import { Player } from './player'
import { Inventory } from './inventory'

const { items } = require('../../gamedata.json')

export class Shop {
  
  buy (player: Player, item: Item): boolean {
    let inventory = player.getInventory()

    if (inventory.removeGold(item.price)) {
      inventory.addItem(Object.assign({ unique: Symbol() }, item))

      return true
    }
    
    return false
  }

  getItems (): Item[] {
    return items
  }

}
