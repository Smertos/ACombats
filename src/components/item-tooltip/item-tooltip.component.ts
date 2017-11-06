import { Component, Input, HostListener } from '@angular/core'

import { ItemTooltipService } from '../../injectables/item-tooltip.service'
import { Item } from '../../game/interfaces/item'

import { capitalize } from '../../utils/capitalize'

@Component({
  selector: 'item-tooltip',
  templateUrl: './item-tooltip.component.html',
  styleUrls: ['./item-tooltip.component.css']
})
export class ItemTooltipComponent {

  Object = Object

  constructor (private itemService: ItemTooltipService) {}

  capitalize = capitalize

}
