import { Component, Input } from '@angular/core'
import { Player } from '../../game/player'
import { Equipped } from '../../game/interfaces/equipped'

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent {

  __player: Player
  equipped: Equipped


  @Input('player')
  set player (player: Player) {
    this.__player = player
    this.equipped = this.__player.getInventory().equipped
  }

  get player () { return this.__player }

}
