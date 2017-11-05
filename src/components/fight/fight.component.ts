import { Component, Input } from '@angular/core'
import { Router } from '@angular/router'
import { GameService } from '../../injectables/game.service'
import { BodyPart } from '../../game/enums/body-part'
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

  attackPart: BodyPart
  defendPart: BodyPart

  Object = Object
  BodyPart = BodyPart

  constructor (private game: GameService, private router: Router) {
    this.player = this.game.getSelectedPlayer()
    this.enemy = Fight.getRandomEnemy(this.player.getLevel())

    this.fight = new Fight(this.player, this.enemy)
    this.fight.subscribe((winner, looser) => {
      alert(`
        ${winner.name} won!
        ${looser.getLevel() * 5} EXP acquired
      `)

      this.game.save()
      this.router.navigate(['/'])
    })
  }

  onSubmit(event: any): void {
    if (this.attackPart && this.defendPart) {
      this.fight.makeTurn(this.attackPart, this.defendPart)

      this.attackPart = this.defendPart = void 0
    }
  }

}
