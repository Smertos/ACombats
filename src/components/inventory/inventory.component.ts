import { Component } from '@angular/core'
import { GameService } from '../../injectables/game.service'
import { Player } from '../../game/player'
import { Item } from '../../game/interfaces/item'
import { Statistic } from '../../game/enums/statistic'

@Component({
  selector: 'inventor',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {

  player: Player

  // Hack that allows HTML tempalate to see this enum
  Statistic = Statistic

  constructor (private game: GameService) {
    this.player = this.game.getSelectedPlayer()
  }
  
  onUpgradeStatistic (i: number) {
    this.player.upgradeStatistic(i)
    this.game.save()
  }

  onWear (item: Item, left: boolean = false) {
    this.player.getInventory().wearItem(item, left)
    this.game.save()
  }

  onSell (item: Item) {
    this.game.getShop().sellItem(this.player.getInventory(), item)
    this.game.save()
  }

}
