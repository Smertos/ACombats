import { Component, HostListener } from '@angular/core'
import { Router } from '@angular/router'

import { Player } from '../game/player'

import { GameService } from '../injectables/game.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  links = [
    { name: 'Fight',     url: '/fight'    },
    { name: 'Inventory', url: '/backpack' },
    { name: 'Shop',      url: '/shop'     }
  ]

  player:   Player
  cheatsOn: boolean = false

  constructor (private game: GameService, private router: Router) {}

  @HostListener('window:keyup', ['$event'])
  onKeyUp (event: KeyboardEvent) {
    if (this.player) {
      switch(event.key) {
        case '1':
          this.router.navigate(['/fight'])
          break

        case '2':
          this.router.navigate(['/backpack'])
          break

        case '3':
          this.router.navigate(['/shop'])
      }
    }
  }

  onUsernameSelect(username: string) {
    this.game.selectPlayer(username)
    this.player = this.game.getSelectedPlayer()

    // This is actually fixed QuickHelpComponent not showing up after log in
    this.router.navigate(['/lets-fix-routes:)'])
  }

}
