import { Routes}  from '@angular/router'

import { FightComponent }     from '../components/fight/fight.component'
import { InventoryComponent } from '../components/inventory/inventory.component'
import { ShopComponent }      from '../components/shop/shop.component'
import { SimpleCanActivate }  from '../injectables/simple-can-activate'

export const appRoutes: Routes = [
  {
    path: 'fight',
    component: FightComponent,
    canActivate: [CanActivate]
  },
  {
    path: 'backpack',
    component: InventoryComponent,
    canActivate: [CanActivate]
  },
  {
    path: 'shop',
    component: ShopComponent
    canActivate: [CanActivate]
  },
  {
    path: '',
    redirectTo: '/backpack',
    pathMatch: 'full'
  }
]
