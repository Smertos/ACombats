import { Injectable } from '@angular/core'

import { Shop } from '../game/shop'
import { Player } from '../game/player'
import { Inventory } from '../game/inventory'
import { Item } from '../game/interfaces/item'

const localStorageKeyName = 'gamedata'
const { items: Items, enemyName } = require('../../gamedata.json')

@Injectable()
export class GameService {

  items = Items
  players: {}
  shop: Shop = new Shop()

  constructor () {
    this.players[enemyName] = new Player(enemyName)
  }

  getPlayer (name: string): Player {
    if (!this.players[name]) {
      this.players[name] = new Player(name)
    }

    return this.players[name]
  }

  load () {
    if (!localStorage.hasOwnProperty(localStorageKeyName)) {
      this.save()
    } else {
      let state = JSON.parse(localStorage.getItem(localStorageKeyName))

      this.players = state.players
    }
  }

  save () {
    localStorage.setItem(localStorageKeyName, JSON.stringify({
      players: this.players
    }))
  }
  
}
