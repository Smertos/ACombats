import { Component, Input, HostListener } from '@angular/core'
import { ItemTooltipService } from '../../injectables/item-tooltip.service'
import { Item } from '../../game/interfaces/item'

@Component({
  selector: 'item-tooltip',
  templateUrl: './item-tooltip.component.html',
  styleUrls: ['./item-tooltip.component.css']
})
export class ItemTooltipComponent {

  Object = Object

  constructor (private itemService: ItemTooltipService) {}

  capitalize (word: string): string {
    return word[0].toUpperCase() + word.slice(1).toLowerCase()
  }

}
