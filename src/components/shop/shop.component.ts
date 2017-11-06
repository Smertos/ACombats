import { Component } from '@angular/core'

import { Shop } from '../../game/shop'
import { Item } from '../../game/interfaces/item'
import { ItemInfo } from '../../game/interfaces/item-info'

import { GameService } from '../../injectables/game.service'
import { capitalize } from '../../utils/capitalize'

@Component({
  selector: 'shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {

  Shop = Shop
  capitalize = capitalize

  constructor (public game: GameService) {
    let player = this.game.getSelectedPlayer()

    player.inFight = false
    player.updateHealth()
  }

  onBuy (itemInfo: ItemInfo) {
    if (!Shop.buy(this.game.getSelectedPlayer(), itemInfo)) {
      alert(`Can't buy ${itemInfo.name}: Not enough gold`)  
    } else {
      this.game.save()
    }
  }

}
