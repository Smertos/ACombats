import { Component, Input } from '@angular/core'
import { Player } from '../../game/player'

@Component({
  selector: 'health-bar',
  templateUrl: './health-bar.component.html',
  styleUrls: ['./health-bar.component.css']
})
export class HealthBarComponent {

  @Input('player')
  player: Player

  Math = Math

}
