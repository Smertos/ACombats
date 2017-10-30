import { Injectable } from '@angular/core'
import { Inventory } from './inventory'
import { Item } from './interfaces/item'
import * as Items from '../../gamedata.json'

const localStorageKeyName = 'gamedata'

@Injectable()
export class GameService {

  items = Items
  players: {}
  

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
