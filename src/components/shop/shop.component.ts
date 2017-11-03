import { Component } from '@angular/core'
import { Shop } from '../../game/shop'
import { Item } from '../../game/interfaces/item'
import { GameService } from '../../injectables/game.service'

@Component({
  selector: 'shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {

  constructor (public game: GameService) {}

  onBuy (item: Item) {
    const shop: Shop = this.game.getShop()
    
    if (!shop.buy(this.game.getSelectedPlayer(), item)) {
      alert(`Can't buy ${item.name}: Not enough gold`)  
    } else {
      this.game.save()
    }
  }

}
