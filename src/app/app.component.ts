import { Component } from '@angular/core'

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

  gold = 5
}
