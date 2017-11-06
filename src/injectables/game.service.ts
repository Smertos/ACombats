import { Injectable } from '@angular/core'

import { Game } from '../game/game'
import { Player } from '../game/player'
import { Item } from '../game/interfaces/item'
import { ItemInfo } from '../game/interfaces/item-info'

const localStorageKeyName = 'gamedata'
const { items: Items } = require('../../gamedata.json')

@Injectable()
export class GameService {

  game: Game = new Game()
  
  selectPlayer (name: string): void {
    this.game.selectPlayer(name)
  }

  isPlayerSelected (): boolean {
    return this.game.isPlayerSelected()
  }

  getSelectedPlayer (): Player {
    return this.game.getSelectedPlayer()
  }

  getPlayer (name: string): Player {
    return this.game.getPlayer(name)
  }

  getItemInfo (item: Item): ItemInfo {
    return this.game.getItemInfo(item)
  }

  load (): void {
    this.game.load()
  }

  save (): void {
    this.game.save()
  }
  
}
