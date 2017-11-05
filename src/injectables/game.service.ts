import { Injectable } from '@angular/core'

import { Shop } from '../game/shop'
import { Player } from '../game/player'
import { Inventory } from '../game/inventory'
import { Item } from '../game/interfaces/item'

import { plainToClass } from 'class-transformer'

const localStorageKeyName = 'gamedata'
const { items: Items } = require('../../gamedata.json')

@Injectable()
export class GameService {

  items = Items
  players = {}
  selectedPlayer: string
  shop: Shop = new Shop()

  constructor () {
    this.load()
  }
  
  // Player interactions
  selectPlayer (name: string) {
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

  // Shop stuff
  getShop (): Shop {
    return this.shop
  }

  // Loading & Saving
  load () {
    if (!localStorage.hasOwnProperty(localStorageKeyName)) {
      this.save()
    } else {
      let { players } = JSON.parse(localStorage.getItem(localStorageKeyName))

      Object.keys(players).forEach(k => {
        players[k].inventory = plainToClass(Inventory, players[k].inventory)

        this.players[k] = plainToClass(Player, players[k])
      })

      console.log(this.players)

      Object.keys(this.players).forEach(k => {
        this.players[k].updateHealth()
        this.players[k].updateLevel()
      })
    }
  }

  save () {
    this.getSelectedPlayer().updateHealth()
    this.getSelectedPlayer().updateLevel()

    localStorage.setItem(localStorageKeyName, JSON.stringify({
      players: this.players
    }))
  }
  
}
