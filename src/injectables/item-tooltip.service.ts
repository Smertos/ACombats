import { Injectable } from '@angular/core'

import { Item } from '../game/interfaces/item'

@Injectable()
export class ItemTooltipService {
  
  item: Item

  show (item: Item): void {
    this.item = item
  }

  hide (): void {
    this.show(void 0)
  }

}
