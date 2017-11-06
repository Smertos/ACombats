import { Component, Input } from '@angular/core'
import { Router } from '@angular/router'

import { Player } from '../../game/player'
import { Fight } from '../../game/fight'
import { BodyPart } from '../../game/enums/body-part'

import { GameService } from '../../injectables/game.service'

@Component({
  selector: 'fight',
  templateUrl: './fight.component.html',
  styleUrls: ['./fight.component.css']
})
export class FightComponent {

  player: Player
  enemy:  Player

  fight: Fight
  fightLog:   string[] = ['Fight has been started']

  attackPart: BodyPart
  defendPart: BodyPart

  Object = Object
  BodyPart = BodyPart

  constructor (private game: GameService, private router: Router) {
    this.player = this.game.getSelectedPlayer()
    this.enemy = Fight.getRandomEnemy(this.player.getLevel())

    this.fight = new Fight(this.player, this.enemy)
    this.fight.onFightLog(msg => {
      console.log(msg)
      this.fightLog.push(
        msg
          .replace(this.player.getName(), `<b>${this.player.getName()}</b>`)
          .replace(this.enemy.getName(), `<b>${this.enemy.getName()}</b>`)
      )
    })
    this.fight.onFightFinish((winner, looser) => {
      this.game.save()
      //this.router.navigate(['/'])
    })
  }

  onSubmit(event: any): void {
    if (this.attackPart && this.defendPart) {
      this.fight.makeTurn(this.attackPart, this.defendPart)

      this.attackPart = this.defendPart = void 0
    }
  }

}
