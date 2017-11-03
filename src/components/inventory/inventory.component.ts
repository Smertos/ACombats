import { Component } from '@angular/core'
import { GameService } from '../../injectables/game.service'
import { Player } from '../../game/player'
import { Item } from '../../game/interfaces/item'

@Component({
  selector: 'inventor',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {

  player: Player

  constructor (private game: GameService) {
    this.player = this.game.getSelectedPlayer()
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
