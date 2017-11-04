import { Component, Input } from '@angular/core'
import { GameService } from '../../injectables/game.service'
import { Player } from '../../game/player'
import { Fight } from '../../game/fight'

@Component({
  selector: 'fight',
  templateUrl: './fight.component.html',
  styleUrls: ['./fight.component.css']
})
export class FightComponent {

  player: Player
  enemy: Player

  fight: Fight

  bodyParts: string[] = ['Head', 'Body', 'Waist', 'Legs']

  constructor (private game: GameService) {
    this.player = this.game.getSelectedPlayer()
    this.enemy = Fight.getRandomEnemy(this.player.getLevel())

    this.fight = new Fight(this.player, this.enemy)
  }

  onSubmit() {
    console.log(this.player, this.enemy)
  }

}
