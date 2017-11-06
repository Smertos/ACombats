import { Component } from '@angular/core'

import { Player } from '../../game/player'
import { Shop } from '../../game/shop'
import { Item } from '../../game/interfaces/item'
import { BodyPart } from '../../game/enums/body-part'
import { Statistic } from '../../game/enums/statistic'

import { GameService } from '../../injectables/game.service'
import { capitalize } from '../../utils/capitalize'

@Component({
  selector: 'inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {

  player: Player

  // Hacker Level: -Math.log(0) :)
  // This hack allows us to use objects out of class' scope in HTML templates
  Math = Math
  Shop = Shop
  Object = Object
  BodyPart = BodyPart
  Statistic = Statistic
  capitalize = capitalize

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
    Shop.sellItem(this.player.getInventory(), item)
    this.game.save()
  }

}
