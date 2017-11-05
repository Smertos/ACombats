import { Component } from '@angular/core'
import { GameService } from '../../injectables/game.service'
import { Player } from '../../game/player'
import { Item } from '../../game/interfaces/item'
import { BodyPart } from '../../game/enums/body-part'
import { Statistic } from '../../game/enums/statistic'

@Component({
  selector: 'inventor',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {

  player: Player

  // Hack that allows HTML tempalate to see objects out of class' scope
  Math = Math
  Object = Object
  BodyPart = BodyPart
  Statistic = Statistic

  constructor (private game: GameService) {
    this.player = this.game.getSelectedPlayer()

    this.player.inFight = false
    this.player.updateHealth()
  }
  
  onUpgradeStatistic (stat: Statistic) {
    this.player.upgradeStatistic(stat)
    this.game.save()
  }

  onWear (item: Item, right: boolean = false) {
    this.player.getInventory().wearItem(item, !right)
    this.game.save()
  }

  onSell (item: Item) {
    this.game.getShop().sellItem(this.player.getInventory(), item)
    this.game.save()
  }

}
