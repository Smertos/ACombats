import { Component } from '@angular/core'
import { Shop } from '../../game/shop'

@Component({
  selector: 'shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {

  shop: Shop = new Shop()
}
