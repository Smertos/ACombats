import { Injectable } from '@angular/core'
import { CanActivate } from '@angular/router'
import { Player } from '../game/player'
import { GameService } from './game.service'

@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor (private game: GameService) {}
  
  canActivate (): boolean {
    return this.game.isPlayerSelected()
  }

}

