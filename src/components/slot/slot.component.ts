import { Component, Input } from '@angular/core'
import { Item } from '../../game/interfaces/item'

@Component({
  selector: 'slot',
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.css']
})
export class SlotComponent {

  @Input('item')
  item: Item

  @Input('placeholder')
  placeholder: string

}
