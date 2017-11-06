import nanoid from 'nanoid'

import { Player } from './player'
import { Inventory } from './inventory'
import { Item } from './interfaces/item'
import { ItemInfo } from './interfaces/item-info'

const { itemSellRate, items } = require('../../gamedata.json')

export class Shop {

  static buy (player: Player, itemInfo: ItemInfo): boolean {
    let inventory: Inventory = player.getInventory()

    if (inventory.removeGold(itemInfo.price)) {
      let item: Item = { 
        id: itemInfo.id,
        uid: nanoid(),
        getInfo: () => itemInfo 
      }

      inventory.addItem(item)

      return true
    }
    
    return false
  }

  static getSellPrice (itemInfo: ItemInfo): number {
    return Math.round(itemInfo.price * itemSellRate)
  }

  static sellItem (inventory: Inventory, item: Item): void {
    let price = this.getSellPrice(item.getInfo())

    inventory.removeItem(item.uid)
    inventory.addGold(price)
  }

  static getItems (): Item[] {
    return items
  }

}
