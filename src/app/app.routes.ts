import { Routes }  from '@angular/router'

import { FightComponent }     from '../components/fight/fight.component'
import { InventoryComponent } from '../components/inventory/inventory.component'
import { ShopComponent }      from '../components/shop/shop.component'
import { LoggedInGuard }  from '../injectables/logged-in-guard'

export const appRoutes: Routes = [
  {
    path: 'fight',
    component: FightComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'backpack',
    component: InventoryComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'shop',
    component: ShopComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: '',
    redirectTo: '/backpack',
    pathMatch: 'full'
  }
]
