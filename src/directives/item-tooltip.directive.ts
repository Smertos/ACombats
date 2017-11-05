import { Directive, Input, HostListener, OnDestroy } from '@angular/core'
import { ItemTooltipService } from '../injectables/item-tooltip.service'
import { Item } from '../game/interfaces/item'

@Directive({
  selector: '[item]'
})
export class ItemTooltipDirective implements OnDestroy {

  @Input('item')
  item: Item

  constructor (private itemTooltip: ItemTooltipService) {}

  @HostListener('mouseenter')
  onMouseEnter (): void {
    this.itemTooltip.show(this.item)
  }

  @HostListener('mouseleave')
  onMouseLeave (): void {
    this.itemTooltip.hide() 
  }

  ngOnDestroy (): void {
    this.itemTooltip.hide()
  }
  
}
