import { plainToClass } from 'class-transformer'

import { Player } from './player'
import { Inventory } from './inventory'
import { Item } from './interfaces/item'
import { ItemInfo } from './interfaces/item-info'

const localStorageKeyName = 'gamedata'
const { items } = require('../../gamedata.json')

export class Game {

  items: ItemInfo[] = items
  players = {}
  selectedPlayer: string

  constructor () {
    this.load()
  }
  
  selectPlayer (name: string): void {
    this.selectedPlayer = name
  }

  isPlayerSelected (): boolean {
    return this.selectedPlayer !== void 0
  }

  getSelectedPlayer (): Player {
    return this.getPlayer(this.selectedPlayer)
  }

  getPlayer (name: string): Player {
    if (!this.players[name]) {
      this.players[name] = new Player(name)
    }

    return this.players[name]
  }

  getItemInfo (item: Item): ItemInfo {
    let info: ItemInfo = this.items.find(itemInfo => itemInfo.id === item.id)

    if (info) {
      return info
    } else {
      throw new Error('Can\'t find item with id ' + item.id)
    }
  }

  load (): void {
    if (!localStorage.hasOwnProperty(localStorageKeyName)) {
      this.save()
    } else {
      let { players } = JSON.parse(localStorage.getItem(localStorageKeyName))

      Object.keys(players).forEach(k => {
        let player = players[k]

        // Resurrect class instances
        player.inventory = plainToClass(Inventory, player.inventory)
        player = plainToClass(Player, player)

        // Return item info getter to all inventory items
        player.inventory.items = player.inventory.items.map(
          item => Object.assign(item, {
            getInfo: () => this.getItemInfo(item)
          })
        )

        Object.entries(player.inventory.equipped).forEach(
          ([slot, item]) => player.inventory.equipped[slot] = Object.assign(item, { 
            getInfo: () => this.getItemInfo(item)
          })
        )

        this.players[k] = player
      })

      console.log(this.players)

      Object.keys(this.players).forEach(k => {
        this.players[k].updateHealth()
        this.players[k].updateLevel()
      })
    }
  }

  save (): void {
    this.getSelectedPlayer().updateHealth()
    this.getSelectedPlayer().updateLevel()

    localStorage.setItem(localStorageKeyName, JSON.stringify({
      players: this.players
    }))
  }
  

}
